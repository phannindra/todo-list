const winston = require('winston')

const levels = {
  error: 0,
  warn: 1,
  debug: 2,
  info: 3,
}

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms Z' }),
  winston.format.printf((info) =>
    `${info.timestamp} | ${info.level}: ${info.message}`.toString()
  )
)

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  new winston.transports.File({ filename: 'logs/all.log' }),
]

const logLevel = () => {
  return process.env === 'development' ? levels.info : levels.error
}

const logger = winston.createLogger({
  levels: levels,
  level: logLevel(),
  format,
  transports,
})

exports.logger = logger
