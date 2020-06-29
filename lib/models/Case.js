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
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          min: 0,
          max: 100
        }
      },
      cases: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0
        }
      },
      deaths: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0
        }
      },
      casesPer100k: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          min: 0,
          max: 100000
        }
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-zäöü-]+$/i
        }
      },
      stateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 16
        }
      },
      county: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: /^(LK|Region|SK|StadtRegion) .+$/
        }
      },
      lastUpdate: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cases7Per100k: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          min: 0,
          max: 100000
        }
      }
    }, {
      sequelize: connection
    })
  }
}
