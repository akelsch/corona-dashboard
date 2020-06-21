import { Case, Mapdata, Option } from './models'

import sequelize from 'sequelize'
const { Sequelize } = sequelize

const DATABASE = 'postgres'
const USERNAME = 'postgres'
const PASSWORD = 'postgres'

const connection = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: 'localhost',
  dialect: 'postgres'
})

const models = [Case, Mapdata, Option]
models.forEach(model => model.init(connection))

export default connection
