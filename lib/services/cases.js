import sequelize from 'sequelize'

import Case from '../models/Case'

export async function adjustCase (queryParams) {
  const { BL_ID: stateId } = queryParams

  const cases = await Case.findAll({
    where: sequelize.literal(`"federalStateId" = ${stateId} OR ${stateId} = 0`)
  })

  return cases
}
