import React from 'react';
import { Prompt } from 'react-router-dom';
import * as supplierHeaderConfig from './config';
import httpClient from '../../../lib/httpClient';
import scroller from '../../../lib/scroller';
import config from '../../../config';
import Loader from '../../atoms/Loader';
import Modal from '../../molecules/custom-modal';
import SupplierOverview from '../../molecules/SupplierOverview';
import MetaDataNode from '../../molecules/SupplierOverview/MetaData';
import SupplierForm from '../../molecules/SupplierForm';
import i18data from '../../../languagepack';
import * as utils from './utils';
import Contacts from '../../molecules/ContactBook'
import AddressBookContainer from '../containers/address-book';
import AddressBook from './addressBook';
import contactBook from './contactBook';
import SiteAddresses from '../../molecules/SiteAddresses';
import SiteContacts from '../../molecules/SiteContacts';
import contactResponse from './constants'
import ContactBookContainer from '../containers/contact-book'

class SupplierHeader extends React.Component {
    state = {
        supplierMessage: '',
        displayLoader: false,
        attributeGroupIds: {},
        values: {},
        errors: {},
        currentFormValues: {},
        isCancelModelOpen: false,
        showModal: false,
        addressBookData: null,
        addressBookMessage: '',
        showStepTwo: true
    };
    componentWillMount() {
        this.setState({ displayLoader: true })
    }
    componentDidMount() {
        window.onbeforeunload = null;
        MetaDataNode.presets = supplierHeaderConfig.presets;
        this._getMetaData();
    }

    getUrl = (formType, isEditMode = false) => {
        const { endPoints, entityTypes: { partner, site, tnc } } = config;
        switch (formType) {
            case partner:
                return endPoints.supplierHeaderEndPoint;
            case site:
                return endPoints.supplierSiteEndPoint;
            case tnc:
                return endPoints.paymentEndPoint;
            case 'address':
                return endPoints.saveAddress(isEditMode);
            case 'contact':
                return endPoints.saveContact(isEditMode);
        }
    }

    getPayload = (node, currentFormValues, key) => {
        return {
            parentUuid: node.parentUuid || '',
            uuid: node.uuid || '',
            version: node.version || '',
            ...node.getValues(currentFormValues, key)
        }
    }

    getSuccessTitle = () => {
        const { selectedAttributeGroup } = this.state;
        const { supplierHeaderData } = this.props.location.state;
        return `${supplierHeaderData.partnerName} ${selectedAttributeGroup.name} have been successfully updated`;
    }

