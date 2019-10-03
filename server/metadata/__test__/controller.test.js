jest.mock('../service');
jest.mock('../models/_supplierHeader');
jest.mock('../models/SiteDetails');
jest.mock('../models/PaymentDetails');
jest.mock('winston');
jest.mock('../../lib/logger');
const MetaDataController = require('../controller');
const MetaDataService = require('../service');
const SupplierHeaderModel = require('../models/_supplierHeader');
const presets = require('../presets');
const SiteDetailsModel = require('../models/SiteDetails');
const PaymentDetailsModel = require('../models/PaymentDetails');
const mockData = require('./mockData');

describe('Given the controller is invoked', () => {
  const mockAccessToken = 'some access token';
  let controller;
  const req = {
    cookies: {
      'OAuth.AccessToken.EP': mockAccessToken,
    },
    query: {
      'uuid': '12345'
    }
  };
  const res = {
    send: jest.fn(),
  };
  beforeEach(() => {
    controller = new MetaDataController(req, res);
    // logger.mockImplementation(() => () => ({ error: logErrorMock }));
    // logger = jest.fn().mockReturnValue({ error: logErrorMock });
  });
  test('then it should initialize instance variables', () => {
    expect(MetaDataService).toHaveBeenCalledWith(mockAccessToken);
    const mockServiceInstance = MetaDataService.mock.instances[0];
    expect(controller.service).toBe(mockServiceInstance);
    expect(controller.req).toBe(req);
    expect(controller.res).toBe(res);
    expect(controller.accessToken).toBe(mockAccessToken);
  });
  describe('with method getSupplierHeader', () => {
    beforeEach(async () => {
      await controller.getSupplierHeader(req, res);
    });
    test('then it should call getSUpplierHeader method of MetaDataService', () => {
      expect(controller.service.getSupplierHeader).toHaveBeenCalled();
    });
    describe('Given the service response is green', () => {
      let mockResponse;
      beforeEach(() => {
        mockResponse = mockData.getSupplierHeaderMock;
        controller.service.getSupplierHeader.mockResolvedValue(mockResponse);
        controller.getSupplierHeader();
      });
      test('then it should initialize the SupplierHeaderModel', () => {
        expect(SupplierHeaderModel).toHaveBeenCalledWith(mockResponse);
      });
      test('it should send the response to the client', () => {
        const mockSupplierHeaderModelInstance = SupplierHeaderModel.mock.instances[0];
        expect(controller.res.send).toHaveBeenCalledWith(mockSupplierHeaderModelInstance);
      });
    });
    describe('Given the service throws an error', () => {
      const mockMessage = 'some message';
      const mockError = {
        message: mockMessage,
      };
      beforeEach(() => {
        controller.service.getSupplierHeader.mockRejectedValue(mockError);
      });
      test('then it should log the error and send the error to client', async (done) => {
        await controller.getSupplierHeader();
        // expect(logErrorMock).toHaveBeenCalledWith(mockError);
        // expect(winston.mockLoggerObject.error).toHaveBeenCalledWith(mockError);
        expect(controller.res.send).toHaveBeenCalledWith(mockMessage);
        done();
      });
    });
  });


  describe('with method getSupplierSite', () => {
    beforeEach(async () => {
      await controller.getSupplierSite();
    });
    test('then it should call get method of MetaDataService', () => {
      expect(controller.service.getSupplierSite).toHaveBeenCalled();
    });
    describe('Given the service response is green', () => {
      let mockResponse;
      beforeEach(() => {
        mockResponse = mockData.getMock;
        controller.service.getSupplierSite.mockResolvedValue(mockResponse);
        controller.getSupplierSite();
      });
      test('then it should initialize the SupplierHeaderModel', () => {
        expect(SupplierHeaderModel).toHaveBeenCalledWith(mockResponse);
      });
      test('it should send the response to the client', () => {
        const mockSupplierHeaderModelInstance = SupplierHeaderModel.mock.instances[0];
        expect(controller.res.send).toHaveBeenCalledWith(mockSupplierHeaderModelInstance);
      });
    });
    describe('Given the service throws an error', () => {
      const mockMessage = 'some message';
      const mockError = {
        message: mockMessage,
      };
      beforeEach(async () => {
        controller.service.getSupplierSite.mockRejectedValue(mockError);
        await controller.getSupplierSite();
      });
      test('then it should log the error and send the error to client', (done) => {
        // expect(logErrorMock).toHaveBeenCalledWith(mockError);
        expect(controller.res.send).toHaveBeenCalledWith(mockMessage);
        done();
      });
    });
  });

  describe('with method createHeader', () => {
    beforeEach(async () => {
      await controller.createHeader();
    });
    test('then it should call createHeader method of MetaDataService', () => {
      expect(controller.service.createHeader).toHaveBeenCalled();
    });
    describe('Given the service response is green', () => {
      test('it should send the response to the client', () => {
        controller.service.createHeader.mockResolvedValue({ data: 'some data' });
        controller.createHeader();
        expect(controller.res.send).toHaveBeenCalled();
      });
    });
    describe('Given the service throws an error', () => {
      const mockMessage = 'some message';
      const mockError = {
        message: mockMessage,
      };
      beforeEach(async () => {
        controller.service.createHeader.mockRejectedValue(mockError);
        await controller.createHeader();
      });
      test('then it should log the error and send the error to client', (done) => {
        expect(controller.res.send).toHaveBeenCalledWith(mockMessage);
        done();
      });
    });
  });

  describe('with method createSite', () => {
    beforeEach(async () => {
      await controller.createSite();
    });
    test('then it should call createSite method of MetaDataService', () => {
      expect(controller.service.createSite).toHaveBeenCalled();
    });
    describe('Given the service response is green', () => {
      test('it should send the response to the client', () => {
        controller.service.createSite.mockResolvedValue({ data: 'some data' });
        controller.createSite();
        expect(controller.res.send).toHaveBeenCalled();
      });
    });
    describe('Given the service throws an error', () => {
      const mockMessage = 'some message';
      const mockError = {
        message: mockMessage,
      };
      beforeEach(async () => {
        controller.service.createSite.mockRejectedValue(mockError);
        await controller.createSite();
      });
      test('then it should log the error and send the error to client', (done) => {
        expect(controller.res.send).toHaveBeenCalledWith(mockMessage);
        done();
      });
    });
  });

  describe('with method createPayment', () => {
    beforeEach(async () => {
      await controller.createPayment();
    });
    test('then it should call createPayment method of MetaDataService', () => {
      expect(controller.service.createPayment).toHaveBeenCalled();
    });
    describe('Given the service response is green', () => {
      test('it should send the response to the client', () => {
        controller.service.createPayment.mockResolvedValue({ data: 'some data' });
        controller.createPayment();
        expect(controller.res.send).toHaveBeenCalled();
      });
    });
    describe('Given the service throws an error', () => {
      const mockMessage = 'some message';
      const mockError = {
        message: mockMessage,
      };
      beforeEach(async () => {
        controller.service.createPayment.mockRejectedValue(mockError);
        await controller.createPayment();
      });
      test('then it should log the error and send the error to client', (done) => {
        expect(controller.res.send).toHaveBeenCalledWith(mockMessage);
        done();
      });
    });
  });

  describe('with method siteDetails', () => {
    beforeEach(async () => {
      await controller.siteDetails(req, res);
    });
    test('then it should call siteDetails method of MetaDataService', () => {
      expect(controller.service.siteDetails).toHaveBeenCalled();
    });
    describe('Given the service response is green', () => {
      let mockResponse;
      beforeEach(() => {
        mockResponse = mockData.siteDetailsMock;
        controller.service.siteDetails.mockResolvedValue(mockResponse);
        controller.siteDetails();
      });
      test('then it should initialize the SiteDetailsModel', () => {
        expect(SiteDetailsModel).toHaveBeenCalledWith(mockResponse);
      });
      test('it should send the response to the client', () => {
        const mocksiteDetailsModelInstance = SiteDetailsModel.mock.instances[0];
        expect(controller.res.send).toHaveBeenCalledWith(mocksiteDetailsModelInstance);
      });
    });
    describe('Given the service throws an error', () => {
      const mockMessage = 'some message';
      const mockError = {
        message: mockMessage,
      };
      beforeEach(() => {
        controller.service.siteDetails.mockRejectedValue(mockError);
      });
      test('then it should log the error and send the error to client', async (done) => {
        await controller.siteDetails();
        // expect(logErrorMock).toHaveBeenCalledWith(mockError);
        // expect(winston.mockLoggerObject.error).toHaveBeenCalledWith(mockError);
        expect(controller.res.send).toHaveBeenCalledWith(mockMessage);
        done();
      });
    });
  });

  describe('with method paymentDetails', () => {
    beforeEach(async () => {
      await controller.paymentDetails(req, res);
    });
    test('then it should call paymentDetails method of MetaDataService', () => {
      expect(controller.service.paymentDetails).toHaveBeenCalled();
    });
    describe('Given the service response is green', () => {
      let mockResponse;
      beforeEach(() => {
        mockResponse = mockData.paymentDetailsMock;
        controller.service.paymentDetails.mockResolvedValue(mockResponse);
        controller.paymentDetails();
      });
      test('then it should initialize the PaymentDetailsModel', () => {
        expect(PaymentDetailsModel).toHaveBeenCalledWith(mockResponse);
      });
      test('it should send the response to the client', () => {
        const mockPaymentDetailsModelInstance = PaymentDetailsModel.mock.instances[0];
        expect(controller.res.send).toHaveBeenCalledWith(mockPaymentDetailsModelInstance);
      });
    });
    describe('Given the service throws an error', () => {
      const mockMessage = 'some message';
      const mockError = {
        message: mockMessage,
      };
      beforeEach(() => {
        controller.service.paymentDetails.mockRejectedValue(mockError);
      });
      test('then it should log the error and send the error to client', async (done) => {
        await controller.paymentDetails();
        // expect(logErrorMock).toHaveBeenCalledWith(mockError);
        // expect(winston.mockLoggerObject.error).toHaveBeenCalledWith(mockError);
        expect(controller.res.send).toHaveBeenCalledWith(mockMessage);
        done();
      });
    });
  });

  describe('with method getPresets', () => {
    beforeEach(async () => {
      await controller.getPresets(req, res);
    });
    describe('given the presets are loaded successfully from file', () => {
      test('then it should send the response', () => {
        expect(res.send).toHaveBeenCalledWith(presets);
      });
    });
    xdescribe('given there was an error loading presets from file', () => {
      test('then it should log the error and send error status 500', () => {
        expect(res.status).toEqual(500);
        expect(logger.info).toHaveBeenCalled();
      });
    });
  });
});
