const AttributeModel = require('./AttributeModel');

class AttributeGroupModel {
  constructor(payload, language = 'en') {
    this.id = payload.uuid;
    this.name = AttributeModel.getDisplayName(payload.displayNames, language) || '';
    this.behaviour = payload.behaviour;
    this.type = payload.type;
    this.key = payload.name;
    this.attributes = payload.attributes.sort((a, b) => a.tabIndex - b.tabIndex).map(attribute => new AttributeModel(attribute, payload.name));
  }
}

module.exports = AttributeGroupModel;
