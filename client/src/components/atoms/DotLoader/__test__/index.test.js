import React from 'react';
import DotLoader from '../';
import {shallow} from 'enzyme';

describe('it renders without crashing', () => {
    let wrapper = shallow(<DotLoader />);
    it('renders DotLoader component', () => {
        expect(wrapper).toMatchSnapshot();
    });
});