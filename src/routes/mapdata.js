import { douglasPeucker, webMercator } from '../algorithms.js'
import { Mapdata } from '../models/Mapdata.js'

import express from 'express'
const router = express.Router()

let mapdata = {}

router.get('/', async (req, res, next) => {
  const queryParams = req.query
  const mapdata = await adjustMapdata(queryParams)
  res.json(mapdata)
})

async function findAllMapdata () {
  mapdata = await Mapdata.findAll({ raw: true })
}

async function adjustMapdata (queryParams) {
  const stateId = parseInt(queryParams.BL_ID)
  const { resolution, zoom } = queryParams

  return mapdata.filter(data => data.federalStateId === stateId || stateId === 0)
    .map(data => data.geometry)
    .flatMap(geo => geo.type === 'MultiPolygon' ? geo.coordinates.flat() : geo.coordinates)
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

findAllMapdata()

export default router
