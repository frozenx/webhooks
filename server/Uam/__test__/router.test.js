jest.mock('express');
jest.mock('../controller');

const express = require('express');
const { handlers } = require('../router');
const UAMController = require('../controller');

describe('Given the UAM router is initialized', () => {
  let mockReq;
  let mockRes;
  const mockAccessToken = 'random token';
  beforeEach(() => {
    mockReq = {
      cookies: {
        'OAuth.AccessToken.EP': mockAccessToken,
      },
    };
    mockRes = {};
    UAMController.mockClear();
  });
  describe('getUamUrls', () => {
    test('should expose and endpoint for /api/uam', () => {
      expect(express.mockGet).toHaveBeenCalledWith(
        '/uam',
        handlers.uam,
      );
    });
    test('should call expose a getUamUrls method', () => {
      handlers.uam(mockReq, mockRes);
      const mockSupplierReadInstance = UAMController.mock.instances[0];
      expect(mockSupplierReadInstance.uam).toHaveBeenCalled();
    });
  });
});
