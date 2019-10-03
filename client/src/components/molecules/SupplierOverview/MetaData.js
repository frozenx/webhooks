import * as utils from '../../pages/SupplierHeader/utils';


class Meta {
    static presets = {};
    constructor({ uuid, fields, type, version, values, errors, parentUuid, attributeRules = {}, partnerStaticAttributes = [], addressBook, contactBook }) {
        this.attributeRules = attributeRules;
        this.uuid = uuid;
        this.fields = fields;
        this.type = type;
        this.values = values;
        this.errors = errors;
        this.version = version;
        this.children = [];
        this.partnerStaticAttributes = partnerStaticAttributes;
        this.isChildEnabled = this.isChildEnabled.bind(this);
        this.isSiblingFilled = this.isSiblingFilled.bind(this);
        this.initializeValues = this.initializeValues.bind(this);
        this.addChild = this.addChild.bind(this);
        this.updateFields = this.updateFields.bind(this);
        this.parentUuid = parentUuid;
        this.addressBook = addressBook;
        this.contactBook = contactBook;
        this.initializeValues(this.fields);

    }
    isSiblingFilled() {
        const childrenLength = this.children.length;
        return childrenLength
            && this.children.every(child => child.fields[0].action === 'enabled');
    }
    isChildEnabled(siblingCheck = true) {
        const fieldCheck = this.fields.every(field => field.action === 'enabled');
        if (!this.children.length || !siblingCheck) {
            return fieldCheck;
        }
        return fieldCheck && this.isSiblingFilled();
    }
    addChild(node, siblingCheck = true) {
        if (!this.isChildEnabled(siblingCheck)) {
            console.log('Sorry cannot add need to fill fields')
            return false;
        } else {
            console.log('child added with id - ', node.id);
            node.parentUuid = this.uuid;
            const newNode = new Meta(node);
            this.children.push(newNode)
            return newNode;
        }

    }
    updateFields(fields) {
        this.fields = fields;
    }
    update({ uuid, version }) {
        this.uuid = uuid;
        this.version = version;
    }
    updateNode(info) {
        this.uuid = info.uuid;
        this.version = info.version;
        Object.keys(info.values).forEach((attributeKey) => {

            this[attributeKey] = { values: { ...info.values[attributeKey] || {} }, errors: {} };
        });
        this.fields = this.fields.map((field) => {
            const attributeKeys = Object.keys(this[field.key].values)
            if ((this[field.key] && attributeKeys.length && this.isAllRequiredAttrAreFilled(field, attributeKeys)) ) {
                attributeKeys.forEach((attributeKey) => {
                    this.attributeRules = {...this.attributeRules}
                    this.attributeRules[this.type] = utils.updateAttributeRules(Meta.presets, this.attributeRules[this.type], attributeKey, this[field.key].values[attributeKey], this.type || '');
                });
                return { ...field, action: 'enabled' }
            }

            return { ...field };
        });
    }
    initializeValues() {
        this.fields.forEach((field) => {
            this[field.key] = { values: {}, errors: {} };
        });
    }
    getValues(currentlyEnteredValues, key) {
        const areNodeAndFormKeysSame = (nodeKey) => key === nodeKey
        return this.fields.reduce((acc, field) => {
            return this[field.key] ? {
                ...acc,
                [field.key]: areNodeAndFormKeysSame(field.key) ?
                    { ...currentlyEnteredValues[field.key].values } : { ...this[field.key].values }
            } : acc
        }, {})
    }
    clearValues(key) {
        const updatedFields = this.fields.map(field => {
            if (field.key === key) {
                return { ...field, action: 'disabled' }
            }
            return { ...field };
        });
        this.updateFields(updatedFields);
        this[key] = { values: {}, errors: {} };
    }

    isAllRequiredAttrAreFilled(attrGrp, attributeKeys){
        const {key, collectionType} = attrGrp;
        if(!collectionType){
            const requiredAttributes = Object.keys(this.attributeRules[this.type]).filter(attr => this.attributeRules[this.type][attr].required && this.attributeRules[this.type][attr].attrGrpKey === key)
            const filledAttrKeys = [...attributeKeys];
            return requiredAttributes.every(attr => filledAttrKeys.indexOf(attr) > -1)
        }
         return true;
    }
}


export default Meta;