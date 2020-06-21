import axios from 'axios'

import connection from './models'
import Mapdata from './models/Mapdata'
import Case from './models/Case'
import './models/Option'

// Quelle: https://npgeo-corona-npgeo-de.hub.arcgis.com/datasets/917fc37a709542548cc3be077a786c17_0
const url = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=OBJECTID,BL_ID&outSR=4326&f=geojson'

export default function init () {
  connection.drop()
    .then(() => {
      connection.sync()
        .then(async () => {
          await initMapdata()
          await initCases()
          process.exit(0)
        })
    })
}

async function initMapdata () {
  const response = await axios.get(url)
  const data = response.data

  for (const element of data.features) {
    await Mapdata.create({
      objectId: element.properties.OBJECTID,
      federalStateId: element.properties.BL_ID,
      geometry: element.geometry
    })
  }
}

const urlCases = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=OBJECTID,death_rate,cases,deaths,cases_per_100k,BL,BL_ID,county,last_update,cases7_per_100k,recovered&returnGeometry=false&outSR=4326&f=json'

async function initCases () {
  const response = await axios.get(urlCases)
  const data = response.data

  for (const element of data.features) {
    await Case.create({
      objectId: element.attributes.OBJECTID,
      death_Rate: element.attributes.death_rate,
      casesPer100k: element.attributes.cases_per_100k,
      federalState: element.attributes.BL,
      federalStateId: element.attributes.BL_ID,
      county: element.attributes.county,
      lastUpdate: element.attributes.last_update,
      cases7Per100k: element.attributes.cases7_per_100k,
      recovered: element.attributes.recovered
    })
  }
}
