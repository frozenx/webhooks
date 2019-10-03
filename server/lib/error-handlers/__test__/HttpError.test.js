const HttpError = require('../HttpError');


describe('lib/error-handlers/HttpError', () => {
    const mockError = {
        response: {
            status: 401,
            statusText: 'Unauthorized'
        },
    };
    let httpErrorInstance;
    beforeEach(() => {
        httpErrorInstance = new HttpError(mockError);
    })
    test('should extend Error class', () => {
        expect(httpErrorInstance).toBeInstanceOf(Error); // will look up the prototype chain
    });
    test('should initialize properties from the error object given error.response exists', () => {
        expect(httpErrorInstance.name).toEqual('HttpError');
        expect(httpErrorInstance.code).toEqual(401);
        expect(httpErrorInstance.appCode).toEqual('E001');

    });
    xtest('should initialize properties from the error object given error.response does not exist', () => {

    });
});