// @ts-check
import express from 'express'
import typeorm from 'typeorm'

import { mapData } from './map-data.js'
import { douglasPeucker, webMercator } from './algorithms.js'
import { initDatabase } from './db.js'
import { GeoData } from './model/GeoData.js'

const { getConnection } = typeorm

const app = express()
const HOST = '0.0.0.0'
const PORT = 3000

initDatabase()

app.use(express.static('public'))

app.get('/mapdata', (req, res) => {
  const queryParams = req.query
  res.json(adjustMapdata(queryParams))
})

app.get('/hi', async (req, res) => {
  const geodataRepository = getConnection().getRepository(GeoData)

  const geodata = new GeoData()
  geodata.countyId = 42
  geodata.objectId = 24
  geodata.coordinates = 77
  geodataRepository.save(geodata)

  const allGeodata = await geodataRepository.find()
  res.json(allGeodata)
})

app.listen(PORT, HOST, () => {
  console.log(`Express app listening on port ${PORT}`)
})

function adjustMapdata (queryParams) {
  const { BL_ID: stateId, resolution, zoom } = queryParams

  return mapData.features.filter(elem => elem.properties.BL_ID === stateId || stateId === '0')
    .flatMap(elem => elem.geometry.coordinates)
    .flat()
    .map(ring => ring.map(([long, lat]) => webMercator(long, lat, zoom)))
    .map(ring => applyResolution(ring, resolution))
}

function applyResolution (ring, resolution) {
  switch (resolution) {
    case 'high':
    default:
      return ring
    case 'medium':
      return douglasPeucker(ring, 1 / 3)
    case 'low':
      return douglasPeucker(ring, 3 / 4)
  }
}
