import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'

import mapdataRouter from './routes/mapdata'
import casesRouter from './routes/cases'
import optionsRouter from './routes/options'
import errorHandler from './utils/errors'

const HOST = '0.0.0.0'
const PORT = 3000

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(compression())
app.use(cors())
app.use(express.static('public'))

app.use('/mapdata', mapdataRouter)
app.use('/cases', casesRouter)
app.use('/options', optionsRouter)
app.use(errorHandler)

app.listen(PORT, HOST, () => {
  console.log(`Express app listening on port ${PORT}`)
})
