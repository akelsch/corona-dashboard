import sequelize from 'sequelize'

import Mapdata from '../models/Mapdata'

export async function getMapdata (stateId, resolution, zoom) {
  const mapdata = await Mapdata.findAll({
    attributes: [
      'stateId',
      [sequelize.fn('ST_Scale',
        sequelize.fn('ST_Simplify', sequelize.col('geometry'), getResolution(resolution)), zoom * 0.0000625, zoom * -0.0000625),
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
      return 50
    case 'medium':
      return 200
    case 'low':
      return 400
  }
}
