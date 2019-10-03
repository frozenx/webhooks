import React from 'react';
import ContactBook from '../'
import {shallow} from 'enzyme';

describe('molecules/AddressBook', () => {
    describe('Given the AddressBook component is mounted', () => {
        test('it should render the markup' , () => {
            const tree = shallow(<ContactBook />)
            expect(tree).toMatchSnapshot()
        })
    })
})