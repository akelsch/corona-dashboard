import axios from 'axios'

// Quelle: https://npgeo-corona-npgeo-de.hub.arcgis.com/datasets/917fc37a709542548cc3be077a786c17_0
const LK_BASE = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query'
const LK_CASES = LK_BASE + '?where=1%3D1&outFields=OBJECTID,death_rate,cases,deaths,cases_per_100k,BL,BL_ID,county,last_update,cases7_per_100k&returnGeometry=false&f=json'
const LK_GEOMETRY = LK_BASE + '?where=1%3D1&outFields=OBJECTID,BL_ID&outSR=3857&f=geojson'

// Quelle: https://npgeo-corona-npgeo-de.hub.arcgis.com/datasets/ef4b445a53c1406892257fe63129a8ea_0
const BL_BASE = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/Coronaf%C3%A4lle_in_den_Bundesl%C3%A4ndern/FeatureServer/0/query'
const BL_GEOMETRY = BL_BASE + '?where=1%3D1&outFields=OBJECTID,OBJECTID_1&outSR=3857&f=geojson'

async function get (url) {
  const response = await axios.get(url)
  return response.data
}

export function fetchCases () {
  return get(LK_CASES)
}

export function fetchCountyGeometries () {
  return get(LK_GEOMETRY)
}

export function fetchStateGeometries () {
  return get(BL_GEOMETRY)
}
