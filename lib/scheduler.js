import cron from 'node-cron'

import Case from './models/Case'
import { fetchCases } from './utils/rki'

cron.schedule('15 0 * * *', async () => {
  const data = await fetchCases()

  for (const element of data.features) {
    Case.update({
      deathRate: element.attributes.death_rate,
      cases: element.attributes.cases,
      deaths: element.attributes.deaths,
      casesPer100k: element.attributes.cases_per_100k,
      state: element.attributes.BL,
      stateId: element.attributes.BL_ID,
      county: element.attributes.county,
      lastUpdate: element.attributes.last_update,
      cases7Per100k: element.attributes.cases7_per_100k
    }, {
      where: {
        id: element.attributes.OBJECTID
      }
    })
  }
})
