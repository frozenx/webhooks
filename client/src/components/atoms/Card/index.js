import React from 'react';
import Label from '@beans/label';
import Button from '@beans/button';
import i18Data from '../../../languagepack';
import CardContainer from '../../templates/card';
import {
    CardTopContainer,
    CardBottomContainer,
    StyledLeftSection,
    StyledRightSection,
    StyledBodyText
} from './styled'
import StatusIndicator from '@beans/colleague-status-indicator';

const AddressBookCard = ({ address, navigateToForm }) => {
    const { address1, address2, address3 } = address;
    const delimiter = ',';
    let addressLine = address1;
    if (address2)
        addressLine += `${delimiter}${address2}`;
    if (address3)
        addressLine += `${delimiter}${address3}`;


    return (
        <CardContainer>
            <CardTopContainer>
                <StyledLeftSection>
                    <Label dark={true} emphasized={true}>{address1}</Label>
                </StyledLeftSection>
                <StyledRightSection>
                    <Button variant="secondary" onClick={() => { navigateToForm(address.addressUuid) }}>
                        {i18Data.view}
                    </Button>
                </StyledRightSection>
            </CardTopContainer>
            <CardBottomContainer>
                <StyledLeftSection>
                    <Label dark={true} emphasized={true}>{i18Data.address}</Label>
                    {address1 && <StyledBodyText>{`${addressLine}`}</StyledBodyText>}
                </StyledLeftSection>
                <StyledRightSection>
                    <Label dark={true} emphasized={true}>{i18Data.status}</Label>
                    <Label>
                        {<StatusIndicator variant={address.isActive === 'Active' ? "success" : "error"}>
                            {address.isActive || "I"}
                        </StatusIndicator>
                        }
                    </Label>
                </StyledRightSection>
            </CardBottomContainer>
        </CardContainer>
    )
}
export default AddressBookCard;
