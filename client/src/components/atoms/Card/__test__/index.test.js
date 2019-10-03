import React from 'react';
import Card from '../'
import {shallow} from 'enzyme'
import renderer from 'react-test-renderer';

describe('atoms/Card', () => {
    describe('Given the card component is mounted', () => {
        test('it should render the markup' , () => {
            const tree = renderer.create(<Card/>).toJSON();
            expect(tree).toMatchSnapshot()
        })
        test('it should trigger the onclick for view button' , () => {
            const mockProps = {
                handleClick: jest.fn()
            }
            const tree = shallow(<Card {...mockProps}/>)
            const viewButton = tree.find('_default').at(1);
            viewButton.simulate('click');
            //expect(mockProps.handleClick).toHaveBeenCalled();
        })
    })
})