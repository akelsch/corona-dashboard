import { findOption, saveOption } from '../services/options'

import express from 'express'
const router = express.Router()

router.get('/:guid', async (req, res, next) => {
  try {
    const { guid } = req.params
    const option = await findOption(guid)
    if (!option) {
      res.sendStatus(404)
    } else {
      res.json(option)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const [instance] = await saveOption(req.body)
    // Kann auch für neue GUIDs der Fall sein,
    // spart aber eine zusätzliche Abfrage der DB
    if (!req.body.guid) {
      res.status(201)
    }
    res.json(instance)
  } catch (err) {
    next(err)
  }
})

export default router
