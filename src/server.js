import express from 'express'

import mapdataRouter from './routes/mapdata.js'
import casesRouter from './routes/cases.js'
import optionsRouter from './routes/options.js'
import testRouter from './routes/test.js'

import { initDatabase } from './db.js'
initDatabase()

const app = express()
const HOST = '0.0.0.0'
const PORT = 3000

app.use(express.static('public'))
app.use('/mapdata', mapdataRouter)
app.use('/cases', casesRouter)
app.use('/options', optionsRouter)
app.use('/test', testRouter)

app.listen(PORT, HOST, () => {
  console.log(`Express app listening on port ${PORT}`)
})
