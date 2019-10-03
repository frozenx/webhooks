const AttributeModel = require('../../models/AttributeModel');
const mockData = require('../mockData');

describe.only('Given the Attribute Model is instantiated', () => {
  test('it should initialize the instance variables', () => {
    const mockPayload = mockData.mockAttributeObject;
    const model = new AttributeModel(mockPayload);
    const { expectedAttributeModel } = mockData;
    expect(model).toEqual(expectedAttributeModel);
  });
  test('it should initialize default values for rules, tooltip, displayname given language entry does not exist', () => {
    const mockPayload = mockData.mockAttributeObject;
    const model = new AttributeModel(mockPayload, 'th');
    const { expectedDefaultAttributeModel } = mockData;
    expect(model).toEqual(expectedDefaultAttributeModel);
  });
  test('should check whether select type data is returning', () => {
    const mockPayload = mockData.mockAttributeSelectObject;
    const model = new AttributeModel(mockPayload);
    const { expectedSelectAttributeModel } = mockData;
    expect(model).toEqual(expectedSelectAttributeModel);
  });
});
