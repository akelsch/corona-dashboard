import Sequelize from 'sequelize'
import connection from '../utils/database.js'

const Model = Sequelize.Model

export default class Mapdata extends Model {}

Mapdata.init({
  objectId: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  federalStateId: {
    type: Sequelize.INTEGER
  },
  geometry: {
    type: Sequelize.GEOMETRY
  }
}, {
  sequelize: connection,
  timestamps: false
})