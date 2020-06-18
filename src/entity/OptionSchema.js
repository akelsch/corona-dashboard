import typeorm from 'typeorm'
import { Option } from '../model/Option.js'

const { EntitySchema } = typeorm

export default new EntitySchema({
  name: 'Option',
  target: Option,
  columns: {
    guid: {
      primary: true,
      type: 'uuid',
      generated: true
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
