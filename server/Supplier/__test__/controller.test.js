jest.mock('winston');
jest.mock('../service');
jest.mock('../models/Suppliers');
const winston = require('winston');
const SupplierController = require('../controller');
const SupplierService = require('../service');
const SuppliersModel = require('../models/Suppliers');
const mockData = require('./mockData');


describe('Supplier Controller should be invoked', () => {
  const mockAccessToken = 'random token';
  let mockSupplierControllerInstance;
  const mockParams = {
    supplierName: 'some value',
  };
  const mockReq = {
    cookies: {
      'OAuth.AccessToken.EP': mockAccessToken,
    },
    query: mockParams,
  };
  const mockRes = {
    send: jest.fn(),
  };

  beforeEach(() => {
    mockSupplierControllerInstance = new SupplierController(mockReq, mockRes);
  });


  test('should initialize supplier instance variables', () => {
    expect(SupplierService).toHaveBeenCalledWith(mockAccessToken);
    const mockServiceInstance = SupplierService.mock.instances[0];
    expect(mockSupplierControllerInstance.request).toBe(mockReq);
    expect(mockSupplierControllerInstance.response).toBe(mockRes);
    expect(mockSupplierControllerInstance.accessToken).toBe(mockAccessToken);
    expect(mockSupplierControllerInstance.params).toBe(mockParams);
    expect(mockSupplierControllerInstance.supplierService).toBe(mockServiceInstance);
  });
  // readSupplier
  describe('should expose a method called readSupplier', () => {
    beforeEach(async () => {
      await mockSupplierControllerInstance.readSupplier();
    });
    test('should call the readSupplier method of supplier service', () => {
      expect(mockSupplierControllerInstance.supplierService.readSupplier).toHaveBeenCalled();
    });

    describe('readSupplier method should give a response', () => {
      let mockSupplierResponse;
      beforeEach(() => {
        mockSupplierResponse = mockData.supplierMockData;
        mockSupplierControllerInstance.supplierService
          .readSupplier.mockResolvedValue(mockSupplierResponse);
        mockSupplierControllerInstance.readSupplier();
      });
      test('should call the supplier service', () => {
        expect(mockSupplierControllerInstance.supplierService.readSupplier).toHaveBeenCalled();
      });
      describe('given the service returns a response', () => {
        test('should initialize the supplier model', () => {
          expect(SuppliersModel).toHaveBeenCalled();
          expect(SuppliersModel).toHaveBeenCalledWith(mockSupplierResponse);
        });
        test('then the response should be sent to client', () => {
          const mockSupplierModelInstance = SuppliersModel.mock.instances[0];
          expect(mockSupplierControllerInstance.response.send)
            .toHaveBeenCalledWith(JSON.stringify(mockSupplierModelInstance));
        });
      });
    });

    describe('should throw an error when service is called', () => {
      const mockErrorMessage = 'random message';
      const status = 500;
      const mockError = {
        response: {
          statusText: mockErrorMessage,
          status,
        },
      };
      const mockLoggerMessage = {
        message: {
          logMsg: mockErrorMessage,
          statusCode: status,
        },
      };

      const customError = {
        message: mockErrorMessage,
        status,
      };
      beforeEach(async () => {
        await mockSupplierControllerInstance.supplierService.readSupplier.mockRejectedValue(mockError);
        await mockSupplierControllerInstance.readSupplier();
      });
      test('should log a error message to the log file', () => {
        expect(winston.mockLoggerObject.error).toHaveBeenCalledWith(mockLoggerMessage);
      });
      test('should send a error message to client', () => {
        expect(mockSupplierControllerInstance.response.send).toHaveBeenCalledWith(customError);
      });
    });
  });
});
