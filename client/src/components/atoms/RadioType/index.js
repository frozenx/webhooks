import React, { Component } from 'react';
import {
    InputType,
    LabelType,
    RadioBtn
} from '../../../common/styles'
import RadioButton from '@beans/radio-button';
import LabelComponent from '../LabelComponent'

class RadioType extends Component {
    render() {
        const {
            attributeToRulesMapping,
            attr: {
                name,
                options,
                toolTip,

            },
            id,
            values,
            errors,
            isFormLocked
        } = this.props;

        return (
            <InputType>
                <LabelType>
                    <LabelComponent tooltip={toolTip} name={name} id={id} required={attributeToRulesMapping.required}></LabelComponent>
                </LabelType>
                {options && options.map((option, index) => {
                    return (
                        <RadioBtn key={index}>
                            <RadioButton
                                disabled={isFormLocked}
                                id={id}
                                name={name}
                                required={attributeToRulesMapping.required}
                                value={option.displayValue}
                                checked={values === option.displayValue}
                                defaultChecked={values === option.displayValue}
                                error={errors}
                            />
                            <span>{option.displayValue}</span>
                        </RadioBtn>
                    )
                })}
            </InputType>
        )
    }
}

export default RadioType;