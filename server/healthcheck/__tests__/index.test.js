jest.mock('express');
const express = require('express');
const { handlers } = require('..');

// local env set up
if (!process.env.APP_ENV) {
  process.env.APP_ENV = 'some env';
  process.env.BUILD_NUMBER = 12345;
}

describe('healthcheck router', () => {
  let mockRes;
  const mockResponseData = {
    BUILD_NUMBER: 12345,
    APP_ENV: 'some env',
  };
  beforeEach(() => {
    mockRes = {
      send: jest.fn(),
    };
  });


  test('should expose an endpoint for api/healthcheck', () => {
    expect(express.mockGet)
      .toHaveBeenCalledWith('/healthcheck', handlers.readHealthCheck);
  });
  test('should send a response when the service is invoked', () => {
    handlers.readHealthCheck(null, mockRes);
    expect(mockRes.send).toHaveBeenCalledWith(JSON.stringify(mockResponseData));
  });
});
