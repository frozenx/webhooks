import mockData from './mockData';

describe('testing mockData', () => {
  test('should return /tradingpartner/manage on click of managesupplier', () => {
    const actualResult = mockData.expectedMenuItems[0].altLink();
    expect(actualResult.props.to).toEqual('/tradingpartner/manage');
  });
  test('should return /tradingpartner on click of createsupplier', () => {
    const actualResult = mockData.expectedMenuItems[1].altLink();
    expect(actualResult.props.to).toEqual('/tradingpartner');
  });
});
