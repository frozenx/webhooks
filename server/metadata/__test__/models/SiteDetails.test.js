// const mockMath = Object.create(global.Math);
// mockMath.random = () => 10;
// global.Math = mockMath;
const SiteDetailsModel = require('../../models/SiteDetails');
const mockData = require('../mockData');

describe('Given the siteDetails Model is instantiated', () => {
  test('it should initialize the instance variables', () => {
    const mockPayload = mockData.siteDetailsMock;
    const model = new SiteDetailsModel(mockPayload);
    const { expectedSiteDetailsModel } = mockData;
    expect(model).toEqual(expectedSiteDetailsModel);
  });
  test('should fail when the passed data structure is wrong', () => {
    const site = mockData.mockDataWrongStructureForSite;
    expect(() => {
      const model = new SiteDetailsModel(site);
    }).toThrow(TypeError);
  });
});
