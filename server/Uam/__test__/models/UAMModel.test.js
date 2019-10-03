const UAMModel = require('../../models/UAMModel');
const mockData = require('../mockData');

describe('Given the UAMModel class is instantianted', () => {
  test('should return a expected UAM Model consist of resolved access list', () => {
    const uam = mockData.uamModelMockData;
    const model = new UAMModel(uam);
    const { expectedUamModelMockData } = mockData;
    expect(model).toEqual(expectedUamModelMockData);
  });
  test('should throw an error when extracting resources', () => {
    const uam = mockData.uamFailMockDataExtractResources;
    expect(() => {
      const model = new UAMModel(uam);
    }).toThrow(TypeError);
  });
  test('should throw an error when resolving access list', () => {
    const uam = mockData.uamFailMockDataResolveAccessList;
    expect(() => {
      const model = new UAMModel(uam);
    }).toThrow(TypeError);
  });
  test('should take default value for params', () => {
    const uam = mockData.uamDefaultObjectMockData;
    const model = new UAMModel(uam);
    expect(() => {
      model.resolveAccessList();
    }).toThrow();
  });
});
