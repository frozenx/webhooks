import React from 'react';
import InputTypes from '../';
import { shallow } from 'enzyme';
import { ErrorMsg } from '../../../../common/styles';

let errorStatus = {
  name: false,
}

const getProps = props =>
  ({
    id: 1,
    name: 'name',
    type: 'text',
    rules: 'regex string',
    values: {},
    errors: {},
    isDisabled: false,
    ...props
  });

const setup = (additionalProps = {}) =>
  shallow(<InputTypes
    attr={{ id: 1, rules: [{ messages: [{ message: 'some message' }] }] }}
    {...getProps(additionalProps)}
  />
  );


describe('atoms/InputType', () => {
  describe('Given the component is mounted', () => {
    test('then it should render the markup', () => {
      const wrapper = setup();
      expect(wrapper).toMatchSnapshot();
    });
  });
  test('should render the error component if errors exist', () => {
    const Wrapper = shallow(<InputTypes attr={{ id: 1, rules: [{ messages: [{ message: 'some message' }] }] }} id={1} errors={{ '1': 'some error' }} values={{}} />);
    expect(Wrapper.find('#input-type--error').length).toEqual(1);
  });
});


