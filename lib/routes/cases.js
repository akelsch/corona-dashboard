import { findAllCases } from '../services/cases'
import { assertNoQueryParamMissing } from '../utils/errors'

import express from 'express'
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
