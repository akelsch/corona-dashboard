import connection from '../utils/database.js'

import sequelize from 'sequelize'
const { Model, DataTypes } = sequelize

class Case extends Model {}

Case.init({
  objectId: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  deathRate: {
    type: DataTypes.FLOAT
  },
  casesPer100k: {
    type: DataTypes.FLOAT
  },
  federalState: {
    type: DataTypes.STRING
  },
  countyId: {
    type: DataTypes.INTEGER
  },
  county: {
    type: DataTypes.STRING
  },
  lastUpdate: {
    type: DataTypes.TIME
  },
  cases7Per100k: {
    type: DataTypes.INTEGER
  },
  recovered: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize: connection,
  timestamps: false
})

export default Case
