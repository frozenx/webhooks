import React from 'react';
import renderer from 'react-test-renderer';
import SupplierRegistration from '..';
import * as hooks from '../../../hooks'


jest.mock('../../../hooks', () => ({
    useEditJourneyHook: jest.fn().mockReturnValue({})
}))
describe('pages/supplier', () => {
    describe('Given the supplier page is mounted', () => {
        test('it should render the markup', () => {
            const mockLocation = jest.fn();
            const mockProps = { match: { params: { supplierId: 'some id' } } };
            const tree = renderer.create(<SupplierRegistration {...mockProps} location={mockLocation}/>).toJSON();
            expect(hooks.useEditJourneyHook).toHaveBeenCalled();
            expect(tree).toMatchSnapshot();
        });
    });
})