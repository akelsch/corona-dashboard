import typeorm from 'typeorm'
import { Case } from '../model/Case.js'

const { EntitySchema } = typeorm

export default new EntitySchema({
  name: 'Case',
  target: Case,
  columns: {
    objectId: {
      primary: true,
      type: 'int'
    },
    deathRate: {
      type: 'float'
    },
    casesPer100k: {
      type: 'float'
    },
    federalState: {
      type: 'varchar'
    },
    countyId: {
      type: 'int'
    },
    county: {
      type: 'varchar'
    },
    lastUpdate: {
      type: 'timestamp'
    },
    cases7Per100k: {
      type: 'int'
    },
    recovered: {
      type: 'int'
    }
  }
})
