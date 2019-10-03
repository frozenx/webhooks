module.exports = {
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
    taxCountryCode: {
        depFields: ['vatRegNumber', 'companyRegNumber'],
        depPresets: {
            vatRegNumber: {
                depKey: 'regexRule',
                val: 'GB, IE',
                op: '===',
                return: { 'GB': "^\\d{9}$", 'IE': "^\\d{8}$" },
                default: "^\\d{5}$"
            },
            companyRegNumber: {
                depKey: 'required',
                val: 'GB',
                op: '===',
                return: true,
                default: false
            }
        }
    }
}