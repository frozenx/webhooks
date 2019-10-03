import React from "react";
import { shallow } from "enzyme";
import SupplierForm from "../index";

describe("supplier form component test cases", () => {
  let wrapper;
  let mockProps = 
  {
    selectedAttr: [
      {
        name : 'name'
      }
    ],
    partnerName: 'Uni'
  }

  beforeEach(() => {
    wrapper = shallow(<SupplierForm {...mockProps}/>);
  });

  it("render the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
