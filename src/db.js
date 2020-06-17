import typeorm from 'typeorm'

import postSchema from './entity/PostSchema.js'
import categorySchema from './entity/CategorySchema.js'

export function initDatabase () {
  typeorm.createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    synchronize: true,
    logging: false,
    entities: [
      postSchema,
      categorySchema
    ]
  }).catch(function (error) {
    console.log('Error: ', error)
  })
}
