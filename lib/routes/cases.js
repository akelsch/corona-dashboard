import { adjustCase } from '../services/cases'

import express from 'express'
const router = express.Router()

router.get('/', async (req, res, next) => {
  const queryParams = req.query
  const cases = await adjustCase(queryParams)
  res.json(cases)
})

export default router
