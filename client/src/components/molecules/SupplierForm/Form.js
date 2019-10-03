import React from "react";
import GenericFormContainer from "../../molecules/GenericForm/container";
import {
    BtnContainer,
} from '../../../common/styles'
import { StyledFormContainer } from "./styled";

import Button from '@beans/button';
import i18data from '../../../languagepack';

const SupplierDetailForm = props => {
    const {
        attributeToRulesMapping,
        genericFormData,
        id,
        onSave,
        values,
        errors,
        isFormLocked,
        cancel,
        isCancelModelOpen,
        isOnEditMode,
    } = props;
    return (
        <StyledFormContainer>
            <GenericFormContainer
                attributeToRulesMapping={attributeToRulesMapping}
                genericFormData={genericFormData}
                id={id}
                values={values}
                errors={errors}
                isFormLocked={isFormLocked}
                isOnEditMode={isOnEditMode}
            />
            <BtnContainer maxWidth={Math.max(i18data.save.length, i18data.cancel.length)}>
                < Button
                    variant="secondary"
                    className="submit-btn"
                    id="save-as-draft"
                    type="submit"
                    disabled={isFormLocked}
                    onClick={(e) => { e.stopPropagation(); e.preventDefault(); cancel(e) }}
                > <span>{i18data.cancel}</span>
                </Button>
                <Button
                    variant="primary"
                    className={`submit - btn enabled`}
                    type="submit"
                    id='save'
                    disabled={isFormLocked}
                    onClick={(e) => { e.stopPropagation(); e.preventDefault(); onSave(id); }}
                > <span>{i18data.save}</span>
                </Button>
                {/* <CustomModal
                    stayText={i18data.no}
                    cancelText={i18data.yesCancel}
                    text={i18data.cancelFormText}
                    isOpen={isCancelModelOpen}
                    stayForm={() => cancel('stay')} 
                    cancelModel={() => cancel('cancel', id)}
                />                 */}
            </BtnContainer >
        </StyledFormContainer >
    );
}

export default SupplierDetailForm;
