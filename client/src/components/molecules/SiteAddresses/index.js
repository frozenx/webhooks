import React, { Fragment, useState } from 'react';
import CardList from './SiteAddressCardList'
import BackComponent from '../SupplierForm/BackComponent'
import { PrimaryWrapper, SecondaryWrapper, BtnContainer, NotificationStyle } from "../../../common/styles";
import Button from '@beans/button';
import i18data from '../../../languagepack'
import { StyledContainer } from './styled'
import Notification from '@beans/notification';
import Loader from '../../atoms/Loader';
import config from '../../../config';
import httpClient from '../../../lib/httpClient';

class SiteAddresses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addressesData: null,
            showLoader: false,
        }
    }

    componentDidMount() {
        this.getAddresses();
    }

    loaderStatus = (status) => {
        this.setState({
            showLoader: status
        })
    }
    
    getAddresses = async () => {
        this.loaderStatus(true);
        try {
            const partnerUuid = this.props.rootNode.uuid;
            const url = config.endPoints.getAddressesPerPage('full',partnerUuid);
            const addressRecords = await httpClient.get(url);            
            const  newAddresses = addressRecords.addresses.map(address => ({...address, sites:[]}))
            let newAddressRecords = {...addressRecords,addresses:newAddresses}
            const { addresses, addressCount } = newAddressRecords;
            this.props.updateAddressBook(addresses, addressCount);
            this.loaderStatus(false);
        }
        catch (err) {
            this.loaderStatus(false);            
        }
    }
    siteAddressData = (data) => {
        const siteAddresses= {}
          data && Object.keys(data).map((addressType, i) => {
            siteAddresses[addressType] = data[addressType].addressUuid || ''
          })
        this.setState({
            addressesData: siteAddresses
        })
    }
    getSuccessTitle = (partnerName, currentFieldName) => {
        return `${partnerName} ${currentFieldName} have been successfully updated`;
    }

    render() {
        const {
            selectedAttr,
            node,
            addresses,
            handleBackComponent,
            rootNode,
            saveSiteAddress,
            cancel,
            isFormLocked,
            updateAddressBook,
            isFormSubmissionSuccessful,
            currentFieldName,
            editSiteAddresses,
            iseditSiteAddressesEnable,
            isFormSubmissionError
        } = this.props;
        const { showLoader, addressesData } = this.state;

        return (
            <StyledContainer>
                <BackComponent handleBackComponent={handleBackComponent} selectedAttr={selectedAttr}/>
                <PrimaryWrapper>
                    <SecondaryWrapper>
                        {isFormSubmissionSuccessful &&
                            <NotificationStyle>
                                {isFormSubmissionSuccessful &&
                                <Notification title={this.getSuccessTitle(rootNode.partner.values.partnerName, currentFieldName)} variant={'success'} />}
                                {isFormSubmissionError &&
                                <Notification title="We were unable to submit the form" variant="error">
                                    {'Looks like something went wrong. Please try submitting again'}
                                </Notification>
                                }
                            </NotificationStyle>
                        }
                        {showLoader ? <Loader /> :
                            <>
                                <CardList
                                    node={node}
                                    addressList={config.siteAddressList}
                                    addresses={addresses}
                                    rootNode={rootNode}
                                    siteAddressData={
                                        (data) => this.siteAddressData(data)}
                                    updateAddressBook={updateAddressBook}
                                    editSiteAddresses={editSiteAddresses}
                                    iseditSiteAddressesEnable={iseditSiteAddressesEnable}
                                />
                                <BtnContainer>
                                    <Button
                                        variant="secondary"
                                        className="submit-btn"
                                        id="save-as-draft"
                                        type="cancel"
                                        disabled={isFormLocked}
                                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); cancel(e) }}
                                    > <span>{i18data.cancel}</span>
                                    </Button>
                                    <Button
                                        variant="primary"
                                        className={`submit - btn enabled`}
                                        type="submit"
                                        id='save'
                                        disabled={isFormLocked}
                                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); saveSiteAddress(selectedAttr.key, node, addressesData); }}
                                    > <span>{i18data.save}</span>
                                    </Button>
                                </BtnContainer>
                            </>
                        }

                    </SecondaryWrapper>
                </PrimaryWrapper>
            </StyledContainer >
        );
    }
}

export default SiteAddresses;