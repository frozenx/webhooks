import React from 'react';
import DataAccessibility from '../';
import {shallow} from 'enzyme';

describe('it renders without crashing', () => {
    let wrapper = shallow(<DataAccessibility />);
    it('renders dataAccessibility component', () => {
        expect(wrapper).toMatchSnapshot();
    });
});