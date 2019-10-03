import React, { useState, useEffect, Fragment } from 'react';
import _ from 'lodash';
import Tabs from '../../../lib/components/tabs/src/component/';
import Header from '../header';
import httpClient from '../../../lib/httpClient';
import Supplier from '../../pages/Supplier';
import Button from '@beans/button';
import EditJourneyConnector from '../../context/connectors/editJourneyConnector';
import config from '../../../config';
import CustomTable from '../../molecules/table/';
import helper from '../../../helper';
import i18Data from '../../../languagepack';
import AccordionContainer from '../accordion-group';
import {PreviewContainer, LabelContainer} from './styled';
import Label from '@beans/label';
import {FormHeading} from '../../../common/styles';

class TabsContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            activeTab: 'tab1',
            tab1: {},
            tab2: {},
            tab3: {},
            siteUuid: '',
            siteVersion: '',
            paymentUuid: '',
            paymentVersion: '',
            headerUuid: '',
            headerVersion: '',
            isPaymentDisabled: true,
            isSiteViewTable: false,
            isPaymentViewTable: false,
            siteRowData: null,
            paymentRowData: null,
            siteColumnData: i18Data.SITE_TABLE_HEAD,
            paymentColumnData: i18Data.PAYMENT_TABLE_HEAD,
            selectedSiteData: null,
            selectedPaymentData: null,
            selectedSiteDataStatus: false,
            selectedPaymentDataStatus: false

        }
        this.changeViewMode = this.changeViewMode.bind(this);
    }

    componentDidMount() {
        this.props.location.state && this.setState({headerUuid: this.props.location.state.uuid, headerVersion: this.props.location.state.version})
    }   

    submitHandler = (values, saveState, isFormValid) => {        
        if (isFormValid) {
            if (this.state.activeTab == 'tab1') {
                let additionalValues = {
                    uuid: this.state.headerUuid,
                    version: this.state.headerVersion,
                    status: saveState
                }             
                httpClient.post(config.endPoints.supplierHeaderEndPoint, {...values, ...additionalValues})
                .then((data) => {
                    this.setState({ isSubmitSuccessful: true, isFormError: false, headerVersion: data.version });
                    this.props.history.push({
                        state: {...this.props.location.state}
                    })                
                });
            } else if (this.state.activeTab == 'tab2') {
                let additionalValues = {
                    uuid: this.state.headerUuid,
                    siteUuid: this.state.siteUuid,
                    siteVersion: this.state.siteVersion,
                    status: saveState
                }
                httpClient.post(config.endPoints.supplierSiteEndPoint, {...values, ...additionalValues})
                .then((data) => { 
                    let createRowData = helper.createRow(data, this.state.activeTab)
                    const mergedData =this.state.siteRowData ? helper.mergeArrayAndUpdateProperites(this.state.siteRowData, createRowData) : createRowData
                        this.setState({ isSubmitSuccessful: true, 
                            isFormError: false, 
                            siteVersion: data.version, 
                            siteUuid: data.uuid,
                            isSiteViewTable: true,
                            siteRowData: mergedData
                         });                    
                });
            } else if (this.state.activeTab == 'tab3') {
                let additionalValues = {
                    uuid: this.state.siteUuid,
                    paymentUuid: this.state.paymentUuid,
                    paymentVersion: this.state.paymentVersion,
                    status: saveState
                }
                httpClient.post(config.endPoints.paymentEndPoint, {...values, ...additionalValues})
                .then((data) => {
                    let createRowData = helper.createRow(data, this.state.activeTab)
                        createRowData = this.state.paymentRowData ? helper.mergeArrayAndUpdateProperites(this.state.paymentRowData, createRowData): createRowData
                    this.setState({ 
                        isSubmitSuccessful: true,
                        isFormError: false,
                        paymentVersion: data.version,
                        paymentUuid: data.uuid,
                        isPaymentViewTable: true,
                        paymentRowData: createRowData
                    });                    
                });
            }                
        }
        else {
            this.setState({ isFormError: true, isSubmitSuccessful: false });
        }

    }

    _radioHandleClick = async (uuid, tabId) => {
        const getDetailsUrl = tabId == 'tab2' ? `${config.endPoints.siteGetDetails}?uuid=${uuid}` :`${config.endPoints.paymentGetDetails}?uuid=${uuid}`
        const response = await httpClient.get(getDetailsUrl)
        tabId == 'tab2' && response ?
        this.setState({
            selectedSiteData: response,
            selectedSiteDataStatus: true,
            isPaymentDisabled: false,

        }) :
        this.setState({
            selectedPaymentData: response,
            selectedPaymentDataStatus:true,
        })   
    }

    changeViewMode(type, tabId) {        
        if(tabId == 'tab2') {
            type == i18Data.addNew?
            this.setState({
                isSiteViewTable: false,
                siteUuid: '', 
                siteVersion: '',
                selectedSiteData: '',
                selectedSiteDataStatus: false
            }) :
            this.setState({
                selectedSiteDataStatus: false,
                isSiteViewTable: false,
                siteUuid: this.state.selectedSiteData && this.state.selectedSiteData.siteDetails.uuid,
                siteVersion: this.state.selectedSiteData && this.state.selectedSiteData.siteDetails.version
            })
        }
        else if(tabId == 'tab3') {
            type == i18Data.addNew?
            this.setState({
                isPaymentViewTable: false,
                paymentUuid: '', 
                paymentVersion: '',
                selectedPaymentData: '',
                selectedPaymentDataStatus: false
            }) :
            this.setState({
                selectedPaymentDataStatus: false,
                isPaymentViewTable: false,
                paymentUuid: this.state.selectedPaymentData && this.state.selectedPaymentData.paymentDetails.uuid,
                paymentVersion: this.state.selectedPaymentData && this.state.selectedPaymentData.paymentDetails.version
            })
        }    
    }
    updateTabIndicator = (tabId, indicatorValue, indicatorVariant) => {
        this.setState({ [tabId]: { indicatorValue, indicatorVariant } });
    }
    componentDidCatch(err) {
        this.setState({ error: true });
    }
    render() {
        const { activeTab, error, 
            isSubmitSuccessful, isFormError,
            isPaymentDisabled, isSiteViewTable,
            isPaymentViewTable,
            siteRowData, siteColumnData,
            paymentRowData, paymentColumnData,
            selectedSiteData, selectedPaymentData,
            siteUuid, paymentUuid,
            selectedSiteDataStatus,
            selectedPaymentDataStatus
        } = this.state;
        if (!error) {           
            return (
                <Tabs
                    activeTabID={activeTab}
                    onChange={({ nextTab }) => { this.setState({ activeTab: nextTab.id }) }
                    }
                    id="tabs"
                    tabs={
                        [
                            {
                                id: 'tab1',
                                label: 'Header',
                                panelContent: (
                                    <Fragment>
                                        <EditJourneyConnector
                                            tabId={'tab1'}
                                            url={'/tradingpartner/api/supplier-header'}
                                            submitHandler={this.submitHandler}
                                            updateTabIndicator={this.updateTabIndicator}
                                            isSubmitSuccessful={isSubmitSuccessful}
                                            isFormError={isFormError}
                                        >
                                            <Header />
                                        </EditJourneyConnector>
                                    </Fragment>
                                ),
                                panelID: 'section1',
                                showIndicator: true,
                                indicatorText: this.state.tab1.indicatorValue,
                                indicatorVariant: this.state.tab1.indicatorVariant
                            },
                            {
                                id: 'tab2',
                                label: "Site",
                                panelContent: (
                                    <EditJourneyConnector
                                        tabId={'tab2'}
                                        siteEditMode = {siteUuid && true}
                                        url={'/tradingpartner/api/supplier-site'}
                                        submitHandler={this.submitHandler}
                                        selectedSiteData={selectedSiteData}
                                        updateTabIndicator={this.updateTabIndicator}>
                                        {isSiteViewTable ? 
                                        <Fragment>
                                        <CustomTable
                                           tabId={'tab2'}                      
                                           columns={siteColumnData} 
                                           rows={siteRowData} 
                                           handleClick={(type, tabId) => this.changeViewMode(type, tabId)}
                                           radioHandleClick={this._radioHandleClick}
                                           />
                                           {
                                            selectedSiteDataStatus ?
                                            <Fragment>
                                                <hr></hr>
                                                <PreviewContainer>
                                                    <FormHeading>
                                                        {
                                                            selectedSiteData &&
                                                            <>
                                                            <h1>{selectedSiteData.siteDetails.selectedSiteName}</h1>
                                                            <LabelContainer>
                                                                <Label dark emphasized>{`${i18Data.associatedWithSupplier} ${selectedSiteData.siteDetails.selectedSiteName}`}</Label>
                                                            </LabelContainer>                                                            
                                                            </>
                                                        }
                                                    </FormHeading>
                                                    <AccordionContainer 
                                                        isClosed={true}
                                                        attributeGroups={selectedSiteData.siteDetails.attributeGroups}
                                                        indicators={selectedSiteData.siteDetails.indicators}
                                                    />
                                                </PreviewContainer>
                                            </Fragment>
                                                :
                                                null
                                           }
                                        </Fragment> 
                                           :
                                           <Header />
                                           }
                                    </EditJourneyConnector>
                                ),
                                panelID: 'section2',
                                showIndicator: true,
                                indicatorText: this.state.tab2.indicatorValue,
                                indicatorVariant: this.state.tab2.indicatorVariant
                            },
                            {
                                id: 'tab3',
                                label: 'Payment',
                                disabled: isPaymentDisabled,
                                panelContent: (
                                    <EditJourneyConnector
                                        tabId={'tab3'}
                                        paymentEditMode = {paymentUuid && true}
                                        url={'/tradingpartner/api/supplier-payments'}
                                        submitHandler={this.submitHandler}
                                        selectedSiteData={selectedSiteData}
                                        selectedPaymentData={selectedPaymentData}                                    
                                        updateTabIndicator={this.updateTabIndicator}>
                                        {isPaymentViewTable ? 
                                            <Fragment>                                            
                                            <CustomTable
                                               tabId={'tab3'}
                                               columns={paymentColumnData} 
                                               rows={paymentRowData} 
                                               handleClick={(type, tabId) => this.changeViewMode(type, tabId)}
                                               radioHandleClick={this._radioHandleClick}
                                               />
                                               {
                                                selectedPaymentDataStatus ?
                                                <Fragment>
                                                    <hr></hr>
                                                    <PreviewContainer>
                                                        <FormHeading>
                                                            {
                                                                selectedPaymentData &&
                                                                <>
                                                                    <h1>{selectedPaymentData.paymentDetails.selectedPaymentName}</h1>
                                                                    <LabelContainer>
                                                                        <Label dark emphasized>{`${i18Data.associatedWithSupplier} ${selectedPaymentData.paymentDetails.selectedPaymentName}`}</Label>
                                                                    </LabelContainer>                                                            
                                                                </>
                                                            }
                                                        </FormHeading>

                                                        <AccordionContainer 
                                                            isClosed={true}
                                                            attributeGroups={selectedPaymentData.paymentDetails.attributeGroups}
                                                            indicators={selectedPaymentData.paymentDetails.indicators}
                                                        />

                                                    </PreviewContainer>
                                                </Fragment>                                                     
                                                    :
                                                    null
                                               }
                                            </Fragment> 
                                               :
                                               <Header />
                                               }                                    
                                    </EditJourneyConnector>
                                ),
                                panelID: 'section3',
                                showIndicator: true,
                                indicatorText: this.state.tab3.indicatorValue,
                                indicatorVariant: this.state.tab3.indicatorVariant
                            },
                        ]}
                />
            )
        }
        return <p>Error </p>

    }
}

export default TabsContainer;