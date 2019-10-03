jest.mock('../../../../lib/httpClient')
import React from 'react';
import {shallow} from 'enzyme';
import CreateSupplier from '../CreateSupplier';
import renderer from 'react-test-renderer';
import httpClient from '../../../../lib/httpClient';
import { DefaultThemeProvider } from '@beans/theme';
import { mockResponse, mockFormData, foundSupplier } from './mockData'


describe("Creat Supplier test cases", () => {
  let Wrapper,
      tree,
      instance;
  let mockHistory= {
      push: jest.fn()
  } 

  const response = mockResponse

  beforeEach(() => {
    tree = renderer.create(
      <DefaultThemeProvider>
        <CreateSupplier history={mockHistory}/>
      </DefaultThemeProvider>
    ).toJSON();

    httpClient.get.mockResolvedValue(response);
    Wrapper = shallow(<CreateSupplier history={mockHistory}/>)
    instance = Wrapper.instance();

  });

  test("renders the create supplier component", () => {
    expect(tree).toMatchSnapshot();
  });
  test("should show the error status when api fails in", (done) => {
    let mockResponse = {
      status: 500,
      message: 'Error'
    }
    httpClient.get.mockResolvedValue(mockResponse);
    Wrapper = shallow(<CreateSupplier history={mockHistory}/>)
    instance = Wrapper.instance();
    setTimeout(() => {
      expect(Wrapper.state().displayErrorStatus).toBe(true);
      expect(Wrapper.state().displayErrorMessage).toBe(mockResponse.message)
      done();
    }, 0);
  });
  describe("form actions", () => {    
    test("should expose a method for onChange", (done) => {
        jest.spyOn(instance, '_handleChange');

      setTimeout(() => {
        Wrapper.find('form').simulate("change", { target: {  id:'partnerName', value: "123" } });
        expect(instance._handleChange).toHaveBeenCalled()        
        expect(Wrapper.state().isSupplierFound).toBe(false);      
        done();
      }, 0);
    });
    test("should render the error status onChange when value is empty", (done) => {
      Wrapper.setState({required : {name : true}})
      setTimeout(() => {
        Wrapper.find('form').simulate("change", { target: { id: "name", value: "" } });
        expect(Wrapper.state().errorStatus['name']).toBe(true)
        done();
      }, 0);
    });
  });
  describe("onSubmit of form", () => {
    let event;
    beforeEach(() => {      
      event = { preventDefault: jest.fn() };
    });
    test("should call _handleSubmit method and _handleValidation method and make a success on validating the fields", () => {
      jest.spyOn(instance, '_handleSubmit');
      jest.spyOn(instance, '_handleValidation');
      Wrapper.setState({values: mockFormData})
      Wrapper.find('.submit-btn').simulate('click', event);
      expect(instance._handleSubmit).toHaveBeenCalledWith(event)
      expect(instance._handleValidation).toHaveBeenCalled()
    });

    test("should show the error status when value is empty", () => {
      Wrapper.setState({required : {name : true}, values: mockFormData})
      Wrapper.find('form').simulate("change", { target: { id: "name", value: "" } });
      Wrapper.find('.submit-btn').simulate('click', event);
      expect(Wrapper.state().errorStatus['name']).toBe(true)
    });
    
    
    test("should throw a server error", (done) => {
      Wrapper.setState({values: mockFormData})
      let mockErrorResponse = {
        suppliers: null
      };
      httpClient.post.mockResolvedValue(mockErrorResponse)
      Wrapper.find('.submit-btn').simulate('click', event);
      setTimeout(() => {
        expect(Wrapper.state().showStepTwo).toBe(true)
        expect(Wrapper.state().showStepOne).toBe(false)
        expect(Wrapper.state().supplierHeaderData.suppliers).toBe(null)
        done()
      },0)
    });
    test("should show the error when the search results has an error", (done) => {
      Wrapper.setState({values: mockFormData})
      let mockErrorResponse = {
          errorKeys: ['companyRegNumber']        
      };
      httpClient.post.mockResolvedValue(mockErrorResponse)
      Wrapper.find('.submit-btn').simulate('click', event);
      setTimeout(() => {
        expect(Wrapper.state().errorStatus['companyRegNumber']).toBe(true)
        done()
      },0)
    });
    test("should show the results if the supplier is alredy created", async(done) => {
      Wrapper.setState({values: mockFormData})
      let mockErrorResponse = {
        suppliers: foundSupplier
      };
      httpClient.post.mockResolvedValue(mockErrorResponse)
      Wrapper.find('.submit-btn').simulate('click', event);
      setTimeout(() => {
        expect(Wrapper.state().isSupplierExists).toBe(true)
        expect(Wrapper.state().searchResults.suppliers).toEqual(foundSupplier)
        done()
      },2000)
    });
  });
});
