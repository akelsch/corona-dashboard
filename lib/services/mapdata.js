import sequelize from 'sequelize'

import Mapdata from '../models/Mapdata'
import { webMercator } from '../utils/algorithms'

export async function getMapdata (stateId, resolution, zoom) {
  const mapdata = await Mapdata.findAll({
    where: sequelize.literal(`"stateId" = ${stateId} OR ${stateId} = 0`),
    attributes: [
      'stateId',
      [sequelize.fn('ST_Simplify', sequelize.col('geometry'), getResolution(resolution)), 'geometry']
    ]
  })

  return mapdata.map(data => data.geometry)
    .flatMap(geo => geo.type === 'MultiPolygon' ? geo.coordinates.flat() : geo.coordinates)
    .map(ring => ring.map(([long, lat]) => webMercator(long, lat, zoom)))
}

function getResolution (resolution) {
  switch (resolution) {
    case 'high':
    default:
      return 0.001
    case 'medium':
      return 0.005
    case 'low':
      return 0.009
  }
}
