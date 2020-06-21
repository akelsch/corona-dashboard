import sequelize from 'sequelize'

import Case from '../models/Case'

export function findAllCases (stateId) {
  return Case.findAll({
    where: sequelize.literal(`"stateId" = ${stateId} OR ${stateId} = 0`)
  })
}
