import { Case } from '../models'

export function findAllCases () {
  return Case.findAll()
}

export function findCasesByStateId (stateId) {
  return Case.findAll({
    where: {
      stateId: stateId
    }
  })
}
