import typeorm from 'typeorm'
import { GeoData } from '../model/GeoData.js'

const { EntitySchema } = typeorm

export default new EntitySchema({
  name: 'GeoData',
  target: GeoData,
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
