import express from 'express'
const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('hello world from options')
})

export default router
