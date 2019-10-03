const constants = require('../../constants');

class SupplierAttributes {
  constructor(payload, lang = 'en') {
    this.createdDate = payload.createdDate;
    this.date = payload.date;
    this.modifiedDate = payload.modifiedDate;
    this.partnerAttributes = SupplierAttributes.getAttributes(
      payload.partnerAttributes.find(
        partnerAttribute => partnerAttribute.attributeGroup === constants.partner,
      ),
      lang,
    );
    this.partnerIdentifiers = payload.partnerIdentifiers;
    this.uuid = payload.uuid;
    this.version = payload.version;
    this.partnerAttributeType = payload.partnerAttributes.find(
      partnerAttribute => partnerAttribute.attributeGroup === constants.partner,
    ).attributeGroup;
    this.values = SupplierAttributes.getValues(payload.partnerAttributes);
  }

  static getAttributes({ attributes }, lang) {
    const attributeMapping = attributes.reduce((acc, { name, values }) => {
      const savedValue = values.find(value => value.lang === lang).value;
      if (name === 'partnerName') {
        return {
          ...acc,
          [constants[name]]: savedValue,
        };
      }
      return {
        ...acc,
        [name]: savedValue,
      };
    }, {});
    return {
      ...attributeMapping,
    };
  }

  static getValues(partnerAttributes) {
    return partnerAttributes.reduce((acc, partnerAttribute) => {
      return {
        ...acc,
        [partnerAttribute.attributeGroup]: {
          ...SupplierAttributes.getAttributes(partnerAttribute, 'en'),
        },
      };
    }, {});
  }

  updateAddressAttributes(addressPayload) {
    if (addressPayload.addressCount != 0) {
      this.values.address = { addressCount: addressPayload.addressCount }
    }
  }
  updateContacrAttributes(contactPayload) {
    if (contactPayload.contactCount != 0) {
      this.values.contact = { contactCount: contactPayload.contactCount }
    }
  }

}

module.exports = SupplierAttributes;
