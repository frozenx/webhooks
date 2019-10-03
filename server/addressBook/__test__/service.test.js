jest.mock('../../clients/httpClient');
jest.mock('../../lib/error-handlers/ErrorBuilder');
const AddressService = require('../service');
const ErrorBuilder = require('../../lib/error-handlers/ErrorBuilder');
const HttpClient = require('../../clients/httpClient');


describe('addressBook/service', () => {
    describe('getAddresses', () => {
        let uuids = ['1', '2'],
            addressService,
            accessToken = 'some access token',
            addressServiceResponse = 'some response',
            clientToken = 'some client token';
        beforeEach(() => {

            addressService = new AddressService(accessToken);
            addressService.httpClient.get.mockResolvedValue(addressServiceResponse);
            addressService.httpClient.getClientToken.mockResolvedValue(clientToken);
            addressService.getAddresses(uuids);
        });
        afterEach(() => {

        })
        test('should get client token from identity', () => {
            expect(addressService.httpClient.getClientToken).toHaveBeenCalled();
        })
        test('should call address service api for every uuid', () => {
            expect(addressService.httpClient.get).toHaveBeenCalledTimes(2);

        });
    });
    describe('getAddresses error', () => {
        let uuids = ['1', '2'],
            addressService,
            accessToken = 'some access token',
            addressErrorResponse = 'some error response',
            clientToken = 'some client token',
            errorCode = 'some code',
            errorMessage = 'some message';
        beforeEach(() => {

            addressService = new AddressService(accessToken);
            addressService.httpClient.get.mockRejectedValue(addressErrorResponse);
            addressService.httpClient.getClientToken.mockResolvedValue(clientToken);
            ErrorBuilder.mockImplementation(() => ({ message: errorMessage, code: errorCode }));

        });

        test('should throw error builder object', async (done) => {
            try {
                await addressService.getAddresses(uuids);

            } catch (err) {
                expect(ErrorBuilder).toHaveBeenCalledWith('service', addressErrorResponse);
                done();
            }
        });
    });
    describe('getCompanyAddress', () => {
        let companyHouseNumber = '123',
            accessToken = 'some access token',
            companyHouseResponse = 'some response',
            companyAddressErrorResponse = 'some error response',
            errorMessage = 'some error message',
            errorCode = 'some code';

        test('should call the httpClient given the companyHouse Number', async () => {
            let addressService = new AddressService(accessToken);
            addressService.httpClient.get.mockResolvedValue(companyHouseResponse);
            const companyResponse = await addressService.getCompanyAddress(companyHouseNumber);
            expect(companyResponse).toEqual(companyHouseResponse);
        });

        test('should throw the error object given the company house http call fails', async (done) => {
            addressService = new AddressService(accessToken);
            addressService.httpClient.get.mockRejectedValue(companyAddressErrorResponse);
            ErrorBuilder.mockImplementation(() => ({ message: errorMessage, code: errorCode }));
            try {
                await addressService.getCompanyAddress(companyHouseNumber);

            }
            catch (error) {
                expect(ErrorBuilder).toHaveBeenCalledWith('service', companyAddressErrorResponse);
                expect(error.isCompanyAddressError).toEqual(true);
                done();
            }

        })
    })
});