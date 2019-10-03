jest.mock('../../../../lib/httpClient');
import React from 'react';
import SiteContacts from '../'
import renderer from 'react-test-renderer';
import { DefaultThemeProvider } from '@beans/theme';
import {shallow} from 'enzyme';
import ContactBook from '../../../pages/SupplierHeader/contactBook'
import httpClient from '../../../../lib/httpClient'


describe('SiteContacts', () => {
    let props,
        tree,
        contactDefaultUrl = '/tradingpartner/api/contacts?partnerUuid=1234&pageNumber=full',
        mockContacts = [{
            ContactName: 'some contact',
            partnerName: 'some id'
        }]
    let contacts = [            
        {
          "contactUuid": "651751283168922",
          "contactStatus": "Active",
          "firstName": "Volkswagen",
          "lastName": "Zetta",
        },
        {
          "contactUuid": "600853397549052",
          "contactStatus": "Active",
          "firstName": "Skoda",
          "lastName": "Rapid",          
        }
      ]
    let linkedContacts = contacts.map(contact => ({...contact, sites:[]}));
    let contactsCount =  contacts.length;
    let siteData = 
        {
            "billToContact": {
              "contactStatus": "Inactive",
              "firstName": "Sikindar",
              "lastName": "Mirza",
              "contactUuid": "774477537246487"
            },
            "shipToContact": {
              "contactStatus": "Inactive",
              "firstName": "Sikindar",
              "lastName": "Mirza",
              "contactUuid": "774477537246487"
            },
            "correspondenceContact": {},
            "dunningContact": {
              "contactStatus": "Inactive",
              "firstName": "Sikindar",
              "lastName": "Mirza",
              "contactUuid": "774477537246487"
            },
            "InvoicesContact": {}
    }

    let administrativeContactData = {
        "administrativeContact": {
          "selectedContacts": [
            {
              "contactStatus": "Active",
              "firstName": "Skoda",
              "lastName": "Rapid",
              "contactUuid": "600853397549052"
            }
          ],
          "availableContacts": [
            {
              "contactStatus": "Active",
              "firstName": "Volkswagen",
              "lastName": "Zetta",
              "contactUuid": "651751283168922"
            }
          ]
        }
      }
    let expectedContactsData = {"InvoicesContact": "", "billToContact": "774477537246487", "correspondenceContact": "", "dunningContact": "774477537246487", "shipToContact": "774477537246487"}
    let expectedAdministrativeContactData = {"administrativeContact": "600853397549052"}

    beforeEach(() => {
        props = {
            cancel: jest.fn(),
            saveSiteContact: jest.fn(),
            selectedAttr: {
                key: 'contact'
            },
            updateContactBook: jest.fn(),            
            contacts: contacts,            
            
            node: {
                contact: {
                    values: {
                        "billToContact": "774477537246487",
                        "shipToContact": "",
                        "correspondenceContact": "",
                        "dunningContact": "",
                        "InvoicesContact": "",
                        "administrativeContact": "774477537246487"
                    }
                }
            },
                        
            rootNode: {
                uuid: 1234,
                contactBook: new ContactBook(contacts),                
                partner: {
                    values: {
                        partnerName: 'TEST NAME'                    
                    }
                }
            }

        }
        
        httpClient.get.mockResolvedValue({            
            contactCount: 2,
            contacts: [...contacts]            
        });
        tree = renderer.create(
            <DefaultThemeProvider>
                <SiteContacts  {...props}/>
            </DefaultThemeProvider>
        ).toJSON();
    });
    test('should render the component', () => {
        expect(tree).toMatchSnapshot();
    });
    test('should call getContacts service and updateContactBook prop on componentDidMount', () => {
        expect(httpClient.get).toHaveBeenCalledWith(contactDefaultUrl);
        expect(props.updateContactBook).toHaveBeenCalledWith(linkedContacts, contactsCount);
    });    
    test('should call the cancel method when cancel button is clicked', () => {
        const mockEvent = { stopPropagation: jest.fn(), preventDefault: jest.fn() };
        const Wrapper = shallow(<SiteContacts cancel= {props.cancel}/>);
        Wrapper.find('#save-as-draft').simulate('click', mockEvent)
        expect(props.cancel).toHaveBeenCalledWith(mockEvent)

    });
    describe('for the user interactions', () => {
        let Wrapper;
        beforeEach(() => {
            Wrapper = shallow(<SiteContacts saveSiteContact={props.saveSiteContact} selectedAttr={props.selectedAttr}/>);
        })
        test('should call the saveSiteContact method when save button is clicked', () => {
            const mockEvent = { stopPropagation: jest.fn(), preventDefault: jest.fn() };
            Wrapper.find('#save').simulate('click', mockEvent)
            expect(props.saveSiteContact).toHaveBeenCalled();
        });
        test('should call the saveSiteContact method without Administrative Contact', () => {
            let isAdministrativeContact = false
            const instance = Wrapper.instance();
            jest.spyOn(instance, 'siteContactData')
            instance.siteContactData(siteData, isAdministrativeContact)
            expect(Wrapper.state().contactsData).toEqual(expectedContactsData);
        });
        test('should call the saveSiteContact method with Administrative Contact', () => {
            let isAdministrativeContact = true
            const instance = Wrapper.instance();
            jest.spyOn(instance, 'siteContactData')
            instance.siteContactData(administrativeContactData, isAdministrativeContact)
            expect(Wrapper.state().contactsData).toEqual(expectedAdministrativeContactData);
        });
        test('should show the notification with when the form submission is sucessful', () => {
            const Wrapper = shallow(<SiteContacts saveSiteContact={props.saveSiteContact} selectedAttr={props.selectedAttr} isFormSubmissionSuccessful={true} rootNode={props.rootNode}/>);
            const instance = Wrapper.instance();
            jest.spyOn(instance, 'getSuccessTitle')
            instance.componentDidMount();
            expect(instance.getSuccessTitle).toHaveBeenCalled();
        });
    })
});