import React, { Fragment } from 'react';
import AddressBookCard from '../../atoms/Card';
import { FormHeading, NotFoundContainer } from "../../../common/styles";
import i18Data from '../../../languagepack';
import Loader from '../../atoms/Loader';
import Label from '@beans/label';
import Button from '@beans/button';
import WithPagination from '../PaginationContainer';
import PaginationComponent from  '../Pagination';

const CardList = ({ addressList, navigateToForm, showLoader, handleBackComponent, selectedAttr }) => {

    return (
        <Fragment>
            {showLoader ? <Loader /> :
                <React.Fragment>
                     {addressList.length > 0 ? 
                        <FormHeading> <h2 dark={true} emphasized={true}>{`Site ${i18Data.addresses}`}</h2> </FormHeading> :
                        <NotFoundContainer>
                            <Label dark = {true} emphasized = {true}>{i18Data.noAddressFound}</Label> 
                            <Button variant = "secondary" onClick = {() => handleBackComponent(selectedAttr)}>{i18Data.cancel}</Button>
                        </NotFoundContainer>
                    }
                    {addressList.map(address => <AddressBookCard address={address} navigateToForm={navigateToForm} />)}
                </React.Fragment>
            }
        </Fragment>
    )
}

const CardListWithPagination = WithPagination(PaginationComponent, CardList)

export default CardListWithPagination;