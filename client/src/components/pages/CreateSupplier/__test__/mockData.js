export const foundSupplier = [
  {
  "entityType": "partner",
  "uuid": "d682662a-7642-31d8-a7c1-e1dd1ddc7c47",
  "number": "1752657121",
  "name": "TEST98",
  "taxOrganisationType": "Corporation"
}]

export const mockFormData = {
  "partnerName": "TEST98",
  "companyRegNumber": "122",
  "vatRegNumber": "22"
}

export const mockResponse = {
    "attributeGroups": [
      {
        "id": "trn:tesco:partner:attributegroup:0067b034-b795-451c-b738-16f40330c339",
        "name": "Partner Details",
        "behaviour": "Single Row",
        "type": "Dynamic",
        "key": "partner",
        "attributes": [         
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
          }
        ]
      },     
    ],
    "attributeToRulesMapping": {
      "uuid": {
        "regexRule": "",
        "required": false,
        "attrGrpKey": "partner",
        "read": false,
        "create": false,
        "update": false
      },
      "partnerNumber": {
        "regexRule": "",
        "required": false,
        "attrGrpKey": "partner",
        "read": true
      },
      "partnerName": {
        "regexRule": "",
        "required": true,
        "attrGrpKey": "partner",
        "read": true,
        "create": true,
        "update": true
      },      
      "companyRegNumber": {
        "regexRule": "",
        "required": false,
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
           
    },
    "partnerAttributeStatic": {
      "attributes": [
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
          "type": "Number",
          "manifest": "Editable",
          "value": "",
          "key": "companyRegNumber",
          "id": "trn:tesco:partner:attribute:f175fc1a-06b2-402c-8d2a-828fdba77aeb",
          "displayName": "Company registration number",
          "name": "Company registration number",
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
          "type": "String",
          "manifest": "Editable",
          "value": "",
          "key": "vatRegNumber",
          "id": "trn:tesco:partner:attribute:61b1e1e5-4678-4a2b-9a8b-914c7b4e0979",
          "displayName": "VAT number",
          "name": "VAT number",
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
        }
      ]
    }
  }