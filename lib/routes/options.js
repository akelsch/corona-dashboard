import { findOption, saveOption } from '../services/options'
import { assertNoQueryParamMissing } from '../utils/errors'

import express from 'express'
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const { guid } = req.query
    assertNoQueryParamMissing({ guid })
    res.json(await findOption(guid))
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const instance = await saveOption(req.body)
    res.status(201)
    res.json(instance)
  } catch (err) {
    next(err)
  }
})

export default router
