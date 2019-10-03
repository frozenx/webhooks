import React from 'react';
import WithPagination from '../'
import {shallow} from 'enzyme'

describe('molecules/HOC', () => {
    describe('Given the Hoc component is mounted', () => {
        test('it should render the markup' , () => {
            const tree = shallow(<WithPagination />)
            expect(tree).toMatchSnapshot()
        })
    })
})