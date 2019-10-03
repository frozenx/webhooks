import React from 'react';
import LabelComponent from '../';
import {shallow} from 'enzyme';

const getProps = props =>
  ({
    tooltip: 'sample tooltip',
    name: 'name',
    id: 1,
    ...props
  });

const setup = (additionalProps = {}) =>
  shallow(<LabelComponent  {...getProps(additionalProps)}
  />
);

describe('atoms/LabelComponent', () => {
  describe('Given the component is mounted', () => {
    test('then it should render the component', () => {
      const wrapper = setup();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
