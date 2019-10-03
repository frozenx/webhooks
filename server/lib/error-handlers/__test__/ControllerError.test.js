const ControllerError = require('../ControllerError');


describe('lib/error-handlers/ControllerError', () => {
    const mockError = {
        stack: 'some stack trace'
    };
    let controllerErrorInstance;
    beforeEach(() => {
        controllerErrorInstance = new ControllerError(mockError);
    })
    test('should extend Error class', () => {
        expect(controllerErrorInstance).toBeInstanceOf(Error); // will look up the prototype chain
    });
    test('should initialize properties from the error object given error.response exists', () => {
        expect(controllerErrorInstance.name).toEqual('ControllerError');
        expect(controllerErrorInstance.appCode).toEqual('E003');
        expect(controllerErrorInstance.code).toEqual(500);
        expect(controllerErrorInstance.stack).toEqual('some stack trace');
    });
    xtest('should initialize properties from the error object given error.response does not exist', () => {

    });
});