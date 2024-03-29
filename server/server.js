const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./src/config')
const routes = require('./src/routes')
const { errorHandler } = require('./src/middlewares')


const app = express()

app.use(cors())
app.use(express.json({ limit: '8000kb' }))

app.use('/v1', routes)

app.use(errorHandler)


mongoose.connect(config.db)
  .then(() => {
    app.listen(config.port, () => {
      console.log(`connected to DB and listening on port ${config.port}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })