const winston = require('winston')
const { createLogger, format, transports } = winston

const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    })
  ]
})

module.exports = logger
