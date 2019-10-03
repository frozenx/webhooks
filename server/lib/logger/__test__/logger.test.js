jest.mock('winston');

const logger = require('..');
const winston = require('winston');

describe('Given the logger method is called', () => {
  let loggerObject;
  const mockModuleObject = { filename: 'server/index.js' };
  beforeEach(() => {
    loggerObject = logger(mockModuleObject);
  });
  test('it should return a object returned by createLogger', () => {
    expect(loggerObject).toEqual(winston.mockLoggerObject);
  });
  test('it should call combine, format, printf and timestamp method of winston', () => {
    expect(winston.mockPrintf).toHaveBeenCalled();
    expect(winston.mockLabel).toHaveBeenCalled();
    expect(winston.mockCombine).toHaveBeenCalled();
  });
  // xtest('expect Dailytransports to be called', () => {
  //  no error if we use winston.transports.DailyRoatateFile
  //   expect(winston.mockDailyTransport).toHaveBeenCalled()
  // });
});
