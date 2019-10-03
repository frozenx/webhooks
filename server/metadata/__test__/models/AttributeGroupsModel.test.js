jest.mock('../../models/AttributeModel');

const AttributeGroupsModel = require('../../models/AttributeGroupsModel');
const AttributeModel = require('../../models/AttributeModel');
const mockData = require('../mockData');

describe('Given the AttributeGroups class is instantianted', () => {
  beforeEach(() => {
    AttributeModel.mockClear();
    AttributeModel.mockImplementation(() => ({}));
  });
  test('then it should initialize the instance variables', () => {
    const attributeGroups = mockData.attributeGroupsPayload;
    const model = new AttributeGroupsModel(attributeGroups);
    const { expectedAttributesGroupModel } = mockData;
    expect(model).toEqual(expectedAttributesGroupModel);
  });
});
