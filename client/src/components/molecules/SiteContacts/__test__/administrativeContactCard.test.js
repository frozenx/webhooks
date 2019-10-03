import React from 'react';
import AdministrativeContactCard from '../AdminstrativeContactCard';
import renderer from 'react-test-renderer';
import { DefaultThemeProvider } from '@beans/theme';
import {shallow} from 'enzyme';
import ContactBook from '../../../pages/SupplierHeader/contactBook'


describe('SiteContacts', () => {
    let props,
        tree
    let contacts = [
        {
          "contactUuid": "774477537246487",
          "contactStatus": '',
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
   
    beforeEach(() => {
        props = {
            siteContactData: jest.fn(),
            editSiteContacts: jest.fn(),
            updateEditableStatus: jest.fn(),
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

        tree = renderer.create(
            <DefaultThemeProvider>
                <AdministrativeContactCard  {...props}/>
            </DefaultThemeProvider>
        ).toJSON();
    });
    test('should render the component', () => {
        expect(tree).toMatchSnapshot();
    });
    test('should call getContact method on componentDidMount', () => {
        const Wrapper = shallow(<AdministrativeContactCard {...props}/>);            
        const instance = Wrapper.instance();
        jest.spyOn(instance, 'getContact');
        instance.componentDidMount();
        expect(instance.getContact).toHaveBeenCalledWith(props.node.contact.values.administrativeContact);
    });
    test('should call the siteContactData of props method when changed or selected the addressType', () => {
        const mockEvent = { target: { value : '774477537246487'} };
        const Wrapper = shallow(<AdministrativeContactCard {...props}/>);
        Wrapper.find('.drop-down').first().simulate('change', mockEvent)
        expect(props.siteContactData).toHaveBeenCalled()
        expect(props.editSiteContacts).toHaveBeenCalledWith(false)
        expect(props.updateEditableStatus).toHaveBeenCalledWith(true)        
    }); 
    
    test('should not populate any values for contact types if there are no previously saved contactTypes', () => {
        const node = {
            contact: {
                values: {
                    "billToContact": "",
                    "shipToContact": "",
                    "correspondenceContact": "",
                    "dunningContact": "",
                    "InvoicesContact": "",
                    "administrativeContact": ""
                }
            }
        }
        const mockProps = {
            ...props, node
        }
        const Wrapper = shallow(<AdministrativeContactCard {...mockProps}/>);            
        expect(Wrapper.find('.contact-name')).toHaveLength(0);
    });

    test('should not return any contact if the contact is not found in the contactBook', () => {
        const node = {
            contact: {
                values: {
                    "billToContact": "",
                    "shipToContact": "",
                    "correspondenceContact": "",
                    "dunningContact": "",
                    "InvoicesContact": "",
                    "administrativeContact": "1234567"
                }
            }
        }
        const mockProps = {
            ...props, node            
        }
        const Wrapper = shallow(<AdministrativeContactCard {...mockProps}/>);            
        expect(Wrapper.find('.contact-name')).toHaveLength(0);
    });
    describe('when iseditSiteContactsEnable is true', () => {
        let Wrapper;
        beforeEach(() => {
            Wrapper = shallow(<AdministrativeContactCard {...props} iseditSiteContactsEnable={true}/>);
        })
        test('should show the close icon if the iseditSiteContactsEnable prop is true', () => {
            expect(Wrapper.find('.close')).toHaveLength(1)
        });
        test('should call siteContactData method of props if the close icon is clicked', () => {
            Wrapper.find('.close').simulate('click')
            expect(props.siteContactData).toHaveBeenCalled()
        });        
    })   
});