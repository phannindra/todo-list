require('./src/config/config')
const { logger } = require('./logger')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send(`App is running on ${PORT}`)
})
app.listen(PORT)

logger.debug(`app running in ENV: ${process.env.NODE_ENV}`)
