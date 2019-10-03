import React from 'react';
import {EditSupplierDetails} from '../';

import Enzyme, {shallow} from 'enzyme';



describe('render EditSupplierDetails component inside index file', () =>{
    let Wrapper;

    let mockEditSupplierData = {
          supplierName: "Test Supplier Name",
          companiesHouseName: "Test Companies House Name",
          companyRegistrationNumber: "Test 123456",
          vatNumber: "Test 09876"
  };
   let mockEditSupplierDataEmpty = {
        supplierName: "",
        companiesHouseName: "",
        companyRegistrationNumber: "",
        vatNumber: ""
   }

    let mockSupplierData = ["supplierName","companiesHouseName","companyRegistrationNumber","vatNumber"];
    let mockHandleSupplierChange = jest.fn();
    let mockHandleSubmitSupplierDetails = jest.fn();
    beforeEach(() => {
         Wrapper = shallow(<EditSupplierDetails 
                handleSupplierChange= {mockHandleSupplierChange} 
                handleSubmitSupplierDetails={mockHandleSubmitSupplierDetails}
                editSupplierData={mockEditSupplierData} 
                supplierData={mockSupplierData} />);
    });

    it('renders the EditSupplierDetails component', () => {
        expect(Wrapper).toMatchSnapshot();
    });

    it('should call the handleSupplierChange on form element', () => {
        const form = Wrapper.find('form')
        form.simulate('change')
        expect(mockHandleSupplierChange).toHaveBeenCalled()
    })

    it('should call the handleSubmitSupplierDetails on button element', () => {
        const button = Wrapper.find('.submit-btn')
        button.simulate('click')
        expect(mockHandleSubmitSupplierDetails).toHaveBeenCalled()
    })

    it('should check the value of defaultValue should be equal to mockData', () => {
        const defaultValue = Wrapper.find('form').find("_default").last().props().defaultValue
        expect(defaultValue).toEqual(mockEditSupplierData.vatNumber)
    })

    it('should check the value of defaultValues should be empty', () => {
        Wrapper = shallow(<EditSupplierDetails 
            handleSupplierChange= {mockHandleSupplierChange} 
            handleSubmitSupplierDetails={mockHandleSubmitSupplierDetails}
            editSupplierData={mockEditSupplierDataEmpty} 
            supplierData={mockSupplierData} />);
        const defaultValue = Wrapper.find('form').find('_default').last().props().defaultValue
        expect(defaultValue).toBeFalsy()
    })


});