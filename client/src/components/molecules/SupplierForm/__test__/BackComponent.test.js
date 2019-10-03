import React from "react";
import { shallow } from "enzyme";
import BackComponent from "../BackComponent";

describe("back component test cases", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BackComponent />);
  });

  it("render the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
