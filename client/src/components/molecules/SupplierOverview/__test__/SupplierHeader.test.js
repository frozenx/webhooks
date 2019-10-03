import React from "react";
import { shallow } from "enzyme";
import SupplierHeader from "../SupplierHeader";

describe("Supplier header overview card component", () => {
  let Wrapper, partnerAttributes;
  const supplierHeaderData = {
   partnerAttributes : [
    {
      attributeGroup: "partner",
      attributes: [
        {name: "partnerName", values: [{value: "Uniliver", lang: "en"}]},
        {name: "CompanyHouseName", values: [{value: "uni", lang: "en"}]},
        {name: "CompanyRegistrstionNumber", values: [{value: "1", lang: "en"}]},
        {name: "VatNumber", values: [{value: "1", lang: "en"}]},
      ]
    }
  ]
}

const partnerName = "Uniliver"

  beforeEach(() => {
    Wrapper = shallow(<SupplierHeader supplierHeaderData={supplierHeaderData} partnerName={partnerName}/>);
  });

  it("renders the component", () => {
    expect(Wrapper).toMatchSnapshot();
  });
});
