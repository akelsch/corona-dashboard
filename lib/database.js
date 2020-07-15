import * as models from './models'

import sequelize from 'sequelize'
const { Sequelize } = sequelize

const DATABASE = 'postgres'
const USERNAME = 'postgres'
const PASSWORD = 'mysecretpassword'
const HOST = process.env.PG_HOST || 'localhost'

const db = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  dialect: 'postgres'
})

Object.values(models).forEach(model => model.init(db))

export default db
