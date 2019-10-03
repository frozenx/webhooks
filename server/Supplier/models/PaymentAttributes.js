const constants = require('../../constants');

class PaymentAttributes {
    constructor(payload, lang = 'en') {
        this.createdDate = payload.createdDate;
        this.date = payload.date;
        this.modifiedDate = payload.modifiedDate;
        this.partnerAttributes = PaymentAttributes.getAttributes(
            payload.tncAttributes[0],
            lang,
        );
        this.partnerIdentifiers = payload.tncIdentifiers;
        this.uuid = payload.uuid;
        this.version = payload.version;
        this.partnerAttributeType = payload.tncAttributes[0].attributeGroup;
        this.values = PaymentAttributes.getValues(payload.tncAttributes);
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
            return { ...acc, [partnerAttribute.attributeGroup]: { ...PaymentAttributes.getAttributes(partnerAttribute, 'en') } }
        }, {})
    }
}

module.exports = PaymentAttributes;
