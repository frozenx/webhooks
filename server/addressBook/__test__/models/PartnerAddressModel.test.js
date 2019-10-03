
const PartnerAddressModel = require('../../models/PartnerAddressModel');
const mockData = require('../mockData');

describe('addressBook/models/PartnerAddressModel', () => {
    let partnerAddressModel,
        mockPayload = mockData.mockPartnerAddressResponse
    beforeEach(() => {
        partnerAddressModel = new PartnerAddressModel(mockPayload);
    })
    test('should initialize instance properties', () => {
        expect(partnerAddressModel.partnerHeaderUuid).toEqual(mockPayload.partnerHeaderUuid);
        expect(partnerAddressModel.addresses).toEqual(mockPayload.addresses);
        expect(partnerAddressModel.addressCount).toEqual(mockPayload.addressCount);

    });
    test('should expose a header for address uuids', () => {
        expect(partnerAddressModel.addressUuids).toEqual(mockData.addressUuids)
    });
    test('should expose a method update to update partnerADdressModel with address service response', () => {
        partnerAddressModel.update(mockData.addressServiceResponse);
        expect(partnerAddressModel).toEqual(mockData.finalAddressModel);
    });
});