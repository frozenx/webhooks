export const presets = {
    status: {
        depFields: ["partnerEndDateActive"],
        depPresets: {
            partnerEndDateActive: {
                depKey: 'showToggle',
                val: 'Inactive',
                op: '===',
                return: true,
                default: false
            }
        }
    },
    isPrimaryAddFlag: {
        depFields: ['addressName'],
        depPresets: {
            addressName: {
                depKey: 'required',
                val: 'Yes',
                op: '===',
                return: true,
                default: false
            }
        }
    },
    uuid: {
        depFields: ['expiredDate'],
        depPresets: {
            expiredDate: {
                depKey: 'required',
                val: 'uuid',
                op: '===',
                return: false,
                default: true
            }
        }
    },
    contactStatus: {
        depFields: ['inactiveDate'],
        depPresets: {
            inactiveDate: [{
                depKey: 'required',
                val: 'A',
                op: '===',
                return: false,
                default: true
            }, {
                depKey: 'regexRule',
                val: 'A',
                op: '===',
                return: "",
                default: ""
            }],
            administrativeContactFlag: {
                depKey: 'required',
                val: 'A',
                op: '===',
                return: false,
                default: true
            }
        }
    }
}