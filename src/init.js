import axios from 'axios'

import connection from './database.js'
import Mapdata from './models/mapdata.js'
import './models/case.js'
import './models/option.js'

// Quelle: https://npgeo-corona-npgeo-de.hub.arcgis.com/datasets/917fc37a709542548cc3be077a786c17_0
const url = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=OBJECTID,BL_ID&outSR=4326&f=geojson'

export default function init () {
  connection.drop()
    .then(() => {
      connection.sync()
        .then(async () => {
          console.log('tables created')
          await initMapdata()
          console.log('mapdata initialization done')
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
