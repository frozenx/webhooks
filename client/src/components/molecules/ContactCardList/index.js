import React, { Fragment } from 'react';
import ContactCard from '../../atoms/ContactCard'
import { FormHeading, NotFoundContainer } from "../../../common/styles";
import i18Data from '../../../languagepack';
import Loader from '../../atoms/Loader';
import Label from '@beans/label';
import Button from '@beans/button';
import WithPagination from '../PaginationContainer';
import PaginationComponent from  '../Pagination';

const ContactCardList = ({ contactList, navigateToForm, showLoader, handleBackComponent, selectedAttr }) => {
    return (
        <Fragment>
            {showLoader ? <Loader /> :
                <React.Fragment>
                        {contactList.length > 0 ?
                            <FormHeading><h2 dark={true} emphasized={true}> {i18Data.contacts}</h2></FormHeading> : 
                            <NotFoundContainer>
                                <Label dark = {true} emphasized = {true}>{i18Data.noContactFound}</Label> 
                                <Button variant = "secondary" onClick = {() => handleBackComponent(selectedAttr)}>{i18Data.cancel}</Button>
                            </NotFoundContainer>
                        }
                        {contactList.map((contact) => <ContactCard contact={contact} navigateToForm={navigateToForm} />)}
                </React.Fragment>
            }
        </Fragment>
    )
}


const CardListWithPagination = WithPagination(PaginationComponent, ContactCardList)

export default CardListWithPagination;