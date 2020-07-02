import { findOption, saveOption } from '../services/options'

import express from 'express'
const router = express.Router()

router.get('/:guid', async (req, res, next) => {
  try {
    const { guid } = req.params
    res.json(await findOption(guid))
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const [instance] = await saveOption(req.body)
    if (!req.body.guid) {
      res.status(201)
    }
    res.json(instance)
  } catch (err) {
    next(err)
  }
})

export default router
