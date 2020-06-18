import typeorm from 'typeorm'
import { Mapdata } from '../model/Mapdata.js'

const { EntitySchema } = typeorm

export default new EntitySchema({
  name: 'Mapdata',
  target: Mapdata,
  columns: {
    objectId: {
      primary: true,
      type: 'int'
    },
    federalStateId: {
      type: 'int'
    },
    coordinates: {
      type: 'point',
      array: true
    }
  }
})
