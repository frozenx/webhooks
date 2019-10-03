jest.mock('../../../lib/httpClient');

import React from 'react';
import hooks, { useApiHook, useFormHook, useIndicatorHook, useEditJourneyHook, useFormValidHook } from '..';
import httpClient from '../../../lib/httpClient';
// import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

describe('hooks', () => {
    let attributeGroups;
    beforeEach(() => {
        attributeGroups = [{
            name: 'id1',
            attributes: [{ key: 'attr-id1' }]
        }, {
            name: 'id2',
            attributes: [{ key: 'attr-id2' }]
        }];
    });
    describe('useApiHook', () => {
        let data;

        beforeEach(() => {
            window.fetch = jest.fn();
            httpClient.get.mockClear();
            httpClient.post.mockClear();
        });
        afterEach(() => {

        });
        test('should call http client get method with passed url ', (done) => {
            httpClient.get.mockResolvedValue('some data');
            const CustomComponent = () => {
                const data = useApiHook('some url', false, {});
                return (<React.Fragment />);
            };
            const tree = mount(<CustomComponent />);
            setTimeout(() => {
                expect(httpClient.get).toHaveBeenCalledWith('some url');
                done();
            }, 0);


        });
        test('should not call http client get method with passed url if preset flag is false', (done) => {
            httpClient.get.mockResolvedValue('some data');
            const CustomComponent = () => {
                const data = useApiHook('some url', true, {});
                return (<React.Fragment />);
            };
            const tree = mount(<CustomComponent />);
            setTimeout(() => {
                expect(httpClient.get).not.toHaveBeenCalled();
                done();
            }, 0);


        });
        xtest('should call the http client with post method with passed url and payload', () => {
            httpClient.post.mockResolvedValue('some data');
            const CustomComponent = () => {
                const data = useApiHook('some url', { key: 'value' });
                return (<React.Fragment />);
            };
            const tree = mount(<CustomComponent />);
            setTimeout(() => {
                expect(httpClient.post).toHaveBeenCalledWith('some url', { key: 'value' });
                done();
            }, 0);
        });
        test('should return empty data given the httpClient call throws an error', (done) => {
            httpClient.get.mockRejectedValue('some data');
            const CustomComponent = () => {
                const data = useApiHook('some url', false);
                return (<React.Fragment />);
            };
            const tree = mount(<CustomComponent />);
            setTimeout(() => {
                expect(httpClient.get).toHaveBeenCalled();
                done();
            }, 0);
        });
    });
    describe('useFormHook', () => {
        let payload = {};
        beforeEach(() => {
            payload.attributes = attributeGroups;
            payload.attributeToRulesMapping = {
                'element-id1': {
                    regexRule: /[A-Z]/
                },
                'element-id2': {
                    regexRule: ''
                }
            };
        });
        test('should return the values, errors and formHandler', async () => {
            let values, errors, formHandler;
            const CustomComponent = () => {
                [values, errors, formHandler] = useFormHook(payload.attributes, payload.attributeToRulesMapping);
                return (<React.Fragment />);
            }
            const Wrapper = mount(<CustomComponent />);
            await Promise.resolve({});
            expect(values).toEqual({ "id1": { "attr-id1": "" }, "id2": { "attr-id2": "" } });
            expect(errors).toEqual({ "id1": { "attr-id1": "" }, "id2": { "attr-id2": "" } })
            formHandler({ target: { id: 'element-id1', value: "some value" } }, 'id1');
            await Promise.resolve({});
            expect(errors).toEqual(
                { "id1": { "attr-id1": "", "element-id1": "some value" }, "id2": { "attr-id2": "" } }
            );
            formHandler({ target: { id: 'element-id1', value: "VALUE" } }, 'id1');
            await Promise.resolve({});
            expect(values).toEqual({ "id1": { "attr-id1": "", "element-id1": "VALUE" }, "id2": { "attr-id2": "" } });
            formHandler({});
            expect(values).toEqual({ "id1": { "attr-id1": "", "element-id1": "VALUE" }, "id2": { "attr-id2": "" } });
        });

        test('should handle default state given attributes, attributeToRulesMapping is not passed to form hook', async () => {
            let values, errors, formHandler;
            const CustomComponent = () => {
                [values, errors, formHandler] = useFormHook();
                return (<React.Fragment />);
            }
            const Wrapper = mount(<CustomComponent />);
            await Promise.resolve({});
            expect(values).toEqual({});
            expect(errors).toEqual({})
        });

    });
    describe('useIndicatorHook', () => {
        let values, attributeToRulesMapping;
        beforeEach(() => {
            values = {
                'id1': { 'attr-id1': 'value1' },
                'id2': { 'attr-id2': '$$$' }
            };
            attributeToRulesMapping = {
                'attr-id1': { regexRule: /[a-z]/, isRequired: true },
                'attr-id2': { regexRule: /[0-9]/, isRequired: false }
            }
        });
        test('should return the indicator value for each accordion and aggregate indicator value for tab', () => {
            let indicatorValues;
            const CustomComponent = () => {
                indicatorValues = useIndicatorHook(attributeGroups, values, attributeToRulesMapping);
                return <React.Fragment />
            };
            const expectedIndicatorValues = {
                "averageIndicatorVariant": "warning",
                "averageValue": "50",
                "id1": { "value": "100", "variant": "success" },
                "id2": { "value": "0", "variant": "error" }
            };
            mount(<CustomComponent />);
            expect(indicatorValues).toEqual(expectedIndicatorValues);
        });
    });
    describe('useEditJourneyHook', () => {
        beforeEach(() => {
            httpClient.get.mockClear();
            httpClient.post.mockClear();
            httpClient.get.mockResolvedValue({
                attributes: 'some attributes',
                attributeToRulesMapping: 'some mapping'
            });
        });
        test('should call promise Wrapper for each tab given the supplier id is present ( i.e its editjourney )', (done) => {
            let editJourneyValues;
            const CustomComponent = () => {
                editJourneyValues = useEditJourneyHook('some id');
                return <React.Fragment />
            }
            const expectedValues = {
                "tab1":
                    { "attributeGroups": [], "attributeToRulesMapping": {}, "isEditJourney": false },
                "tab2":
                    { "attributeGroups": [], "attributeToRulesMapping": {}, "isEditJourney": false },
                "tab3":
                    { "attributeGroups": [], "attributeToRulesMapping": {}, "isEditJourney": false }
            }
            const Wrapper = mount(<CustomComponent />);
            setTimeout(() => {
                expect(httpClient.get).toHaveBeenCalledTimes(3);
                expect(editJourneyValues).toEqual(expectedValues);
                done();
            }, 0);

        });
        test('should not call promise Wrapper for each tab given the supplier id is present ( i.e its editjourney )', (done) => {
            let editJourneyValues;
            const CustomComponent = () => {
                editJourneyValues = useEditJourneyHook();
                return <React.Fragment />
            }

            const Wrapper = mount(<CustomComponent />);
            setTimeout(() => {
                expect(httpClient.get).not.toHaveBeenCalled()
                done();
            }, 0);

        });
        test('should set default data ( initial state ) each tab given the api call fails', (done) => {
            let editJourneyValues;
            httpClient.get.mockRejectedValue("some value");
            const CustomComponent = () => {
                editJourneyValues = useEditJourneyHook('some id');
                return <React.Fragment />
            }
            const expectedValues = {
                "tab1":
                    { "attributeGroups": [], "attributeToRulesMapping": {}, "isEditJourney": false },
                "tab2":
                    { "attributeGroups": [], "attributeToRulesMapping": {}, "isEditJourney": false },
                "tab3":
                    { "attributeGroups": [], "attributeToRulesMapping": {}, "isEditJourney": false }
            }
            const Wrapper = mount(<CustomComponent />);
            setTimeout(() => {
                expect(httpClient.get).toHaveBeenCalled();
                expect(editJourneyValues).toEqual(expectedValues);
                done();
            }, 0);

        });
    });
    describe('useFormValidHook', () => {
        let errors;
        test('should return false given the error object has non empty value for some attribute', () => {
            errors = {
                'accordion-id1': {
                    'attr-id1': '123'
                }
            };
            let isFormValid;
            const CustomComponent = () => {
                isFormValid = useFormValidHook(errors);
                return <React.Fragment />
            };
            mount(<CustomComponent />);
            expect(isFormValid).toEqual(false);
        });
        test('should return true given the error object does not have non empty value for some attribute', () => {
            errors = {
                'accordion-id1': {
                    'attr-id1': ''
                }
            };
            let isFormValid;
            const CustomComponent = () => {
                isFormValid = useFormValidHook(errors);
                return <React.Fragment />
            };
            mount(<CustomComponent />);
            expect(isFormValid).toEqual(true);
        });
    });
});