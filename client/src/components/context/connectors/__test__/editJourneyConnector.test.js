import React from 'react';
import EditJourneyConnector from '../editJourneyConnector';
import renderer from 'react-test-renderer';
import * as hooks from '../../../hooks';



jest.mock('../../../hooks', () => ({
    useApiHook: jest.fn().mockReturnValue({
        attributeGroups: [
            {
                id: 'id1',
                attributes: []
            },
            {
                id: 'id2',
                attributes: []
            }
        ],
        attributeToRulesMapping: {}
    }),
    useFormHook: jest.fn().mockReturnValue([{}, {}, jest.fn()]),
    useIndicatorHook: jest.fn().mockReturnValue({ averageValue: 0, averageIndicatorVariant: 'error', tab1: {} }),
    useFormValidHook: jest.fn().mockReturnValue(true)
}))
describe('editJourneyConnector', () => {

    test('should render the component along with its children', () => {
        const tree = renderer.create(
            <EditJourneyConnector
                tabId='tab1'
                url='some url'

            >
                <div />
            </EditJourneyConnector>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});