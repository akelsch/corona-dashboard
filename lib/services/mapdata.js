import sequelize from 'sequelize'

import Mapdata from '../models/Mapdata'

export async function getMapdata (stateId, resolution, zoom) {
  // Wichtig: Erst zoom, dann resolution!
  const mapdata = await Mapdata.findAll({
    attributes: [
      'stateId',
      [sequelize.fn('ST_Simplify',
        sequelize.fn('ST_Scale', sequelize.col('geometry'), ...getScaleFactor(zoom)), getEpsilon(resolution)),
      'geometry']
    ],
    where: sequelize.literal(`"stateId" = ${stateId} OR ${stateId} = 0`)
  })

  return mapdata.map(data => data.geometry)
    .filter(geo => geo !== null)
    .flatMap(geo => geo.type === 'MultiPolygon' ? geo.coordinates.flat() : geo.coordinates)
}

function getScaleFactor (zoom) {
  const initialScale = 591657550.500000

  const maxZoomLevel = 20
  let newZoomLevel = maxZoomLevel - zoom
  if (newZoomLevel < 0) {
    newZoomLevel = 0
  }

  const desiredScale = initialScale / 2 ** newZoomLevel
  const scaleFactor = desiredScale / initialScale

  return [scaleFactor, -scaleFactor]
}

function getEpsilon (resolution) {
  switch (resolution) {
    case 'high':
    default:
      return 1 / 10
    case 'medium':
      return 1
    case 'low':
      return 2
  }
}
