import React from "react";
import { shallow } from "enzyme";
import AddDetails from "../AddDetails";

describe("add site & payment card component test cases", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AddDetails />);
  });

  it("render the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