    createRootNode = (metaData, headerLevelAttributeRules) => {
        const { supplierHeaderData } = this.props.location.state;
        const rootNode = new MetaDataNode(
            {
                uuid: supplierHeaderData.uuid,
                type: config.entityTypes.partner,
                version: supplierHeaderData.version,
                fields: metaData.attributeGroups.map(attributeGroup => (
                    {
                        ...attributeGroup,
                        action: 'disabled',
                        ...((config.collectionRecords.indexOf(attributeGroup.key) != -1) && {
                            isACollection: true,
                            collectionType: attributeGroup.key

                        })
                    }
                )),
                attributeRules: headerLevelAttributeRules,
                partnerStaticAttributes: metaData.partnerAttributeStatic.attributes,
                addressBook: new AddressBook(),
                contactBook: new contactBook()
            }
        )
        return rootNode;
    }
    _handleStepThree = (selectedAttributeGroup, node, isEditMode) => {
        const { key, isACollection, type } = selectedAttributeGroup;        
        if(type === 'linkAddress' || type === 'linkContact') {
            this.setState({
                showSiteAddress: type == 'linkAddress',
                showSiteContacts: type == 'linkContact',
                showStepThree: false,
                showStepTwo: false,
                currentNode: node,
                selectedAttributeGroup,
                iseditSiteAddressesEnable: false,
                iseditSiteContactsEnable: false,
                isFormSubmissionSuccessful: false,
                isFormSubmissionError: false
            })
        } else {
            this.setState({
                showStepTwo: false,
                selectedAttributeGroup,
                currentNode: node,
                showStepThree: !isACollection,
                showAddressBook: (isACollection && key == 'address'),
                showContactBook: (isACollection && key == 'contact'),
                currentFormValues: isACollection ? {} : {
                    [key]: { ...JSON.parse(JSON.stringify(node[key])) } || { values: {}, error: {} }
                },
                isEditMode
            });
            scroller();
        }
    }
    _handleBackComponent = (selectedAttr) => {
        const { isFormModified } = this.state;
        const collectionType = selectedAttr && selectedAttr.collectionType;
        this.setState({
            showStepThree: isFormModified,
            showStepTwo: !isFormModified,
            isFormSubmissionError: false,
            isFormValidationError: false,
            isFormSubmissionSuccessful: false,
            showModal: isFormModified,
            showSiteAddress:  isFormModified && selectedAttr.type == 'linkAddress',
            showSiteContacts: isFormModified && selectedAttr.type == 'linkContact',
            showAddressBook: (!isFormModified && collectionType == 'address'),
            showContactBook: (!isFormModified && collectionType == 'contact'),
        })
        scroller();
    };
    _showAddressForm = () => {
        this.setState({
            showAddressBook: false,
            showContactBook: false,
            showStepThree: true,
        })
    }
    editSiteAddresses = (status) => {
        this.setState({ 
            iseditSiteAddressesEnable: status,
            isFormModified: true
        })
    }
    editSiteContacts = (status) => {
        this.setState({
            iseditSiteContactsEnable: status,
            isFormModified: true
        })
    }
    validateForm = () => {
        const { currentNode, selectedAttributeGroup: { key, attributes }, currentFormValues } = this.state;
        if (!currentFormValues[key]) currentFormValues[key] = { values: {}, errors: {} };
        attributes.forEach((attribute) => {
            const id = attribute.key;
            let value = currentFormValues[key].values[id] || '';

            const attributeRules = currentNode.attributeRules[currentNode.type][id];
            if (value.match(new RegExp(attributeRules.regexRule)) === null) {
                currentFormValues[key].errors[id] = true;
            }
            else if (attributeRules.required && !value) {
                currentFormValues[key].errors[id] = true;
            }
            else {
                currentFormValues[key].errors[id] = false;
            }
        });
    }
    _onChange = (event) => {
        event.stopPropagation();
        const { target: { id, value } } = event;

        const {
            selectedAttributeGroup: { key },
            selectedAttributeGroup,
            attributeToRulesMapping,
            currentNode,
            currentFormValues } = this.state;
        if (!currentFormValues[key]) currentFormValues[key] = { values: {}, errors: {} };

        currentFormValues[key].values[id] = value
        const updatedAttributeRules = { ...currentNode.attributeRules }
        updatedAttributeRules[currentNode.type] = utils.updateAttributeRules(supplierHeaderConfig.presets, currentNode.attributeRules[currentNode.type], id, currentFormValues[key].values[id], currentNode.type);
        currentNode.attributeRules[currentNode.type] = updatedAttributeRules[currentNode.type];
        if (config.forceCapitalizationAttributes[id]) {
            currentFormValues[key].values[id] = value.toUpperCase();
        } else {
            currentFormValues[key].values[id] = value
        }
        if (value.match(new RegExp(updatedAttributeRules[currentNode.type][id].regexRule)) === null) {
            currentFormValues[key].errors[id] = true;
        } else {
            currentFormValues[key].errors[id] = false;
        }
        this.setState({
            rootNode: this.state.rootNode,
            isFormModified: true,
            attributeToRulesMapping: updatedAttributeRules
        });

    }
    
    getSitePayload = (node) => {        
        const { site, bankdetails, address, contact, version, uuid } = node
        return {
            site: site.values,
            bankdetails: bankdetails.values,
            address: address.values,
            contact: contact.values,
            parentUuid: this.state.rootNode.uuid || '',
            version: version || '',
            uuid: uuid || ''           
        }
    }

