import sequelize from 'sequelize'

import Mapdata from '../models/Mapdata'

export async function findAllMapdata () {
  const query = `
    json_build_object(
      'type', 'FeatureCollection',
      'features', json_agg(ST_AsGeoJSON("Mapdata".*)::json)
    )
  `
  const mapdata = await Mapdata.findOne({
    attributes: [
      [sequelize.literal(query), 'geojson']
    ],
    raw: true
  })
  return mapdata.geojson
}
