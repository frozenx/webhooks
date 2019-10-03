const winston = jest.genMockFromModule('winston');


const mockLoggerObject = {
  error: jest.fn(),
  info: jest.fn(),
};

const mockLabel = jest.fn();
const mocktimestamp = jest.fn();
const mockPrintf = jest.fn();
const mockCombine = jest.fn();
const mockDailyTransport = jest.fn();
const mockSimple = jest.fn();
const mockConsole = jest.fn();
const mockTransports = {
  DailyRotateFile: mockDailyTransport,
  Console: mockConsole
};
const mockCreateLogger = jest.fn().mockReturnValue(mockLoggerObject);
const mockFormat = {
  label: mockLabel,
  timestamp: mocktimestamp,
  printf: mockPrintf,
  combine: mockCombine,
  simple: mockSimple,
};


winston.createLogger = mockCreateLogger;
winston.transports = mockTransports;
winston.mockLoggerObject = mockLoggerObject;
winston.format = mockFormat;
winston.mockLabel = mockLabel;
winston.mocktimestamp = mocktimestamp;
winston.mockPrintf = mockPrintf;
winston.mockDailyTransport = mockDailyTransport;
winston.mockCombine = mockCombine;
winston.mockSimple = mockSimple;


module.exports = winston;
