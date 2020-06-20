import connection from '../utils/database.js'

import sequelize from 'sequelize'
const { Model, DataTypes } = sequelize

class Mapdata extends Model {}

Mapdata.init({
  objectId: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  federalStateId: {
    type: DataTypes.INTEGER
  },
  geometry: {
    type: DataTypes.GEOMETRY
  }
}, {
  sequelize: connection,
  timestamps: false
})

export default Mapdata
