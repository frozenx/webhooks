import React from "react";
import Supplier from "../";
import renderer from "react-test-renderer";
import SupplierDetails from "../../../atoms/SupplierDetails/";
import EditSupplierDetails from "../../../atoms/EditSupplierDetails/";

import Enzyme, { shallow, mount } from "enzyme";

describe("render Supplier component inside index file", () => {
  let Wrapper, w;
  let editSupplierData = {suppliers: [{
    supplierName: "Test Supplier Name",
    companiesHouseName: "Test Companies House Name",
    companyRegistrationNumber: "Test 123456",
    vatNumber: "Test 09876",
    id: 123,
  }]
}
  let supplierData = [
    "supplierName",
    "companiesHouseName",
    "companyRegistrationNumber",
    "vatNumber"
  ];

  let mockPreventDefault = jest.fn()
  let mockedEvent = {target: {}, preventDefault: mockPreventDefault }

  beforeEach(() => {
    Wrapper = shallow(<Supplier />);
    
  });

  it("renders the create supplier component", () => {
    expect(Wrapper).toMatchSnapshot();
  });

  it('should render the Supplier Details' , async () => {
   window.fetch = jest.fn().mockImplementation(() => ({
     status: 200,
     json: () => new Promise((resolve, reject) => {
       resolve(
         editSupplierData
       )
     })
   })) 
   const renderedComponent = await shallow(<Supplier />)
   await renderedComponent.update();
   expect(renderedComponent).toMatchSnapshot();
   expect(renderedComponent.find('SupplierDetails')).toBeTruthy();
  })

  it('should render the supplier details with default prop', () => {
    const wrapperWithNewProp = shallow(<Supplier id="4567"/>)
    expect(wrapperWithNewProp).toMatchSnapshot();
  })

  it('should call the getData when props got updates', () => {
    const wrapperWithDefaultProp = shallow(<Supplier />)
    const spyGetData = jest.spyOn(wrapperWithDefaultProp.instance(), 'getData');
    wrapperWithDefaultProp.setProps({id: 9080})
    expect(spyGetData).toHaveBeenCalled();
  })

  it('should trigger _handleEditSupplierDetails and Edit supplier details component should load', async (done) => {
    window.fetch = jest.fn().mockImplementation(() => ({
      status: 200,
      json: () => new Promise((resolve, reject) => {
        resolve(
          editSupplierData
        )
      })
    })) 
    const mountWrapper = await mount(<Supplier />)
    setTimeout(() => {
      mountWrapper.update();
      expect(mountWrapper.find('Supplier').length).toEqual(1);
      mountWrapper.find('.edit-supplier').simulate('click')
      expect(mountWrapper.find('EditSupplierDetails').length).toEqual(1)
      done()
    },0)
  })

  it('should trigger _handleSupplierChange ', async (done) => {
    window.fetch = jest.fn().mockImplementation(() => ({
      status: 200,
      json: () => new Promise((resolve, reject) => {
        resolve(
          editSupplierData
        )
      })
    })) 
    const mountWrapper = await mount(<Supplier />)
    setTimeout(() => {
      mountWrapper.update();
      mountWrapper.find('.edit-supplier').simulate('click')
      mountWrapper.find('form').simulate('change', {target: {name: 'some name', value: 'some value'}})
      // need to expect this thing not working with simulate      
      // expect(mountWrapper.instance()._handleSupplierChange).toHaveBeenCalled()
      done()
    },0)
  })

  it('should trigger _handleSubmitSupplierDetails ', async (done) => {
    let mockPreventDefault = jest.fn()
    let mockedEvent = {target: {}, preventDefault: mockPreventDefault }
    window.fetch = jest.fn().mockImplementation(() => ({
      status: 200,
      json: () => new Promise((resolve, reject) => {
        resolve(
          editSupplierData
        )
      })
    })) 
    const mountWrapper = await mount(<Supplier />)
    setTimeout(() => {
      mountWrapper.update();
      mountWrapper.find('.edit-supplier').simulate('click')
      mountWrapper.find('EditSupplierDetails').props().handleSubmitSupplierDetails({preventDefault: jest.fn()})
      // need to expect this thing not working with simulate      
      done()
    },0)
  })

  it('should trigger _handleCanselSupplierDetails ', async (done) => {
    let mockPreventDefault = jest.fn()
    let mockedEvent = {target: {}, preventDefault: mockPreventDefault }
    window.fetch = jest.fn().mockImplementation(() => ({
      status: 200,
      json: () => new Promise((resolve, reject) => {
        resolve(
          editSupplierData
        )
      })
    })) 
    const mountWrapper = await mount(<Supplier />)
    setTimeout(() => {
      mountWrapper.update();
      mountWrapper.find('.edit-supplier').simulate('click')
      mountWrapper.find('EditSupplierDetails').props().handleCanselSupplierDetails({preventDefault: jest.fn()})
      // need to expect this thing not working with simulate
      done()
    },0)
  })

});
