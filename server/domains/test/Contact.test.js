const Contact = require('../Contact');

describe('domains/Contact', () => {
  let mockContactPayload = {};
  let contactObject = {};
  beforeEach(() => {
    mockContactPayload = {
      addressBooks: [],
      telephoneNumbers: [],
      emailAddress: 'some email Address',
      phoneNumber: 'some phone number',
    };
    contactObject = new Contact(mockContactPayload);
  });
  test('should instantiate constructor', (done) => {
    expect(contactObject).toBeInstanceOf(Contact);
    done();
  });
  test('should set addressBooks property', (done) => {
    expect(contactObject.addressBooks).toEqual(mockContactPayload.addressBooks);
    done();
  });
  test('should set telephoneNumbers property', (done) => {
    expect(contactObject.telephoneNumbers).toEqual(mockContactPayload.telephoneNumbers);
    done();
  });
  test('should set emailAddress property', (done) => {
    expect(contactObject.emailAddress).toEqual(mockContactPayload.emailAddress);
    done();
  });
  test('should set phoneNumber property', (done) => {
    expect(contactObject.phoneNumber).toEqual(mockContactPayload.phoneNumber);
    done();
  });
});
