import { findAllCases } from '../services/cases'

import express from 'express'
import { assertNoQueryParamMissing } from '../utils/errors'
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const { stateId } = req.query
    assertNoQueryParamMissing({ stateId })
    res.json(await findAllCases(stateId))
  } catch (err) {
    next(err)
  }
})

export default router
