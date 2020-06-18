import typeorm from 'typeorm'
import axios from 'axios'

import mapdataSchema from './entity/MapdataSchema.js'
import caseSchema from './entity/CaseSchema.js'
import optionSchema from './entity/OptionSchema.js'

import { Mapdata } from './model/Mapdata.js'

// Quelle: https://npgeo-corona-npgeo-de.hub.arcgis.com/datasets/917fc37a709542548cc3be077a786c17_0
const url = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=OBJECTID,death_rate,cases,deaths,cases_per_100k,cases_per_population,BL,BL_ID,county,last_update,cases7_per_100k,recovered&outSR=4326&f=json'

export default typeorm.createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [
    mapdataSchema,
    caseSchema,
    optionSchema
  ]
}).then(async (connection) => {
  try {
    console.log('map-data import started')

    const response = await axios.get(url)
    const data = response.data

    const mapdataRepository = connection.getRepository(Mapdata)
    data.features.forEach(element => {
      const mapdata = new Mapdata()
      mapdata.objectId = element.attributes.OBJECTID
      mapdata.federalStateId = element.attributes.BL_ID

      // '{"(1,2)","(3,4)"}'
      const rings = element.geometry.rings.flat()
        .map(([x, y]) => `"(${x},${y})"`)
        .join()

      mapdata.coordinates = `{${rings}}`

      mapdataRepository.save(mapdata)
    })

    console.log('map-data import done')
  } catch (error) {
    console.log(error.message)
  }
}).catch((error) => {
  console.log('Error: ', error)
})
