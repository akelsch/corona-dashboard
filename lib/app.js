import './database'
import './scheduler'

import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import { casesRouter, mapdataRouter, optionsRouter } from './routes'
import errorHandler from './utils/errors'

const HOST = '0.0.0.0'
const PORT = 3000

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use(express.static('public'))

app.use('/cases', casesRouter)
app.use('/mapdata', mapdataRouter)
app.use('/options', optionsRouter)
app.use(errorHandler)

app.listen(PORT, HOST, () => {
  console.log(`Express app listening on port ${PORT}`)
})
