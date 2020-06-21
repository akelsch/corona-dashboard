import sequelize from 'sequelize'
const { Model, DataTypes } = sequelize

export default class Case extends Model {
  static init (connection) {
    super.init({
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
      state: {
        type: DataTypes.STRING
      },
      stateId: {
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
      }
    }, {
      sequelize: connection
    })
  }
}
