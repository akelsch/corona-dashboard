import typeorm from 'typeorm'

import mapdataSchema from './entity/MapdataSchema.js'
import caseSchema from './entity/CaseSchema.js'
import optionSchema from './entity/OptionSchema.js'

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
    mapdataSchema,
    caseSchema,
    optionSchema
  ]
}).catch(function (error) {
  console.log('Error: ', error)
})
