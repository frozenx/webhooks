import React from "react";
import SecondaryNavigation from "..";
import { shallow } from 'enzyme';
import mockData from './mockData';

describe("Secondary navigation test cases", () => {
  test("should render the mark up", () => {
    const tree = shallow(<SecondaryNavigation />);
    expect(tree).toMatchSnapshot();
  });
 test('should return the expected menu items', () => {
   const tree = shallow(<SecondaryNavigation />)
   expect(JSON.stringify(tree.state().resolvedNavigations.menuItems)).toEqual(JSON.stringify(mockData.expectedMenuItems))
 })
 test('should route to /tradingpartner/manage clicking on managesupplier', () => {
   const tree = shallow(<SecondaryNavigation />)
   const altLinkComponent = tree.state().resolvedNavigations.menuItems[0].altLink;
   expect(altLinkComponent().props.to).toEqual('/tradingpartner/manage');
 })
 test('should route to /tradingpartner clicking on createsupplier', () => {
  const tree = shallow(<SecondaryNavigation />)
  const altLinkComponent = tree.state().resolvedNavigations.menuItems[1].altLink;
  expect(altLinkComponent().props.to).toEqual('/tradingpartner');
})
});
