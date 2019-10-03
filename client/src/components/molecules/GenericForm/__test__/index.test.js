import React from "react";
import GenericForm from "../";
import renderer from 'react-test-renderer';
import { shallow, mount } from "enzyme";
import { DefaultThemeProvider } from '@beans/theme';
import { mockValues, mockAttributes, mockAttributeToRulesMapping, mockErrors } from './mockData'

describe("Generic Form", () => {
    let tree,
        Wrapper,
        props;
    beforeEach(() => {
      props = {
            attributes: mockAttributes,
            values: mockValues,
            errors: mockErrors,
            attributeToRulesMapping: mockAttributeToRulesMapping ,
            isOnEditMode: true,
            isFormLocked: false,
      }
      tree = renderer.create(
        <DefaultThemeProvider>
          <GenericForm
            {...props}
          />
        </DefaultThemeProvider>
      ).toJSON();
      Wrapper = shallow(<GenericForm
        {...props}
        isOnEditMode={false}
        isFormLocked={false}
      />)

    });
    test("renders the create supplier component", () => {
      expect(tree).toMatchSnapshot();
    });
    test('should render the radio type', () => {
      expect(Wrapper.find("RadioType")).toHaveLength(2)
    })
    test('should render the select type', () => {
      expect(Wrapper.find("SelectType")).toHaveLength(1)
    })
    test('should not show TextAreaType if there is no such type', () => {
      expect(Wrapper.find("TextAreaType")).toHaveLength(1)
    })
    test('should render the basic 3 input types', () => {
      expect(Wrapper.find("InputTypes")).toHaveLength(3)
    })  
    test('should render the checkbox type', () => {
      expect(Wrapper.find('CheckboxType')).toHaveLength(1)
    })
    test('should render the LinkType type', () => {
      Wrapper = shallow(<GenericForm
        {...props}
        isOnEditMode={false}
        isFormLocked={true}
      />)
      expect(Wrapper.find('LinkType')).toHaveLength(2)
    })
});
