import React from 'react';
import PaginationComponent from '../'
import {shallow} from 'enzyme'

describe('molecules/PaginationComponent', () => {
    describe('Given the Pagination component is mounted', () => {
        test('it should render the markup' , () => {
            const mockProps = {
                hrefTemplate : 'sample url',
                totalResults: 10,
                pageControlsText : "sample page text",
                onChangeResultsPerPage: jest.fn()
            };
            const tree = shallow(<PaginationComponent {...mockProps}/>);
            expect(tree).toMatchSnapshot()
        })
    })
})