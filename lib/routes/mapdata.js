import { findAllMapdata } from '../services/mapdata'
import { assertNoQueryParamMissing } from '../utils/errors'

import express from 'express'
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    res.json(await findAllMapdata())
  } catch (err) {
    next(err)
  }
})

router.get('/:stateId', async (req, res, next) => {
  try {
    const { resolution, zoom } = req.query
    assertNoQueryParamMissing({ resolution, zoom })
    res.json({})
  } catch (err) {
    next(err)
  }
})

export default router
