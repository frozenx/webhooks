import React from "react";
import { IconButtonLinkWithText } from '@beans/link';
import { AddDetailsWrapper } from "./styled";

const AddDetails = props => {
    return (
        <AddDetailsWrapper>
            <IconButtonLinkWithText
                icon={{ graphic: 'add', size: 'xs', position: { global: 'left' } }}
                buttonVariant="secondary"
                disabled={!props.canAddNewSite}
                emphasized={true}
                onClick={() => { props.addNewSite() }}
            >
                {props.title}
            </IconButtonLinkWithText>
        </AddDetailsWrapper>
    );
}

export default AddDetails;
