import { findAllMapdata, findMapdataByStateId } from '../services/mapdata'
import { assertNoQueryParamMissing } from '../utils/errors'

import express from 'express'
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const { resolution, zoom } = req.query
    assertNoQueryParamMissing({ resolution, zoom })
    res.json(await findAllMapdata(resolution, zoom))
  } catch (err) {
    next(err)
  }
})

router.get('/:stateId', async (req, res, next) => {
  try {
    const { stateId } = req.params
    const { resolution, zoom } = req.query
    assertNoQueryParamMissing({ resolution, zoom })
    res.json(await findMapdataByStateId(stateId, resolution, zoom))
  } catch (err) {
    next(err)
  }
})

export default router
