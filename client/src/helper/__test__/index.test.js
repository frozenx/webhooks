import helper from '..';
import mockData from './mockData';

describe('helper test cases', () => {
  test('should return an object of passed path name', () => {
    const actualResponse = helper.extractCurrentPageAccess(
      mockData.mockActualPathName,
      mockData.mockContext,
    );
    expect(actualResponse).toEqual({});
  });
  test('should return an array of data which is passed for rendering the table for tab2', () => {
    const actualResponse = helper.createRow(mockData.createSiteMockData, 'tab2');
    expect(actualResponse).toEqual(mockData.rowDataForCreateSite);
  });
  test('should return an array of data which is passed for rendering the table for tab3', () => {
    const actualResponse = helper.createRow(mockData.createPaymentMockData, 'tab3');
    expect(actualResponse).toEqual(mockData.rowDataForCreatePayment);
  });
  test('should return an array of merged data with updated properties', () => {
    const actualResponse = helper.mergeArrayAndUpdateProperites(mockData.mockExistingData, mockData.mockUpdatedData);
    expect(actualResponse).toEqual(mockData.mockExpectedMergedData);
  });
});
