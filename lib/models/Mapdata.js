import sequelize from 'sequelize'
const { Model, DataTypes } = sequelize

export default class Mapdata extends Model {
  static init (connection) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      stateId: {
        type: DataTypes.INTEGER
      },
      geometry: {
        type: DataTypes.GEOMETRY('GEOMETRY', 3857)
      }
    }, {
      sequelize: connection,
      timestamps: false
    })
  }
}
