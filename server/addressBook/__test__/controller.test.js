jest.mock('../service');
jest.mock('../models/PartnerAddressModel');
// import AddressController from '../controller';
jest.mock('../../lib/error-handlers/ErrorBuilder');
const AddressController = require('../controller');

const ErrorBuilder = require('../../lib/error-handlers/ErrorBuilder');
const AddressService = require('../service');
const PartnerAddressModel = require('../models/PartnerAddressModel');



describe('addressBook/controller', () => {
    let pageNumber = 1,
        partnerUuid = 'some uuid';
    let addressController;
    let req = {
        cookies: {
            'OAuth.AccessToken.EP': 'some token'
        },
        query: {
            pageNumber,
            partnerUuid
        }
    };
    let res = {
        json: jest.fn(),
        status: jest.fn(),
        end: jest.fn()
    };
    let partnerAddressServiceResponse = {
        data: 'some data'
    };
    let addressServiceResponse = {
        data: 'some address service data'
    };

    describe('getAddresses', () => {

        beforeAll(() => {
            PartnerAddressModel.mockClear();
        })
        beforeEach(() => {

            addressController = new AddressController(req, res);
            addressController.addressService.getPartnerAddresses.mockResolvedValue(partnerAddressServiceResponse);
            addressController.addressService.getAddresses.mockResolvedValue(addressServiceResponse);
            addressController.getAddresses();
        });
        test('should call getPartnerAddress service', () => {
            const addressServiceInstance = AddressService.mock.instances[0];
            expect(addressServiceInstance.getPartnerAddresses).toHaveBeenCalledWith(pageNumber, partnerUuid);
        });
        test('should build a model from partner service address response', () => {
            expect(PartnerAddressModel).toHaveBeenCalledWith(partnerAddressServiceResponse);
        });
        test('should call getAddresses method of address service', () => {
            expect(addressController.addressService.getAddresses).toHaveBeenCalled();
        });
        test('should call update the model from address service response', () => {
            const partnerModelInstance = PartnerAddressModel.mock.instances[0];
            expect(partnerModelInstance.update).toHaveBeenCalledWith(addressServiceResponse);
        });
    });
    describe('getAddresses error', () => {
        let partnerAddressServiceError = {
            error: 'some errror'
        },
            errorMessage = 'some error message',
            errorCode = 'some code';
        beforeAll(() => {
            res.status.mockClear();
            res.end.mockClear();
            ErrorBuilder.mockClear();
        });
        beforeEach(() => {
            addressController = new AddressController(req, res);
            addressController.
                addressService.
                getPartnerAddresses.
                mockRejectedValue(partnerAddressServiceError);
            ErrorBuilder.mockImplementation(() => ({ message: errorMessage, code: errorCode }));
            addressController.getAddresses();
        });
        test('should log the error and return error response', () => {
            expect(ErrorBuilder).toHaveBeenCalledWith('controller', partnerAddressServiceError);
            expect(res.status).toHaveBeenCalledWith(errorCode);
            expect(res.end).toHaveBeenCalled();
        });
    });
});