    saveSiteData = async(key, node, siteData) => {
        this.setState({ displayLoader: true });
        const url = this.getUrl('site');
        const addressType = (key == 'address');
        const contactType = (key == 'contact');
  
        const payload = this.getSitePayload(node)
        payload[key] = siteData? siteData : (key == 'address' ? node.address.values : node.contact.values)        
        try {
        const savedResponse = await httpClient.post(url, payload)
        let isFormEmpty = Object.keys(savedResponse.values[key]).every((attr) => !savedResponse.values[key][attr])        
        const fields = node.fields.map((field) => {            
            if (field.key === key) {                
                return { ...field, action: !isFormEmpty ? 'enabled' : 'disabled' }
            }
            return { ...field }
        });
        
        this.setState({
            displayLoader: false,
            isFormSubmissionSuccessful: true,
            isFormSubmissionError: false,
            showStepTwo: false,
            showStepThree: false,
            isFormModified: false,
            showSiteAddress: addressType,
            showSiteContacts: contactType,
            currentFieldName: (this.state.selectedAttributeGroup || {}).name,
            iseditSiteAddressesEnable : addressType? isFormEmpty : this.state.iseditSiteAddressesEnable,
            iseditSiteContactsEnable : contactType? isFormEmpty : this.state.iseditSiteContactsEnable
        })
        node.updateNode(savedResponse);
        node.updateFields(fields)
        const { rootNode } = this.state;

        let allUuids=[];
        Object.values(savedResponse.partnerAttributes).forEach(uuids=>{
            allUuids=[...allUuids,...uuids.split(',')];
        });

        let uniqueUuids = allUuids.filter((item, i, ar) => ar.indexOf(item) === i);        
        addressType? rootNode.addressBook.linkAddress(savedResponse.uuid,uniqueUuids) : rootNode.contactBook.linkContact(savedResponse.uuid,uniqueUuids)        
        
        this.setState({
            rootNode
        })
        scroller();
        }
        catch (err) {
            this.setState({
                isFormSubmissionError: true,
                isFormValidationError: false,
                displayLoader: false,
            })
            scroller();
        }

    }
    _onSave = async (key, node) => {
        this.setState({ displayLoader: true });
        const fieldWithCollection = node.fields.find((field) => field.isACollection && field.key === key)
        const formType = fieldWithCollection ? fieldWithCollection.collectionType : node.type;
        const { currentFormValues, isEditMode } = this.state;
        const url = this.getUrl(formType, isEditMode);

        this.validateForm();
        try {
            if (Object.keys(currentFormValues[key].errors).some(id => currentFormValues[key].errors[id])) {
                this.setState({
                    isFormValidationError: true,
                    isFormSubmissionError: false,
                    displayLoader: false,
                    rootNode: this.state.rootNode
                })
                scroller();
            } else {
                const payload = (fieldWithCollection) ? {
                    attributes: currentFormValues[key].values,
                    partnerUuid: this.state.rootNode.uuid,
                } : this.getPayload(node, currentFormValues, key);
                const savedResponse = await httpClient.post(url, payload)
                // node.update({ uuid, version });
                const fields = node.fields.map((field) => {
                    if (field.key === key) {
                        return { ...field, action: 'enabled' }
                    }
                    return { ...field }
                });

                if (fieldWithCollection) {
                    fieldWithCollection.collectionType === 'address' ? this.state.rootNode.addressBook.addAddress(savedResponse) : this.state.rootNode.contactBook.addContact(savedResponse);
                }
                else {
                    node.updateNode(savedResponse);
                }
                node.updateFields(fields)

                this.setState({
                    rootNode: this.state.rootNode,
                    isFormSubmissionError: false,
                    isFormValidationError: false,
                    isFormSubmissionSuccessful: true,
                    showStepTwo: true,
                    showAddressBook: (fieldWithCollection && key == 'address') ? true : false,
                    showContactBook: (fieldWithCollection && key == 'contact') ? true : false,
                    showStepThree: false,
                    displayLoader: false,
                    currentFieldName: (this.state.selectedAttributeGroup || {}).name,
                    currentFormValues: {},
                    isFormModified: false
                })
                scroller();
            }

        } catch (err) {
            this.setState({
                isFormSubmissionError: true,
                isFormValidationError: false,
                displayLoader: false
            })
            scroller();
        }
    }

