import React, { Component } from 'react';
import LabelComponent from '../LabelComponent';
import { StyledDatePicker } from './styled';
import { InputType } from '../../../common/styles';
import helper from '../../../lib/helper/helper';

class DateInput extends Component {
    constructor() {
        super();
        this.state = {
            open: false,

        };
    }

    render() {

        const {
            attributeToRulesMapping,
            attr: {
                name,
                type,
                rules,
                key,
                toolTip,
            },
            errors,
            id,
            isFormLocked,
            values = '--'
        } = this.props;


        const [dd, mm, yyyy] = (values || '--').split('-')
        const mapper = {
            dd: 0,
            mm: 1,
            yyyy: 2
        };

        return (
            (attributeToRulesMapping.showToggle === undefined || attributeToRulesMapping.showToggle) && <InputType>

                <LabelComponent tooltip={toolTip} name={name} id='datepciker' required={attributeToRulesMapping.required}></LabelComponent>
                <div id='datepicker-custom' onChange={(e) => {

                    if (!(e.target.className.indexOf('inp-hidden') === 0)) {
                        let dateValues = values.split('-')

                        const fragment = e.target.name.split('-')[1];
                        e.target.id = id;

                        dateValues[mapper[fragment]] = e.target.value;

                        e.target.value = dateValues.join('-');
                    }
                    else {
                        e.target.id = id;

                    }


                }} value={values}>
                    <StyledDatePicker
                        open={this.state.open}
                        date={{
                            dd,
                            mm,
                            yyyy
                        }}
                        hideLabel={true}
                        type={type}
                        id={id}
                        data-preset={'date'}
                        name={id || ""}
                        defaultValue={values || "29-02-2020"}
                        value={values}
                        formFieldProps={{
                            id: id,
                            'data-preset': 'data',
                            labelText: 'Enter date'
                        }}
                        error={errors}
                        className={'date-picker-calendar'}
                        required={attributeToRulesMapping.required}
                        disabled={isFormLocked}
                        onToggleCalendar={({ action }) => { this.setState({ open: action === 'open' }) }}

                        onSelect={({ date }) => {
                            const event = new Event('change', { bubbles: true });
                            event.selected = true;
                            helper.setNativeValue(document.querySelector('.inp-hidden-' + id), `${date.dd}-${date.mm}-${date.yyyy}`);
                            document.querySelector('.inp-hidden-' + id).dispatchEvent(event);
                        }}


                    />
                    <input type="text" className={`inp-hidden-${id}`} id={`inp-hidden-${id}`} style={{ display: 'none' }} value={values} onChange={(e) => {

                    }} />
                </div>

            </InputType>
        );
    }
}

export default DateInput;