import sequelize from 'sequelize'
const { Model, DataTypes } = sequelize

export default class CountyGeometry extends Model {
  static init (connection) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      stateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 16
        }
      },
      geometry: {
        type: DataTypes.GEOMETRY('GEOMETRY', 3857),
        allowNull: false
      }
    }, {
      sequelize: connection,
      timestamps: false
    })
  }
}
