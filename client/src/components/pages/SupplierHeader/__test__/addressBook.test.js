import AddressBook from '../addressBook';

describe('Given the AddressBook', () => {
    let mockAddressBookInstance;
    let entries = [
        {
            id: 1,
            address: 'address1',
            sites:[]
        }
    ]

    let addedEntries = [
        {
            id: 1,
            address: 'address1',
            sites:[]
        },
        {
            id: 2,
            address: 'address2',
            sites: []
        }
    ]

    let mockLinkedEntries = [
        {
            id: 1,
            address: 'edited address',
            sites:[1]
        },
        {
            id: 2,
            address: 'address2',
            sites:[1]
        },
    ]
    
    let mockEditedEntries = [
        {
            id: 1,
            address: 'edited address',
            sites:[]
        },
        {
            id: 2,
            address: 'address2',
            sites:[]
        },
    ]

    beforeEach(() => {
        mockAddressBookInstance = new AddressBook(entries)
    })
    describe('should expose to the getAddressEntries method', () => {
        let getAddressEntries;
        beforeEach(async() => {
            getAddressEntries = mockAddressBookInstance.getAddressEntries();            
        })
        test('It should return the entries when the getAddressEntries method is called', async() => {
            await getAddressEntries;            
            expect(getAddressEntries).toBe(entries);
        });

        test('It should add a new entry if the addAddress is called', async() => {
            await mockAddressBookInstance.addAddress({id: 2, address: 'address2', sites: []});
            expect(getAddressEntries).toEqual(addedEntries);
        });
        
        test('It should give the total count of the entries', async() => {
            expect(mockAddressBookInstance.total).toBe(2);
        });
        test('It should give the offset value', async() => {
            expect(mockAddressBookInstance.offset).toBe(0);
        });
        test('It should edit the Address if editAddress method is called', async() => {
            await mockAddressBookInstance.editAddress(1, {id: 1, address: 'edited address', sites:[]});
            expect(getAddressEntries).toEqual(mockEditedEntries);         
        });
        test('It should edit the Address if linkAddress method is called', async() => {
            await mockAddressBookInstance.linkAddress(1, [1,2]);            
            expect(getAddressEntries).toEqual(mockLinkedEntries);         
        });
    });
});