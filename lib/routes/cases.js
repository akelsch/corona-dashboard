import { findAllCases } from '../services/cases'

import express from 'express'
const router = express.Router()

router.get('/', async (req, res, next) => {
  const { stateId } = req.query
  const cases = await findAllCases(stateId)
  res.json(cases)
})

export default router