    _addSite = (node) => {
        const { siteMetaData, attributeToRulesMapping } = this.state;
        const newNode = new MetaDataNode({
            type: config.entityTypes.site,
            fields: siteMetaData.attributeGroups.map(attributeGroup => (
                { ...attributeGroup, action: 'disabled' }
            )),
            attributeRules: attributeToRulesMapping
        })
        node.addChild(newNode);
        this.setState({ rootNode: this.state.rootNode })
    }

    _addPayment = (node) => {
        const { paymentMetaData, attributeToRulesMapping } = this.state;
        const newNode = new MetaDataNode({
            type: config.entityTypes.tnc,
            fields: paymentMetaData.attributeGroups.map(attributeGroup => (
                { ...attributeGroup, action: 'disabled' }
            )),
            attributeRules: attributeToRulesMapping
        })
        node.addChild(newNode);
        this.setState({
            rootNode: this.state.rootNode
        });
    }
    cancel = (modalStatus, selectedAttributeGroup) => { 
        let type = selectedAttributeGroup && selectedAttributeGroup.type
        if (modalStatus == 'stay') {
            let isLinkContact = type == 'linkContact'
            let isLinkAddress = type == 'linkAddress'
            this.setState({
                showModal: false,
                showStepThree: !isLinkAddress && !isLinkContact,
                isNavigationBlocked: false
            })
        }
        else {
            this.setState({ showModal: true });
            if (this.state.showModal) {
                this.setState({
                    isFormSubmissionSuccessful: false,
                    showStepTwo: true,
                    showStepThree: false,
                    showContactBook: type == 'contactBook',
                    showAddressBook: type == 'addressBook',
                    showSiteAddress: false,
                    showSiteContacts: false,
                    showModal: false,
                    currentFormValues: {},
                    isFormModified: false
                });
                scroller();
            }
        }
    }
    componentDidUpdate() {
        if (this.state.showStepThree) {
            window.onbeforeunload = () => {
                return 'Are you sure you want to reload the page ? You will lose current data.'
            }
        } else {
            window.onbeforeunload = null;
        }
    }

