const ProfileModel = require('../../models/ProfileModel');
const mockData = require('../mockProfileData.json');

describe('Profile Model', () => {
  let profileModelInstance;
  const mockProfileModelData = mockData;
  beforeEach(() => {
    profileModelInstance = new ProfileModel(mockProfileModelData);
  });

  test('should call the instance variables of Profile Model', () => {
    expect(profileModelInstance.GivenName).toBe(mockProfileModelData.GivenName);
    expect(profileModelInstance.FamilyName).toBe(mockProfileModelData.FamilyName);
  });
});
