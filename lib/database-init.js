import sequelize from './database'
import { Case, CountyGeometry, StateGeometry } from './models'
import { fetchCases, fetchCountyGeometries, fetchStateGeometries } from './utils/rki'
import { updateNormalizedValues } from './scheduler'

sequelize.drop()
  .then(() => {
    sequelize.sync()
      .then(async () => {
        await initStateGeometries()
        await initCountyGeometries()
        await initCases()
        process.exit(0)
      })
  })

async function initStateGeometries () {
  const data = await fetchStateGeometries()

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
  const data = await fetchCountyGeometries()

  for (const element of data.features) {
    element.geometry.crs = data.crs
    await CountyGeometry.create({
      id: element.properties.OBJECTID,
      stateId: element.properties.BL_ID,
      geometry: element.geometry
    })
  }
}

async function initCases () {
  const data = await fetchCases()

  for (const element of data.features) {
    await Case.create({
      id: element.attributes.OBJECTID,
      deathRate: element.attributes.death_rate,
      cases: element.attributes.cases,
      deaths: element.attributes.deaths,
      casesPer100k: element.attributes.cases_per_100k,
      state: element.attributes.BL,
      stateId: element.attributes.BL_ID,
      county: element.attributes.county,
      lastUpdate: element.attributes.last_update,
      cases7Per100k: element.attributes.cases7_per_100k
    })
  }

  await updateNormalizedValues()
}
