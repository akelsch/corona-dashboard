import Sequelize from 'sequelize'
import { sequelize } from './index.js'

const Model = Sequelize.Model

export class Case extends Model {}
Case.init({
  objectId: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  deathRate: {
    type: Sequelize.FLOAT
  },
  casesPer100k: {
    type: Sequelize.FLOAT
  },
  federalState: {
    type: Sequelize.STRING
  },
  countyId: {
    type: Sequelize.INTEGER
  },
  county: {
    type: Sequelize.STRING
  },
  lastUpdate: {
    type: Sequelize.TIME
  },
  cases7Per100k: {
    type: Sequelize.INTEGER
  },
  recovered: {
    type: Sequelize.INTEGER
  }
}, {
  sequelize,
  modelName: 'case'
})
