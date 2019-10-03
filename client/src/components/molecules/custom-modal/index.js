import React from 'react';
import Modal from '@beans/modal';
import Label from '@beans/label';
import Button from '@beans/button';
import { BtnContainer } from '../../../common/styles';
import { ModelBox } from './styled'

const modal = ({
    isOpen,
    text,
    cancelText,
    stayText,
    cancelModel,
    stayForm
}) => {
    return (
        <Modal closeLink={false} open={isOpen}>
            <ModelBox>
                <Label>
                    {text}
                </Label>
                <BtnContainer maxWidth={Math.max(stayText.length, cancelText.length)}>
                    <Button
                        variant="secondary"
                        onClick={stayForm}

                    >
                        <span>{stayText}</span>
                    </Button>
                    <Button
                        variant="primary"
                        onClick={cancelModel}
                    >
                        <span>{cancelText}</span>
                    </Button>
                </BtnContainer>
            </ModelBox>
        </Modal>
    )
}

export default modal;