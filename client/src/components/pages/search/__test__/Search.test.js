jest.mock('../../../../lib/httpClient');

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import SearchSupplier from '../index';
import i18Data from '../../../../languagepack';
import renderer from 'react-test-renderer';
import { DefaultThemeProvider } from '@beans/theme';
import httpClient from '../../../../lib/httpClient';
import config from './confg';


describe('Given the Search component is rendered', () => {    
    let Wrapper,
        tree;
    const mockHistory = {push: jest.fn()}
    beforeEach(() => {
        window.fetch = jest.fn();
        httpClient.get.mockClear();
        tree = renderer.create(
            <DefaultThemeProvider>
                <SearchSupplier history={mockHistory}/>
            </DefaultThemeProvider>).toJSON()
        Wrapper = shallow(<SearchSupplier history={mockHistory}/>)
    })
    test('it should create a snapshot', () => {        
        expect(tree).toMatchSnapshot();
    });
    test('it should not have any error when component is rendered initially', () => {
    expect(Wrapper.find(".input-error")).toHaveLength(0);        
    });

    describe('Given the input value has changed', () => {        
        test('it should change the value of Supplier name for onChange', () => {        
            const event = {target: {id: 'name', value: 'Uniliver'}}            
            Wrapper.find('.name').simulate('change', event);                                    
            expect(Wrapper.state().inputs['name']).toBe('Uniliver')
        });
        test('it should change the value of Supplier number for onChange', () => {                    
            const event = {target: {id: 'number', value: '12345'}}        
            Wrapper.find('.number').simulate('change', event);        
            expect(Wrapper.state().inputs['number']).toBe('12345');
        });
        test('it should reset the error if it already has', () => {                    
            Wrapper.setState({error:{name: i18Data.invalidSupplierName, number: i18Data.invalidSupplierNumber} })
            const event = {target: {id: 'number', value: '12345'}}        
            Wrapper.find('.number').simulate('change', event);        
            expect(Wrapper.state().error['name']).toBe('');
            expect(Wrapper.state().error['name']).toBe('');
        });
        test('it should reset the disabled fields', () => {                    
            const event = {target: {id: 'name', value: ''}}        
            Wrapper.find('.number').simulate('change', event);
            Wrapper.setState({inputs:{name: '', number: ''} })        
            expect(Wrapper.state().disabled['name']).toBe(false);
            expect(Wrapper.state().disabled['number']).toBe(false);
        });
    });

    describe('Given for onBlur', () => {
        test('it should show error if name fails the valitation', () => {        
            const event = { target: {id: 'name', value:'uni 7-'}}
            Wrapper.find('.name').simulate('blur', event);
            expect(Wrapper.state().error['name']).toBe(i18Data.invalidSupplierName);
        });
        test('it should error if number fails the valitation', () => {        
            const event = { target: {id: 'number', value:'abc'}}
            Wrapper.find('.number').simulate('blur', event);
            expect(Wrapper.state().error['number']).toBe(i18Data.invalidSupplierNumber);
        })
        test('it should not show error if the ipult value passes the validation', () => {        
            const event = { target: {id: 'number', value:'12345'}}
            Wrapper.find('.number').simulate('blur', event);
            expect(Wrapper.state().error['number']).toBe('');
        })
    })

    describe('Given the user submits the entered value', () => {
        test('it should validate the input name', () => {        
            const event = { preventDefault: jest.fn(), target: {id: 'name', value:'uni 7-'}}            
            Wrapper.find('.name').simulate('change', event);
            Wrapper.find('.search-icon').simulate('click', event);
            expect(Wrapper.state().error['name']).toBe(i18Data.invalidSupplierName);
        });
        test('it should validate the input number', () => {        
            const event = { preventDefault: jest.fn(), target: {id: 'number', value:'abc7-'}}            
            Wrapper.find('.number').simulate('change', event);
            Wrapper.find('.last').simulate('click', event);
            expect(Wrapper.state().error['number']).toBe(i18Data.invalidSupplierNumber);
        });
        test('it should pass the validation for the valid input', () => {        
            const event = { preventDefault: jest.fn(), target: {id: 'number', value:'12345'}}            
            Wrapper.find('.number').simulate('change', event);
            Wrapper.find('.search-icon').simulate('click', event);
            expect(Wrapper.state().error['number']).toBe('');
        });
        test('it should show error when there is no input value', () => {
            const event = { preventDefault: jest.fn(), target: {id: 'name', value:''}}            
            Wrapper.find('.name').simulate('change', event);
            Wrapper.find('.search-icon').simulate('click', event);
            expect(Wrapper.state().error['name']).toBe(i18Data.supplierNameError);
        });        

        test('should show error message if there is server error', async(done) => {        
            const event = {preventDefault: jest.fn(), target: {id: "name", value: "Supplier"}}            
            Wrapper.instance()._onChange(event)
            const error = "No partner found"
            httpClient.get.mockRejectedValue({message: error});
            Wrapper.find('.search-icon').simulate('click', event);
            setTimeout(() => {
                expect(Wrapper.state().error['name']).toBe(error);
                done();
            }, 0);
        });
        test('should show error message if it there is no data', async(done) => {
            const event = {preventDefault: jest.fn(), target: {id: "name", value: "Supplier"}}
            Wrapper.instance()._onChange(event)
            const error = 'No partner found';
            httpClient.get.mockResolvedValue({
                status: 404,
                message: error
            });
            Wrapper.find('.search-icon').simulate('click', event);
            setTimeout(() => {
                expect(Wrapper.state().error['name']).toBe(error)
                done();
            },0);
        });       

        test('should show error message if it fails to get the supplier by the number', async(done) => {
            const event = {preventDefault: jest.fn(), target: {id: "number", value: "12345"}}
            Wrapper.instance()._onChange(event)            
            httpClient.get.mockResolvedValue({suppliers:[]});

            Wrapper.find('.search-icon').simulate('click', event);
            setTimeout(() => {
                expect(Wrapper.state().error['number']).toBe(i18Data.supplierNotFound);
                done();
            },0);
        });
        test('should not show error message if it gets the suppliers', async(done) => {
            const event = {preventDefault: jest.fn(), target: {id: "name", value: "Supplier"}}
            const mockSearchMetaData = {
                "searchMetaData": {
                  "partnerStatus": {
                    "displayName": "Partner status"
                  },
                  "taxOrganisationType": {
                    "displayName": "Tax organisation type"
                  },
                  "partnerTaxRegime": {
                    "displayName": "Partner tax regime"
                  },
                  "siteInvoiceCurrency": {
                    "displayName": "Site invoice currency"
                  },
                  "productCategory": {
                    "displayName": "Product Cateogry"
                  },
                  "subGroup": {
                    "displayName": "Sub Group"
                  }
                }
              }
            Wrapper.setState({ searchMetaData: mockSearchMetaData });
            Wrapper.instance()._onChange(event)
            httpClient.get.mockResolvedValue({suppliers:[{name: "John", number: "123456"}], limit:10, offset:1});
            Wrapper.find('.search-icon').simulate('click', event);
            setTimeout(() => {
                expect(httpClient.get).toHaveBeenCalledWith('/tradingpartner/api/supplier?partnerName=Supplier&limit=10&offset=1');
                expect(Wrapper.state().error['name']).toBe('');
                done();
            },0);
        });
        test('should call the searchMetaData method when resolveCardData method is called', async(done) => {
            const mockSearchMetaData = {
                "searchMetaData": {
                  "partnerStatus": {
                    "displayName": "Partner status"
                  },
                  "taxOrganisationType": {
                    "displayName": "Tax organisation type"
                  },
                  "partnerTaxRegime": {
                    "displayName": "Partner tax regime"
                  },
                  "siteInvoiceCurrency": {
                    "displayName": "Site invoice currency"
                  },
                  "productCategory": {
                    "displayName": "Product Cateogry"
                  },
                  "subGroup": {
                    "displayName": "Sub Group"
                  }
                }
              }
            httpClient.get.mockResolvedValue(mockSearchMetaData);

            Wrapper.instance().resolveCardData()
            
            setTimeout(() => {
                expect(httpClient.get).toHaveBeenCalledWith('/tradingpartner/api/search-meta-data');
                expect(Wrapper.state().searchMetaData).toBe(mockSearchMetaData);
                done();
            },0);
        });
    });
    test('should show the results on page render, if the data is already present', async(done) => {
        const mockSearchResults = {
            "supplierResults": {
              "suppliers": [
                {
                  "entityType": "partner",
                  "uuid": "d682662a-7642-31d8-a7c1-e1dd1ddc7c47",
                  "number": "1443597821",
                  "name": "TEST98",
                  "taxOrganisationType": null
                }
              ],
              "totalCount": 1,
              "totalPages": 1,
              "offset": 1,
              "limit": 100
            },
            "searchedPartnerName": "TEST98"
          }
        const locationProp = {            
            state: mockSearchResults            
        }
        const Wrapper = shallow(<SearchSupplier history={mockHistory} location={locationProp}/>)
        
        setTimeout(() => {
            expect(httpClient.get).toHaveBeenCalledWith('/tradingpartner/api/search-meta-data');
            expect(Wrapper.state().searchResults).toBe(mockSearchResults.supplierResults.suppliers);
            done();
        },0);
    });

    test('should call searchSupplier method when getSearchResults method is called', async(done) => {
      const instance = Wrapper.instance();
      jest.spyOn(instance, 'searchSupplier');
      instance.getSearchResults()
      setTimeout(() => {
          expect(instance.searchSupplier).toHaveBeenCalled();
          done();
      },0);
  });
test('should show the error when _handleViewClick is called with error response', async(done) => {
  const instance = Wrapper.instance();
  let errorMessage = 'error'
  httpClient.post.mockResolvedValue({
    code: 404,
    message: errorMessage
});
  instance._handleViewClick()
  setTimeout(() => {
      expect(Wrapper.state().isError).toBe(true);
      expect(Wrapper.state().errorMessage).toBe(errorMessage);      
      done();
  },0);
});
});