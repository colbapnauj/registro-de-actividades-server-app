import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import dotenv from 'dotenv'

import indexRouter from './routes/index.js'
import urlsRouter from './routes/url.js'
import cUrl from './routes/c_url.js'
import activity from './routes/activity.js'
import activityReport from './routes/activity_report.js'
dotenv.config()

const app = express()

connectDB()

app.use(cors(
  {
    origin: '*'
  }
))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', indexRouter)
app.use('/api/url', urlsRouter)
app.use('/api/customurl', urlsRouter)
app.use('/api/c-url', cUrl)
app.use('/api/activity', activity)
app.use('/api/activity_report', activityReport)

// Server Setup
const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
