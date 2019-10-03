import React from 'react';
import { PrimaryWrapper as StyledFormContainer, TabWrapper as StyleTabContainer } from '../../../common/styles';
import Tabs from '../../molecules/tabs';
import { useEditJourneyHook } from '../../hooks';
import FormContext from '../../context';

const RegistrationForm = (props) => {
    const values = useEditJourneyHook(props.match.params.supplierId);
    return (
        <StyledFormContainer id='wrapper'>
            <StyleTabContainer id='tab-wrapper'>
                <FormContext.Provider value={{ values }} >
                    <Tabs id='tabs-wrapper__tabs' {...props}/>
                </FormContext.Provider>
            </StyleTabContainer>
        </StyledFormContainer>)
}


export default RegistrationForm;
