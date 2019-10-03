class SplunkLog {
  constructor(payload) {
    this.logMessage = SplunkLog.writeLog(payload);
  }

  static writeLog(payload) {
    return 'SplunkLog';
  }
}

module.exports = SplunkLog;
