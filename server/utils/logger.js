const winston = require('winston');

const loggers = {
  development: () => winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    defaultMeta: { service: 'dev-user-service' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.Console({format: winston.format.simple()}),
      //new winston.transports.File({ filename: 'error.log', level: 'error' }),
      //new winston.transports.File({ filename: 'combined.log' })
    ]
  }),
  test: () => winston.createLogger({
    level: 'fatal',
    format: winston.format.json(),
    defaultMeta: { service: 'test-user-service' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.Console({format: winston.format.simple()}),
      //new winston.transports.File({ filename: 'error.log', level: 'error' }),
      //new winston.transports.File({ filename: 'combined.log' })
    ]
  }),
  production: () => winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'prod-user-service' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.Console({format: winston.format.simple()}),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  })
}


module.exports = loggers;