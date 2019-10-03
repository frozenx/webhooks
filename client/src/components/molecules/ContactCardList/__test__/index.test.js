import React from 'react';
import ContactCardList from '../'
import renderer from 'react-test-renderer'

describe('molecules/CardList', () => {
    describe('Given the CardList component is mounted', () => {
        test('it should render the markup' , () => {
            const tree = renderer.create(<ContactCardList />).toJSON
            expect(tree).toMatchSnapshot()
        })
    })
})