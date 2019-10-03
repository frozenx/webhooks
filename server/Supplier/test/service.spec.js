jest.mock('../../clients/httpClient');
jest.mock('winston');
const winston = require('winston');
const HeaderService = require('../service');
const HttpClient = require('../../clients/httpClient'); // eslint-disable-line no-unused-vars

describe('Given the HeaderService', () => {
  let headerService;
  const mockAccessToken = 'abcd1234';
  let body;
  beforeEach(() => {
    body = {
      'Supplier Name' : 'Uniliver',
      'companyHouseName' : 'Uni',      
    };

    headerService = new HeaderService(mockAccessToken);
  });
  test('should initialize the instance variables', () => {
    expect(headerService.accessToken).toBe(mockAccessToken);
  });

  test('should expose to post method of httpClient', () => {
    headerService.httpClient.post.mockResolvedValue({ data: 'Some data' });
    headerService.createSupplier(body);
    expect(headerService.httpClient.post).toHaveBeenCalled();
  });
  describe('Given the service throws an error', () => {
    const mockMessage = 'Error message';
    const mockError = {
      message: mockMessage,
    };

    beforeEach(() => {
      // headerService = new HeaderService(mockAccessToken);
      headerService.httpClient.post.mockRejectedValue(mockError);

    });
    test('should log the error if the service fails', () => {
      try {
        headerService.createSupplier(body);
      }
      catch (err) {
        expect(winston.mockLoggerObject.error).toHaveBeenCalledWith(mockError);
        expect(err).toEqual(mockError);
      }

    });
  });
});
