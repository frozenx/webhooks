jest.mock('../../../hooks');

import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Header from '..';
import * as hooks from '../../../hooks';
import FormContext from '../../../context';

jest.mock('@beans/button', () => (props) => (<div {...props} />))
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
jest.mock('../../accordion-group', () => (props) => (<div {...props} />));
jest.mock('@beans/notification', () => (props) => (<div {...props} />));

describe('molecules/header', () => {
    describe('Given the component is mounted', () => {
        let mockProps;
        let contextValues = {
            values: {
                tab1: {
                    isEditJourney: true,
                    attributeGroups: [],
                    attributeToRulesMapping: {}

                }
            }
        };
        beforeEach(() => {
            mockProps = {
                submitHandler: jest.fn(),
                updateTabIndicator: jest.fn(),
                data: {
                    attributeGroups: [],
                    attributeToRulesMapping: {}
                }
            };
        });
        test('it should render the component', () => {
            const tree = shallow(<Header {...mockProps} />)
            expect(tree).toMatchSnapshot();
        });
        test('it should call the formhandler provided by the form hook on change of the form', (done) => {
            const mockEvent = { stopPropagation: jest.fn() };
            const Wrapper = shallow(

                <Header {...mockProps} context={{
                    values: {
                        tab1: {
                            isEditJourney: true,
                            attributeGroups: [],
                            attributeToRulesMapping: {}
                        }
                    }
                }} />

            );
            Wrapper.find('form').simulate('change', mockEvent);
            setTimeout(() => {
                expect(hooks.useFormHook()[2]).toHaveBeenCalledWith(mockEvent, '');
                expect(mockProps.updateTabIndicator).toHaveBeenCalled();
                done();
            }, 0);
        });
        test('it should call the submit handler passed in props on click of save button', async (done) => {
            const mockEvent = { stopPropagation: jest.fn(), preventDefault: jest.fn() };
            const context = {
                values: {
                    tab1: {
                        isEditJourney: true,
                        attributeGroups: [],
                        attributeToRulesMapping: {}
                    }
                }
            };
            const Wrapper = shallow(
                <Header {...mockProps} context={context} />, { context }
            );
            Wrapper.setContext(context);
            await Promise.resolve({});
            Wrapper.find('#save').simulate('click', mockEvent);
            setTimeout(() => {
                expect(mockProps.submitHandler).toHaveBeenCalledWith({}, 'SAVE', true);
                expect(mockEvent.stopPropagation).toHaveBeenCalled();
                expect(mockEvent.preventDefault).toHaveBeenCalled();
                done();
            }, 0);
        });
        test('it should call the submit handler passed in props on click of save button', (done) => {
            const mockEvent = { stopPropagation: jest.fn(), preventDefault: jest.fn() };
            const Wrapper = shallow(
                <Header {...mockProps} context={{
                    values: {
                        tab1: {
                            isEditJourney: true,
                            attributeGroups: [],
                            attributeToRulesMapping: {}
                        }
                    }
                }} />);
            Wrapper.find('#save-as-draft').simulate('click', mockEvent);
            setTimeout(() => {
                expect(mockProps.submitHandler).toHaveBeenCalledWith({}, 'DRAFT', true);
                expect(mockEvent.stopPropagation).toHaveBeenCalled();
                expect(mockEvent.preventDefault).toHaveBeenCalled();
                done();
            }, 0);
        });
        test('it should display notification for successful form submission ', (done) => {
            const tree = shallow(<Header {...mockProps} isSubmitSuccessful />);
            expect(tree).toMatchSnapshot();
            done();
        });

        test('it should display notification for error in form submission ', (done) => {
            const tree = shallow(<Header {...mockProps} isFormError />);
            expect(tree).toMatchSnapshot();
            done();
        });
        xtest('should not render the component given the data is empty', (done) => {
            jest.unmock('../../../hooks');
            jest.mock('../../../hooks', () => ({
                useApiHook: jest.fn().mockReturnValue({}),
                useFormHook: jest.fn().mockReturnValue([{}, {}, jest.fn()])
            }));
            const Wrapper = shallow(
                <FormContext.Provider value={{ values: contextValues.values }}>
                    <Header {...mockProps} />
                </FormContext.Provider>);
            setTimeout(() => {
                expect(Wrapper.find('#header-error').length).toEqual(1);
                done();
            }, 0);
        })
    });
});