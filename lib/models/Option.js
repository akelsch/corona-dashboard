import connection from '../utils/database.js'

import sequelize from 'sequelize'
const { Model, DataTypes } = sequelize

class Option extends Model {}

Option.init({
  guid: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  federalStateId: {
    type: DataTypes.INTEGER
  },
  resolution: {
    type: DataTypes.STRING
  },
  zoom: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize: connection
})

export default Option
