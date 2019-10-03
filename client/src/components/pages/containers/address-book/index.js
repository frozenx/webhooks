import React from 'react';
import propTypes from 'prop-types';
import AddressBook from '../../../molecules/AddressBook';
import config from '../../../../config';
import httpClient from '../../../../lib/httpClient';




export default class AddressBookContainer extends React.Component {

    state = {
        loader: undefined
    };
    static propTypes = {
        addressBook: propTypes.object.isRequired,
        handleBackComponent: propTypes.func.isRequired,
        partnerName: propTypes.string.isRequired,
        partnerUuid: propTypes.string.isRequired,
        selectedAttributeGroup: propTypes.shape({ attributes: [] }).isRequired,
        showAddressForm: propTypes.bool.isRequired,
        updateAddressBook: propTypes.func.isRequired
    }

    componentDidMount() {
        this.getAddresses();
    }

    handlePageChange = (nextPage) => {
        this.setState({
            currentPage: nextPage
        });
    }

    showLoader = () => this.setState({ showLoader: true });
    hideLoader = () => this.setState({ showLoader: false });


    getAddresses = async (pageNumber = 1) => {
        this.showLoader();
        const { partnerUuid } = this.props;
        const url = config.endPoints.getAddressesPerPage(pageNumber, partnerUuid);
        const { addresses, addressCount } = await httpClient.get(url);
        this.hideLoader();
        this.props.updateAddressBook(addresses, addressCount, pageNumber);
    }

    navigateToForm = (addressId) => {
        const {
            addressBook,
            rootNode,
            selectedAttributeGroup,

        } = this.props;
        const selectedAddress = addressBook.getAddress(addressId);
        const isEditMode = selectedAddress ? true : false;
        this.props.navigateToForm(
            { ...selectedAttributeGroup, isACollection: false },
            { ...rootNode, [selectedAttributeGroup.key]: { values: selectedAddress || {}, errors: {} } },
            isEditMode
        )
    }

    render() {
        const {
            addressBook,
            handleBackComponent,
            partnerName,
            selectedAttributeGroup,
            showAddressForm
        } = this.props;
        const { showLoader } = this.state;
        const addressList = addressBook.entries;

        return (
            <AddressBook
                showLoader={showLoader}
                addressBook={addressBook}
                addressList={addressList}
                handleBackComponent={handleBackComponent}
                navigateToForm={this.navigateToForm}
                selectedAttr={selectedAttributeGroup}
                partnerName={partnerName}
                totalCount={addressBook.total}
                showAddressForm={this.navigateToForm}
                updateAddressBook={this.updateAddressBook}
                getNewPage={this.getAddresses}
                currentPage={this.state.currentPage}
                handlePageChange = {this.handlePageChange}
            />

        )
    }
}