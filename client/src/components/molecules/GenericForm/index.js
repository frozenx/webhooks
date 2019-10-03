import React from 'react';
import InputTypes from '../../atoms/InputTypes';
import {
    AllInputs
} from './style';
import SelectType from '../../atoms/SelectType';
import RadioType from '../../atoms/RadioType';
import TextAreaType from '../../atoms/TextAreaType';
import CheckboxType from '../../atoms/CheckboxType';
import LinkType from '../../atoms/LinkType';
import ContactBook from '../../pages/SupplierHeader/contactBook';
import AddressBook from '../../pages/SupplierHeader/addressBook'
import DatePicker from '../../atoms/DateInput'
import MultiSelectDropdown from '../../atoms/MultiSelectType';


let contacts = new ContactBook();
let addresses = new AddressBook();

const GenericForm = props => {

    const {
        attributes,
        attributeToRulesMapping,
        values,
        errors,
        id,
        isFormLocked,
        isOnEditMode,
    } = props;
    function useAttributeChecker(attributeRules, isFormLocked) {
        if (isOnEditMode && !isFormLocked) {
            return !attributeRules.update
        } else if (!isFormLocked) {
            return !attributeRules.create
        } else {
            return true
        }
    }
    return (
        <AllInputs>
            {
                attributes && attributes.map(({ key, ...attrGrp }, i) => {
                        switch (attrGrp.type) {
                        case 'String':
                        case 'text':
                        case 'Number':
                            return (
                                <InputTypes
                                    attributeToRulesMapping={attributeToRulesMapping[key] || {}}
                                    attr={attrGrp}
                                    key={i}
                                    values={values[key]}
                                    errors={errors[key]}
                                    id={key}
                                    isFormLocked={useAttributeChecker(attributeToRulesMapping[key], isFormLocked)}
                                />
                                

                               // </FormGroup>
                            )
                            
                       case 'Date':
                            return(
                            <DatePicker 
                                    attributeToRulesMapping={attributeToRulesMapping[key] || {}}
                                    attr={attrGrp}
                                    key={i}
                                    values={values[key]}
                                    errors={errors[key]}
                                    id={key}
                                    isFormLocked={useAttributeChecker(attributeToRulesMapping[key], isFormLocked)}
                                />
                            )
                        case 'textarea':
                            return (
                                <TextAreaType
                                    attributeToRulesMapping={attributeToRulesMapping[key]}
                                    attr={attrGrp}
                                    key={i}
                                    values={values[key]}
                                    errors={errors[key]}
                                    id={key}
                                    isFormLocked={useAttributeChecker(attributeToRulesMapping[key], isFormLocked)}
                                />
                            )
                        case 'Dropdown':
                            return (
                                <SelectType
                                    attributeToRulesMapping={attributeToRulesMapping[key]}
                                    attr={attrGrp}
                                    key={key}
                                    values={values[key]}
                                    errors={errors[key]}
                                    id={key}
                                    isFormLocked={useAttributeChecker(attributeToRulesMapping[key], isFormLocked)}
                                />
                            )
                            case 'DropdownMultiSelect':
                            return (
                                <MultiSelectDropdown
                                    attributeToRulesMapping={attributeToRulesMapping[key]}
                                    attr={attrGrp}
                                    key={key}
                                    values={values[key]}
                                    errors={errors[key]}
                                    id={key}
                                    isFormLocked={useAttributeChecker(attributeToRulesMapping[key], isFormLocked)}
                                />
                            )
                        case 'Boolean':
                        case 'Radio':
                            return (
                                <RadioType
                                    attributeToRulesMapping={attributeToRulesMapping[key]}
                                    attr={attrGrp}
                                    key={i}
                                    values={values[key]}
                                    errors={errors[key]}
                                    id={key}
                                    isFormLocked={useAttributeChecker(attributeToRulesMapping[key], isFormLocked)}
                                />
                            )

                        case 'Checkbox':
                            return (
                                <CheckboxType
                                    attributeToRulesMapping={attributeToRulesMapping[key]}
                                    attr={attrGrp}
                                    key={i}
                                    values={values[key]}
                                    errors={errors[key]}
                                    id={key}
                                    isFormLocked={useAttributeChecker(attributeToRulesMapping[key], isFormLocked)}
                                />
                            )
                        case 'LinkContact':
                            return (
                                <LinkType
                                    attributeToRulesMapping={attributeToRulesMapping[key]}
                                    attr={attrGrp}
                                    key={i}
                                    values={values}
                                    errors={errors}
                                    id={key}
                                    isFormLocked={useAttributeChecker(attributeToRulesMapping[key], isFormLocked)}
                                    linkableOptions={contacts.getContactEntries()}
                                />
                            )
                        case 'LinkAddress':
                            return (
                                <LinkType
                                    attributeToRulesMapping={attributeToRulesMapping[key]}
                                    attr={attrGrp}
                                    key={i}
                                    values={values}
                                    errors={errors}
                                    id={key}
                                    isFormLocked={useAttributeChecker(attributeToRulesMapping[key], isFormLocked)}
                                    linkableOptions={addresses.getAddressEntries()}
                                />
                            )

                        default: return null
                    }
                })
            }
        </AllInputs>
    )
}


export default GenericForm;
