const Profile = require('../Profile');


describe('domains/Profile', () => {
  let mockProfilePayload = {};
  let profileObject = {};
  beforeEach(() => {
    mockProfilePayload = {
      Title: 'Mr',
      GivenName: 'John',
      FamilyName: 'Doe',
      MiddleInitials: 'A',
      dateOfBirth: '1990-12-20',
      gender: 'Male',
      user: '1f56f3f1-a49b-4f5f-8313-eb8d84336270',
      dietaryPreferences: [],
      nickname: 'mrsmith',
    };
    profileObject = new Profile(mockProfilePayload);
  });
  test('should instantiate the constructor', (done) => {
    expect(profileObject).toBeInstanceOf(Profile);
    done();
  });
  test('should set title property', (done) => {
    expect(profileObject.title).toEqual(mockProfilePayload.Title);
    done();
  });
  test('should set firstName property', (done) => {
    expect(profileObject.firstName).toEqual(mockProfilePayload.GivenName);
    done();
  });
  test('should set lastName property', (done) => {
    expect(profileObject.lastName).toEqual(mockProfilePayload.FamilyName);
    done();
  });
  test('should set fullName property', (done) => {
    const { Title, GivenName, FamilyName } = mockProfilePayload;
    const fullName = `${Title} ${GivenName} ${FamilyName}`;
    expect(profileObject.fullName).toEqual(fullName);
    done();
  });
  test('should set dob property', (done) => {
    expect(profileObject.dob).toEqual(mockProfilePayload.dateOfBirth);
    done();
  });
  test('should set gender property', (done) => {
    expect(profileObject.gender).toEqual(mockProfilePayload.gender);
    done();
  });
  test('should set dietaryPreferences property', (done) => {
    expect(profileObject.dietaryPreferences).toEqual(mockProfilePayload.dietaryPreferences);
    done();
  });
  test('should set nickname property', (done) => {
    expect(profileObject.nickname).toEqual(mockProfilePayload.nickname);
    done();
  });
});
