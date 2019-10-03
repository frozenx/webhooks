const AppDynamics = require('./AppDynamics');
const Splunk = require('./Splunk');
const Console = require('./Console');

class LogMedium {
  constructor(medium) {
    this.writeMedium = LogMedium.getMedium(medium);
  }

  static getMedium(medium) {
    switch (medium) {
      case 'AppDynamics':
        return AppDynamics;
      case 'Splunk':
        return Splunk;
      default:
        return Console;
    }
  }
}

module.exports = LogMedium;
