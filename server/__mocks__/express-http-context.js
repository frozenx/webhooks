const httpContext = jest.genMockFromModule('express-http-context');

const mockGet = jest.fn();

httpContext.get = mockGet;

module.exports = httpContext;
