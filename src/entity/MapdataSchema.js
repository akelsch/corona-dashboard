import typeorm from 'typeorm'
import { Mapdata } from '../model/Mapdata.js'

const { EntitySchema } = typeorm

export default new EntitySchema({
  name: 'Mapdata',
  target: Mapdata,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    countyId: {
      type: 'int'
    },
    objectId: {
      type: 'int'
    },
    coordinates: {
      type: 'int'
    }
  }
})
