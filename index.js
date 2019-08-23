const compression = require('compression')
const express = require('express')
const config = require('config')
const helmet = require('helmet')
const cors = require('cors')

const morgan = require('morgan')
const routes = require('./src/router')
const app = express()

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(morgan('tiny'))
app.use(routes)

app.listen(config.port, () => console.log(`
  OrgCommNode project is running on http://${config.host}:${config.port}`
))

module.exports = app
