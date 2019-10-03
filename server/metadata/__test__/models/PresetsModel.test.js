// const mockMath = Object.create(global.Math);
// mockMath.random = () => 10;
// global.Math = mockMath;
const PresetsModel = require('../../models/PresetsModel');
const mockData = require('../mockData');

describe('Given the Presets Model is instantiated', () => {
  test('it should initialize the instance variables', () => {
    const mockPayload = mockData.PresetsMock;
    const model = new PresetsModel(mockPayload);
    const { expectedPresetsModel } = mockData;
    expect(model).toEqual(expectedPresetsModel);
  });
  test('should fail when the passed data structure is wrong', () => {
    const presets = mockData.mockWrongPresetsModel;
    expect(() => {
      const model = new PresetsModel(presets);
    }).toThrow(TypeError);
  });
});
