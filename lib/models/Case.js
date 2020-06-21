import connection from '.'

import sequelize from 'sequelize'
const { Model, DataTypes } = sequelize

class Case extends Model {}

Case.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  deathRate: {
    type: DataTypes.DOUBLE
  },
  cases: {
    type: DataTypes.INTEGER
  },
  deaths: {
    type: DataTypes.INTEGER
  },
  casesPer100k: {
    type: DataTypes.DOUBLE
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
    type: DataTypes.DOUBLE
  },
  recovered: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize: connection,
  timestamps: false
})

export default Case
