import connection from '.'

import sequelize from 'sequelize'
const { Model, DataTypes } = sequelize

class Case extends Model {}

Case.init({
  objectId: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  death_Rate: {
    type: DataTypes.FLOAT
  },
  casesPer100k: {
    type: DataTypes.FLOAT
  },
  federalState: {
    type: DataTypes.STRING
  },
  federalStateId: {
    type: DataTypes.INTEGER
  },
  county: {
    type: DataTypes.STRING
  },
  lastUpdate: {
    type: DataTypes.STRING
  },
  cases7Per100k: {
    type: DataTypes.FLOAT
  },
  recovered: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize: connection,
  timestamps: false
})

export default Case
