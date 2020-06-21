import axios from 'axios'

import sequelize from './database'
import { Mapdata, Case } from './models'
import { CASES_URL, MAPDATA_URL } from './utils/urls'

sequelize.drop()
  .then(() => {
    sequelize.sync()
      .then(async () => {
        await initCases()
        await initMapdata()
        process.exit(0)
      })
  })

async function initCases () {
  const response = await axios.get(CASES_URL)
  const data = response.data

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
}

async function initMapdata () {
  const response = await axios.get(MAPDATA_URL)
  const data = response.data

  for (const element of data.features) {
    await Mapdata.create({
      id: element.properties.OBJECTID,
      stateId: element.properties.BL_ID,
      geometry: element.geometry
    })
  }
}
