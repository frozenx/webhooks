jest.mock('express');
jest.mock('../controller');

const express = require('express');
const { handlers } = require('../routes');
const ProfileController = require('../controller');

describe('Profile Routes', () => {
  let req;
  let res;
  const mockAccessToken = 'Random access token';
  beforeEach(() => {
    req = {
      cookies: {
        OAuthAccessToken: mockAccessToken,
      },
    };

    res = {};
  });

  test('should expose and endpoint for `/api/profile`', () => {
    expect(express.mockGet).toHaveBeenCalledWith(
      '/profile',
      handlers.readProfile,
    );
  });

  test('should call readProfile with req and res', () => {
    handlers.readProfile(req, res);
    const ProfileInstance = ProfileController.mock.instances[0];
    expect(ProfileInstance.readProfile).toHaveBeenCalledWith(req, res);
  });
});
