import { adjustMapdata } from '../services/mapdata'

import express from 'express'
const router = express.Router()

router.get('/', async (req, res, next) => {
  const queryParams = req.query
  const mapdata = await adjustMapdata(queryParams)
  res.json(mapdata)
})

export default router
