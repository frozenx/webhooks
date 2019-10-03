const logger = require('../../lib/logger')(module);
const config = require('../../config').get(process.env.APP_ENV);

class Console {
  constructor() {
    this.logMessage = Console.writeLog();
  }

  static writeLog() {
    return {
      write: message => logger[config.logLevel](message),
    };
  }
}

module.exports = Console;
