export const mockValues = {
    "partnerName": "TEST98",
    "companyRegNumber": "123",
    "vatRegNumber": "123",
    "partnerNumber": "1752657121",
    "isCustomer": "Yes",
    "isSupplier": "Yes",
    "dunsNumber": "67",
    "taxOrganisationType": "Corporation",
    "taxCountryCode": "AX - Åland Islands",
    "taxRegistrationStatus": "Not registered",
    "partnerTaxRegime": "1234",
    "taxRegimeStartDate": "12-09-2019",
    "taxRegimeSource": "Implicit",
    "partnerPrimaryLanguage": "English",
    "businessRelationship": "Spend authorised",
    "allowTaxApplicability": "Yes",
    "useTaxWitholding": "Yes",
    "whtRegimeCode": "345",
    "whtTaxType": "2345",
    "whtRegistrationNumber": "2345"
  }

export const mockAttributes = [
    {
      "enabled": true,
      "required": true,
      "type": "Hidden",
      "manifest": "Hidden",
      "value": "",
      "key": "uuid",
      "id": "trn:tesco:partner:attribute:9f9fca5f-87d1-4e62-900e-05f1e418ce94",
      "displayName": "UUID",
      "name": "UUID",
      "toolTip": "Tooltip not needed here",
      "rules": [],
      "options": [
        {
          "value": "True",
          "displayValue": "Yes",
          "lang": "en"
        },
        {
          "value": "False",
          "displayValue": "No",
          "lang": "en"
        }
      ],
      "regexRule": "",
      "attributeGroupKey": "partner"
    },
    {
        "enabled": true,
        "required": true,
        "type": "Checkbox",
        "manifest": "Checkbox",
        "value": "",
        "key": "check",
        "id": "trn:tesco:partner:attribute:9f9fca5f-87d1-4e62-900e-05f1e418ce94",
        "displayName": "STATUS",
        "name": "STATUS",
        "toolTip": "Tooltip not needed here",
        "rules": [],
        "options": [
          {
            "value": "True",
            "displayValue": "Yes",
            "lang": "en"
          },
          {
            "value": "False",
            "displayValue": "No",
            "lang": "en"
          }
        ],
        "regexRule": "",
        "attributeGroupKey": "partner"
      },
    {
      "enabled": true,
      "required": true,
      "type": "textarea",
      "manifest": "Read Only",
      "value": "",
      "key": "text",
      "id": "trn:tesco:partner:attribute:9f9fca5f-87d1-4e62-900e-05f1e418ce94",
      "displayName": "Name",
      "name": "Name",
      "toolTip": "Tooltip not needed here",
      "rules": [],
      "options": [
        {
          "value": "True",
          "displayValue": "Yes",
          "lang": "en"
        },
        {
          "value": "False",
          "displayValue": "No",
          "lang": "en"
        }
      ],
      "regexRule": "",
      "attributeGroupKey": "partner"
    },
    {
      "enabled": true,
      "required": true,
      "type": "Number",
      "manifest": "Read Only",
      "value": "",
      "key": "partnerNumber",
      "id": "trn:tesco:partner:attribute:f7284ff8-b4b8-451d-a0fb-5153e2b97595",
      "displayName": "Partner number",
      "name": "Partner number",
      "toolTip": "Tooltip not needed here",
      "rules": [
        {
          "uuid": "trn:tesco:partner:attributerule:19e75447-a0a1-4293-a8cb-6165084fc4c1",
          "ruleType": "regex",
          "definition": "^\\d{10}$",
          "messages": [
            {
              "message": "Invalid Partner Number. Length should be 10 digit length",
              "lang": "en"
            }
          ],
          "message": "Invalid Partner Number. Length should be 10 digit length"
        }
      ],
      "options": [
        {
          "value": "True",
          "displayValue": "Yes",
          "lang": "en"
        },
        {
          "value": "False",
          "displayValue": "No",
          "lang": "en"
        }
      ],
      "regexRule": "^\\d{10}$",
      "attributeGroupKey": "partner"
    },
    {
      "enabled": true,
      "required": true,
      "type": "String",
      "manifest": "Editable",
      "value": "",
      "key": "partnerName",
      "id": "trn:tesco:partner:attribute:042d8298-bb82-4085-bf55-202964ab6145",
      "displayName": "Partner legally registered name",
      "name": "Partner legally registered name",
      "toolTip": "Tooltip not needed here",
      "rules": [],
      "options": [
        {
          "value": "True",
          "displayValue": "Yes",
          "lang": "en"
        },
        {
          "value": "False",
          "displayValue": "No",
          "lang": "en"
        }
      ],
      "regexRule": "",
      "attributeGroupKey": "partner"
    },
    {
      "enabled": true,
      "required": false,
      "type": "Date",
      "manifest": "Editable",
      "value": "",
      "key": "partnerEndDateActive",
      "id": "trn:tesco:partner:attribute:11274f72-cda8-4e82-bb02-2fafc9cb662c",
      "displayName": "Partner end date active",
      "name": "Partner end date active",
      "toolTip": "Set the date in which this record will deactivate",
      "rules": [],
      "options": [
        {
          "value": "True",
          "displayValue": "Yes",
          "lang": "en"
        },
        {
          "value": "False",
          "displayValue": "No",
          "lang": "en"
        }
      ],
      "regexRule": "",
      "attributeGroupKey": "partner"
    },
    {
      "enabled": true,
      "required": true,
      "type": "Radio",
      "manifest": "Read Only",
      "value": "",
      "key": "partnerStatus",
      "id": "trn:tesco:partner:attribute:0b3fdc8c-d2ac-4991-9cf7-72b9dc615bd0",
      "displayName": "Partner status",
      "name": "Partner status",
      "toolTip": "Tooltip not needed here",
      "rules": [],
      "options": [
        {
          "value": "Active",
          "displayValue": "Active",
          "lang": "en"
        },
        {
          "value": "Inactive",
          "displayValue": "Inactive",
          "lang": "en"
        }
      ],
      "regexRule": "",
      "attributeGroupKey": "partner"
    },
    {
      "enabled": true,
      "required": false,
      "type": "String",
      "manifest": "Editable",
      "value": "",
      "key": "partnerAltName",
      "id": "trn:tesco:partner:attribute:432e34fb-ca02-47d3-8a85-08a710acb29b",
      "displayName": "Partner alternative name",
      "name": "Partner alternative name",
      "toolTip": "Partner name using latin characters or their Trading As name",
      "rules": [],
      "options": [
        {
          "value": "True",
          "displayValue": "Yes",
          "lang": "en"
        },
        {
          "value": "False",
          "displayValue": "No",
          "lang": "en"
        }
      ],
      "regexRule": "",
      "attributeGroupKey": "partner"
    },
    {
      "enabled": true,
      "required": true,
      "type": "Boolean",
      "manifest": "Editable",
      "value": "",
      "key": "isCustomer",
      "id": "trn:tesco:partner:attribute:8dfc61f7-5fd3-4e4a-b96e-5807e777b94e",
      "displayName": "Is this a Tesco customer?",
      "name": "Is this a Tesco customer?",
      "toolTip": "Tooltip not needed here",
      "rules": [],
      "options": [
        {
          "value": "Yes",
          "displayValue": "Yes",
          "lang": "en"
        },
        {
          "value": "No",
          "displayValue": "No",
          "lang": "en"
        }
      ],
      "regexRule": "",
      "attributeGroupKey": "partner"
    },
    {
      "enabled": true,
      "required": true,
      "type": "DropdownMultiSelect",
      "manifest": "Editable",
      "value": "",
      "key": "taxOrganisationType",
      "id": "trn:tesco:partner:attribute:a22f54ae-c2f3-4153-9065-d58fd4a3e51b",
      "displayName": "Tax organisation type",
      "name": "Tax organisation type",
      "toolTip": "Tooltip not needed here",
      "rules": [],
      "options": [
        {
          "value": "Charity",
          "displayValue": "Charity",
          "lang": "en"
        },
        {
          "value": "Corporation",
          "displayValue": "Corporation",
          "lang": "en"
        },
        {
          "value": "Foreign Corporation",
          "displayValue": "Foreign Corporation",
          "lang": "en"
        },
        {
          "value": "Foreign Government Agency",
          "displayValue": "Foreign Government Agency",
          "lang": "en"
        },
        {
          "value": "Foreign Individual",
          "displayValue": "Foreign Individual",
          "lang": "en"
        },
        {
          "value": "Foreign Partnership",
          "displayValue": "Foreign Partnership",
          "lang": "en"
        },
        {
          "value": "Government Agency",
          "displayValue": "Government Agency",
          "lang": "en"
        },
        {
          "value": "Individual",
          "displayValue": "Individual",
          "lang": "en"
        },
        {
          "value": "Partnership",
          "displayValue": "Partnership",
          "lang": "en"
        }
      ],
      "regexRule": "",
      "attributeGroupKey": "partner"
    },  
    {
      "enabled": true,
      "required": true,
      "type": "Dropdown",
      "manifest": "Editable",
      "value": "",
      "key": "taxRegistrationStatus",
      "id": "trn:tesco:partner:attribute:e3e7e8be-abde-4b94-a30d-9650dec1f577",
      "displayName": "Partner tax registration status",
      "name": "Partner tax registration status",
      "toolTip": "Tooltip not needed here",
      "rules": [],
      "options": [
        {
          "value": "Agent",
          "displayValue": "Agent",
          "lang": "en"
        },
        {
          "value": "Not registered",
          "displayValue": "Not registered",
          "lang": "en"
        },
        {
          "value": "Registered",
          "displayValue": "Registered",
          "lang": "en"
        },
        {
          "value": "Registered in EU, non UK",
          "displayValue": "Registered in EU, non UK",
          "lang": "en"
        },
        {
          "value": "Registered in EU, non UK 1",
          "displayValue": "Registered in EU, non UK 1",
          "lang": "en"
        }
      ],
      "regexRule": "",
      "attributeGroupKey": "partner"
    },
    {
      "enabled": true,
      "required": false,
      "type": "Upload",
      "manifest": "Editable",
      "value": "",
      "key": "partnerAttachments",
      "id": "trn:tesco:partner:attribute:2ec5a554-7698-4879-a2ff-1bd7f47cfbbb",
      "displayName": "Partner attachments",
      "name": "Partner attachments",
      "toolTip": "Please upload any relevant documents",
      "rules": [],
      "options": [
        {
          "value": "True",
          "displayValue": "Yes",
          "lang": "en"
        },
        {
          "value": "False",
          "displayValue": "No",
          "lang": "en"
        }
      ],
      "regexRule": "",
      "attributeGroupKey": "partner"
    },
    {
      "enabled": true,
      "required": false,
      "type": "LinkContact",
      "manifest": "Editable",
      "value": "",
      "key": "linkContact",
      "id": "trn:tesco:partner:attribute:2ec5a554-7698-4879-a2ff-1bd7f47cfbbb",
      "displayName": "Contact",
      "name": "Contact",
      "toolTip": "Please link the contact",
      "rules": [],
      "options": [
        {
          "value": "True",
          "displayValue": "Yes",
          "lang": "en"
        },
        {
          "value": "False",
          "displayValue": "No",
          "lang": "en"
        }
      ],
      "regexRule": "",
      "attributeGroupKey": "partner"
    },
    {
      "enabled": true,
      "required": false,
      "type": "LinkAddress",
      "manifest": "Editable",
      "value": "",
      "key": "linkAddress",
      "id": "trn:tesco:partner:attribute:2ec5a554-7698-4879-a2ff-1bd7f47cfbbb",
      "displayName": "Address",
      "name": "Address",
      "toolTip": "Please link the address",
      "rules": [],
      "options": [
        {
          "value": "True",
          "displayValue": "Yes",
          "lang": "en"
        },
        {
          "value": "False",
          "displayValue": "No",
          "lang": "en"
        }
      ],
      "regexRule": "",
      "attributeGroupKey": "partner"
    }
]

