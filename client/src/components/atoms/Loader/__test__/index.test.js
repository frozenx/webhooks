import React from 'react';
import Loader from '../';
import {shallow} from 'enzyme';

describe('renders without crashing', () => {
    let Wrapper = shallow(<Loader />);
    it('renders the Loader component', () => {
        expect(Wrapper).toMatchSnapshot();
    });
});