// @ts-check
import express from 'express'
// import { mapData } from './map-data.js'
import { douglasPeucker, webMercator } from './algorithms.js'

const app = express()
const HOST = '0.0.0.0'
const PORT = 3000

app.use(express.static('public'))

app.get('/mapdata', (req, res) => {
  const queryParams = req.query
  const mapdata = getMapdata(queryParams)
  res.json(mapdata)
})

app.listen(PORT, HOST, () => {
  console.log(`Express app listening on port ${PORT}`)
})

function getMapdata (queryParams) {
  const { BL_ID: stateId, resolution, zoom } = queryParams

  // const geodata = mapData.features.filter(elem => elem.attributes.BL_ID === stateId || stateId === '0')
  //   .flatMap(elem => elem.geometry.rings)
  //   .map(ring => ring.map(([long, lat]) => webMercator(long, lat, zoom)))
  //   .map(ring => applyResolution(ring, resolution))
  const geodata = {}

  return geodata
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
