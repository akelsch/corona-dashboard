import { adjustMapdata } from '../services/mapdata'
import douglasPeuker from '../utils/douglasPeucker'

import express from 'express'
const router = express.Router()

router.get('/', async (req, res, next) => {
  const queryParams = req.query
  // const mapdata = await adjustMapdata(queryParams)
  // console.log(mapdata)

  const mapdata = douglasPeuker()
  res.json(mapdata)
})

export default router
