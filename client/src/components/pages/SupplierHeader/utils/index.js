import { Map } from 'immutable';


export const updateAttributeRules = (presets, attributeToRulesMapping, attributeKey, attributeValue, entityType) => {
    const updatedRulesMapping = Map(attributeToRulesMapping);

    const presetObject = presets[attributeKey];
    if (presetObject) {
        presetObject.depFields.forEach((depField) => {
            const attributeObject = updatedRulesMapping.get(depField);
            const presetField = presetObject.depPresets[depField];
            const presetFieldEntityType = presetObject.depPresets.entityType
            if (Array.isArray(presetField)) {
                presetField.forEach((field) => {
                    updateAttributeRule(field, attributeValue, attributeObject, entityType, presetFieldEntityType)
                })
            } else {
                updateAttributeRule(presetField, attributeValue, attributeObject, entityType, presetFieldEntityType)
            }
        });
    }
    return updatedRulesMapping.toJS();
}

function regexCheck(a, b) {
  return b.test(a);
}

function equalityCheck(a, b) {
  return b.split(/[ ]*,[ ]*/).indexOf(a) !== -1;
}

function updateAttributeRule(
  attribute,
  attributeValue,
  attributeObject,
  entityType,
  presetFieldEntityType,
) {
  // function that performs a side effect - mutates object attributeObject
  if (entityType === presetFieldEntityType) {
    const operation = attribute.op;
    let presetFunction = equalityCheck;
    if (operation === 'match') {
      presetFunction = regexCheck;
    }
    if (presetFunction(attributeValue, attribute.val)) {
      attributeObject[attribute.depKey] =
        attribute.return[attributeValue] || attribute.return;
    } else {
      attributeObject[attribute.depKey] = attribute.default;
    }
  }
}
