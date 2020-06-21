import { adjustMapdata } from '../services/mapdata'

import express from 'express'
const router = express.Router()

router.get('/', async (req, res, next) => {
  const { stateId, resolution, zoom } = req.query
  const mapdata = await adjustMapdata(stateId, resolution, zoom)
  res.json(mapdata)
})

export default router
