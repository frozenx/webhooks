import React from 'react';
import RadioType from '..';
import { shallow } from 'enzyme';

let options = ["Mr", "Mrs"];

const getProps = props =>
  ({
    values: {},
    errors: {},
    isDisabled: true,
    ...props
  });

const setup = (additionalProps = {}) =>
  shallow(<RadioType
    disabled={false}
    attr={{ id: 1, options, name: "One time supplier?" }}
    {...getProps()}
  />
  );


describe('atoms/RadioType', () => {
  describe('GIven the component is mounted', () => {
    test('then it should render the markup', () => {
      const wrapper = setup({});
      expect(wrapper).toMatchSnapshot();
    });
    test('then it should render the Error component is errors prop exists', () => {
      const Wrapper = shallow(<RadioType
        attr={{ id: 1, options }}
        id={1}
        errors={{ 1: 'some error' }}
        values={{}}
      />);
      expect(Wrapper.find('#radio-type--error').length).toEqual(1);
    });
  })
});


