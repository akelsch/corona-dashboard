import Sequelize from 'sequelize'
import { sequelize } from './index.js'

const Model = Sequelize.Model

export class Option extends Model {}
Option.init({
  guid: {
    type: Sequelize.UUID,
    primaryKey: true,
    autoIncrement: true
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
  sequelize,
  modelName: 'option'
})
