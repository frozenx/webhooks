const constants = require('../../constants');

class SiteAttributes {
    constructor(payload, lang = 'en') {
        this.createdDate = payload.createdDate;
        this.date = payload.date;
        this.modifiedDate = payload.modifiedDate;
        this.partnerAttributes = SiteAttributes.getAttributes(
            payload.siteAttributes[0],
            lang,
        );
        this.partnerIdentifiers = payload.siteIdentifiers;
        this.uuid = payload.uuid;
        this.version = payload.version;
        this.partnerAttributeType = payload.siteAttributes[0].attributeGroup;
        this.values = SiteAttributes.getValues(payload.siteAttributes);
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
            return { ...acc, [partnerAttribute.attributeGroup]: { ...SiteAttributes.getAttributes(partnerAttribute, 'en') } }
        }, {})
    }
}

module.exports = SiteAttributes;
