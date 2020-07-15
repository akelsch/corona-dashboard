import cron from 'node-cron'

import * as rki from './utils/rki'
import { CountyCase, StateCase } from './models'

cron.schedule('0 4 * * *', () => {
  updateStateCases()
  updateCountyCases()
})

async function updateStateCases () {
  const data = await rki.fetchStateCases()

  for (const element of data.features) {
    await StateCase.update({
      cases: element.attributes.Fallzahl,
      deaths: element.attributes.Death,
      casesPer100k: element.attributes.faelle_100000_EW,
      state: element.attributes.LAN_ew_GEN,
      stateId: element.attributes.OBJECTID_1,
      lastUpdate: element.attributes.Aktualisierung
    }, {
      where: {
        id: element.attributes.OBJECTID
      }
    })
  }

  updateNormalizedValues(StateCase)
}

async function updateCountyCases () {
  const data = await rki.fetchCountyCases()

  for (const element of data.features) {
    await CountyCase.update({
      deathRate: element.attributes.death_rate,
      cases: element.attributes.cases,
      deaths: element.attributes.deaths,
      casesPer100k: element.attributes.cases_per_100k,
      state: element.attributes.BL,
      stateId: element.attributes.BL_ID,
      county: element.attributes.county,
      lastUpdate: convertGermanDate(element.attributes.last_update),
      cases7Per100k: element.attributes.cases7_per_100k
    }, {
      where: {
        id: element.attributes.OBJECTID
      }
    })
  }

  updateNormalizedValues(CountyCase)
}

export async function updateNormalizedValues (model) {
  const cases = await model.findAll()

  const values = ['casesPer100k', 'cases7Per100k']
  const minMaxData = {}
  for (const value of values) {
    if (model.rawAttributes[value]) {
      minMaxData[value] = { min: await model.min(value), max: await model.max(value) }
    }
  }

  for (const myCase of cases) {
    const normalizedValues = Object.entries(minMaxData).reduce((acc, [k, v]) => {
      if (v.min !== 0 || v.max !== 0) {
        acc[k] = normalize(myCase[k], v.min, v.max)
      }
      return acc
    }, {})

    myCase.normalizedValues = normalizedValues
    await myCase.save()
  }
}

function normalize (x, min, max) {
  return 100 - ((x - min) / (max - min)) * 50
}

export function convertGermanDate (germanDate) {
  // Format: 14.07.2020, 00:00 Uhr
  const found = germanDate.match(/(\d{2})\.(\d{2})\.(\d{4}), (\d{2}):(\d{2}) Uhr/)
  return new Date(found[3], found[2], found[1], found[4], found[5])
}
