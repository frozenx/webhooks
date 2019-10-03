import { pageSize } from "../../../config";

class ContactBook {
    constructor(entries = []) {
        this.getContactEntries = this.getContactEntries.bind(this);
        this.editContact = this.editContact.bind(this);
        this.addContact = this.addContact.bind(this);
        this.linkContact = this.linkContact.bind(this);
        this.entries = entries;
        this.total = this.entries.length;
        this.pageSize = pageSize
        this.offset = Math.floor(this.total/this.pageSize);  
    }

    getContactEntries() {
        return this.entries;
    }

    editContact(id, editedContact) {
        let foundEntry = this.entries.find(contact => contact.id === id)
        if (foundEntry) {
            let foundIndex = this.entries.findIndex(entry => entry.id == id)
            return this.entries[foundIndex] = editedContact
        }           
    }

    getContact(id) {
        let contact = this.entries.find(contact => contact.contactUuid === id)
        if (contact) {
            return contact;
        }
        return null;
    }

    addContact(contact) {
        this.entries.push(contact)
    }

    linkContact (siteId, linkContactsToSite) {
        this.entries.map((contact, i) => {
            linkContactsToSite.map((contactId, j) => {
                if(contact.contactUuid == contactId) {
                    this.entries[i]['sites'].push(siteId)
                }
            })
        })
    }
    
    addEntries(entries, contactCount, index) {
        this.entries = entries;
        this.currentPage = index;
        this.total = contactCount;

    }
}

export default ContactBook;