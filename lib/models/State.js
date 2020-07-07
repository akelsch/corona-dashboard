import sequelize from 'sequelize'
const { Model, DataTypes } = sequelize

export default class State extends Model {
  static init (connection) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
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
