import * as utils from '../../utils';



describe('pages/SupplierHeader/utils', () => {
    describe('updateAttributeRules', () => {
        let attributeToRulesMapping = {
            name: {},
            age: {}
        };
        test('it should update the required attribute rule given the preset field has an equality operation check (val1 === val2)', () => {
            const presets = {
                name: {
                    depFields: ['age'],
                    depPresets: {
                        age: {
                            depKey: 'required',
                            val: 'Pranay',
                            op: '===',
                            return: true,
                            default: false
                        }
                    }
                }
            };
            attributeToRulesMapping.age = {
                required: false
            };
            const key = 'name';
            const value = 'Pranay';
            const expectedAttributeRules = {
                ...attributeToRulesMapping, ...{ age: { required: true } }
            };
            const updatedAttributeRules = utils.updateAttributeRules(presets, attributeToRulesMapping, key, value);
            expect(updatedAttributeRules).toEqual(expectedAttributeRules);
        });
        test('it should update the required attribute rule given the preset field has regex check (val1.matches(regex)', () => {
            const presets = {
                name: {
                    depFields: ['age'],
                    depPresets: {
                        age: {
                            depKey: 'required',
                            val: /^Pran/,
                            op: 'match',
                            return: true,
                            default: false
                        }
                    }
                }
            };
            attributeToRulesMapping.age = {
                required: false
            };
            const key = 'name';
            const value = 'Prank';
            const expectedAttributeRules = {
                ...attributeToRulesMapping, ...{ age: { required: true } }
            };
            const updatedAttributeRules = utils.updateAttributeRules(presets, attributeToRulesMapping, key, value);
            expect(updatedAttributeRules).toEqual(expectedAttributeRules);
        });
        test('it should update the required attribute rule given the preset field has equality check on multiple values', () => {
            const presets = {
                name: {
                    depFields: ['age'],
                    depPresets: {
                        age: {
                            depKey: 'required',
                            val: 'Pranay, Rinki, Sikinder, Dileep',
                            op: '===',
                            return: true,
                            default: false
                        }
                    }
                }
            };
            attributeToRulesMapping.age = {
                required: false
            };
            const key = 'name';
            const value = 'Sikinder';
            const expectedAttributeRules = {
                ...attributeToRulesMapping, ...{ age: { required: true } }
            };
            const updatedAttributeRules = utils.updateAttributeRules(presets, attributeToRulesMapping, key, value);
            expect(updatedAttributeRules).toEqual(expectedAttributeRules);
        });
        test('it should update the required attribute rule given the preset field return value depends on equality check value(if val1 return x if val2 return y)', () => {
            const presets = {
                name: {
                    depFields: ['age'],
                    depPresets: {
                        age: {
                            depKey: 'rules',
                            val: 'Pranay, Sikinder',
                            op: '===',
                            return: { Pranay: { length: 'length1' }, Sikinder: { length: 'length2' } },
                            default: { length: 'defaultlength' }
                        }
                    }
                }
            };
            attributeToRulesMapping.age = {
                required: false
            };
            const key = 'name';
            const value = 'Pranay';
            const expectedAttributeRules = {
                ...attributeToRulesMapping, ...{ age: { required: false, rules: { length: 'length1' } } }
            };
            const updatedAttributeRules = utils.updateAttributeRules(presets, attributeToRulesMapping, key, value);
            expect(updatedAttributeRules).toEqual(expectedAttributeRules);
        });
        test('it should update the required attribute rule given the preset field has multiple rules', () => {
            const presets = {
                name: {
                    depFields: ['age'],
                    depPresets: {
                        age: [{
                            depKey: 'rules',
                            val: 'Pranay, Sikinder',
                            op: '===',
                            return: { Pranay: { length: 'length1' }, Sikinder: { length: 'length2' } },
                            default: { length: 'defaultlength' }
                        }, {
                            depKey: 'required',
                            val: 'Pranay, Sikinder',
                            op: '===',
                            return: { Pranay: true, Sikinder: false },
                            default: { length: 'defaultlength' }
                        }]
                    }
                }
            };
            attributeToRulesMapping.age = {
                required: false,
            };
            const key = 'name';
            const value = 'Pranay';
            const expectedAttributeRules = {
                ...attributeToRulesMapping, ...{ age: { required: true, rules: { length: 'length1' } } }
            };
            const updatedAttributeRules = utils.updateAttributeRules(presets, attributeToRulesMapping, key, value);
            expect(updatedAttributeRules).toEqual(expectedAttributeRules);
        });
    })
});