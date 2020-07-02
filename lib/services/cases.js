import Case from '../models/Case'

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
