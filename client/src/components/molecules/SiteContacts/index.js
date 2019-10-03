import React,{Fragment, useState} from 'react';
import SiteContactsCardList from './SiteContactsCardList'
import BackComponent from '../SupplierForm/BackComponent'
import { SecondaryWrapper, BtnContainer, NotificationStyle, PrimaryWrapper } from "../../../common/styles";
import Button from '@beans/button';
import i18data from '../../../languagepack'
import {StyledContainer} from './styled'
import Notification from '@beans/notification';
import Loader from '../../atoms/Loader';
import config from '../../../config';
import httpClient from '../../../lib/httpClient';

 class SiteContacts extends React.Component {
    constructor(props){
         super(props);
         this.state = {
            contactsData: {},
            showLoader: false,
            errorTitle: i18data.formSubmitErrorTitle,
            isContactsError: false
         }
    }
    
    componentDidMount() {
        this.getContacts();
    }

    loaderStatus = (status) => {
        this.setState({
            showLoader: status
        })
    }
    getContacts = async () => {
        this.loaderStatus(true);
        try {
            const partnerUuid = this.props.rootNode.uuid;
            const url = config.endPoints.getContactsPerPage('full',partnerUuid);
            const contactRecords = await httpClient.get(url);
            const  newContacts = contactRecords.contacts.map(contact => ({...contact, sites:[]}))
            let newContactRecords = {...contactRecords,contacts:newContacts}
            const { contacts, contactCount } = newContactRecords;
            this.props.updateContactBook(contacts, contactCount);
            this.setState({
                contactsData: this.props.node.contact.values
            })
            this.loaderStatus(false);
        }
        catch(err) {
            this.setState({
                errorTitle: i18data.fetchContactsErrorTtile,
                isContactsError: true
            })
            this.loaderStatus(false);
        }
    }
    siteContactData = (data, isAdministrativeContact) => {        
        const siteContacts= {...this.state.contactsData}
          data && Object.keys(data).map(contactType => {
            let contacts = '';
            if(isAdministrativeContact) {
                   (data[contactType].selectedContacts.length> 0 ? data[contactType].selectedContacts.map(contact => {
                        contacts = contacts.concat(`,${contact.contactUuid}`)
                    }) :
                    siteContacts[contactType] = '')
                    siteContacts[contactType] = contacts.substring(1)
               }
               else {
                siteContacts[contactType] = data[contactType].contactUuid || ''

               }
          })
        this.setState({
            contactsData: siteContacts
        })
          
    }
    getSuccessTitle = (partnerName, currentFieldName) => {        
        return `${partnerName} ${currentFieldName} have been successfully updated`;
    }

    render() {
        const {
            selectedAttr,
            node,  
            contacts,
            handleBackComponent,
            rootNode,
            saveSiteContact,
            cancel,
            isFormLocked,
            updateContactBook,
            isFormSubmissionSuccessful,
            currentFieldName,
            editSiteContacts,
            iseditSiteContactsEnable,
            isFormSubmissionError
        } = this.props;
        const { showLoader, contactsData, errorTitle, isContactsError } = this.state;
       
        return(
            <StyledContainer>
                <BackComponent handleBackComponent={handleBackComponent} selectedAttr={selectedAttr}/>
                <PrimaryWrapper>
                    <SecondaryWrapper>
                        {
                            <NotificationStyle>
                                {isFormSubmissionSuccessful &&
                                <Notification title={this.getSuccessTitle(rootNode.partner.values.partnerName, currentFieldName)} variant={'success'} />}
                                {(isFormSubmissionError || isContactsError)&&
                                <Notification title={errorTitle} variant="error">
                                    {i18data.submitAgain}
                                </Notification>
                                }                                
                            </NotificationStyle>
                        }
                        { showLoader? <Loader/> :
                            <>
                                <SiteContactsCardList
                                    node={node}
                                    contactList={config.siteContactList} 
                                    contacts={contacts} 
                                    rootNode={rootNode}
                                    siteContactData={this.siteContactData}
                                    updateContactBook={updateContactBook}
                                    editSiteContacts={editSiteContacts}
                                    iseditSiteContactsEnable={iseditSiteContactsEnable}
                                />
                                <BtnContainer>
                                    <Button
                                        variant="secondary"
                                        className="submit-btn"
                                        id="save-as-draft"
                                        type="cancel"
                                        disabled={isFormLocked}
                                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); cancel(e) }}
                                    > {i18data.cancel}
                                    </Button>
                                    <Button
                                        variant="primary"
                                        className={`submit - btn enabled`}
                                        type="submit"
                                        id='save'
                                        disabled={isFormLocked}
                                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); saveSiteContact(selectedAttr.key, node, contactsData); }}
                                    > {i18data.save}
                                    </Button>     
                                </BtnContainer>
                            </>
                        }      
                        
                    </SecondaryWrapper>
                </PrimaryWrapper>
            </StyledContainer>        
        );
    }    
}

export default SiteContacts;