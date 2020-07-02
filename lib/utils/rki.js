import axios from 'axios'

// Quelle: https://npgeo-corona-npgeo-de.hub.arcgis.com/datasets/917fc37a709542548cc3be077a786c17_0
const BASE_URL = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query'
const CASES_URL = BASE_URL + '?where=1%3D1&outFields=OBJECTID,death_rate,cases,deaths,cases_per_100k,BL,BL_ID,county,last_update,cases7_per_100k&returnGeometry=false&f=json'
const MAPDATA_URL = BASE_URL + '?where=1%3D1&outFields=OBJECTID,BL_ID&outSR=3857&f=geojson'

async function get (url) {
  const response = await axios.get(url)
  return response.data
}

export function fetchCases () {
  return get(CASES_URL)
}

export function fetchMapdata () {
  return get(MAPDATA_URL)
}
