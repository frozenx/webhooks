jest.mock('config');
jest.mock('../../clients/httpClient');

const httpClient = require('../../clients/httpClient');
const UamService = require('../service');
const mockData = require('./mockData');


describe('UAM policy should invoked', () => {
  const mockResponse = mockData.uamMockData;
  const expectedMockResponse = mockData.expectedUamMockData;
  const mockAccessToken = 'Random accessToken';
  const mockErrorMessage = 'Random Error Message';
  const mockError = {
    message: mockErrorMessage,
  };
  let mockUamServiceInstance;

  beforeEach(() => {
    mockUamServiceInstance = new UamService(mockAccessToken);
  });

  test('it should call the constructor of Uam Service', () => {
    expect(httpClient).toHaveBeenCalledWith(mockAccessToken);
    const mockHttpClientInstance = httpClient.mock.instances[0];
    expect(mockUamServiceInstance.accessToken).toBe(mockAccessToken);
    expect(mockUamServiceInstance.httpClient).toBe(mockHttpClientInstance);
  });

  test('it should call the httpClient get method with success', async () => {
    mockUamServiceInstance.httpClient.post.mockResolvedValue(mockResponse);
    const actualResponse = await mockUamServiceInstance.fetchPolicyByDescription(mockAccessToken);
    expect(mockUamServiceInstance.httpClient.post).toHaveBeenCalled();
    expect(actualResponse).toEqual(expectedMockResponse);
  });

  test('it should call the httpClient and throws error', async () => {
    mockUamServiceInstance.httpClient.post.mockRejectedValue(mockError);
    const actualResponse = await mockUamServiceInstance.fetchPolicyByDescription(mockAccessToken);
    expect(mockUamServiceInstance.httpClient.post).toHaveBeenCalled();
    expect(actualResponse).toEqual(mockError);
  });
});
