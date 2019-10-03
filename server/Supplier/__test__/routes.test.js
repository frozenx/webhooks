jest.mock('express');
jest.mock('../controller');

const express = require('express');
const { handlers } = require('../routes');
const SupplierController = require('../controller');

describe('Given the supplier router is initialized', () => {
  let req;
  let res;
  const mockAccessToken = 'random token';
  beforeEach(() => {
    req = {
      cookies: {
        'OAuth.AccessToken.EP': mockAccessToken,
      },
    };
    res = {};
    SupplierController.mockClear();
  });
  describe('readSupplier', () => {
    test('should expose and endpoint for /api/supplier', () => {
      expect(express.mockGet).toHaveBeenCalledWith(
        '/supplier',
        handlers.readSupplier,
      );
    });
    test('should call expose a readSupplier method', () => {
      handlers.readSupplier(req, res);
      const mockSupplierReadInstance = SupplierController.mock.instances[0];
      expect(mockSupplierReadInstance.readSupplier).toHaveBeenCalled();
    });
  });
});
