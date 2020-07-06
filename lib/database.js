import { Case, Mapdata, Option } from './models'

import sequelize from 'sequelize'
const { Sequelize } = sequelize

const DATABASE = 'postgres'
const USERNAME = 'postgres'
const PASSWORD = 'mysecretpassword'
const HOST = process.env.PG_HOST || 'localhost'

const connection = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  dialect: 'postgres'
})

const models = [Case, Mapdata, Option]
models.forEach(model => model.init(connection))

export default connection
