jest.mock('express');
jest.mock('../controller');

const uamMiddleware = require('../middleware');
const UamController = require('../controller');

describe('Given the uamMiddleware is initialized', () => {
  let mockReq;
  let mockRes;
  let mockNext;
  const mockAccessToken = 'some token';
  const getUamMockData = [{ '/supplier': ['view'] },
    { '/supplier-site': ['view'] },
    { '/profle': ['view'] }];
  beforeEach(() => {
    mockReq = {
      cookies: {
        'OAuth.AccessToken.EP': mockAccessToken,
      },
    };
    mockRes = {
      send: jest.fn(),
      status: jest.fn(),
    };
    mockNext = jest.fn();
  });

  test('should send response with empty url', async () => {
    const mockUamUrlsFunc = jest.fn().mockResolvedValue({});
    UamController.mockImplementation(() => ({
      getUamUrls: mockUamUrlsFunc,
      res: {
        message: 'invalid user',
        urls: []
      },
    }));
    const uamControllerInstance = new UamController(mockReq, mockRes);
    await uamMiddleware.getUam(mockReq, mockRes);
    expect(mockRes.send).toHaveBeenCalled();
    expect(mockRes.send).toHaveBeenCalledWith(uamControllerInstance.res.message);
  });

  test('should send response with response and got to next', async () => {
    const mockUamUrlsFunc = jest.fn().mockResolvedValue({});
    UamController.mockImplementation(() => ({
      getUamUrls: mockUamUrlsFunc,
      res: {
        urls: getUamMockData,
        req: {
          url: '/supplier',
        },
      },
    }));
    await uamMiddleware.getUam(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });
});
