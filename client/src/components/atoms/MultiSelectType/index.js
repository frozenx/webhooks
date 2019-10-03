
import React from "react"

import MultiSelectDropdownGroup, {CheckboxOption} from "@beans/multiselect-dropdown-group";

  import LabelComponent from '../LabelComponent'
  import { InputType } from '../../../common/styles';
  import helper from '../../../lib/helper/helper';

function getSelectedValues(options, selectedValues) {
  const delimitedValues = selectedValues.split(',');
  return options.reduce((accumulatedObject, option) => {
    accumulatedObject[option.value] = false;
    if (delimitedValues.indexOf(option.value) != -1) {
      accumulatedObject[option.value] = true;
    }
    return accumulatedObject;
  }, {});
}

class MultiSelectDropdown extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      selectedValues: {},

    }

  }

  _onDropdownToggle = ({
    open }) => {

    this.setState({
      open
    });

  };

  _onSelect = ({ selectedValues }) => {
    const { id } = this.props;
    const event = new Event('change', { bubbles: true });
    event.selected = true;
    const selectedVals = Object.keys(selectedValues).filter(key => selectedValues[key]).join(',');
    helper.setNativeValue(document.querySelector('.inp-hidden-' + id), `${selectedVals}`);
    document.querySelector('.inp-hidden-' + id).dispatchEvent(event);
  };



  render() {

    const {
      attributeToRulesMapping,
      attr: { name, options, toolTip },
      id,
      isFormLocked,
      errors,
      values = '' //("uk,us,in")
    } = this.props;
    const {
      open,
    } = this.state;

    return (

      (attributeToRulesMapping.showToggle === undefined || attributeToRulesMapping.showToggle) && <InputType>
        <LabelComponent tooltip={toolTip} name={name} id={id} required={attributeToRulesMapping.required}></LabelComponent>
        <div
          id="multiselectdropdown"
          onChange={(e) => {
            e.target.id = id;
         }}>

          <MultiSelectDropdownGroup
            id={id}
            required={attributeToRulesMapping.required}
            error={errors}
            selectedValues={getSelectedValues(options, values)}
            onDropdownToggle={this._onDropdownToggle}
            onSelect={this._onSelect}
            open={open}
            disabled={isFormLocked}
            hideLabel='true'
            selectText="Select"

            >

            {options.map(option => (
              <CheckboxOption
                id={option.value}
                key={`checkbox-option-${id}`}
                labelText={option.displayValue}
              />

            ))}

          </MultiSelectDropdownGroup>
          <input type="text" className={`inp-hidden-${id}`} id={`inp-hidden-${id}`} style={{ display: 'none' }} onChange={(e) => {

          }} />

        </div>
        </InputType>


        )
      
      }
      
      }
      
    export default MultiSelectDropdown
      
      
