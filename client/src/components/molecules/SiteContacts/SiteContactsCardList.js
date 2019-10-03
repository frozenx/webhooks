import React, { Fragment } from 'react';
import { FormHeading, FormHeadingWrapper, StyleGrayWrapper } from "../../../common/styles";
import Label from '@beans/label';
import Button from '@beans/button';
import i18Data from '../../../languagepack';
import AdministrativeContactCard from './AdminstrativeContactCard';

import {
    CardTopContainer,
    CardBottomContainer,
    StyledLeftSection,
    StyledRightSection,
    IconStyle
} from '../../../common/styles'
import StatusIndicator from '@beans/colleague-status-indicator';
import Dropdown from '@beans/dropdown';
import Icon from '@beans/icon';
import { DropdownWrapper } from './styled'


export default class SiteContactsCardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contactTypes: {
                billToContact: {},
                shipToContact: {},
                correspondenceContact: {},
                dunningContact: {},
                InvoicesContact: {}
            },
            isContactTypesPresent: false,
            editContact: false,
            editContactStatus: false,
            showLoader: false
        }
    }

    getContact = (uuid) => {                
        let foundContact = this.props.rootNode.contactBook.getContact(uuid)            
        if(foundContact) {
            let { contactStatus, firstName, lastName, contactUuid } = foundContact;
            let contact = { contactStatus, firstName, lastName, contactUuid }
            return contact
        }
        return {};
    }

    componentDidMount() {
        let allContactTypes = this.props.node.contact.values
        let savedContactTypes = {...allContactTypes}
        delete savedContactTypes.administrativeContact;
        let contactTypes = { ...this.state.contactTypes }
        let isSavedContactTypesEmpty = Object.keys(allContactTypes).every((contactType) => !allContactTypes[contactType])                
        if (!isSavedContactTypesEmpty) {
            Object.keys(savedContactTypes).map((contact, i) => {
                if (savedContactTypes[contact]) {
                    contactTypes[contact] = this.getContact(savedContactTypes[contact]);
                }
                this.setState({
                    contactTypes,
                    isContactTypesPresent: true
                })
            })
              
        }

        else {           
            this.setState({
                isContactTypesPresent: false
            })

        }            
    }
    onChange = (contactType, e) => {
        let foundContact = this.getContact(e.target.value)
        let contactTypes = {...this.state.contactTypes}
        contactTypes[contactType.id] = foundContact;
        this.setState({
            contactTypes,
            isContactTypesPresent: true
        }, () => {
            this.props.editSiteContacts(false)
            this.props.siteContactData(this.state.contactTypes, false);
        })
    }

    updateContact = (contactType) => {
        let contactTypes = { ...this.state.contactTypes }       
        contactTypes[contactType.id] = {}
        this.setState({
            contactTypes
        }, () => {
            this.props.siteContactData(this.state.contactTypes, false)
        }
        );
    }
    updateEditableStatus = (status) =>{        
        this.setState({
            isContactTypesPresent: status
        })
    }

    render() {
        const {
            contacts,
            contactList,
            rootNode,
            node,
            editSiteContacts,
            iseditSiteContactsEnable,
            siteContactData
        } = this.props
        const {
            isContactTypesPresent,
            contactTypes
        } = this.state;
        return (
            
            <Fragment>
                <FormHeadingWrapper>
                    <FormHeading><h1>{`${rootNode.partner.values.partnerName} site contacts`}</h1></FormHeading>
                    <Button className='edit-btn' disabled={iseditSiteContactsEnable || !isContactTypesPresent} onClick={() => editSiteContacts(true)} variant='secondary'>Edit site contacts </Button>
                </FormHeadingWrapper>
                <AdministrativeContactCard 
                            iseditSiteContactsEnable={iseditSiteContactsEnable}
                            editSiteContacts = {editSiteContacts}
                            contacts ={contacts}
                            rootNode = {rootNode}
                            node = {node}
                            siteContactData = {siteContactData}
                            updateEditableStatus = {(status) => this.updateEditableStatus(status)}
                        />
                {contactList.map((c, index) => {
                    let contactType = this.state.contactTypes[c.id];
                    return (
                        <>                        
                        <StyleGrayWrapper key={index}>
                        <CardTopContainer>
                            <Label dark={true} emphasized={true}>{c.label}</Label>
                            <Button disabled={iseditSiteContactsEnable} variant="secondary">
                                {i18Data.view}
                            </Button>
                        </CardTopContainer>
                        <CardBottomContainer>
                            {
                                (contactType && contactType.contactUuid) &&
                                <>                                      
                                    <StyledLeftSection spaceBottom>
                                    <Label dark={true} emphasized={true} >{!iseditSiteContactsEnable ? i18Data.contactName : i18Data.currentContact}</Label>
                                    <Label className='contact-name'>
                                        {contactType && `${contactType.firstName},${contactType.lastName}`}
                                        {iseditSiteContactsEnable && <IconStyle onClick={() => this.updateContact(c)}><Icon  className='close'  graphic="close" size="xs"/></IconStyle>}
                                    </Label>
                                    </StyledLeftSection>
                                    {!iseditSiteContactsEnable &&
                                        <StyledRightSection>
                                            <Label dark={true} emphasized={true}>{i18Data.status}</Label>
                                            <Label>
                                                {
                                                    <StatusIndicator variant={contactType && contactType.contactStatus === i18Data.active ? "success" : "error"}>
                                                        {contactType && contactType.contactStatus || i18Data.inActive}
                                                    </StatusIndicator>
                                                }
                                            </Label>
                                        </StyledRightSection>
                                    }
                                                                                                            
                                </>
                            }
                            {
                                (contactType && !contactType.contactUuid || iseditSiteContactsEnable)&&
                                <DropdownWrapper>
                                    <Label dark={true} emphasized={true}>
                                        {iseditSiteContactsEnable ? 'Assign a different contact' : 'Assign contact'}
                                    </Label>
                                    <Dropdown
                                        className='drop-down'
                                        onChange={(e) => this.onChange(c, e)}
                                        defaultValue='select'
                                        id={index}
                                        value={contactType.uuid || 'select'}
                                    >
                                        <option value="select">Select contact</option>
                                        {contacts && contacts.map((contact, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <option value={contact.contactUuid} id={contact.contactUuid} index={index}>
                                                        {`${contact.firstName},${contact.lastName}`}
                                                    </option>
                                                </Fragment>
                                            )
                                        })}
                                    </Dropdown>
                                </DropdownWrapper>
                            }

                        </CardBottomContainer>
                    </StyleGrayWrapper>
                    </>
                    )
                }

                )}
            </Fragment>)
    }
}
