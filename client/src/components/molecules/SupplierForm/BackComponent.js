import React from "react";
import { IconButtonLinkWithText } from '@beans/link';
import { BackWrapper } from "./styled";
import { collectionKeys } from '../../../config';

const BackComponent = ({ handleBackComponent, selectedAttr }) => {
    return (
        <BackWrapper>
            <IconButtonLinkWithText
                icon={{ graphic: 'backwardLink', size: 'sm', position: { global: 'left' } }}
                buttonVariant="secondary"
                emphasized={true}
                onClick={() => handleBackComponent(selectedAttr)}
            >
                {
                    selectedAttr && selectedAttr.collectionType ?
                        <span>{collectionKeys[selectedAttr.collectionType]}</span>
                        :
                        <span>{collectionKeys.default}</span>
                }
            </IconButtonLinkWithText>
        </BackWrapper>
    );
}

export default BackComponent;