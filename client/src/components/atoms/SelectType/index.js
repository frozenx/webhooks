import React, { Component, Fragment } from 'react';
import Dropdown from '@beans/dropdown';
import {
    InputType,
} from '../../../common/styles'
import LabelComponent from '../LabelComponent'

class SelectType extends Component {
    render() {
        const {
            attributeToRulesMapping,
            attr: {
                name,
                options,
                toolTip
            },
            id,
            isFormLocked,
            errors,
            values

        } = this.props;


        return (
            <InputType>
                <LabelComponent tooltip = {toolTip} name = {name} id ={id} required={attributeToRulesMapping.required}></LabelComponent>
                <Dropdown
                    name={name}
                    defaultValue={values || 'select'}
                    id={id}
                    required={attributeToRulesMapping.required}
                    value={values || 'select'} error={errors}
                    disabled={isFormLocked}>
                    <option value="select">Select</option>
                    {options && options.map((option, index) => {
                        return (
                            <Fragment key={index}>
                                <option value={option.value}>
                                    {option.displayValue}
                                </option>
                            </Fragment>
                        )
                    })}
                </Dropdown>
            </InputType>

        )
    }
}

export default SelectType;