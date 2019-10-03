const appRoot = require('app-root-path');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const {
  combine, label,
} = format;
const config = require('../../config').get(process.env.APP_ENV);
const loggerHelper = require('./helpers');


// Custom settings for each transport
const options = {
  // dailyRotateFile: {
  //   // filename: `${appRoot}/logs/TPS-UI-%DATE%.log`,
  //   datePattern: 'YYYY-MM-DD',
  //   prepend: true,
  //   level: config.logLevel,
  //   timestamp: new Date(),
  //   localTime: true,
  // },
  format: format.simple()
};

// Instantiate a Winston Logger with the settings
const logger = moduleObj => createLogger({
  format: combine(
    label({ label: loggerHelper.getFileName(moduleObj) }),
    format.timestamp(),
    // loggerHelper.customFormat(),
  ),
  transports: [
    new transports.Console(options),
  ],
  exitOnError: false, // do not exit on handled exceptions
});


module.exports = logger;
