

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import AccordionGroup from '..';

jest.mock('../../../../lib/components/accordion/components/accordion', () => (props) => (<div {...props} />));

describe('molecules/accordion-group', () => {
    describe('Given the component is mounted', () => {
        let mockProps;
        beforeEach(() => {
            mockProps = {
                attributeGroups: [{
                    id: 'id1',
                    name: 'id1',
                    attributes: []
                }, {
                    id: 'id2',
                    name: 'id2',
                    attributes: []
                }],
                currentAccordion: 'id1',
                setAccordion: jest.fn(),
                indicators: {
                    id1: {
                        value: 'some value',
                        variant: "error"
                    }
                }
            };
        });
        test('it should render the markup', () => {
            const tree = renderer.create(<AccordionGroup {...mockProps} />).toJSON();
            expect(tree).toMatchSnapshot();

        });
        test('it should open accordion if the  accordion group action is open', (done) => {
            const Wrapper = shallow(<AccordionGroup {...mockProps} />);
            Wrapper.find('#id2').simulate('change', { action: 'open' });
            setTimeout(() => {
                expect(mockProps.setAccordion).toHaveBeenCalledWith('id2');
                done();
            }, 0);
        });
        test('it should close accordion if the  accordion group action is close', (done) => {
            const Wrapper = shallow(<AccordionGroup {...mockProps} />);
            Wrapper.find('#id2').simulate('change', { action: 'close' });
            setTimeout(() => {
                expect(mockProps.setAccordion).toHaveBeenCalledWith('');
                done();
            }, 0);
        });
        test('it should not handle setAccordion event if its not an open/close event on the accordion', (done) => {
            const Wrapper = shallow(<AccordionGroup {...mockProps} />);
            Wrapper.find('#id2').simulate('change', {});
            setTimeout(() => {
                expect(mockProps.setAccordion).not.toHaveBeenCalled();
                done();
            }, 0);
        });
    })
});