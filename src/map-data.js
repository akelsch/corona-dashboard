import axios from 'axios'

// Quelle: https://npgeo-corona-npgeo-de.hub.arcgis.com/datasets/917fc37a709542548cc3be077a786c17_0
const url = 'https://opendata.arcgis.com/datasets/917fc37a709542548cc3be077a786c17_0.geojson'

export let mapData

async function importMapData () {
  try {
    const response = await axios.get(url)
    mapData = response.data
    console.log('map-data import done')
  } catch (error) {
    console.log(error.message)
  }
}

importMapData()
