import typeorm from 'typeorm'
import { Category } from '../model/Category.js'

const { EntitySchema } = typeorm

export default new EntitySchema({
  name: 'Category',
  target: Category,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    name: {
      type: 'varchar'
    }
  }
})
