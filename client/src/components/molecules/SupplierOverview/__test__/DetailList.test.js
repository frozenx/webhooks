import React from 'react';
import { shallow } from 'enzyme';
import DetailList from '../DetailList';

describe('list component test cases', () => {
  let Wrapper;
  let mockProps = {
    attributeGroups: [
      {
        id: 1,
        name: 'Group name',        
      }
    ],
    uuid: '12234',
    handleUUID: jest.fn(),
    handleSupplierForm: jest.fn(),
  }
  beforeEach(() => {
    Wrapper = shallow(<DetailList {...mockProps}/>);
  });

  test('render the component', () => {
    expect(Wrapper).toMatchSnapshot();
  });

  test('should pass the uuid when clicked on the formGroup', () => {
    Wrapper.find('.formGroup').simulate('click');
    expect(mockProps.handleUUID).toHaveBeenCalled();
  })
  test('should open the form when clicked on the add icon', () => {
    Wrapper.find('.add-icon').simulate('click');
    expect(mockProps.handleSupplierForm).toHaveBeenCalled();
  })
});
