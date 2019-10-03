import React from 'react';
import TextAreaType from '..';
import { shallow } from 'enzyme';

const getProps = props =>
    ({
        id: 1,
        name: 'name',
        type: 'text',
        rules: 'regex string',
        values: {},
        errors: {},
        isDisabled: false,

        ...props
    });

const setup = (additionalProps = {}) =>
    shallow(<TextAreaType
        {...getProps(additionalProps)}
        attr={{ id: 1, rules: [{ messages: [{ message: 'some message' }] }] }} />
    );

describe('atoms/TextAreaType', () => {
    describe('Given the component is mounted', () => {
        test('then it should render the markup', () => {
            const wrapper = setup();
            expect(wrapper).toMatchSnapshot();
        });
        test('then it should render the Error Msg component when errors field is passed', () => {
            const Wrapper = shallow(<TextAreaType
                attr={{ id: 1, rules: [{ messages: [{ message: 'some message' }] }] }} id={1} values={{}} errors={{ 1: "some error" }} />);
            expect(Wrapper.find('#text-area-type--error').length).toEqual(1);
        });
    });
});