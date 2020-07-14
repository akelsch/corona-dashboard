import { CountyCase, StateCase } from '../models'

export function findAllCases () {
  return StateCase.findAll({
    order: [
      ['id', 'ASC']
    ]
  })
}

export function findCasesByStateId (stateId) {
  return CountyCase.findAll({
    where: {
      stateId: stateId
    }
  })
}
