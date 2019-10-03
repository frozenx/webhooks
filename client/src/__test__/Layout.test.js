import React from 'react';
import {shallow} from 'enzyme'
import Layout from '../Layout';

describe('Given the Layout component is rendered', () => {
    beforeAll(() => {
        const getYearMock = jest.fn().mockReturnValue('some year');
        window.document.Date = jest.fn().mockImplementation(() => ({
            getFullYear: getYearMock
        }));
    });
    afterAll(() => {
        window.document.Date.restore();
    });
    test('it should render the markup', () => {
        const tree = shallow(<Layout />);
        expect(tree).toMatchSnapshot();
    });
});