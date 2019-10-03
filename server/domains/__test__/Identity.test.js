const Identity = require('../Identity');

describe('domains/Identity', () => {
  let mockIdentityPayload = {};
  let identityObject = {};
  beforeEach(() => {
    mockIdentityPayload = {
      uuid: 'some uuid',
      accessToken: 'some access Token',
      refreshToken: 'some refresh Token',
    };
    identityObject = new Identity(mockIdentityPayload);
  });
  test('should instantiate the constructor', (done) => {
    expect(identityObject).toBeInstanceOf(Identity);
    done();
  });
  test('should set uuid property', (done) => {
    expect(identityObject.uuid).toEqual(mockIdentityPayload.uuid);
    done();
  });
  test('should set accessToken property', (done) => {
    expect(identityObject.accessToken).toEqual(mockIdentityPayload.accessToken);
    done();
  });
  test('should set refreshToken property', (done) => {
    expect(identityObject.refreshToken).toEqual(mockIdentityPayload.refreshToken);
    done();
  });
});
