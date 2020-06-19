import Sequelize from 'sequelize'
import connection from '../database.js'

const Model = Sequelize.Model

export default class Case extends Model {}

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
  sequelize: connection,
  modelName: 'case'
})
