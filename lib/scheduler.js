import cron from 'node-cron'

import { Case } from './models'
import { fetchCases } from './utils/rki'

cron.schedule('0 4 * * *', async () => {
  const data = await fetchCases()

  for (const element of data.features) {
    await Case.update({
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

  updateNormalizedValues()
})

export async function updateNormalizedValues () {
  const cases = await Case.findAll()

  const casesPer100k = {
    min: await Case.min('casesPer100k'),
    max: await Case.max('casesPer100k')
  }

  const cases7Per100k = {
    min: await Case.min('cases7Per100k'),
    max: await Case.max('cases7Per100k')
  }

  for (const c of cases) {
    c.normalizedValues = {
      casesPer100k: normalize(c.casesPer100k, casesPer100k.min, casesPer100k.max),
      cases7Per100k: normalize(c.cases7Per100k, cases7Per100k.min, cases7Per100k.max)
    }
    await c.save()
  }
}

function normalize (x, min, max) {
  return 100 - ((x - min) / (max - min)) * 50
}
