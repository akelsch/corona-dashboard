import sequelize from 'sequelize'

import Mapdata from '../models/Mapdata'

export async function getMapdata (stateId, resolution, zoom) {
  const xFactor = (0.00025 / 16) / (2 ** -zoom)
  const yFactor = -xFactor
  const mapdata = await Mapdata.findAll({
    attributes: [
      'stateId',
      [sequelize.fn('ST_Simplify',
        sequelize.fn('ST_Scale', sequelize.col('geometry'), xFactor, yFactor), getResolution(resolution)),
      'geometry']
    ],
    where: sequelize.literal(`"stateId" = ${stateId} OR ${stateId} = 0`)
  })

  return mapdata.map(data => data.geometry)
    .flatMap(geo => geo.type === 'MultiPolygon' ? geo.coordinates.flat() : geo.coordinates)
}

function getResolution (resolution) {
  switch (resolution) {
    case 'high':
    default:
      return 1 / 10
    case 'medium':
      return 1 / 3
    case 'low':
      return 3 / 4
  }
}
