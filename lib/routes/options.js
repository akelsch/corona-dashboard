
import { findOption, createOption } from '../services/options'
import { assertNoQueryParamMissing } from '../utils/errors'

import express from 'express'
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const { guid } = req.query
    assertNoQueryParamMissing({ guid })
    res.send(await findOption(guid))
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  res.status(201).send(await createOption(req.body))
})

export default router
