jest.mock('../service');
jest.mock('winston');
const winston = require('winston');
const HeaderController = require('../controller');
const HeaderService = require('../service');


describe('Given the controller is invoked', () => {
  let controller;
  const mockAccessToken = 'abcd1234';

  const req = {
    cookies: {
      'OAuth.AccessToken.EP': mockAccessToken,
    },
    body: {

    },
  };


  const res = {
    send: jest.fn(),
    json: jest.fn(),
    sendStatus: jest.fn(),
  };
  beforeEach(() => {
    controller = new HeaderController(req, res);
  });

  test('then it should initialize instance variables', () => {
    expect(HeaderService).toHaveBeenCalledWith(mockAccessToken);
    expect(controller.accessToken).toBe(mockAccessToken);
    expect(controller.response).toBe(res);
    expect(controller.request).toBe(req);
    expect(controller.body).toBe(req.body);
    expect(controller.supplierService).toBeInstanceOf(HeaderService);
  });
  describe('with the method createSupplier', () => {
    beforeEach(async () => {
      await controller.createSupplier();
    });
    test('it should call the createSupplier method of HeaderService', () => {
      expect(controller.supplierService.createSupplier).toHaveBeenCalled();
    });

    describe('Given the service response is green', () => {
      controller = new HeaderController(req, res);
      controller.supplierService.createSupplier = jest.fn();

      controller.supplierService.createSupplier.mockResolvedValue({ data: 'some data' });


      test('it should send the response back to the client', async (done) => {
        await controller.createSupplier(req, res);

        expect(controller.supplierService.createSupplier).toHaveBeenCalledWith(req.body);
        expect(res.send).toHaveBeenCalled();
        done();
      });

      describe('Given the service throws an error', () => {
        controller = new HeaderController(req, res);
        controller.supplierService.createSupplier = jest.fn();
        controller.createSupplier(req, res);


        const mockError = {
          message: 'some error',
          status: 500
        };

        const mockLoggerError = {
          message: {
            logMsg: 'some error',
            statusCode: 500
          }
        }

        beforeEach(() => {
          controller.supplierService.createSupplier.mockRejectedValue(mockError);

        });
        test('then it should log the error and send the response to the client', async (done) => {
          await controller.createSupplier(req, res);
          expect(winston.mockLoggerObject.error).toHaveBeenCalledWith(mockLoggerError);
          expect(res.send).toHaveBeenCalled();
          done();
        });
      });
    });
  });
});
