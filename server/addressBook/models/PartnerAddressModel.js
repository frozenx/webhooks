const _ = require('lodash');

class PartnerAddressModel {
    constructor(payload) {
        this.addresses = payload.addresses;
        this.partnerHeaderUuid = payload.partnerHeaderUuid;
        this.addressCount = payload.addressCount
    }
    get addressUuids() {
        return this.addresses.map(address => address.addressUuid);
    }
    update(addressServiceRecords) {
        const addressRecords = _.groupBy(addressServiceRecords, 'id');
        this.addresses = this.addresses.map((address) => {

            const addressServiceRecord = addressRecords[address.addressUuid][0];
            address.postTown = addressServiceRecord.properties.postTown;
            address.postCode = addressServiceRecord.properties.postCode;
            addressServiceRecord.properties.lines.forEach((line, lineIndex) => {
                address[`address${lineIndex + 1}`] = line;
            });
            return address;
        });
    }
}

module.exports = PartnerAddressModel;