import React from 'react';
import SupplierDetails from '../';

import Enzyme, {shallow} from 'enzyme';



describe('render SupplierDetails component inside index file', () =>{
    let Wrapper;

    let editSupplierData = {
          supplierName: "Test Supplier Name",
          companiesHouseName: "Test Companies House Name",
          companyRegistrationNumber: "Test 123456",
          vatNumber: "Test 09876"
  };

  let supplierData = ["supplierName","companiesHouseName","companyRegistrationNumber","vatNumber"];

  
    
    beforeEach(() => {
         Wrapper = shallow(<SupplierDetails supplierData={supplierData} editSupplierData ={editSupplierData}/>);
    });

    it('renders the SupplierDetails component', () => {
        expect(Wrapper).toMatchSnapshot();
    });

});