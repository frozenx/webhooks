import React from 'react';
import LinkType from '../';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { DefaultThemeProvider } from '@beans/theme';

let linkableOptions;

const getProps = props =>
  ({
    rules: 'regex string',
    errors: {},
    isDisabled: false,
    id: 1,
    linkableOptions: [{id: 1, name:'contact1', sites:[1, 2]}],
    ...props
  });

const setup = (additionalProps = {}) =>
renderer.create(
  <DefaultThemeProvider>
    <LinkType
    linkableOptions
    attr={{ id: 1, rules: [{ messages: [{ message: 'some message' }] }] }}
    {...getProps(additionalProps)}
    />
  </DefaultThemeProvider>
  ).toJSON();


describe('atoms/LinkType', () => {
    test('should create a snapshot', () => {
        const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
  test('should render the Contacts attribute for linkable contacts', () => {
    const Wrapper = shallow(<LinkType
      linkableOptions
      attr={{ id: 1, name:'Contacts', rules: [{ messages: [{ message: 'some message' }] }] }}
      {...getProps()}
    />);
    expect(Wrapper.find('LabelComponent').prop('name')).toEqual('Contacts');
  });
  test('should render the Addresses attribute for linkable address', () => {
    const Wrapper = shallow(<LinkType
      linkableOptions
      attr={{ id: 1, name:'Addresses', rules: [{ messages: [{ message: 'some message' }] }] }}
      {...getProps()}
    />);
    expect(Wrapper.find('.linkName').prop('name')).toEqual('Addresses');
  });
});