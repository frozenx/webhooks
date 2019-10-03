
jest.mock('../../models/AttributeGroupsModel');
const HeaderMetaDataModel = require('../../models/_supplierHeader');
const mockData = require('../mockData');
const AttributeGroupsModel = require('../../models/AttributeGroupsModel');

describe('Given the model is initialized', () => {
  let model;
  const payload = mockData.getSupplierHeaderMock;
  beforeEach(() => {
    AttributeGroupsModel.mockImplementation(() => {
      return {
        attributes: [{
          id: 'some id'
        }]
      }
    });
    model = new HeaderMetaDataModel(payload);
  });
  test('then it should initialize the instance variables', () => {
    expect(model.name).toEqual(payload.name);
    expect(AttributeGroupsModel).toHaveBeenCalledTimes(9);
  });
});