export const mockAttributeToRulesMapping = {
    'check': {
        "regexRule": "",
        "required": false,
        "attrGrpKey": "partner",
        "read": true,
        "create": true,
        "update": true
    },
    'linkContact': {
      "regexRule": "",
      "required": false,
      "attrGrpKey": "partner",
      "read": true,
      "create": true,
      "update": true
  },
  'linkAddress': {
    "regexRule": "",
    "required": false,
    "attrGrpKey": "partner",
    "read": true,
    "create": true,
    "update": true
},
    'text': {
      "regexRule": "",
      "required": false,
      "attrGrpKey": "partner",
      "read": true,
      "create": true,
      "update": true
  },
    "contact": {
      "read": true,
      "create": true,
      "update": true
    },
      
    "partnerEndDateActive": {
      "regexRule": "",
      "required": false,
      "attrGrpKey": "partner",
      "read": true,
      "create": true,
      "update": true
    },
    "partner": {
      "create": true,
      "read": true,
      "update": true
    },
    
    "createOracleUserAccount": {
      "regexRule": "",
      "required": true,
      "attrGrpKey": "contact",
      "read": true,
      "create": true,
      "update": true
    },
    "isCustomer": {
      "regexRule": "",
      "required": true,
      "attrGrpKey": "partner",
      "read": true,
      "create": true,
      "update": true
    },
    "oracleAccountInactiveDate": {
      "regexRule": "",
      "required": false,
      "attrGrpKey": "contact",
      "read": true,
      "create": true,
      "update": true
    },
    "phoneAreaCode": {
      "regexRule": "",
      "required": true,
      "attrGrpKey": "contact",
      "read": true,
      "create": true,
      "update": true
    },
    "county": {
      "regexRule": "",
      "required": false,
      "attrGrpKey": "address",
      "read": true,
      "create": true,
      "update": true
    },
    "isHUTrading": {
      "regexRule": "",
      "required": false,
      "attrGrpKey": "partner",
      "read": true,
      "create": true,
      "update": true
    },
    "city": {
      "create": true,
      "read": true,
      "update": true
    },
    "mobileNumber": {
      "regexRule": "",
      "required": false,
      "attrGrpKey": "contact",
      "read": true,
      "create": true,
      "update": true
    },
    "isMYTrading": {
      "regexRule": "",
      "required": false,
      "attrGrpKey": "partner",
      "read": true,
      "create": true,
      "update": true
    },
    "partnerAltName": {
      "regexRule": "",
      "required": false,
      "attrGrpKey": "partner",
      "read": true,
      "create": true,
      "update": true
    },
    "partnerEstablishedYear": {
      "regexRule": "",
      "required": false,
      "attrGrpKey": "partner",
      "read": true,
      "create": true,
      "update": true
    },
    "postCode": {
      "regexRule": "",
      "required": true,
      "attrGrpKey": "address",
      "read": true,
      "create": true,
      "update": true
    },
    "addressType": {
      "regexRule": "",
      "required": false,
      "attrGrpKey": "address",
      "read": true,
      "create": true,
      "update": true
    },
    "addressLink": {
      "regexRule": "",
      "required": false,
      "attrGrpKey": "contact",
      "read": true,
      "create": true,
      "update": true
    },
    "AddressId": {
      "create": true,
      "read": true,
      "update": true
    },
    "addressId": {
      "regexRule": "",
      "required": false,
      "attrGrpKey": "address",
      "read": true
    },
    "contactCount": {
      "regexRule": "",
      "required": false,
      "attrGrpKey": "contact",
      "read": true
    },
    "enterpriseServiceUUID": {
      "regexRule": "",
      "required": false,
      "attrGrpKey": "contact",
      "read": false,
      "create": false,
      "update": false
    },
    "partyNumber": {
      "create": true,
      "read": true,
      "update": true
    },
    "isActive": {
      "regexRule": "",
      "required": true,
      "attrGrpKey": "address",
      "read": true,
      "create": true,
      "update": true
    },
    "partnerTaxRegime": {
      "regexRule": "",
      "required": true,
      "attrGrpKey": "partner",
      "read": true,
      "create": true,
      "update": true
    },
    "province": {
      "regexRule": "",
      "required": false,
      "attrGrpKey": "address",
      "read": true,
      "create": true,
      "update": true
    },
    "state": {
      "regexRule": "",
      "required": false,
      "attrGrpKey": "address",
      "read": true,
      "create": true,
      "update": true
    },
    "partnerNumber": {
      "regexRule": "",
      "required": false,
      "attrGrpKey": "partner",
      "read": true
    },
    "phoneExtension": {
      "regexRule": "",
      "required": false,
      "attrGrpKey": "contact",
      "read": true,
      "create": true,
      "update": true
    },
    "contactStatus": {
      "regexRule": "",
      "required": true,
      "attrGrpKey": "contact",
      "read": true,
      "create": true,
      "update": true
    },
    "partnerPrimaryLanguage": {
      "regexRule": "",
      "required": true,
      "attrGrpKey": "partner",
      "read": true,
      "create": true,
      "update": true
    },
    "postTown": {
      "regexRule": "",
      "required": true,
      "attrGrpKey": "address",
      "read": true,
      "create": true,
      "update": true
    },
    "expiredDate": {
      "regexRule": "",
      "required": true,
      "attrGrpKey": "address",
      "read": true,
      "create": true,
      "update": true
    },
    "taxRegimeSource": {
      "regexRule": "",
      "required": true,
      "attrGrpKey": "partner",
      "read": true,
      "create": true,
      "update": true
    },
    "partnerName": {
      "regexRule": "",
      "required": true,
      "attrGrpKey": "partner",
      "read": true,
      "create": true,
      "update": true
    },
    "vatRegNumber": {
      "regexRule": "",
      "required": true,
      "attrGrpKey": "partner",
      "read": true,
      "create": true,
      "update": true
    },
    "address": {
      "read": true,
      "create": true,
      "update": true
    },
    "phoneCountryCode": {
      "regexRule": "",
      "required": true,
      "attrGrpKey": "contact",
      "read": true,
      "create": true,
      "update": true
    },
    "preferredDeliveryMethod": {
      "regexRule": "",
      "required": false,
      "attrGrpKey": "contact",
      "read": true,
      "create": true,
      "update": true
    },
    "isSupplier": {
      "regexRule": "",
      "required": true,
      "attrGrpKey": "partner",
      "read": true,
      "create": true,
      "update": true
    },
    "taxRegistrationStatus": {
      "regexRule": "",
      "required": true,
      "attrGrpKey": "partner",
      "read": true,
      "create": true,
      "update": true
    },
    "country": {
      "regexRule": "",
      "required": true,
      "attrGrpKey": "address",
      "read": true,
      "create": true,
      "update": true
    },
    "phoneNumber": {
      "regexRule": "",
      "required": true,
      "attrGrpKey": "contact",
      "read": true,
      "create": true,
      "update": true
    },
    "faxAreaCode": {
      "regexRule": "",
      "required": false,
      "attrGrpKey": "contact",
      "read": true,
      "create": true,
      "update": true
    },
    "emailAddress": {
      "regexRule": "",
      "required": true,
      "attrGrpKey": "contact",
      "read": true,
      "create": true,
      "update": true
    },
    "taxCountryCode": {
      "regexRule": "",
      "required": true,
      "attrGrpKey": "partner",
      "read": true,
      "create": true,
      "update": true
    },
    "businessRelationship": {
      "regexRule": "",
      "required": true,
      "attrGrpKey": "partner",
      "read": true,
      "create": true,
      "update": true
    },
    "title": {
      "regexRule": "",
      "required": true,
      "attrGrpKey": "contact",
      "read": true,
      "create": true,
      "update": true
    },
    "taxRegimeStartDate": {
      "regexRule": "",
      "required": true,
      "attrGrpKey": "partner",
      "read": true,
      "create": true,
      "update": true
    },
    "inactiveDate": {
      "regexRule": "",
      "required": true,
      "attrGrpKey": "contact",
      "read": true,
      "create": true,
      "update": true
    },
    "partnerStatus": {
      "regexRule": "",
      "required": false,
      "attrGrpKey": "partner",
      "read": true
    },
  
    "taxOrganisationType": {
      "regexRule": "",
      "required": true,
      "attrGrpKey": "partner",
      "read": true,
      "create": true,
      "update": true
    },
    
}

export const mockErrors = {
    'cehck': false,
    "uuid": false,
    "partnerNumber": false,
    "partnerName": false,
    "partnerEndDateActive": false,
    "partnerStatus": false,
    "partnerAltName": false,
    "isCustomer": true,
    "isSupplier": true,
    "dunsNumber": true,
    "companyRegNumber": false,
    "taxOrganisationType": true,
    "taxCountryCode": true,
    "taxRegistrationStatus": true,
    "partnerTaxRegime": true,
    "vatRegNumber": false,
    "taxRegimeStartDate": true,
    "taxRegimeSource": true,
    "partnerPrimaryLanguage": true,
    "extCustomerNum": false,
    "businessRelationship": true,
    "partnerLegalStatus": false,
    "partnerEstablishedYear": false,
    "isGBTrading": false,
    "isIETrading": false,
    "isTHTrading": false,
    "isMYTrading": false,
    "isCZTrading": false,
    "isHUTrading": false,
    "isPLTrading": false,
    "isSKTrading": false,
    "partnerAttachments": false,
    "partnerMergeHistory": false,
    "allowTaxApplicability": true,
    "useTaxWitholding": true,
    "whtRegimeCode": true,
    "whtTaxType": true,
    "whtRegistrationNumber": true
}