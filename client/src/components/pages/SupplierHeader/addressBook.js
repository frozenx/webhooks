import { pageSize } from "../../../config";

class AddressBook {
    constructor(entries = []) {
        this.getAddressEntries = this.getAddressEntries.bind(this);
        this.editAddress = this.editAddress.bind(this);
        this.addAddress = this.addAddress.bind(this);
        this.linkAddress = this.linkAddress.bind(this);
        this.getAddress = this.getAddress.bind(this);
        this.entries = entries;
        this.total = this.entries.length;
        this.pageSize = pageSize
        this.offset = Math.floor(this.total / this.pageSize);
    }

    getAddressEntries() {
        return this.entries;
    }

    getAddress(id) {
        let address = this.entries.find(address => address.addressUuid === id)
        if (address) {
            return address;
        }
        return null;
    }

    editAddress(id, editedAddress) {
        let foundEntry = this.entries.find(address => address.addressUuid === id)
        if (foundEntry) {
            let foundIndex = this.entries.findIndex(entry => entry.addressUuid == id)
            return this.entries[foundIndex] = editedAddress
        }
    }

    addAddress(address) {
        this.entries.push(address)
    }

    linkAddress(siteId, linkAddressToSite) {
        this.entries.map((address, i) => {
            linkAddressToSite.map((addressId, j) => {
                if(address.addressUuid == addressId) {
                    this.entries[i]['sites'].push(siteId)
                }
            })
        })
    }
    addEntries(entries, addressCount, index) {
        this.entries = entries;
        this.currentPage = index;
        this.total = addressCount;

    }
}

export default AddressBook;