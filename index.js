require('./src/config/config')
const { logger } = require('./logger')
const express = require('express')
const bodyParser = require('body-parser');
const routes = require('./src/routes/routes.js')
const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

routes(app)
app.get('/', (req, res) => {
    res.send(`App is running on ${PORT}`)
})
app.listen(PORT)

logger.debug(`app running in ENV: ${process.env.NODE_ENV}`)
