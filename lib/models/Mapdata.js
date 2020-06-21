import connection from '.'

import sequelize from 'sequelize'
const { Model, DataTypes } = sequelize

class Mapdata extends Model {}

Mapdata.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  stateId: {
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
