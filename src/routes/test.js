import express from 'express'
import typeorm from 'typeorm'

import { Mapdata } from '../model/Mapdata.js'

const router = express.Router()
const { getConnection } = typeorm

router.get('/', async (req, res) => {
  const mapdataRepository = getConnection().getRepository(Mapdata)

  const mapdata = new Mapdata()
  mapdata.countyId = 42
  mapdata.objectId = 24
  mapdata.coordinates = 77
  mapdataRepository.save(mapdata)

  const allMapdata = await mapdataRepository.find()
  res.json(allMapdata)
})

export default router
