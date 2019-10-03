jest.mock('express');
jest.mock('../controller');
jest.mock('../../Uam/controller');
// jest.mock('../../lib/logger');

const express = require('express');
const { handlers } = require('../router');
const MetaDataController = require('../controller');
// const logger = require('../../lib/logger')(module);
const uamMiddleware = require('../../Uam/middleware').getUam;

describe('Given the metdata router is initialized', () => {
  let req; let res;
  const mockAccessToken = 'some token';
  beforeEach(() => {
    req = {
      cookies: {
        'OAuth.AccessToken.EP': mockAccessToken,
      },
    };
    res = {
      send: jest.fn(),
    };
  });

  test('then it should expose an endpoint for /supplier-header', () => {
    expect(express.mockGet).toHaveBeenCalledWith('/supplier-header', handlers.getSupplierHeader);
  });

  test('then it should have a handler for supplier-header', async () => {
    await handlers.getSupplierHeader(req, res);
    const mockControllerInstance = MetaDataController.mock.instances[0];
    expect(mockControllerInstance.getSupplierHeader).toHaveBeenCalled();
  });

  test('then it should expose an endpoint for /supplier-site', () => {
    expect(express.mockGet).toHaveBeenCalledWith('/supplier-site', handlers.getSupplierSite);
  });
  test('then it should have a handler for supplier-site', () => {
    handlers.getSupplierSite(req, res);
    const mockControllerInstance = MetaDataController.mock.instances[1];
    expect(MetaDataController).toHaveBeenCalledWith(req, res);
    expect(mockControllerInstance.getSupplierSite).toHaveBeenCalled();
  });

  test('then it should expose an endpoint for /supplier-payments', () => {
    expect(express.mockGet).toHaveBeenCalledWith('/supplier-payments', handlers.getSupplierPayments);
  });
  test('then it should have a handler for supplier-payments', () => {
    handlers.getSupplierPayments(req, res);
    const mockControllerInstance = MetaDataController.mock.instances[2];
    expect(MetaDataController).toHaveBeenCalledWith(req, res);
    expect(mockControllerInstance.getSupplierPayments).toHaveBeenCalled();
  });

  test('then it should expose an post endpoint for /supplier-header', () => {
    expect(express.mockPost).toHaveBeenCalledWith('/supplier-header', handlers.createHeader);
  });
  test('then it should have a handler for supplier-header post', () => {
    handlers.createHeader(req, res);
    const mockControllerInstance = MetaDataController.mock.instances[3];
    expect(MetaDataController).toHaveBeenCalledWith(req, res);
    expect(mockControllerInstance.createHeader).toHaveBeenCalled();
  });

  test('then it should expose an post endpoint for /supplier-site', () => {
    expect(express.mockPost).toHaveBeenCalledWith('/supplier-site', handlers.createSite);
  });
  test('then it should have a handler for supplier-header', () => {
    handlers.createSite(req, res);
    const mockControllerInstance = MetaDataController.mock.instances[4];
    expect(MetaDataController).toHaveBeenCalledWith(req, res);
    expect(mockControllerInstance.createSite).toHaveBeenCalled();
  });

  test('then it should expose an post endpoint for /supplier-payment', () => {
    expect(express.mockPost).toHaveBeenCalledWith('/supplier-payments', handlers.createPayment);
  });
  test('then it should have a handler for supplier-header', () => {
    handlers.createPayment(req, res);
    const mockControllerInstance = MetaDataController.mock.instances[5];
    expect(MetaDataController).toHaveBeenCalledWith(req, res);
    expect(mockControllerInstance.createPayment).toHaveBeenCalled();
  });

  test('then it should expose an post endpoint for /site-details', () => {
    expect(express.mockGet).toHaveBeenCalledWith('/site-details', handlers.siteDetails);
  });
  test('then it should have a handler for site-details', () => {
    handlers.siteDetails(req, res);
    const mockControllerInstance = MetaDataController.mock.instances[6];
    expect(MetaDataController).toHaveBeenCalledWith(req, res);
    expect(mockControllerInstance.siteDetails).toHaveBeenCalled();
  });

  test('then it should expose an post endpoint for /payment-details', () => {
    expect(express.mockGet).toHaveBeenCalledWith('/payment-details', handlers.paymentDetails);
  });
  test('then it should have a handler for payment-details', () => {
    handlers.paymentDetails(req, res);
    const mockControllerInstance = MetaDataController.mock.instances[7];
    expect(MetaDataController).toHaveBeenCalledWith(req, res);
    expect(mockControllerInstance.paymentDetails).toHaveBeenCalled();
  });


  test('then it should expose a get endpoint for /presets', () => {
    expect(express.mockGet).toHaveBeenCalledWith('/presets', handlers.getPresets);
  });

  test('then it should have a handler for /presets', () => {
    handlers.getPresets(req, res);
    const mockControllerInstance = MetaDataController.mock.instances[8];
    expect(MetaDataController).toHaveBeenCalledWith(req, res);
    expect(mockControllerInstance.getPresets).toHaveBeenCalled();
  });

});
