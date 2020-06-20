import sequelize from 'sequelize'

import Mapdata from '../models/Mapdata'
import { douglasPeucker, webMercator } from '../utils/algorithms'

export async function adjustMapdata (queryParams) {
  const { BL_ID: stateId, resolution, zoom } = queryParams

  const mapdata = await Mapdata.findAll({
    where: sequelize.literal(`federalStateId = ${stateId} OR ${stateId} = 0`)
  })

  return mapdata.map(data => data.geometry)
    .flatMap(geo => geo.type === 'MultiPolygon' ? geo.coordinates.flat() : geo.coordinates)
    .map(ring => ring.map(([long, lat]) => webMercator(long, lat, zoom)))
    .map(ring => applyResolution(ring, resolution))
}

function applyResolution (ring, resolution) {
  switch (resolution) {
    case 'high':
    default:
      return ring
    case 'medium':
      return douglasPeucker(ring, 1 / 3)
    case 'low':
      return douglasPeucker(ring, 3 / 4)
  }
}
