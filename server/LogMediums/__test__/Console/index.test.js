const Console = require('../../Console');
const Logger = require('../../../lib/logger')(module);


describe('Console', () => {
  test('should initiate the constructor', () => {
    const ConsoleLog = new Console();
    expect(typeof ConsoleLog.logMessage).toBe('object');
    expect(typeof ConsoleLog.logMessage.write).toBe('function');
  });
  test('should call the writeLog method', () => {
    const writeLogResponse = Console.writeLog();
    expect(typeof writeLogResponse).toBe('object');
  });
  test('should call the logger', () => {
    Console.writeLog().write();
    expect(Logger.info).toHaveBeenCalled();
  });
});
