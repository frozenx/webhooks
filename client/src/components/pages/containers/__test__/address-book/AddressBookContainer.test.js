jest.mock('../../../../../lib/httpClient');
import React from 'react';
import { shallow } from 'enzyme';
import AddressBookContainer from '../../address-book';
import renderer from 'react-test-renderer';
import httpClient from '../../../../../lib/httpClient';
import { DefaultThemeProvider } from '@beans/theme';

describe('AddressBookContainer', () => {
    let props,
        tree,
        addressDefaultUrl = '/tradingpartner/api/adresses?partnerUuid=undefined&pageNumber=1',
        mockAddresses = [{
            addressName: 'some address',
            addressId: 'some id'
        }],
        addressCount = 1;
    beforeEach(() => {
        props = {
            updateAddressBook: jest.fn(),
            addressBook: {
                entries: [],
                getAddress: jest.fn()
            },
            startIndex: 0,
            endIndex: 1,
            navigateToForm: jest.fn(),
            selectedAttributeGroup: {
                key: 'address'
            }
        };
        httpClient.get.mockResolvedValue({
            addresses: mockAddresses,
            addressCount
        });
        tree = renderer.create(
            <DefaultThemeProvider>
                <AddressBookContainer {...props} />
            </DefaultThemeProvider>
        ).toJSON();
    });
    test('should render the component', () => {
        expect(tree).toMatchSnapshot();
    });
    test('should call getAddresses service and updateAddressBook prop on componentDidMount', () => {
        expect(httpClient.get).toHaveBeenCalledWith(addressDefaultUrl);
        expect(props.updateAddressBook).toHaveBeenCalledWith(mockAddresses, addressCount, 1);// 1 being the defualt page number
    });
    test('should call navigatetoForm props when class method navigatetoForm is called', () => {
        let Component = shallow(<AddressBookContainer {...props} />);
        Component.instance().navigateToForm('some id');
        expect(props.addressBook.getAddress).toHaveBeenCalledWith('some id')
        expect(props.navigateToForm).toHaveBeenCalled();
    })
});