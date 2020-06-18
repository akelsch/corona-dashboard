import { douglasPeucker, webMercator } from '../algorithms.js'
import { Mapdata } from '../model/Mapdata.js'

import express from 'express'
import typeorm from 'typeorm'

const router = express.Router()
const { getConnection } = typeorm

let mapdata = {}
let firstRun = true

router.get('/', async (req, res, next) => {
  const queryParams = req.query
  const mapdata = await adjustMapdata(queryParams)
  res.json(mapdata)
})

async function adjustMapdata (queryParams) {
  const stateId = parseInt(queryParams.BL_ID)
  const { resolution, zoom } = queryParams

  const repository = getConnection().getRepository(Mapdata)
  if (firstRun) {
    mapdata = await repository.find()
    firstRun = false
  }

  return mapdata.filter(data => data.federalStateId === stateId || stateId === '0')
    .map(data => data.coordinates)
    .map(coordinates => coordinates.map(({ x, y }) => webMercator(x, y, zoom)))
    .map(coordinates => applyResolution(coordinates, resolution))
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

export default router