    render() {
        const { supplierHeaderData } = this.props.location.state;
        const {
            attributeGroupIds,
            attributeToRulesMapping,
            selectedAttributeGroup,
            selectedAttributeGroup: { key = {} } = {},
            showStepThree,
            showStepTwo,
            headerMetaData,
            siteMetaData,
            paymentMetaData,
            displayLoader,
            rootNode,
            currentNode,
            isFormSubmissionError,
            isFormValidationError,
            isFormSubmissionSuccessful,
            currentFieldName,
            currentFormValues,
            isNavigationBlocked,
            showModal,
            showAddressBook,
            showSiteAddress,
            showContactBook,
            iseditSiteAddressesEnable,
            iseditSiteContactsEnable,
            showSiteContacts
        } = this.state;
        return (
            <React.Fragment>
                {displayLoader ? <Loader /> : null}
                {showModal && <Modal
                    stayText={i18data.no}
                    cancelText={i18data.yesCancel}
                    text={i18data.cancelFormText}
                    isOpen={showModal}
                    stayForm={() => this.cancel('stay', selectedAttributeGroup)}
                    cancelModel={() => {
                        if (isNavigationBlocked) {
                            this.proceedWithNavigation()
                        } else {
                            this.cancel('cancel', selectedAttributeGroup);
                        }
                    }}
                />
                }

                {!showStepThree && !showAddressBook && !showContactBook && !showSiteAddress && !showSiteContacts &&
                    rootNode && <SupplierOverview
                        supplierHeaderData={supplierHeaderData}
                        handleStepThree={this._handleStepThree}
                        metaData={headerMetaData}
                        siteMetaData={siteMetaData}
                        paymentMetaData={paymentMetaData}
                        attributeGroupIds={attributeGroupIds}
                        rootNode={rootNode}
                        addSite={this._addSite}
                        addPayment={this._addPayment}
                        currentFieldName={currentFieldName}
                        isFormSubmissionSuccessful={isFormSubmissionSuccessful}

                    />
                }
                


                {showStepThree &&

                    <form onChange={this._onChange}>
                        <SupplierForm
                            selectedAttr={selectedAttributeGroup}
                            showStepTwo={showStepTwo}
                            showStepThree={showStepThree}
                            partnerName={rootNode.partner.values.partnerName}
                            handleBackComponent={this._handleBackComponent}
                            attributeToRulesMapping={currentNode.attributeRules[currentNode.type]}
                            onSave={this._onSave}
                            values={(currentFormValues[key] || {}).values || {}}
                            errors={(currentFormValues[key] || {}).errors || {}}
                            node={currentNode}
                            isFormValidationError={isFormValidationError}
                            isFormSubmissionError={isFormSubmissionError}
                            cancel={this.cancel}
                            isCancelModelOpen={this.state.isCancelModelOpen}
                        />
                    </form>
                }
                {showStepThree && <Prompt when={showStepThree} message={(location) => {
                    this.setState({
                        showModal: true,
                        isNavigationBlocked: true,
                        nextLocationPath: location.pathname
                    })
                    return false;
                }} />}

                {showAddressBook &&
                    <AddressBookContainer
                        rootNode={rootNode}
                        addressBook={rootNode.addressBook}
                        addressList={rootNode.addressBook.entries}
                        handleBackComponent={this._handleBackComponent}
                        navigateToForm={this._handleStepThree}
                        partnerName={rootNode.partner.values.partnerName}
                        partnerUuid={rootNode.uuid}
                        selectedAttr={selectedAttributeGroup}
                        selectedAttributeGroup={selectedAttributeGroup}
                        showAddressForm={this._showAddressForm}
                        updateAddressBook={this.updateAddressBook}
                        attributeRules={rootNode.attributeRules}
                    />
                }

                {
                    showContactBook &&
                    <ContactBookContainer
                        rootNode={rootNode}
                        contactBook={rootNode.contactBook}
                        contactList={rootNode.contactBook.entries}
                        handleBackComponent={this._handleBackComponent}
                        navigateToForm={this._handleStepThree}
                        partnerName={rootNode.partner.values.partnerName}
                        partnerUuid={rootNode.uuid}
                        selectedAttr={selectedAttributeGroup}
                        selectedAttributeGroup={selectedAttributeGroup}
                        showContactForm={this._showAddressForm}
                        updateContactBook={this.updateContactBook}
                        attributeRules={rootNode.attributeRules}

                    />
                }

                {
                    showSiteAddress && 
                        <SiteAddresses
                            addresses={rootNode.addressBook.entries}
                            handleBackComponent={this._handleBackComponent}
                            editSiteAddresses={this.editSiteAddresses}
                            updateAddressBook={this.updateAddressBook}
                            rootNode={rootNode}
                            node={currentNode}
                            saveSiteAddress={this.saveSiteData}
                            cancel={this.cancel}
                            selectedAttr={selectedAttributeGroup}
                            updateAddressBook={this.updateAddressBook}
                            isFormSubmissionSuccessful={isFormSubmissionSuccessful}
                            isFormSubmissionError={isFormSubmissionError}
                            currentFieldName={currentFieldName}
                            iseditSiteAddressesEnable={iseditSiteAddressesEnable}
                        />
                }
                {
                    showSiteContacts &&
                        <SiteContacts
                            contacts={rootNode.contactBook.entries}
                            handleBackComponent={this._handleBackComponent}
                            editSiteContacts={this.editSiteContacts}
                            updateAddressBook={this.updateAddressBook}
                            rootNode={rootNode}
                            node={currentNode}
                            saveSiteContact={this.saveSiteData}
                            cancel={this.cancel}
                            selectedAttr={selectedAttributeGroup}
                            updateContactBook={this.updateContactBook}
                            isFormSubmissionSuccessful={isFormSubmissionSuccessful}
                            isFormSubmissionError={isFormSubmissionError}
                            currentFieldName={currentFieldName}
                            iseditSiteContactsEnable={iseditSiteContactsEnable}
                        />
                }
            </React.Fragment>
        )
    }

