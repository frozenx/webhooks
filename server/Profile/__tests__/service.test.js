jest.mock('../../clients/httpClient');
const httpClient = require('../../clients/httpClient');
const ProfileService = require('../service');
const mockData = require('./mockProfileData.json');

describe('Profile Service', () => {
  const mockAccessToken = 'random token';
  let profileServiceInstance;
  const mockProfleServiceData = mockData;
  const mockMessage = 'some error message';
  const mockProfileServiceError = {
    message: mockMessage,
  };
  beforeEach(() => {
    profileServiceInstance = new ProfileService(mockAccessToken);
  });
  test('should call the variables of constructor', () => {
    expect(httpClient).toHaveBeenCalledWith(mockAccessToken);
    const httpClientInstance = httpClient.mock.instances[0];
    expect(profileServiceInstance.accessToken).toBe(mockAccessToken);
    expect(profileServiceInstance.httpClient).toBe(httpClientInstance);
  });
  describe('should send a response from readProfile', () => {
    test('success response', async () => {
      profileServiceInstance.httpClient.get.mockResolvedValue(
        mockProfleServiceData,
      );
      const actualData = await profileServiceInstance.readProfile();
      expect(profileServiceInstance.httpClient.get).toHaveBeenCalled();
      expect(actualData).toEqual(mockProfleServiceData);
    });
  });
  test('error response', async () => {
    profileServiceInstance.httpClient.get
      .mockRejectedValue(mockProfileServiceError);
    const actualData = await profileServiceInstance.readProfile();
    expect(profileServiceInstance.httpClient.get).toHaveBeenCalled();
    expect(actualData).toEqual(mockProfileServiceError);
  });
});
