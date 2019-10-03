import React, { Fragment } from "react";
import { FormHeading, PrimaryWrapper, SecondaryWrapper, FormHeadingWrapper } from "../../../common/styles";
import Button from '@beans/button';
import BackComponent from '../SupplierForm/BackComponent'
import CardListWithPagination from '../ContactCardList'
import i18Data from '../../../languagepack';

const ContactBook = ({
    showContactForm,
    contactList,
    getNewPage,
    partnerName,
    handleBackComponent,
    navigateToForm,
    showLoader,
    totalCount,
    currentPage,
    handlePageChange

}) => {
    return (
        <Fragment>
            <BackComponent handleBackComponent={handleBackComponent} />
            <PrimaryWrapper>
                <SecondaryWrapper>
                    <FormHeadingWrapper>
                        <FormHeading>
                            <h1>
                                {`${partnerName} ${i18Data.contacts}`}
                            </h1>
                        </FormHeading>
                        <Button onClick={showContactForm} variant='secondary'>
                            {i18Data.addNewContact}
                        </Button>
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
                                contactList,
                                showLoader,
                                navigateToForm,
                                handleBackComponent

                            }
                        }
                    />
                </SecondaryWrapper>
            </PrimaryWrapper>
        </Fragment>
    );
}


export default ContactBook;