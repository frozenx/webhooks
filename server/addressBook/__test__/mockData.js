const mockPartnerAddressResponse = {
    partnerHeaderUuid: 'some uuid',
    addresses: [{
        address1: 'address1',
        address2: 'address2',
        someproperty: 'somevalue',
        addressUuid: 'some uuid1'
    }],
    addressCount: 1
};

const addressUuids = ['some uuid1'];

const addressServiceResponse = [{
    id: 'some uuid1',

    properties: {
        lines: [
            'line 1',
            'line 2'
        ],
        postTown: 'some town',
        postCode: 'some code'
    }

}];

const finalAddressModel = {
    "addressCount": 1,
    "addresses":
        [{
            "address1": "line 1",
            "address2": "line 2",
            "addressUuid": "some uuid1",
            "postCode": "some code",
            "postTown": "some town",
            "someproperty": "somevalue"
        }], "partnerHeaderUuid": "some uuid"
}

module.exports = {
    mockPartnerAddressResponse,
    addressUuids,
    addressServiceResponse,
    finalAddressModel
};