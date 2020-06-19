import Sequelize from 'sequelize'
import { sequelize } from './index.js'

const Model = Sequelize.Model

export class Mapdata extends Model {}
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
  sequelize,
  modelName: 'mapdata'
})
