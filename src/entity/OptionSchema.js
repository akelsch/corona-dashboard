import typeorm from 'typeorm'
import { Option } from '../model/Option.js'

const { EntitySchema } = typeorm

export default new EntitySchema({
  name: 'Option',
  target: Option,
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
