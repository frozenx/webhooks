jest.mock('winston');
const helper = require('./index');
const Constants = require('../constants');
const mockData = require('./mockData');

let mockcharToBeShownFromStarting;
let mockcharToBeShownFromEnding;
let mockObjToBeMasked;
const mockResponseData = { response: { status: 200 } };
beforeAll(() => {
  mockcharToBeShownFromStarting = 4;
  mockcharToBeShownFromEnding = 4;
  mockObjToBeMasked = {
    userEmailId: 'test@test.com',
  };
});

describe('Helper test cases', () => {
  test('should invoke the maskData function', () => {
    expect(helper.maskData()).toBeDefined();
  });
  test('should return the string by masking', () => {
    expect(helper.maskData(mockcharToBeShownFromStarting, mockcharToBeShownFromEnding, mockObjToBeMasked)).toBe('userEmailId : test@***t.com');
  });
  test('should invoke the handleError function', () => {
    expect(helper.handleError).toBeDefined();
  });
  test('handlError should catch the unauthorized case', () => {
    mockResponseData.response.status = 401;
    const mockError = {
      message: Constants.INVALID_USER,
      status: 401,
    };
    try {
      helper.handleError(mockResponseData);
    } catch (err) {
      expect(err).toEqual(mockError);
    }
  });
  test('handlError should catch the not found case', () => {
    mockResponseData.response.status = 404;
    const mockError = {
      message: Constants.DATA_NOT_AVAILABLE,
      status: 404,
    };
    try {
      helper.handleError(mockResponseData);
    } catch (err) {
      expect(err).toEqual(mockError);
    }
  });
  test('handlError should catch the internal server case', () => {
    mockResponseData.response.status = 500;
    const mockError = {
      message: Constants.SERVICE_ERROR,
      status: 500,
    };
    try {
      helper.handleError(mockResponseData);
    } catch (err) {
      expect(err).toEqual(mockError);
    }
  });
  test('handlError should catch the default case', () => {
    mockResponseData.response.status = 100;
    const mockError = {
      message: Constants.UNEXPECTED_ERROR,
    };
    try {
      helper.handleError(mockResponseData);
    } catch (err) {
      expect(err).toEqual(mockError);
    }
  });
});

describe('helper functions', () => {
  describe('getAction', () => {
    const { getAction: { input, output } } = mockData;
    test('should return an object with passed property as true', () => {
      const response = helper.getAction(input);
      expect(response).toEqual(output);
    });
  });
  describe('arrayToObject', () => {
    const { arrayToObject: { input, output } } = mockData;
    test('should return an object with the element present in array as true', () => {
      const response = helper.arrayToObject(input);
      expect(response).toEqual(output);
    });
  });
  describe('extractAccessForAttributeGrps', () => {
    const {
      extractAccessForAttributeGrps: {
        input: { access, entityType, attrGrpName },
        output,
      },
    } = mockData;
    test('should return an object with access present in the attribute group', () => {
      const response = helper.extractAccessForAttributeGrps(access, entityType, attrGrpName);
      expect(response).toEqual(output);
    });
  });
  describe('mergeMetaDataBasedOnUamAccess', () => {
    const {
      mergeMetaDataBasedOnUamAccess: {
        input: {
          uam,
          metaData,
          entityType,
        },
        output,
        inputWithReadAccessOnlyAttribute: {
          uam: uamAccess,
          metaData: headerMetaData,
          entityType: headerEntityType,
        },
        outputWithReadAccessOnlyAttribute,
      },
    } = mockData;
    test('should return an object with attributeRulesToMapping with uam Access', () => {
      const response = helper.mergeMetaDataBasedOnUamAccess(uam, metaData, entityType);
      expect(response).toEqual(output);
    });
    test('should return an object with attributeRulesToMapping with uam Access and required to false', () => {
      const response = helper.mergeMetaDataBasedOnUamAccess(uamAccess, headerMetaData, headerEntityType);
      expect(response).toEqual(outputWithReadAccessOnlyAttribute);
    });
  });
});
