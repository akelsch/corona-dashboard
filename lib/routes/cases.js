import { findAllCases, findCasesByStateId } from '../services/cases'

import express from 'express'
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    res.json(await findAllCases())
  } catch (err) {
    next(err)
  }
})

router.get('/:stateId', async (req, res, next) => {
  try {
    const { stateId } = req.params
    res.json(await findCasesByStateId(stateId))
  } catch (err) {
    next(err)
  }
})

export default router
