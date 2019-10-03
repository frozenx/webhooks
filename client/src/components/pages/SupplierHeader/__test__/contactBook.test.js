import ContactBook from '../contactBook';

describe('Given the ContactBook', () => {
    let mockContactBookInstance;
    let entries = [
        {
            id: 1,
            name: 'contact1',
            sites:[]
        }
    ]

    let addedEntries = [
        {
            id: 1,
            name: 'contact1',
            sites:[]
        },
        {
            id: 2,
            name: 'contact2',
            sites: []
        }
    ]

    let mockLinkedEntries = [
        {
            id: 1,
            name: 'edited contact',
            sites:[1]
        },
        {
            id: 2,
            name: 'contact2',
            sites:[1]
        },
    ]
    
    let mockEditedEntries = [
        {
            id: 1,
            name: 'edited contact',
            sites:[]
        },
        {
            id: 2,
            name: 'contact2',
            sites:[]
        },
    ]


    beforeEach(() => {
        mockContactBookInstance = new ContactBook(entries)
    })
    describe('should expose to the getContactEntries method', () => {
        let getContactEntries;
        beforeEach(async() => {
            getContactEntries = mockContactBookInstance.getContactEntries();            
        })
        test('It should return the entries when the getContactEntries method is called', async() => {
            await getContactEntries;            
            expect(getContactEntries).toBe(entries);
        });

        test('It should add a new entry if the addContact is called', async() => {
            await mockContactBookInstance.addContact({id: 2, name: 'contact2', sites: []});
            expect(getContactEntries).toEqual(addedEntries);
        });
        
        test('It should give the total count of the entries', async() => {
            expect(mockContactBookInstance.total).toBe(2);
        });
        test('It should give the offset value', async() => {
            expect(mockContactBookInstance.offset).toBe(0);
        });
        test('It should edit the contact if editContact method is called', async() => {
            await mockContactBookInstance.editContact(1, {id: 1, name: 'edited contact', sites:[]});
            expect(getContactEntries).toEqual(mockEditedEntries);         
        });
        test('It should edit the contact if linkContact method is called', async() => {
            await mockContactBookInstance.linkContact(1, [1,2]);            
            expect(getContactEntries).toEqual(mockLinkedEntries);         
        });
    });
});