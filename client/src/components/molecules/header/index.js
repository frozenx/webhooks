import React, { useContext, useState, Fragment } from 'react';
import Button from '@beans/button';
import Notification from '@beans/notification';
import i18Data from '../../../languagepack';
import { EditDetailsContainer, LabelContainer, ClubbedContainer } from './styled';
import { FormHeading, NotificationStyle } from '../../../common/styles';
import Label from '@beans/label';


import {
    AccordionContainer as StyledAccordionContainer,
    BtnContainer,
    SecondaryWrapper as StyledFormContainer,
} from '../../../common/styles'

import { useFormHook, useApiHook, useIndicatorHook, useFormValidHook } from '../../hooks';
import AccordionContainer from '../accordion-group';
import FormContext from '../../context';

const Header = ({
    tabId,
    submitHandler,
    updateTabIndicator,
    isSubmitSuccessful,
    isFormError,
    siteEditMode,
    paymentEditMode,
    selectedSiteData,
    selectedPaymentData,
    data
}) => {
    const [currentAccordion, setAccordion] = useState('');
    const [values, errors, formHandler] = useFormHook(data.attributeGroups, data.attributeToRulesMapping);
    const indicators = useIndicatorHook(data.attributeGroups, values, data.attributeToRulesMapping);
    const isFormValid = useFormValidHook(errors);
    return (
        <FormContext.Provider value={{ values, errors, currentAccordion }}>
            {isSubmitSuccessful &&
                <NotificationStyle>
                    <Notification title={'Header record successfully saved'} variant={'success'} />
                </NotificationStyle>
                }
            {isFormError &&
                <NotificationStyle>
                    <Notification title={'Form Invalid. Please fix invalid fields and submit again'} variant={'error'} />
                </NotificationStyle>
                }
            {                
                (tabId == 'tab2' && siteEditMode) &&
                <Fragment>
                    {
                        selectedSiteData &&
                        <Fragment>
                         <EditDetailsContainer>
                            <FormHeading>
                                <h1>{selectedSiteData.siteDetails.selectedSiteName}</h1>
                            </FormHeading>
                            <ClubbedContainer>
                                <LabelContainer>
                                    <Label dark emphasized>{`${i18Data.associatedWithSupplier} ${selectedSiteData.siteDetails.selectedSiteName}`}</Label>
                                </LabelContainer>
                                <Button variant= 'secondary'>{i18Data.editDetails}</Button>
                            </ClubbedContainer>
                        </EditDetailsContainer>                                                            
                        </Fragment>
                    }
                
                </Fragment>
            }
            {                
                (tabId == 'tab3' && paymentEditMode) &&
                <Fragment>
                    {
                        selectedPaymentData &&
                        <Fragment>
                         <EditDetailsContainer>
                            <FormHeading>
                                <h1>{selectedPaymentData.paymentDetails.selectedPaymentName}</h1>
                            </FormHeading>
                            <ClubbedContainer>
                                <LabelContainer>
                                    <Label dark emphasized>{`${i18Data.associatedWithSupplier} ${selectedSiteData.siteDetails.selectedSiteName} ${selectedPaymentData.paymentDetails.selectedPaymentName}`}</Label>
                                </LabelContainer>
                                <Button variant= 'secondary'>{i18Data.editDetails}</Button>
                            </ClubbedContainer>
                        </EditDetailsContainer>                                                            
                        </Fragment>
                    }
                
                </Fragment>
            }
            <StyledFormContainer>
                <form
                    id='accordion-form'
                    onChange={(e) => {
                        e.stopPropagation();
                        formHandler(e, currentAccordion);
                        updateTabIndicator(
                            tabId, `${(indicators.averageValue || 0)} %`, indicators.averageIndicatorVariant)
                    }}
                >
                    <StyledAccordionContainer>
                        <AccordionContainer
                            indicators={indicators}
                            attributeGroups={data.attributeGroups}
                            attributeToRulesMapping={data.attributeToRulesMapping}
                            currentAccordion={currentAccordion}
                            setAccordion={setAccordion} />
                    </StyledAccordionContainer>
                    <BtnContainer>
                        <Button
                            variant="primary"
                            className={`submit - btn enabled`}
                            type="submit"
                            id='save'
                            onClick={(e) => { e.stopPropagation(); e.preventDefault(); submitHandler(values, 'SAVE', isFormValid); }}
                        >Save
                        </Button>
                        <Button
                            variant="secondary"
                            className="submit-btn"
                            id="save-as-draft"
                            type="submit"
                            onClick={(e) => { e.stopPropagation(); e.preventDefault(); submitHandler(values, 'DRAFT', isFormValid); }}>
                            Save as draft
                        </Button>
                    </BtnContainer>
                </form>
            </StyledFormContainer>
        </FormContext.Provider>
    )
}

export default Header;