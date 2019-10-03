import React from 'react';
import ContactCard from '../'
import {shallow} from 'enzyme'
import renderer from 'react-test-renderer';

describe('atoms/ContactCard', () => {
    describe('Given the ContactCard component is mounted', () => {
        test('it should render the markup' , () => {
            const tree = renderer.create(<ContactCard/>).toJSON();
            expect(tree).toMatchSnapshot()
        })
    })
})