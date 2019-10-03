import React, { useContext } from 'react';
import GenericForm from '../GenericForm';
import FormContext from '../../context';

const GenericFormContainer = (props) => {

    const { values, errors, errorStatus, currentAccordion } = useContext(FormContext);
    return (
        <GenericForm
            attributeToRulesMapping={props.attributeToRulesMapping || {}}
            id={props.id}
            attributes={props.genericFormData}
            values={values[currentAccordion] || props.values || {}}
            errors={errors[currentAccordion] || props.errors || {}}
            accordionId={currentAccordion}
            isFormLocked={props.isFormLocked}
            isOnEditMode={props.isOnEditMode}
        />
    )
}

export default GenericFormContainer;