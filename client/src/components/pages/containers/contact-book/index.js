import React from 'react';
import propTypes from 'prop-types';
import ContactBook from '../../../molecules/ContactBook';
import config from '../../../../config';
import httpClient from '../../../../lib/httpClient';




export default class ContactBookContainer extends React.Component {

    state = {
        loader: undefined
    };
    static propTypes = {
        contactBook: propTypes.object.isRequired,
        handleBackComponent: propTypes.func.isRequired,
        partnerName: propTypes.string.isRequired,
        partnerUuid: propTypes.string.isRequired,
        selectedAttributeGroup: propTypes.shape({ attributes: [] }).isRequired,
        showContactForm: propTypes.bool.isRequired,
        updateContactBook: propTypes.func.isRequired
    }

    componentDidMount() {
        this.getContacts();
    }

    handlePageChange = (nextPage) => {
        this.setState({
            currentPage: nextPage
        });
    }


    showLoader = () => this.setState({ showLoader: true });
    hideLoader = () => this.setState({ showLoader: false });


    getContacts = async (pageNumber = 1) => {
        this.showLoader();
        const { partnerUuid } = this.props;
        const url = config.endPoints.getContactsPerPage(pageNumber, partnerUuid);
        const { contacts, contactCount } = await httpClient.get(url);
    
        this.hideLoader();
        this.props.updateContactBook(contacts,contactCount , pageNumber);
    }

    navigateToForm = (contactId) => {
        const {
            contactBook,
            rootNode,
            selectedAttributeGroup,

        } = this.props;
        
        const selectedContact = contactBook.getContact(contactId);
       

        const isEditMode = selectedContact ? true : false;

        this.props.navigateToForm(
            { ...selectedAttributeGroup, isACollection: false },
            { ...rootNode, [selectedAttributeGroup.key]: { values: selectedContact || {}, errors: {} } },
            isEditMode
        )
    }

    render() {
        const {
            contactBook,
            handleBackComponent,
            partnerName,
            selectedAttributeGroup,
            showContactForm
        } = this.props;
        const { showLoader } = this.state;
        const contactList = contactBook.entries;

        return (
            <ContactBook
                showLoader={showLoader}
                contactBook={contactBook}
                contactList={contactList}
                handleBackComponent={handleBackComponent}
                navigateToForm={this.navigateToForm}
                selectedAttr={selectedAttributeGroup}
                partnerName={partnerName}
                totalCount={contactBook.total}
                showContactForm={this.navigateToForm}
                updateContactBook={this.updateContactBook}
                getNewPage={this.getContacts}
                currentPage={this.state.currentPage}
                handlePageChange = {this.handlePageChange}
            />

        )
    }
}