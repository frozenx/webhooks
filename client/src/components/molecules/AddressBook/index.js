import React, { Fragment } from "react";
import { FormHeading, SecondaryWrapper, FormHeadingWrapper } from "../../../common/styles";
import Button from '@beans/button';
import BackComponent from '../SupplierForm/BackComponent'
import CardListWithPagination from '../CardList'
import i18Data from '../../../languagepack';


const AddressBook = ({
    getNewPage,
    partnerName,
    handleBackComponent,
    navigateToForm,
    showAddressForm,
    addressList,
    showLoader,
    totalCount,
    currentPage,
    handlePageChange,
}) => {

    return (
        <Fragment>
            <BackComponent handleBackComponent={handleBackComponent} />
            <SecondaryWrapper>
                <FormHeadingWrapper>
                    <FormHeading><h1>{`${partnerName} ${i18Data.addresses}`}</h1></FormHeading>
                    <Button onClick={showAddressForm} variant='secondary'>{i18Data.addNewAddress}</Button>
                </FormHeadingWrapper>
                <CardListWithPagination
                    paginationProps = {
                        {
                            totalCount,
                            getNewPage, 
                            linkTemplate : "/page=%{pageNumber}",
                            pageText : "Page",
                            currentPage, 
                            handlePageChange
                        }
                    }
                    componentProps = {
                        {
                            addressList,
                            navigateToForm,
                            showLoader,
                            handleBackComponent
                        }
                    }
                />
            </SecondaryWrapper>
        </Fragment>
    );
}


export default AddressBook;