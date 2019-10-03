jest.mock('../../../../../lib/httpClient');
import React from 'react';
import { shallow } from 'enzyme';
import ContactBookContainer from '../../contact-book';
import renderer from 'react-test-renderer';
import httpClient from '../../../../../lib/httpClient';
import { DefaultThemeProvider } from '@beans/theme';

describe('ContactBookContainer', () => {
    let props,
        tree,
        contactDefaultUrl = '/tradingpartner/api/contacts?partnerUuid=123456&pageNumber=1',
        mockContacts = [{
            ContactName: 'some contact',
            partnerName: 'some id'
        }],
        contactCount = 1;
    beforeEach(() => {
        props = {
            updateContactBook: jest.fn(),
            contactBook: {
                entries: [],
                getContact: jest.fn()
            },
            startIndex: 0,
            endIndex: 1,
            partnerName:"abc",
            partnerUuid:"123456",
            navigateToForm: jest.fn(),
            handleBackComponent:jest.fn(),
            selectedAttributeGroup: {
                key: 'contact'
               
            }
        };
        httpClient.get.mockResolvedValue({
            contacts: mockContacts,
            contactCount
        });
        tree = renderer.create(
            <DefaultThemeProvider>
                <ContactBookContainer {...props} />
            </DefaultThemeProvider>
        ).toJSON();
    });
    test('should render the component', () => {
        expect(tree).toMatchSnapshot();
    });
    test('should call getContacts service and updateContactBook prop on componentDidMount', () => {
        expect(httpClient.get).toHaveBeenCalledWith(contactDefaultUrl);
        expect(props.updateContactBook).toHaveBeenCalledWith(mockContacts, contactCount, 1);// 1 being the defualt page number
    });
    test('should call navigatetoForm props when class method navigatetoForm is called', () => {
        let Component = shallow(<ContactBookContainer {...props} />);
        Component.instance().navigateToForm('some id');
        expect(props.contactBook.getContact).toHaveBeenCalledWith('some id')
        expect(props.navigateToForm).toHaveBeenCalled();
    })
});