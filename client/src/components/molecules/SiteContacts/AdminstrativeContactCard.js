import React, { Fragment } from 'react';
import { StyleGrayWrapper } from "../../../common/styles";
import Label from '@beans/label';
import Button from '@beans/button';
import i18Data from '../../../languagepack';

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


export default class AdministrativeContactCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            administrativeContact: {selectedContacts:[], availableContacts:[]},
        }
    }
    getContact = (uuids) => {                
        let contactIds = uuids.split(',')
        let contacts = []
        contactIds.forEach(contactId => {            
            let foundContact = this.props.rootNode.contactBook.getContact(contactId)
            
            if(foundContact) {
                let { contactStatus, firstName, lastName, contactUuid } = foundContact;
                let contact = { contactStatus, firstName, lastName, contactUuid }
                contacts.push(contact)
            }
        })
            return contacts;
        }

    componentDidMount() {        
        let savedAdministrativeContacts = this.props.node.contact.values['administrativeContact'] && this.props.node.contact.values['administrativeContact'] || '';
        let administrativeContact = { ...this.state.administrativeContact }
        let isSavedContactTypesEmpty = !savedAdministrativeContacts.length > 0
        let contactsReceived = [...this.props.contacts];
        if (!isSavedContactTypesEmpty) {            
                let foundContacts = this.getContact(savedAdministrativeContacts);                
                administrativeContact.selectedContacts = [...foundContacts]
                let filteredAvailableContacts = contactsReceived.filter(availableContact => {
                    return  foundContacts.every(({contactUuid})=> availableContact.contactUuid !==contactUuid);
                })
                administrativeContact.availableContacts = [...filteredAvailableContacts]
              this.setState({
                    administrativeContact
                })
        }

        else {
            administrativeContact.availableContacts = contactsReceived               
            this.setState({
                administrativeContact,
            })

            }            
        }
    onChange = (e) => {
        let foundContact = this.getContact(e.target.value)
        let administrativeContact = {...this.state.administrativeContact}
        administrativeContact.selectedContacts.push(foundContact[0]);
        let filteredAvailableContacts = administrativeContact.availableContacts.filter(availableContact => {
            return foundContact[0].contactUuid !== availableContact.contactUuid
        })
        administrativeContact.availableContacts = [...filteredAvailableContacts]

        this.setState({
            administrativeContact,
        }, () => {
            this.props.editSiteContacts(false)
            this.props.siteContactData({administrativeContact: this.state.administrativeContact}, true);
            this.props.updateEditableStatus(true)
        })
    }

    updateContact = (selectedContact) => {
        let administrativeContact = { ...this.state.administrativeContact }
        let removedContact = this.getContact(selectedContact.contactUuid);
        let updatedContactTypes = administrativeContact.selectedContacts.filter(contact=>{
           return  contact.contactUuid != selectedContact.contactUuid
        })
        administrativeContact.selectedContacts = updatedContactTypes
        administrativeContact.availableContacts.push(removedContact[0])
        
        this.setState({
            administrativeContact
        }, () => {
            this.props.siteContactData({administrativeContact: this.state.administrativeContact}, true)
        }
        );
    }


    render() {
        const {
            iseditSiteContactsEnable
        } = this.props
        const {
            administrativeContact
        } = this.state;
        return (
            <Fragment>                
                {
                    <StyleGrayWrapper>
                        <CardTopContainer>
                            <Label dark={true} emphasized={true}>Administrative Contact</Label>
                            <Button disabled={iseditSiteContactsEnable} variant="secondary">
                                {i18Data.view}
                            </Button>
                        </CardTopContainer>
                        <CardBottomContainer>
                            {
                                (administrativeContact.selectedContacts && administrativeContact.selectedContacts.length> 0) &&
                                <>
                                    {administrativeContact.selectedContacts.map((contact)=>{
                                      
                                       return <>
                                        <StyledLeftSection spaceBottom>
                                        <Label dark={true} emphasized={true} >{!iseditSiteContactsEnable ? i18Data.contactName : i18Data.currentContact}</Label>
                                        <Label className='contact-name'>
                                            {contact && `${contact.firstName},${contact.lastName}`}
                                            {iseditSiteContactsEnable && <IconStyle onClick={() => this.updateContact(contact)}><Icon  className='close' graphic="close" size="xs" /></IconStyle>}
                                        </Label>
                                        </StyledLeftSection>
                                        {!iseditSiteContactsEnable &&
                                            <StyledRightSection>
                                                <Label dark={true} emphasized={true}>{i18Data.status}</Label>
                                                <Label>
                                                    {
                                                        <StatusIndicator variant={contact && contact.contactStatus === i18Data.active ? "success" : "error"}>
                                                            {contact && contact.contactStatus || i18Data.inActive}
                                                        </StatusIndicator>
                                                    }
                                                </Label>
                                            </StyledRightSection>
                                        }
                                        </>
                                    })}                                                                        
                                </>
                            }
                            {
                                (administrativeContact.availableContacts.length>0)&&
                                <DropdownWrapper>
                                    <Label dark={true} emphasized={true}>
                                        {iseditSiteContactsEnable ? 'Assign a different contact' : 'Assign contact'}
                                    </Label>
                                    <Dropdown
                                        className = 'drop-down'
                                        onChange={(e) => this.onChange(e)}
                                        defaultValue='select'
                                        value={'select'}
                                    >
                                        <option value="select">Select contact</option>
                                        {administrativeContact.availableContacts && administrativeContact.availableContacts.map((contact, index) => {
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
                }

            </Fragment>)
    }
}
