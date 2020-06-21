import sequelize from 'sequelize'

import Case from '../models/Case'

export async function findAllCases (stateId) {
  return await Case.findAll({
    where: sequelize.literal(`"stateId" = ${stateId} OR ${stateId} = 0`)
  })
}
