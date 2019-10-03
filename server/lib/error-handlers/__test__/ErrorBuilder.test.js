
jest.mock('../HttpError');
jest.mock('../ServiceError');
jest.mock('../ControllerError');
const ErrorBuilder = require('../ErrorBuilder');
const HttpError = require('../HttpError');
const ServiceError = require('../ServiceError');
const ControllerError = require('../ControllerError');




describe('lib/error-handlers/ErrorBuilder', () => {
    test('should return the error received given error is tagged with app code property', () => {
        const mockError = { appCode: 'E001' };
        const errorInstance = new ErrorBuilder('service', mockError);
        expect(errorInstance).toEqual(mockError);
    });
    test('should return instance of HttpError given error type is http', () => {
        const mockError = 'some error';
        const errorInstance = new ErrorBuilder('http', mockError);
        expect(errorInstance).toBeInstanceOf(HttpError);
        expect(HttpError).toHaveBeenCalledWith(mockError);
    });
    test('should return instance of ServiceError given error type is service', () => {
        const mockError = 'some error';
        const errorInstance = new ErrorBuilder('service', mockError);
        expect(errorInstance).toBeInstanceOf(ServiceError);
        expect(ServiceError).toHaveBeenCalledWith(mockError);
    });
    test('should return instance of ControllerError given error type is controller', () => {
        const mockError = 'some error';
        const errorInstance = new ErrorBuilder('controller', mockError);
        expect(errorInstance).toBeInstanceOf(ControllerError);
        expect(ControllerError).toHaveBeenCalledWith(mockError);
    });
});