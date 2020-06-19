import Sequelize from 'sequelize'
import axios from 'axios'
import { Mapdata } from './Mapdata.js'

// Quelle: https://npgeo-corona-npgeo-de.hub.arcgis.com/datasets/917fc37a709542548cc3be077a786c17_0
const url = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=OBJECTID,BL_ID&outSR=4326&f=geojson'

const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
})

sequelize
  .sync()
  .then(async () => {
    console.log('Database connection has been established successfully.')
    if (process.argv[2] === 'init') {
      await initMapdata()
    }
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

async function initMapdata () {
  try {
    console.log('mapdata import started')

    const response = await axios.get(url)
    const data = response.data

    for (const element of data.features) {
      await Mapdata.create({
        objectId: element.properties.OBJECTID,
        federalStateId: element.properties.BL_ID,
        geometry: element.geometry
      })
    }

    console.log('mapdata import done')
  } catch (error) {
    console.log(error.message)
  }
}

export { sequelize }
