jest.mock('winston');
jest.mock('express-http-context');
const winston = require('winston');
const helper = require('../../helpers/');

describe('Given the helper methods for logger should call a d take different scenarios', () => {
  let mockMessageObj; let mockMessageString; let mockMessageStringEmpty; let
    mockMessageNumber;
  beforeAll(() => {
    mockMessageObj = {
      statusCode: 200,
      logMsg: 'Testing log',
      maskedData: {
        userId: 'tne:1223:2342354',
      },
    };
    mockMessageString = `::1 - - [31/Jan/2019:11:26:54 +0000] 
            "GET /graphql HTTP/1.1" 404 146 "-" "Mozilla/5.0 (X11; Linux x86_64)
             AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36"`;
    mockMessageStringEmpty = '';
    mockMessageNumber = 12345;
  });
  test('returnLogMessage and getFileName methods should exist', () => {
    expect(helper.returnLogMessage).toBeDefined();
    expect(helper.getFileName).toBeDefined();
  });
  // returnLogMessage Method Test Cases
  test('should return a string when passes object', () => {
    expect(helper.returnLogMessage(mockMessageObj)).toEqual('200 || Testing log || userId : tne:1***:***2354');
  });
  test('should return a string when passes string', () => {
    expect(helper.returnLogMessage(mockMessageString)).toEqual('404 || GET /graphql HTTP/1.1');
  });
  test('should return default string when passes string as undefined', () => {
    expect(helper.returnLogMessage(mockMessageStringEmpty)).toEqual('Status Code Not Defined || Log Message Not Defined || Mask Data Not Defined');
  });
  test('should return the actual default message if the type is nor object neither string', () => {
    expect(helper.returnLogMessage(mockMessageNumber)).toEqual(12345);
  });
  test('should return default message for status code', () => {
    const tempMockMessageObjStatusCode = { ...mockMessageObj };
    tempMockMessageObjStatusCode.statusCode = '';
    expect(helper.returnLogMessage(tempMockMessageObjStatusCode)).toEqual('Status code not defined || Testing log || userId : tne:1***:***2354');
  });
  test('should return default message for log msg', () => {
    const tempMockMessageObjLogMsg = { ...mockMessageObj };
    tempMockMessageObjLogMsg.logMsg = '';
    expect(helper.returnLogMessage(tempMockMessageObjLogMsg)).toEqual('200 || Log message not defined || userId : tne:1***:***2354');
  });
  test('should return default message for masked data for undefined', () => {
    const tempMockMessageObjMaskData = { ...mockMessageObj };
    tempMockMessageObjMaskData.maskedData = '';
    expect(helper.returnLogMessage(tempMockMessageObjMaskData)).toEqual('200 || Testing log || Masked data not defined');
  });
  test('should return default message for masked data for empty object', () => {
    const tempMockMessageObjMaskData = { ...mockMessageObj };
    tempMockMessageObjMaskData.maskedData = {};
    expect(helper.returnLogMessage(tempMockMessageObjMaskData)).toEqual('200 || Testing log || Masked data not defined');
  });
  // getFileName Method Test Cases
  test('should return default label when module is not passed', () => {
    expect(helper.getFileName({})).toEqual('Module not passed while requiring the logger');
  });
});

describe('custom format', () => {
  const mockMessageObj = {
    message: {
      statusCode: 200,
      logMsg: 'Testing log',
    },
    maskedData: {
      userId: 'tne:1223:2342354',
    },
    level: 'info',
  };
  test('should call the printF function inside customFormat function', () => {
    helper.customFormat();
    const mockPrintfCallBack = winston.mockPrintf.mock.calls[0][0];
    expect(mockPrintfCallBack).toEqual(expect.any(Function));
    expect(mockPrintfCallBack(mockMessageObj)).toEqual('Invalid Date || INFO || undefined || undefined || 200 || Testing log || Masked data not defined ');
  });
});
