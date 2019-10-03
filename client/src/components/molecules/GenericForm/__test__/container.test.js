import React from 'react';
import GenericFormContainer from '../container';
import renderer from 'react-test-renderer';
import { DefaultThemeProvider } from '@beans/theme';
import { mockValues, mockAttributes, mockAttributeToRulesMapping, mockErrors } from './mockData'

describe('render genericForm component inside index file', () =>{
  let tree;
  beforeEach(() => {
    tree = renderer.create(
      <DefaultThemeProvider>
        <GenericFormContainer
        attributesToRulesMapping = {mockAttributeToRulesMapping}
        attributes = {mockAttributes}
        values = {mockValues}
        errors = {mockErrors}
        />
      </DefaultThemeProvider>
      ).toJSON();
  })    
    test('renders the GenericFormContainer', () => {
        expect(tree).toMatchSnapshot();
    });
});
