import React, { Component } from 'react';
import {
    InputType,
    StyledCheckbox,
    LabelType
} from '../../../common/styles'
import Checkbox from '@beans/checkbox';
import LabelComponent from '../LabelComponent'

class CheckboxType extends Component {
    render() {
        const {
            attributeToRulesMapping,
            attr: {
                name,
                options,
                toolTip
            },
            values,
            errors,
            id,
            isFormLocked
        } = this.props;

        return (
            <InputType>
                <LabelType>
                    <LabelComponent tooltip={toolTip} name={name} id={id} required={attributeToRulesMapping.required}></LabelComponent>
                </LabelType>
                {options && options.map((option, index) => {
                    return (
                        <StyledCheckbox key={index}>
                            <Checkbox
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
                        </StyledCheckbox>
                    )
                })}
            </InputType>
        )
    }
}

export default CheckboxType;