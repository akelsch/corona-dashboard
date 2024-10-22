import sequelize from 'sequelize'
const { Model, DataTypes } = sequelize

export default class Option extends Model {
  static init (connection) {
    super.init({
      guid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      stateId: {
        type: DataTypes.INTEGER
      },
      resolution: {
        type: DataTypes.STRING
      },
      zoom: {
        type: DataTypes.INTEGER
      },
      selectedData: {
        type: DataTypes.STRING
      },
      resultsLimit: {
        type: DataTypes.INTEGER
      },
      fillColor: {
        type: DataTypes.STRING
      },
      strokeColor: {
        type: DataTypes.STRING
      },
      displayedComponents: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      darkThemeSelected: {
        type: DataTypes.BOOLEAN
      }
    }, {
      sequelize: connection
    })
  }
}
