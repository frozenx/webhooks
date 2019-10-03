import React from 'react';
import Error from '..';
import {shallow} from 'enzyme';

describe('it renders without crashing', () => {
    let wrapper = shallow(<Error />);
    it('renders Error component', () => {
        expect(wrapper).toMatchSnapshot();
    });
});