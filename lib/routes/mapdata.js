import { adjustMapdata } from '../services/mapdata'
import douglasPeuker from '../utils/douglasPeucker'
import { getMapdata } from '../services/mapdata'
import { assertNoQueryParamMissing } from '../utils/errors'

import express from 'express'
const router = express.Router()

router.get('/', async (req, res, next) => {
  const queryParams = req.query
  // const mapdata = await adjustMapdata(queryParams)
  // console.log(mapdata)

  const mapdata = douglasPeuker()
  res.json(mapdata)
  try {
    const { stateId, resolution, zoom } = req.query
    assertNoQueryParamMissing({ stateId, resolution, zoom })
    res.json(await getMapdata(stateId, resolution, zoom))
  } catch (err) {
    next(err)
  }
})

export default router
