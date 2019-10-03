import React, { Component } from 'react';
import Textarea from '@beans/textarea';
import {
    InputType,
} from '../../../common/styles'
import LabelComponent from '../LabelComponent'

class TextAreaType extends Component {
    render() {
        const {
            attributeToRulesMapping,
            attr: {
                name,
                type,
                toolTip
            },
            values,
            errors,
            id,
            isFormLocked
        } = this.props;

        return (
            <InputType>
                <LabelComponent tooltip = {toolTip} name = {name} id ={id} required={attributeToRulesMapping.required}></LabelComponent>
                <Textarea
                    placeholder={name}
                    type={type}
                    id={id.toString()}
                    name={name || ""}
                    value={values || ""}
                    error={errors}
                    disabled={isFormLocked}
                    required={attributeToRulesMapping.required}
                />
            </InputType>
        )
    }
}

export default TextAreaType;