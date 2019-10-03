import React, { Component, Fragment } from 'react';
import Dropdown from '@beans/dropdown';
import {
    InputType,
} from '../../../common/styles'
import LabelComponent from '../LabelComponent'

class LinkType extends Component {
    render() {
        const {
            attributeToRulesMapping,
            attr: {
                name,                               
                key,
                toolTip
            },
            id,
            values,
            errors,
            isFormLocked,
            linkableOptions,            
        } = this.props;
        return (
                <InputType>
                    <LabelComponent className='linkName' id={id} dark={true} emphasized={true} name={name} 
                    required={attributeToRulesMapping.required}></LabelComponent>
                    <Dropdown
                        name={name}
                        defaultValue='select'
                        id={id}
                        value={'select'}>                
                            <option value="select">Select</option>
                            {linkableOptions && linkableOptions.map((option, index) => {
                                return (
                                    <Fragment key={index}>
                                        <option value={option.name}>
                                            {option.name}
                                        </option>
                                    </Fragment>
                                )
                            })}
                    </Dropdown>
                </InputType>
        );
    }
}

export default LinkType;