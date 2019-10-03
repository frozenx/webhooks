const _ = require('lodash');
const AttributeGroupsModel = require('./AttributeGroupsModel');
const constants = require('../../constants');

class SupplierHeaderModel {
  constructor(payload) {
    this.name = payload.name;
    this.id = payload.uuid;
    this.type = payload.type;
    this.attributeGroups = _.map(
      payload.attributeGroupProjections.sort((a, b) => a.tabIndex - b.tabIndex),
      o => new AttributeGroupsModel(o),
    );
    this.attributeToRulesMapping = SupplierHeaderModel.getAttributesToRulesMapping(
      this.attributeGroups,
    );
    this.partnerAttributeStatic = SupplierHeaderModel.getAttributesToPartnerAttributes(
      this.attributeGroups
    );
  }

  static getAttributesToRulesMapping(attributeGroups) {
    const flattenedAttributeGroups = _.flatMapDepth(
      attributeGroups,
      'attributes',
    );
    const attributeToRulesMapping = {};
    _.forIn(flattenedAttributeGroups, (o) => {
      attributeToRulesMapping[o.key] = {
        regexRule: o.regexRule,
        required: o.required,
        attrGrpKey: o.attributeGroupKey
      };
    });
    return attributeToRulesMapping;
  }

  static getAttributesToPartnerAttributes(attributeGroups) {
    let staticAttributes = [];
    attributeGroups.forEach((attributeGroup) => {
      attributeGroup.attributes.forEach((attribute) => {

        if (constants.staticAttributes[attribute.key]) {
          staticAttributes.push({ ...attribute, displayName: attribute.displayName })
        }
      });
    });
    // const flattenedAttributeGroup = attributeGroup.attributes.reduce(
    //   (acc, attr) => {
    //     acc[attr.name] = { ...attr, displayName: attr.displayNames[0].displayName }
    //     return acc;
    //   },
    //   {},
    // );
    return { attributes: staticAttributes };
  }
}

module.exports = SupplierHeaderModel;
