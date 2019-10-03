const express = require('express');
const { router, handlers } = require('../routes'); // eslint-disable-line no-unused-vars
const HeaderController = require('../controller');

jest.mock('../controller');

describe('Given the create supplier router is initialized', () => {
  let req;
  let res;
  const mockAccessToken = 'abcd1234';
  beforeEach(() => {
    req = {
      cookies: {
        'OAuth.AccessToken.EP': mockAccessToken,
      },
      body: {

      },
    };

    res = {
    };
  });
  test('it should expose an end point for /header', () => {
    expect(express.mockPost).toHaveBeenCalledWith('/supplier', handlers.createSupplier);
  });

  test('it should have an handler for header', () => {
    handlers.createSupplier(req, res);
    const mockControllerInstance = HeaderController.mock.instances[0];
    expect(HeaderController).toHaveBeenCalledWith(req, res);
    expect(mockControllerInstance.createSupplier).toHaveBeenCalled();
  });
});
