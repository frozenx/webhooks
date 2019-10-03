import React from 'react';
import CardContainer from '../../templates/card';
import {
    CardTopContainer,
    CardBottomContainer,
    StyledLeftSection,
    StyledRightSection,
    StyledBodyText
} from '../Card/styled'
import Label from '@beans/label';
import Button from '@beans/button';
import i18Data from '../../../languagepack';
import StatusIndicator from '@beans/colleague-status-indicator';

const Card = ({ contact ,navigateToForm}) => {
    return (
        <CardContainer>
            <CardTopContainer>
                <StyledLeftSection>
                    <Label dark={true} emphasized={true}> {contact.firstName},{contact.lastName}</Label>
                </StyledLeftSection>
                <StyledRightSection>
                    <Button variant="secondary" onClick={() => { navigateToForm(contact.contactUuid) }}>{i18Data.view}</Button>
                </StyledRightSection>
            </CardTopContainer>
            <CardBottomContainer>
                <StyledLeftSection>
                    <Label dark={true} emphasized={true}>{`${i18Data.role} and ${i18Data.location}`}</Label>
                    {contact.title &&
                        <StyledBodyText>
                            <span>{contact.title}</span>
                            <span>{contact.addressLink}</span>
                        </StyledBodyText>
                    }
                </StyledLeftSection>
                <StyledRightSection>
                    <Label dark={true} emphasized={true}>{i18Data.status}</Label>
                    <Label>
                        {<StatusIndicator variant={contact.contactStatus === 'Active' ? "success" : "error"}>
                            {contact.contactStatus || "I"}
                        </StatusIndicator>
                        }
                    </Label>
                </StyledRightSection>
            </CardBottomContainer>
        </CardContainer>
    )
}
export default Card;
//