import cron from 'node-cron'
import axios from 'axios'

import Case from '../models/Case'

const URL_CASES = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=OBJECTID,death_rate,cases,deaths,cases_per_100k,BL,BL_ID,county,last_update,cases7_per_100k&returnGeometry=false&f=json'

cron.schedule('15 0 * * *', async () => {
  const response = await axios.get(URL_CASES)
  const data = response.data

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
})