    _getMetaData = async () => {
        const { endPoints:
            { supplierHeaderEndPoint,
                supplierSiteEndPoint,
                paymentEndPoint } } = config;
        const headerMetaDataPromise = httpClient.get(supplierHeaderEndPoint);
        const siteMetaDataPromise = httpClient.get(supplierSiteEndPoint);
        const paymentsMetaPromise = httpClient.get(paymentEndPoint);
        try {
            const [headerMetaData, siteMetaData, paymentMetaData] =
                await Promise.all(
                    [headerMetaDataPromise,
                        siteMetaDataPromise,
                        paymentsMetaPromise]
                    // paymentsMetaPromise
                );
            const { partner, site, tnc } = config.entityTypes
            const attributeRules = {
                [partner]: {
                    ...headerMetaData.attributeToRulesMapping,
                },
                [site]: {
                    ...siteMetaData.attributeToRulesMapping,
                },
                [tnc]: {
                    ...paymentMetaData.attributeToRulesMapping,
                }
            };
            let rootNode = this.createRootNode(headerMetaData, attributeRules);
            this.setState({
                headerMetaData,
                siteMetaData,
                paymentMetaData,
                displayLoader: false,
                attributeToRulesMapping: attributeRules,
                rootNode
            }, () => {
                this.getPartnerInfo(this.state.rootNode)
            });
        } catch (err) {
            this.setState({
                supplierMessage: err.message,
                displayLoader: false
            })
        }
    }
    getPartnerInfo = async (rootNode) => {
        const { endPoints: {
            getSupplierDetails
        } } = config;
        const { uuid } = rootNode;
        try {
            const savedPartnerDetails = await httpClient.post(getSupplierDetails, { uuid });
            rootNode.updateNode(savedPartnerDetails);
            this.setState({ rootNode: this.state.rootNode })
            await this.getSiteInfo(rootNode);
        }
        catch (err) {
            this.setState({ isPageError: true });
        }
    }


    getSiteInfo = async (rootNode) => {
        const { endPoints: {
            getSiteDetails
        } } = config;
        const { uuid } = rootNode;
        const { attributeToRulesMapping } = this.state;
        try {
            const savedSiteDetails = await httpClient.post(getSiteDetails, { uuid });
            savedSiteDetails.forEach(async (site) => {
                const siteNode = rootNode.addChild({
                    type: config.entityTypes.site,
                    fields: this.state.siteMetaData.attributeGroups.map(attributeGroup => (
                        { ...attributeGroup, action: 'disabled' }
                    )),
                    attributeRules: attributeToRulesMapping
                }, false);
                if (siteNode) {
                    siteNode.updateNode(site);
                    this.setState({ rootNode: this.state.rootNode });
                    await this.getPaymentInfo(siteNode);
                }



            });
        }
        catch (err) {
            throw err;
        }

    }
    getPaymentInfo = async (siteNode) => {
        const { endPoints: {
            getPaymentDetails
        } } = config;
        const { uuid } = siteNode;
        const { attributeToRulesMapping } = this.state;
        try {
            const savedTncDetails = await httpClient.post(getPaymentDetails, { uuid });
            savedTncDetails.forEach((payment) => {
                const paymentNode = siteNode.addChild({
                    type: config.entityTypes.tnc,
                    fields: this.state.paymentMetaData.attributeGroups.map(attributeGroup => (
                        { ...attributeGroup, action: 'disabled' }
                    )),
                    attributeRules: attributeToRulesMapping
                }, false);
                if (paymentNode) {
                    paymentNode.updateNode(payment);
                }
                this.setState({ rootNode: this.state.rootNode })
            })
        }
        catch (err) {
            throw err;
        }
    }
    proceedWithNavigation = () => {
        const { nextLocationPath } = this.state;
        this.setState({
            showModal: false,
            showStepThree: false,
            showStepTwo: true,
            isFormModified: false

        }, () => {
            this.props.history.push({ pathname: nextLocationPath });
        })
    }
    updateAddressBook = (addressRecords, addressCount, pageNumber) => {
        const { rootNode } = this.state;
        rootNode.addressBook.addEntries(addressRecords, addressCount, pageNumber);
        this.setState({ rootNode });
    }
    //update contactBook
    updateContactBook = (contactRecords, contactCount, pageNumber) => {
        const { rootNode } = this.state;
        rootNode.contactBook.addEntries(contactRecords, contactCount, pageNumber);
        this.setState({ rootNode });
    }
    
}

export default SupplierHeader;
