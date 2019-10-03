jest.mock('../../lib/httpClient');
import React from 'react';
import {shallow} from 'enzyme'
import Router from '..';

describe('Given the Router component is rendered', () => {
    test('it should render the markup', () => {
        const tree = shallow(<Router />);
        expect(tree).toMatchSnapshot();
    });
});
