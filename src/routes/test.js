import express from 'express'
import typeorm from 'typeorm'

import { GeoData } from '../model/GeoData.js'

const router = express.Router()
const { getConnection } = typeorm

router.get('/', async (req, res) => {
  const geodataRepository = getConnection().getRepository(GeoData)

  const geodata = new GeoData()
  geodata.countyId = 42
  geodata.objectId = 24
  geodata.coordinates = 77
  geodataRepository.save(geodata)

  const allGeodata = await geodataRepository.find()
  res.json(allGeodata)
})

export default router
