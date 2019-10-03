const ServiceError = require('../ServiceError');


describe('lib/error-handlers/ServiceError', () => {
    const mockError = {
        stack: 'some stack trace'
    };
    let serviceErrorInstance;
    beforeEach(() => {
        serviceErrorInstance = new ServiceError(mockError);
    })
    test('should extend Error class', () => {
        expect(serviceErrorInstance).toBeInstanceOf(Error); // will look up the prototype chain
    });
    test('should initialize properties from the error object given error.response exists', () => {
        expect(serviceErrorInstance.name).toEqual('ServiceError');
        expect(serviceErrorInstance.appCode).toEqual('E002');
        expect(serviceErrorInstance.code).toEqual(500);
        expect(serviceErrorInstance.stack).toEqual('some stack trace');
    });
    xtest('should initialize properties from the error object given error.response does not exist', () => {

    });
});