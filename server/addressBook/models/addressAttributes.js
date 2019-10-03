const constants = require('../../constants');

class AddressAttributes {
  getRequiredBodyAttr(body) {
    const {
      address1,
      address2,
      address3
    } = body;
    return {
      "properties": {
        "lines": [
          address1,
          address2,
          address3
        ].filter(Boolean),
        "postTown": body.city,
        "postcode": body.postCode
      },
      "countryCode": body.country.substring(0, 2)
    }
  }

  mapCompanyHouseAttributesToAddressPayload(companyHouseAttributes) {
    const {
      registered_office_address
    } = companyHouseAttributes;
    return {
      properties: {
        lines: [
          registered_office_address.address_line_1,
          registered_office_address.address_line_2,
          registered_office_address.address_line_3
        ].filter(Boolean),
        postTown: registered_office_address.locality,
        postCode: registered_office_address.postal_code
      },
      countryCode: 'GB'
    }
  }
}

module.exports = AddressAttributes;