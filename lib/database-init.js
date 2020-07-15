import db from './database'
import * as rki from './utils/rki'
import { CountyCase, CountyGeometry, StateCase, StateGeometry } from './models'
import { updateNormalizedValues, convertGermanDate } from './scheduler'

db.drop()
  .then(() => {
    db.sync()
      .then(async () => {
        await initStateGeometries()
        await initCountyGeometries()
        await initStateCases()
        await initCountyCases()
        process.exit(0)
      })
  })

async function initStateGeometries () {
  const data = await rki.fetchStateGeometries()

  for (const element of data.features) {
    element.geometry.crs = data.crs
    await StateGeometry.create({
      id: element.properties.OBJECTID,
      stateId: element.properties.OBJECTID_1,
      geometry: element.geometry
    })
  }
}

async function initCountyGeometries () {
  const data = await rki.fetchCountyGeometries()

  for (const element of data.features) {
    element.geometry.crs = data.crs
    await CountyGeometry.create({
      id: element.properties.OBJECTID,
      stateId: element.properties.BL_ID,
      geometry: element.geometry
    })
  }
}

async function initStateCases () {
  const data = await rki.fetchStateCases()

  for (const element of data.features) {
    await StateCase.create({
      id: element.attributes.OBJECTID,
      deathRate: (element.attributes.Death / element.attributes.Fallzahl) * 100,
      cases: element.attributes.Fallzahl,
      deaths: element.attributes.Death,
      casesPer100k: element.attributes.faelle_100000_EW,
      state: element.attributes.LAN_ew_GEN,
      stateId: element.attributes.OBJECTID_1,
      lastUpdate: element.attributes.Aktualisierung
    })
  }

  await updateNormalizedValues(StateCase)
}

async function initCountyCases () {
  const data = await rki.fetchCountyCases()

  for (const element of data.features) {
    await CountyCase.create({
      id: element.attributes.OBJECTID,
      deathRate: element.attributes.death_rate,
      cases: element.attributes.cases,
      deaths: element.attributes.deaths,
      casesPer100k: element.attributes.cases_per_100k,
      state: element.attributes.BL,
      stateId: element.attributes.BL_ID,
      county: element.attributes.county,
      lastUpdate: convertGermanDate(element.attributes.last_update),
      cases7Per100k: element.attributes.cases7_per_100k
    })
  }

  await updateNormalizedValues(CountyCase)
}
