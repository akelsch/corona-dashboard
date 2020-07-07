import sequelize from 'sequelize'

import County from '../models/County'
import State from '../models/State'

export function findAllMapdata (resolution, zoom) {
  return getMapdata(resolution, zoom, State)
}

export function findMapdataByStateId (stateId, resolution, zoom) {
  return getMapdata(resolution, zoom, County, { where: { stateId: stateId } })
}

async function getMapdata (resolution, zoom, resource, options) {
  // Wichtig: Erst zoom, dann resolution!
  const mapdata = await resource.findAll({
    attributes: [
      'id',
      [sequelize.fn('ST_Simplify',
        sequelize.fn('ST_Scale', sequelize.col('geometry'), ...getScaleFactor(zoom)), getEpsilon(resolution)),
      'geometry']
    ],
    ...options
  })

  return mapdata.filter(data => data.geometry !== null)
    .map(({ id, geometry: { coordinates } }) => {
      return { id, coordinates }
    })
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
      return 2
    case 'low':
      return 4
  }
}
