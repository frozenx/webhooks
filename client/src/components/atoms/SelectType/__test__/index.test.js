import React from 'react';
import SelectType from '../';
import { shallow } from 'enzyme';
import { ErrorMsg } from '../../../../common/styles';

let options = ["English", "Thai"];

const getProps = props =>
  ({
    name: 'name',
    type: 'text',
    rules: 'regex string',
    values: {},
    errors: {},
    isDisabled: false,
    ...props
  });

const setup = (additionalProps = {}) =>
  shallow(<SelectType
    attr={{ id: 1, options, rules: [{ messages: [{ message: 'some message' }] }] }}
    {...getProps(additionalProps)}
  />
  );


describe('atoms/SelectType', () => {
  test('should render the markup', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
  test('should render the Error Component if the errors props is set', () => {
    const Wrapper = shallow(<SelectType
      attr={{ id: 1, options, rules: [{ messages: [{ message: 'some message' }] }] }}
      errors={{ 1: 'some error' }}
      values={{}}
    />);
    expect(Wrapper.find('#select-type--error'));

  });
});


