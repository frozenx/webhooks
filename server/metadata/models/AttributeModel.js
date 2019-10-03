const _ = require('lodash');
const constants = require('../constants');

class AttributeModel {
  constructor(payload, attrGrpKey, language = 'en') {
    payload.valueSet = payload.valueSet === null ? '' : payload.valueSet;
    this.enabled = payload.enabled;
    this.required = payload.required;
    this.default = payload.default;
    this.type = AttributeModel.getDataType(payload);
    this.manifest = payload.manifest;
    this.flexValueSetId = payload.flexValueSetId;
    this.value = '';
    this.key = payload.name;
    this.isUniqueKey = payload.isUniqueKey;
    this.id = payload.uuid;
    this.displayName = AttributeModel.getDisplayName(payload.displayNames, language) || '';
    this.name = this.displayName;
    this.toolTip = AttributeModel.getToolTip(payload.toolTips, language) || '';
    this.rules = AttributeModel.getRules(payload.rules, language) || [];
    this.options = AttributeModel.getOptions(payload);
    this.regexRule = AttributeModel.getRegexRule(this.rules);
    this.attributeGroupKey = attrGrpKey
  }

  static getDisplayName(displayNames, language) {
    return (_.find(displayNames, o => o.lang === language) || {}).displayName;
  }

  static getToolTip(tooltips, language) {

    return (_.find(tooltips, o => o.lang === language) || {}).toolTip;
  }

  static getRules(rules = [], language) {
    _.forIn(rules, (o) => {
      o.message = (o.messages.find(message => message.lang === language) || {}).message || ''; // eslint-disable-line no-param-reassign, max-len
    });
    return rules;
  }

  static getOptions(payload) {
    if (payload.valueSet) {
      return payload.valueSet.values;
    }
    return constants.DEFAULTVALUESET;
  }

  static getRegexRule(rules) {
    const regexRuleObject = rules.find(rule => rule.ruleType === constants.REGEX);
    if (regexRuleObject) {
      return regexRuleObject.definition;
    }
    return '';
  }

  static getDataType({ dataType, valueSet, ...otherProps }) {
    if ((dataType === 'String' && valueSet.type === 'String') || (dataType === 'String' && valueSet.type === 'Dropdown')) {
      return 'Dropdown';
    }
    else if ((dataType === 'String' && valueSet.type === 'String') || (dataType === 'String' && valueSet.type === 'Multiselect')) {
      return 'DropdownMultiSelect';
    }
    else if (dataType === 'String' && valueSet.type === 'Radio') {
      return 'Radio';
    }
    else if (dataType === 'String' && valueSet.type === 'Checkbox') {
      return 'Checkbox';
    }
    else if (dataType === 'String' && valueSet.type === 'LinkContact') {
      return 'LinkContact';
    }
    else if (dataType === 'String' && valueSet.type === 'LinkAddress') {
      return 'LinkAddress';
    };

    return dataType;
  }
}




module.exports = AttributeModel;
