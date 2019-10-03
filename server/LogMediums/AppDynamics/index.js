class AppDynamicsLog {
  constructor(payload) {
    this.logMessage = AppDynamicsLog.writeLog(payload);
  }

  static writeLog(payload) {
    return 'AppDyanmicsLog';
  }
}

module.exports = AppDynamicsLog;
