jest.mock('winston');
jest.mock('../service');
jest.mock('../models/ProfileModel');
const winston = require('winston');
const ProfileController = require('../controller');
const ProfileService = require('../service');
const ProfileModel = require('../models/ProfileModel');
const mockProfileData = require('./mockProfileData.json');

describe('Profile Controller', () => {
  const mockAccessToken = 'some token';
  let profileControllerInstance;
  const mockReq = {
    cookies: {
      'OAuth.AccessToken.EP': mockAccessToken,
    },
  };
  const mockRes = {
    send: jest.fn(),
  };

  beforeEach(() => {
    profileControllerInstance = new ProfileController(mockReq, mockRes);
  });

  test('should initialize Profile Controller instance', () => {
    expect(ProfileService).toHaveBeenCalledWith(mockAccessToken);
    const profileServiceInstance = ProfileService.mock.instances[0];
    expect(profileControllerInstance.request).toBe(mockReq);
    expect(profileControllerInstance.response).toBe(mockRes);
    expect(profileControllerInstance.accessToken).toBe(mockAccessToken);
    expect(profileControllerInstance.profileService).toBe(
      profileServiceInstance,
    );
  });

  describe('should expose a method called readProfile', () => {
    beforeEach(async () => {
      await profileControllerInstance.readProfile();
    });

    test('should call readProfile of Profile Service', () => {
      expect(
        profileControllerInstance.profileService.readProfile,
      ).toHaveBeenCalled();
    });
  });

  describe('should get a success response from readSupplier', () => {
    let mockProfileSuccessResponse;
    beforeEach(async () => {
      mockProfileSuccessResponse = JSON.stringify(mockProfileData);
      await profileControllerInstance.profileService.readProfile.mockResolvedValue(
        mockProfileSuccessResponse,
      );
      profileControllerInstance.readProfile();
    });

    test('should call readProfile of Profile Service', () => {
      expect(
        profileControllerInstance.profileService.readProfile,
      ).toHaveBeenCalledWith(mockAccessToken);
    });

    test('should initialize the Profile Model', () => {
      expect(ProfileModel).toHaveBeenCalledWith(
        mockProfileSuccessResponse,
      );
    });

    test('then the response should be send to client', () => {
      const profileModelInstance = ProfileModel.mock.instances[0];
      expect(profileControllerInstance.response.send).toHaveBeenCalledWith(
        JSON.stringify(profileModelInstance),
      );
    });
  });

  describe('should get a failure response from readProfile', () => {
    let mockProfileErrorResponse;
    const mockErroMessage = 'some error message';
    const mockLoggerError = {
      message: { logMsg: 'some error message', statusCode: undefined },
    };
    beforeEach(() => {
      mockProfileErrorResponse = {
        message: mockErroMessage,
      };
      profileControllerInstance.profileService.readProfile.mockRejectedValue(
        mockProfileErrorResponse,
      );
      profileControllerInstance.readProfile();
    });
    test('should send a error message to the client', () => {
      expect(winston.mockLoggerObject.error).toHaveBeenCalledWith(
        mockLoggerError,
      );
      expect(profileControllerInstance.response.send).toHaveBeenCalledWith(
        mockProfileErrorResponse,
      );
    });
  });
});
