import typeorm from 'typeorm'

import attributesSchema from './entity/AttributesSchema.js'
import geoDataSchema from './entity/GeoDataSchema.js'
import guidSchema from './entity/GUIDSchema.js'

export default typeorm.createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [
    attributesSchema,
    geoDataSchema,
    guidSchema
  ]
}).catch(function (error) {
  console.log('Error: ', error)
})
