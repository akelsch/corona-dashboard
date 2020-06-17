import typeorm from 'typeorm'
import { GUID } from '../model/GUID.js'

const { EntitySchema } = typeorm

export default new EntitySchema({
  name: 'GUID',
  target: GUID,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    guid: {
      type: 'int'
    },
    federalStateId: {
      type: 'int'
    },
    resolution: {
      type: 'varchar'
    },
    zoom: {
      type: 'int'
    }
  }
})
