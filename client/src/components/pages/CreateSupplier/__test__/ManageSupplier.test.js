import React from "react";
import renderer from 'react-test-renderer';
import ManageSupplier from "../ManageSupplier";
import { DefaultThemeProvider } from '@beans/theme';

describe("Manage Supplier", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = renderer.create(
      <DefaultThemeProvider>
        <ManageSupplier />
      </DefaultThemeProvider>).toJSON();
  });

  test("renders the manage supplier component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
