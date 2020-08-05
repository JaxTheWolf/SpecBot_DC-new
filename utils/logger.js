require(`winston-daily-rotate-file`)
const date = require(`dateformat`)(new Date(), `dd-mm-yyyy H:MM:ss`)
const { createLogger, format, transports } = require(`winston`)
const logFormat = format.printf((info) => {
  return `${date} - ${info.level}: ${JSON.stringify(info.message, null, 4)}`
})

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: `DD-MM-YYYY HH:mm:ss`
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  level: `info`,
  transports: [
    new transports.DailyRotateFile({
      datePattern: `YYYY-MM-DD`,
      dirname: `./logs`,
      filename: `SpecBot_%DATE%.log`,
      frequency: `24h`,
      maxFiles: `14d`
    }),
    new transports.Console({
      format: format.combine(format.colorize(), logFormat),
      timestamp: false
    })
  ]
})

module.exports = logger
