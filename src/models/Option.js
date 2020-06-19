import Sequelize from 'sequelize'
import connection from '../database.js'

const Model = Sequelize.Model

export default class Option extends Model {}

Option.init({
  guid: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  federalStateId: {
    type: Sequelize.INTEGER
  },
  resolution: {
    type: Sequelize.STRING
  },
  zoom: {
    type: Sequelize.INTEGER
  }
}, {
  sequelize: connection
})
