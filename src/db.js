const mongoose = require('mongoose')
const config = require('config')

let options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
}

mongoose.connect(config.mongodb, options)
mongoose.Promise = global.Promise

module.exports = mongoose
