import React from 'react';
import { shallow } from 'enzyme';
import DetailForm from '../Form';

describe('form component test cases', () => {
  let Wrapper;
  let event = {
    preventDefault: jest.fn(),
    stopPropagation: jest.fn()
  }
  beforeEach(() => {
    Wrapper = shallow(<DetailForm />);
  });

  test('render the component', () => {
    expect(Wrapper).toMatchSnapshot();
  });
  
  test('click on save and cancel should shot the defalut behaviour', () => {

    Wrapper.find('.submit-btn').simulate('click', event);
    Wrapper.find('#save').simulate('click', event);
    expect(event.preventDefault).toHaveBeenCalledTimes(2);
    expect(event.stopPropagation).toHaveBeenCalledTimes(2);
  });
});
