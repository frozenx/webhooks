import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '@beans/input-group';
import FormGroup from '@beans/form-group'
import {
    InputType,
} from '../../../common/styles'
import LabelComponent from '../LabelComponent'


class InputTypes extends Component {
    render() {
        const {
            attributeToRulesMapping,
            attr: {
                name,
                type,
                rules,
                toolTip,
            },
            errors,
            id,
            values,
            isFormLocked,
            handleAttributeChange
        } = this.props;
        
        return (
            (attributeToRulesMapping.showToggle === undefined || attributeToRulesMapping.showToggle) && <InputType>
                <LabelComponent tooltip={toolTip} name={name} id={id} required={attributeToRulesMapping.required}></LabelComponent>     
                <Input
                    hideLabel={true}
                    type={type}
                    id={id}
                    name={name || ""}
                    value={values || ""}
                    defaultValue={values || ""}
                    placeholder={name}
                    error={errors}
                   required={attributeToRulesMapping.required}
                    disabled={isFormLocked}
                    errorMessage={rules[0] ? rules[0].messages[0].message : ""}
                    onChange={handleAttributeChange}
                />
            </InputType>
        )
    }
}

InputTypes.defaultProps = {
    handleAttributeChange: () => {}
}

InputTypes.propTypes = {
    handleAttributeChange: PropTypes.func
}

export default InputTypes;