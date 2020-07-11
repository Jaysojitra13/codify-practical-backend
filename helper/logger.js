const winston = require('winston');
const { format } = require('winston');

const { prettyPrint, colorize } = format;

const logger = winston.createLogger({
  format: winston.format.combine(
    prettyPrint(),
    colorize({ all: true }),
  ),
  transports: [
    new winston.transports.Console({
      level: 'debug',
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
