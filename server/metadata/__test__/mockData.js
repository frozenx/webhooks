const
  getSupplierHeaderMock = {
    "entityType": "partner",
    "attributeGroupProjections": [
      {
        "uuid": "trn:tesco:partner:attributegroup:bb5cb8f0-2cc4-421e-a8ee-f86d1a5d8bbb",
        "name": "tradedUnitIdentifiers",
        "enabled": true,
        "behaviour": "Multi Row",
        "type": "Case",
        "displayNames": [
          {
            "displayName": "Traded Unit Identifier",
            "lang": "en"
          }
        ],
        "toolTips": [
          {
            "toolTip": "TradedUnit Identifier",
            "lang": "en"
          }
        ],
        "tabIndex": 7,
        "attributes": [
          {
            "uuid": "trn:tesco:partner:attribute:585b3c99-4527-4e17-bb9b-3ea31ee5cf01",
            "name": "tradedUnitNumber",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": null,
            "description": "Traded Unit Number",
            "dbColumn": "tradedUnitNumber",
            "displayNames": [
              {
                "displayName": "Traded Unit Number",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Unique identifier for the TradedUnit",
                "lang": "en"
              }
            ],
            "tabIndex": 5,
            "rules": null,
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          },
          {
            "uuid": "trn:tesco:partner:attribute:187aab85-c185-4065-a7d5-ee2c8a617b07",
            "name": "uuid",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": null,
            "description": "Traded Unit UUID",
            "dbColumn": "uuid",
            "displayNames": [
              {
                "displayName": "Traded Unit UUID",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Unique system generated traded unit number",
                "lang": "en"
              }
            ],
            "tabIndex": 1,
            "rules": null,
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          },
          {
            "uuid": "trn:tesco:partner:attribute:50beec10-d905-4b90-8d91-0f27040f2d1b",
            "name": "occStatus",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": null,
            "description": "Occ Status",
            "dbColumn": "occStatus",
            "displayNames": [
              {
                "displayName": "OCC Status",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Status of the item.",
                "lang": "en"
              }
            ],
            "tabIndex": 3,
            "rules": null,
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          },
          {
            "uuid": "trn:tesco:partner:attribute:eada9baa-e504-4573-93d2-9d07f7a95040",
            "name": "occType",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": null,
            "description": "Occ Type",
            "dbColumn": "occType",
            "displayNames": [
              {
                "displayName": "OCC Type",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Barcode Type if Branded or Own Label",
                "lang": "en"
              }
            ],
            "tabIndex": 1,
            "rules": null,
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          },
          {
            "uuid": "trn:tesco:partner:attribute:ae6a3ccc-6b53-4a14-be9a-978f496de4ae",
            "name": "occNumber",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": null,
            "description": "OCC Number",
            "dbColumn": "occNumber",
            "displayNames": [
              {
                "displayName": "OCC Number",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Displays the unique numeric value that identifies the Barcode",
                "lang": "en"
              }
            ],
            "tabIndex": 2,
            "rules": [
              {
                "uuid": "trn:tesco:partner:attributerule:b88de6db-95ba-4927-93f0-5f06dd11018f",
                "ruleType": "regex",
                "definition": "^\\\\s*(?=.*[1-9])\\\\d*(?:\\\\.\\\\d{1,5})?\\\\s*$",
                "messages": [
                  {
                    "message": "Basic Case Cost should be numeric, 2 decimals, Cannot be zero or less than zero.",
                    "lang": "en"
                  }
                ]
              },
              {
                "uuid": "trn:tesco:partner:attributerule:ae282fb8-2eb5-4416-98a4-a614314dfea2",
                "ruleType": "regex",
                "definition": "^(\\\\d{8}|\\\\d{14})$",
                "messages": [
                  {
                    "message": "TradedUnit OCC provided is incorrect. OCC should be either 8 or 14 digits ",
                    "lang": "en"
                  },
                  {
                    "message": "TradedUnit OCC provided je nesprávné. OCC by mělo být buď 8 nebo 14 číslic",
                    "lang": " cz"
                  }
                ]
              }
            ],
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          },
          {
            "uuid": "trn:tesco:partner:attribute:4455f2f9-425f-48d1-bc3c-da7f3384c5a4",
            "name": "countryCode",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": null,
            "description": "Country Code",
            "dbColumn": "countryCode",
            "displayNames": [
              {
                "displayName": "Country Code",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Country Code",
                "lang": "en"
              }
            ],
            "tabIndex": 2,
            "rules": null,
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          },
          {
            "uuid": "trn:tesco:partner:attribute:412a50da-559f-4a6d-ac4d-1012d3e75c51",
            "name": "partnerUuid",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": null,
            "description": "Partner Uuid",
            "dbColumn": "partnerUuid",
            "displayNames": [
              {
                "displayName": "Partner Uuid",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Partner Uuid",
                "lang": "en"
              }
            ],
            "tabIndex": 4,
            "rules": null,
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          }
        ]
      },
      {
        "uuid": "trn:tesco:partner:attributegroup:342ba528-f57a-407f-914e-bf819af08e48",
        "name": "caseDimension",
        "enabled": true,
        "behaviour": "Single Row",
        "type": "Dynamic",
        "displayNames": [
          {
            "displayName": "Case Dimension",
            "lang": "en"
          }
        ],
        "toolTips": [
          {
            "toolTip": "Case Dimension",
            "lang": "en"
          }
        ],
        "tabIndex": 4,
        "attributes": [
          {
            "uuid": "trn:tesco:partner:attribute:c5f49c16-8c00-4c5f-88b5-0bb77ddcba6d",
            "name": "palletTi",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": null,
            "description": "Pallet Ti",
            "dbColumn": "palletTi",
            "displayNames": [
              {
                "displayName": "Pallet Ti",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "This field contains number of shipping units (cases) that make up one tier of a pallet. Multiply TI x HI to get total number of units for a pallet",
                "lang": "en"
              }
            ],
            "tabIndex": 4,
            "rules": [
              {
                "uuid": "trn:tesco:partner:attributerule:46de95c9-fe97-4747-939a-7f0e4387dee6",
                "ruleType": "regex",
                "definition": "^\\\\d*[1-9]\\\\d*$",
                "messages": [
                  {
                    "message": "Pallet Ti should be numeric, Cannot be zero or less than zero.",
                    "lang": "en"
                  }
                ]
              }
            ],
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          },
          {
            "uuid": "trn:tesco:partner:attribute:d069ede4-1070-4d37-a5c8-8f2b723e044c",
            "name": "caseLength",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": null,
            "description": "Case Length",
            "dbColumn": "caseLength",
            "displayNames": [
              {
                "displayName": "Case Length (mm)",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Length of the Case in mm",
                "lang": "en"
              }
            ],
            "tabIndex": 1,
            "rules": [
              {
                "uuid": "trn:tesco:partner:attributerule:fe04787d-24d8-4aa2-b5d6-29aaa8640ef0",
                "ruleType": "regex",
                "definition": "^\\\\d*[1-9]\\\\d*$",
                "messages": [
                  {
                    "message": "Case length (mm) should be numeric, Cannot be zero or less than zero.",
                    "lang": "en"
                  }
                ]
              }
            ],
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          },
          {
            "uuid": "trn:tesco:partner:attribute:f56a784d-cf2b-4811-b274-1864259e9b7d",
            "name": "palletHi",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": null,
            "description": "Pallet Hi",
            "dbColumn": "palletHi",
            "displayNames": [
              {
                "displayName": "Pallet Hi",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "This field contains number of tiers that make up a complete pallet (height). Multiply ti x hi to get total number of units for a pallet",
                "lang": "en"
              }
            ],
            "tabIndex": 5,
            "rules": [
              {
                "uuid": "trn:tesco:partner:attributerule:cba03edd-3a6d-4e6c-a94d-2653b38c5e81",
                "ruleType": "regex",
                "definition": "^\\\\d*[1-9]\\\\d*$",
                "messages": [
                  {
                    "message": "Pallet Hi should be numeric, Cannot be zero or less than zero.",
                    "lang": "en"
                  }
                ]
              }
            ],
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          },
          {
            "uuid": "trn:tesco:partner:attribute:399dda77-29d2-4be9-b450-3a472b865e9f",
            "name": "caseDimensionUOM",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": {
              "createdBy": "trn:tesco:uid:uuid:66ac0d7a-3c5e-45e1-b494-bbd03dcd1bf0",
              "modifiedBy": "trn:tesco:uid:uuid:66ac0d7a-3c5e-45e1-b494-bbd03dcd1bf0",
              "createdDate": "2019-02-27T11:23:10.447+0000",
              "modifiedDate": null,
              "uuid": "trn:tesco:partner:valueset:a4d3a54c-c7e5-46e0-8cd1-98d1780bfbe4",
              "name": "DimensionUOM",
              "type": "String",
              "values": [
                {
                  "value": "MM",
                  "displayValue": "MM",
                  "lang": "en"
                }
              ]
            },
            "description": "Case Dimension UOM",
            "dbColumn": "caseDimensionUOM",
            "displayNames": [
              {
                "displayName": "Case Dimension UOM",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Case Dimension UOM",
                "lang": "en"
              }
            ],
            "tabIndex": 6,
            "rules": null,
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          },
          {
            "uuid": "trn:tesco:partner:attribute:1f9803ed-26da-4739-a3be-331eb2f2874d",
            "name": "caseWidth",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": null,
            "description": "Case Width",
            "dbColumn": "caseWidth",
            "displayNames": [
              {
                "displayName": " Case Width (mm)",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Width of the Case in mm",
                "lang": "en"
              }
            ],
            "tabIndex": 2,
            "rules": [
              {
                "uuid": "trn:tesco:partner:attributerule:0ea2c6cb-65b2-4aa9-9a94-711903465a96",
                "ruleType": "regex",
                "definition": "^\\\\d*[1-9]\\\\d*$",
                "messages": [
                  {
                    "message": "Case width (mm) should be numeric, Cannot be zero or less than zero.",
                    "lang": "en"
                  }
                ]
              }
            ],
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          },
          {
            "uuid": "trn:tesco:partner:attribute:a4f240f1-5983-46b3-bf14-7f63ddb8ad4a",
            "name": "caseHeight",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": null,
            "description": "Case Height",
            "dbColumn": "caseHeight",
            "displayNames": [
              {
                "displayName": "Case Height (mm)",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Height of the Case in mm",
                "lang": "en"
              }
            ],
            "tabIndex": 3,
            "rules": [
              {
                "uuid": "trn:tesco:partner:attributerule:cc6c530e-106b-4367-8354-2c832ed3ec8f",
                "ruleType": "regex",
                "definition": "^\\\\d*[1-9]\\\\d*$",
                "messages": [
                  {
                    "message": "Case height (mm) should be numeric, Cannot be zero or less than zero.",
                    "lang": "en"
                  }
                ]
              }
            ],
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          }
        ]
      },
      {
        "uuid": "trn:tesco:partner:attributegroup:37152c48-16c4-4450-a6cd-2e6557899090",
        "name": "barcodeArtwork",
        "enabled": true,
        "behaviour": "Multi Row",
        "type": "String",
        "displayNames": [
          {
            "displayName": "Barcode Artwork",
            "lang": "en"
          }
        ],
        "toolTips": [
          {
            "toolTip": "Barcode Artwork",
            "lang": "en"
          }
        ],
        "tabIndex": 8,
        "attributes": [
          {
            "uuid": "trn:tesco:partner:attribute:45d026a8-7463-438a-8605-dd0c0f590943",
            "name": "occURL",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": null,
            "description": "Case OCC URL",
            "dbColumn": "occURL",
            "displayNames": [
              {
                "displayName": "Case OCC URL",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Case OCC URL",
                "lang": "en"
              }
            ],
            "tabIndex": 2,
            "rules": null,
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          },
          {
            "uuid": "trn:tesco:partner:attribute:a03df7f6-8019-4527-97bb-62a861985e68",
            "name": "occScanMethod",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": {
              "createdBy": "trn:tesco:uid:uuid:66ac0d7a-3c5e-45e1-b494-bbd03dcd1bf0",
              "modifiedBy": "trn:tesco:uid:uuid:66ac0d7a-3c5e-45e1-b494-bbd03dcd1bf0",
              "createdDate": "2019-02-27T11:23:10.851+0000",
              "modifiedDate": null,
              "uuid": "trn:tesco:partner:valueset:a5e97051-44a3-47d5-828f-c445641e0f6a",
              "name": "OccScanMethod",
              "type": "String",
              "values": [
                {
                  "value": "Sample",
                  "displayValue": "Sample",
                  "lang": "en"
                },
                {
                  "value": "PDF",
                  "displayValue": "PDF",
                  "lang": "en"
                }
              ]
            },
            "description": "Case Barcoding Method",
            "dbColumn": "occScanMethod",
            "displayNames": [
              {
                "displayName": "Case Barcoding Method",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Case Barcoding Method",
                "lang": "en"
              }
            ],
            "tabIndex": 1,
            "rules": null,
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          }
        ]
      },
      {
        "uuid": "trn:tesco:partner:attributegroup:c126c06f-33e4-4928-9d8e-77e549886447",
        "name": "case",
        "enabled": true,
        "behaviour": "Single Row",
        "type": "Dynamic",
        "displayNames": [
          {
            "displayName": "Case Details",
            "lang": "en"
          }
        ],
        "toolTips": [
          {
            "toolTip": "Case Details",
            "lang": "en"
          }
        ],
        "tabIndex": 7,
        "attributes": [
          {
            "uuid": "trn:tesco:partner:attribute:2075fb2f-bf0c-47d3-84a9-43484a2a4cf0",
            "name": "caseDescription",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": null,
            "description": "Case Description",
            "dbColumn": "caseDescription",
            "displayNames": [
              {
                "displayName": "Case Description",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Displays the description of the traded unit",
                "lang": "en"
              }
            ],
            "tabIndex": 1,
            "rules": [
              {
                "uuid": "trn:tesco:partner:attributerule:54a9ec81-c283-4348-b006-777dc643e702",
                "ruleType": "regex",
                "definition": "^\\\\s*(?=.*[1-9])\\\\d*(?:\\\\.\\\\d{1,5})?\\\\s*$",
                "messages": [
                  {
                    "message": "Gross case weight should be numeric, 2 decimals, Cannot be zero or less than zero.",
                    "lang": "en"
                  }
                ]
              }
            ],
            "minScope": 1,
            "maxScope": 24,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          },
          {
            "uuid": "trn:tesco:partner:attribute:b0af4144-1c58-4cbf-845d-260158c96acb",
            "name": "caseType",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": {
              "createdBy": "trn:tesco:uid:uuid:66ac0d7a-3c5e-45e1-b494-bbd03dcd1bf0",
              "modifiedBy": "trn:tesco:uid:uuid:66ac0d7a-3c5e-45e1-b494-bbd03dcd1bf0",
              "createdDate": "2019-02-27T11:23:10.246+0000",
              "modifiedDate": null,
              "uuid": "trn:tesco:partner:valueset:4fbf6852-2c41-48af-821b-f3eea65191b1",
              "name": "CaseTypeLOV",
              "type": "String",
              "values": [
                {
                  "value": "Bag",
                  "displayValue": "Bag",
                  "lang": "en"
                },
                {
                  "value": "Basket",
                  "displayValue": "Basket",
                  "lang": "en"
                },
                {
                  "value": "Bottle",
                  "displayValue": "Bottle",
                  "lang": "en"
                },
                {
                  "value": "Bowl",
                  "displayValue": "Bowl",
                  "lang": "en"
                },
                {
                  "value": "Can",
                  "displayValue": "Can",
                  "lang": "en"
                },
                {
                  "value": "Box",
                  "displayValue": "Box",
                  "lang": "en"
                },
                {
                  "value": "Carafe",
                  "displayValue": "Carafe",
                  "lang": "en"
                },
                {
                  "value": "Card",
                  "displayValue": "Card",
                  "lang": "en"
                },
                {
                  "value": "Carton",
                  "displayValue": "Carton",
                  "lang": "en"
                },
                {
                  "value": "Casket",
                  "displayValue": "Casket",
                  "lang": "en"
                },
                {
                  "value": "Clistrips",
                  "displayValue": "Clistrips",
                  "lang": "en"
                },
                {
                  "value": "Cryovac",
                  "displayValue": "Cryovac",
                  "lang": "en"
                },
                {
                  "value": "Dispenser",
                  "displayValue": "Dispenser",
                  "lang": "en"
                },
                {
                  "value": "Drum",
                  "displayValue": "Drum",
                  "lang": "en"
                },
                {
                  "value": "Flask",
                  "displayValue": "Flask",
                  "lang": "en"
                },
                {
                  "value": "Flower Pot",
                  "displayValue": "Flower Pot",
                  "lang": "en"
                },
                {
                  "value": "Jar",
                  "displayValue": "Jar",
                  "lang": "en"
                },
                {
                  "value": "Loose",
                  "displayValue": "Loose",
                  "lang": "en"
                },
                {
                  "value": "Net",
                  "displayValue": "Net",
                  "lang": "en"
                },
                {
                  "value": "Overwrap",
                  "displayValue": "Overwrap",
                  "lang": "en"
                },
                {
                  "value": "Pack",
                  "displayValue": "Pack",
                  "lang": "en"
                },
                {
                  "value": "Packet",
                  "displayValue": "Packet",
                  "lang": "en"
                },
                {
                  "value": "Plastic Bottle",
                  "displayValue": "Plastic Bottle",
                  "lang": "en"
                },
                {
                  "value": "Polyryder",
                  "displayValue": "Polyryder",
                  "lang": "en"
                },
                {
                  "value": "Pump",
                  "displayValue": "Pump",
                  "lang": "en"
                },
                {
                  "value": "Punnet",
                  "displayValue": "Punnet",
                  "lang": "en"
                },
                {
                  "value": "Sachet",
                  "displayValue": "Sachet",
                  "lang": "en"
                },
                {
                  "value": "Set",
                  "displayValue": "Set",
                  "lang": "en"
                },
                {
                  "value": "Shrink Wrap",
                  "displayValue": "Shrink Wrap",
                  "lang": "en"
                },
                {
                  "value": "Tin",
                  "displayValue": "Tin",
                  "lang": "en"
                },
                {
                  "value": "Tray",
                  "displayValue": "Tray",
                  "lang": "en"
                },
                {
                  "value": "Tub",
                  "displayValue": "Tub",
                  "lang": "en"
                },
                {
                  "value": "Tube",
                  "displayValue": "Tube",
                  "lang": "en"
                },
                {
                  "value": "Vacuum Pack",
                  "displayValue": "Vacuum Pack",
                  "lang": "en"
                }
              ]
            },
            "description": "Case Type",
            "dbColumn": "caseType",
            "displayNames": [
              {
                "displayName": " Case Packaging Type",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Case Packaging Type",
                "lang": "en"
              }
            ],
            "tabIndex": 1,
            "rules": null,
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          }
        ]
      },
      {
        "uuid": "trn:tesco:partner:attributegroup:9997a554-a31a-4854-859a-36a8729b85dc",
        "name": "orderInfo",
        "enabled": true,
        "behaviour": "Single Row",
        "type": "Dynamic",
        "displayNames": [
          {
            "displayName": "Order Information",
            "lang": "en"
          }
        ],
        "toolTips": [
          {
            "toolTip": "Order Information",
            "lang": "en"
          }
        ],
        "tabIndex": 5,
        "attributes": [
          {
            "uuid": "trn:tesco:partner:attribute:73af34c2-db29-468c-931b-450800c45fd1",
            "name": "toleranceMax",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": null,
            "description": "Tolerance Max",
            "dbColumn": "toleranceMax",
            "displayNames": [
              {
                "displayName": "Tolerance (Max)",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Tolerance (Max)",
                "lang": "en"
              }
            ],
            "tabIndex": 5,
            "rules": null,
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          },
          {
            "uuid": "trn:tesco:partner:attribute:47c9c50e-0678-42f1-8cb1-bd1d0375f08e",
            "name": "orderType",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": {
              "createdBy": "trn:tesco:uid:uuid:66ac0d7a-3c5e-45e1-b494-bbd03dcd1bf0",
              "modifiedBy": "trn:tesco:uid:uuid:66ac0d7a-3c5e-45e1-b494-bbd03dcd1bf0",
              "createdDate": "2019-02-27T11:23:10.349+0000",
              "modifiedDate": null,
              "uuid": "trn:tesco:partner:valueset:c946718b-9c18-48f8-9118-ca80ce7d4077",
              "name": "OrderTypeLOV",
              "type": "String",
              "values": [
                {
                  "value": "Fixed",
                  "displayValue": "Fixed",
                  "lang": "en"
                },
                {
                  "value": "Variable",
                  "displayValue": "Variable",
                  "lang": "en"
                }
              ]
            },
            "description": "Order Type",
            "dbColumn": "orderType",
            "displayNames": [
              {
                "displayName": "Order Type",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Case ordered in Fixed Weight or Variable Weight?",
                "lang": "en"
              }
            ],
            "tabIndex": 2,
            "rules": null,
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          },
          {
            "uuid": "trn:tesco:partner:attribute:9c495e19-004e-4ffb-a47e-69fb856cd327",
            "name": "toleranceMin",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": null,
            "description": "Tolerance Min",
            "dbColumn": "toleranceMin",
            "displayNames": [
              {
                "displayName": "Tolerance (Min)",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Tolerance (Min)",
                "lang": "en"
              }
            ],
            "tabIndex": 4,
            "rules": null,
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          },
          {
            "uuid": "trn:tesco:partner:attribute:2faf9e27-2551-44f0-8752-5145430735a5",
            "name": "toleranceType",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": {
              "createdBy": "trn:tesco:uid:uuid:66ac0d7a-3c5e-45e1-b494-bbd03dcd1bf0",
              "modifiedBy": "trn:tesco:uid:uuid:66ac0d7a-3c5e-45e1-b494-bbd03dcd1bf0",
              "createdDate": "2019-02-27T11:23:10.753+0000",
              "modifiedDate": null,
              "uuid": "trn:tesco:partner:valueset:9d21a214-bac5-4047-b9f5-1ba7441aa49d",
              "name": "ToleranceTypeLOV",
              "type": "String",
              "values": [
                {
                  "value": "Actual",
                  "displayValue": "Actual",
                  "lang": "en"
                },
                {
                  "value": "Percentage",
                  "displayValue": "Percentage",
                  "lang": "en"
                }
              ]
            },
            "description": "Tolerance Type",
            "dbColumn": "toleranceType",
            "displayNames": [
              {
                "displayName": "Tolerance Type",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Tolerance Type",
                "lang": "en"
              }
            ],
            "tabIndex": 3,
            "rules": null,
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          },
          {
            "uuid": "trn:tesco:partner:attribute:12367450-acc5-463d-93f0-be289e2fc665",
            "name": "isPreferredTradedUnit",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "Boolean",
            "manifest": "Read Only",
            "valueSet": null,
            "description": "Is Preferred TradedUnit",
            "dbColumn": "isPreferredTradedUnit",
            "displayNames": [
              {
                "displayName": "Is Preferred Traded Unit?",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Preferred traded unit for Suppliers",
                "lang": "en"
              }
            ],
            "tabIndex": 3,
            "rules": null,
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          }
        ]
      },
      {
        "uuid": "trn:tesco:partner:attributegroup:c44927eb-9fb5-46f5-8cf6-acf0ed5c5256",
        "name": "lifecycleInfo",
        "enabled": true,
        "behaviour": "Single Row",
        "type": "Dynamic",
        "displayNames": [
          {
            "displayName": "Lifecycle Information",
            "lang": "en"
          }
        ],
        "toolTips": [
          {
            "toolTip": "Lifecycle Information",
            "lang": "en"
          }
        ],
        "tabIndex": 3,
        "attributes": [
          {
            "uuid": "trn:tesco:partner:attribute:e0038370-109f-432a-b154-583ab4180027",
            "name": "occScanned",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "Boolean",
            "manifest": "Read Only",
            "valueSet": null,
            "description": "Is OCC Scanned?",
            "dbColumn": "occScanned",
            "displayNames": [
              {
                "displayName": "Is OCC Scanned?",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Is OCC Scanned?",
                "lang": "en"
              }
            ],
            "tabIndex": 0,
            "rules": null,
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          },
          {
            "uuid": "trn:tesco:partner:attribute:92e4f282-9e49-4fd9-b0cb-090b160bf8a1",
            "name": "status",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": null,
            "description": "Status",
            "dbColumn": "status",
            "displayNames": [
              {
                "displayName": "Case Status",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Case Status",
                "lang": "en"
              }
            ],
            "tabIndex": 1,
            "rules": null,
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          }
        ]
      },
      {
        "uuid": "trn:tesco:partner:attributegroup:ea1529c3-0289-4533-9d98-028b67da6e08",
        "name": "productIdentifier",
        "enabled": true,
        "behaviour": "Single Row",
        "type": "Case",
        "displayNames": [
          {
            "displayName": "Product Identifier",
            "lang": "en"
          }
        ],
        "toolTips": [
          {
            "toolTip": "Product Identifier",
            "lang": "en"
          }
        ],
        "tabIndex": 1,
        "attributes": [
          {
            "uuid": "trn:tesco:partner:attribute:8f3b9aee-7b0d-4b74-8096-171c0a3e37ba",
            "name": "uuid",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": null,
            "description": "Product UUID",
            "dbColumn": "uuid",
            "displayNames": [
              {
                "displayName": "Product UUID",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Displays the unique numeric value that identifies the consumer unit",
                "lang": "en"
              }
            ],
            "tabIndex": 1,
            "rules": null,
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          }
        ]
      },
      {
        "uuid": "trn:tesco:partner:attributegroup:6b164154-f605-4d29-b8c5-8238a406dd82",
        "name": "caseContent",
        "enabled": true,
        "behaviour": "Single Row",
        "type": "Dynamic",
        "displayNames": [
          {
            "displayName": "Case Content",
            "lang": "en"
          }
        ],
        "toolTips": [
          {
            "toolTip": "Case Content",
            "lang": "en"
          }
        ],
        "tabIndex": 2,
        "attributes": [
          {
            "uuid": "trn:tesco:partner:attribute:7cd4aee3-0dd6-4b1a-9a61-ab6becb5f051",
            "name": "weightUOM",
            "enabled": true,
            "required": false,
            "defaultValue": "             KG",
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": {
              "createdBy": "trn:tesco:uid:uuid:66ac0d7a-3c5e-45e1-b494-bbd03dcd1bf0",
              "modifiedBy": "trn:tesco:uid:uuid:66ac0d7a-3c5e-45e1-b494-bbd03dcd1bf0",
              "createdDate": "2019-02-27T11:23:10.649+0000",
              "modifiedDate": null,
              "uuid": "trn:tesco:partner:valueset:e0432751-3569-4365-85ba-8e1a1558735f",
              "name": "WeightUOM",
              "type": "String",
              "values": [
                {
                  "value": "KG",
                  "displayValue": "KILOGRAM",
                  "lang": "en"
                }
              ]
            },
            "description": "Weight UOM",
            "dbColumn": "weightUOM",
            "displayNames": [
              {
                "displayName": "Case Weight UOM",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Contains the unit of measure for the Gross/Net Weight of the traded unit",
                "lang": "en"
              }
            ],
            "tabIndex": 3,
            "rules": null,
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          },
          {
            "uuid": "trn:tesco:partner:attribute:abd07ba8-46d7-4ade-9ab8-d4efeda78161",
            "name": "netCaseWeight",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": null,
            "description": "Gross Net Weight",
            "dbColumn": "netCaseWeight",
            "displayNames": [
              {
                "displayName": "Case Net Weight",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Net Weight of the trade item, excludes any packaging materials.",
                "lang": "en"
              }
            ],
            "tabIndex": 2,
            "rules": [
              {
                "uuid": "trn:tesco:partner:attributerule:828bbaeb-aa1c-494a-a3bf-94879fbd5f9e",
                "ruleType": "regex",
                "definition": "^\\\\s*(?=.*[1-9])\\\\d*(?:\\\\.\\\\d{1,5})?\\\\s*$",
                "messages": [
                  {
                    "message": "Net weight should be numeric, 2 decimals, Cannot be zero or less than zero.",
                    "lang": "en"
                  }
                ]
              }
            ],
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          },
          {
            "uuid": "trn:tesco:partner:attribute:fa58b611-4f31-433b-8578-ff8727f2ca3a",
            "name": "caseQuantity",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": null,
            "description": "Case Quantity",
            "dbColumn": "caseQuantity",
            "displayNames": [
              {
                "displayName": "Case Quantity",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Number of consumer units in the traded unit",
                "lang": "en"
              }
            ],
            "tabIndex": 4,
            "rules": [
              {
                "uuid": "trn:tesco:partner:attributerule:7051f856-9288-4fd2-ac56-dfa650ec63c9",
                "ruleType": "regex",
                "definition": "^\\\\d*[1-9]\\\\d*$",
                "messages": [
                  {
                    "message": "Case quantity (pack quantity) should be numeric, Cannot be zero or less than zero.",
                    "lang": "en"
                  }
                ]
              }
            ],
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          },
          {
            "uuid": "trn:tesco:partner:attribute:ea234702-8182-44fb-b239-3e6a5b6b7b6e",
            "name": "caseQuantityUOM",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": {
              "createdBy": "trn:tesco:uid:uuid:66ac0d7a-3c5e-45e1-b494-bbd03dcd1bf0",
              "modifiedBy": "trn:tesco:uid:uuid:66ac0d7a-3c5e-45e1-b494-bbd03dcd1bf0",
              "createdDate": "2019-02-27T11:23:10.149+0000",
              "modifiedDate": null,
              "uuid": "trn:tesco:partner:valueset:229439fb-bdc2-4b44-991e-7d7549d3242b",
              "name": "CaseQuantityUOM",
              "type": "String",
              "values": [
                {
                  "value": "EA",
                  "displayValue": "EA",
                  "lang": "en"
                },
                {
                  "value": "KG",
                  "displayValue": "KG",
                  "lang": "en"
                },
                {
                  "value": "L",
                  "displayValue": "L",
                  "lang": "en"
                }
              ]
            },
            "description": "Case Quantity UOM",
            "dbColumn": "caseQuantityUOM",
            "displayNames": [
              {
                "displayName": " Case Quantity UOM",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Case Quantity UOM",
                "lang": "en"
              }
            ],
            "tabIndex": 5,
            "rules": null,
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          },
          {
            "uuid": "trn:tesco:partner:attribute:de9f988b-da93-440f-911a-35e94431b2da",
            "name": "grossCaseWeight",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": null,
            "description": "Gross Case Weight",
            "dbColumn": "grossCaseWeight",
            "displayNames": [
              {
                "displayName": "Case Gross Weight",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Gross weight of the trade item, includes all packaging materials",
                "lang": "en"
              }
            ],
            "tabIndex": 1,
            "rules": [
              {
                "uuid": "trn:tesco:partner:attributerule:54a9ec81-c283-4348-b006-777dc643e702",
                "ruleType": "regex",
                "definition": "^\\\\s*(?=.*[1-9])\\\\d*(?:\\\\.\\\\d{1,5})?\\\\s*$",
                "messages": [
                  {
                    "message": "Gross case weight should be numeric, 2 decimals, Cannot be zero or less than zero.",
                    "lang": "en"
                  }
                ]
              }
            ],
            "minScope": 0,
            "maxScope": 25,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          }
        ]
      },
      {
        "uuid": "trn:tesco:partner:attributegroup:d455f428-fd4b-4c60-b65c-15191b552d22",
        "name": "supplierReferences",
        "enabled": true,
        "behaviour": "Single Row",
        "type": "String",
        "displayNames": [
          {
            "displayName": "Supplier Reference Details",
            "lang": "en"
          }
        ],
        "toolTips": [
          {
            "toolTip": "Supplier Reference Details",
            "lang": "en"
          }
        ],
        "tabIndex": 0,
        "attributes": [
          {
            "uuid": "trn:tesco:partner:attribute:44cb4641-55dc-4316-84b7-772e8290057e",
            "name": "supplierId",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": null,
            "description": "Supplier Id",
            "dbColumn": "supplierId",
            "displayNames": [
              {
                "displayName": "Supplier Id",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Supplier Id",
                "lang": "en"
              }
            ],
            "tabIndex": 1,
            "rules": null,
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          },
          {
            "uuid": "trn:tesco:partner:attribute:78b4afb9-3c21-4b39-8a39-0641e6ba6e6f",
            "name": "supplierProductId",
            "enabled": true,
            "required": false,
            "defaultValue": null,
            "dataType": "String",
            "manifest": "Read Only",
            "valueSet": null,
            "description": "Supplier Product Id",
            "dbColumn": "supplierProductId",
            "displayNames": [
              {
                "displayName": "Supplier Product Code",
                "lang": "en"
              }
            ],
            "toolTips": [
              {
                "toolTip": "Supplier Product Reference",
                "lang": "en"
              }
            ],
            "tabIndex": 2,
            "rules": null,
            "minScope": null,
            "maxScope": null,
            "subDataType": null,
            "compute": null,
            "uniqueKey": false
          }
        ]
      }
    ],
    "id": "jBzpTGkBuK0r3s2I3HSg",
    "indexName": "metadata_partner",
    "indexType": "partner"
  }


const mockAttributeObject = {
  name: 'status',
  enabled: true,
  required: true,
  default: null,
  dataType: 'String',
  manifest: 'Editable',
  flexValueSetId: null,
  dbColumn: 'string1',
  isUniqueKey: false,
  uuid: 1,
  displayNames: [
    {
      displayName: 'Product Status',
      lang: 'en',
      id: 16,
    },
  ],
  toolTips: [
    {
      toolTip: 'Enter the product status',
      lang: 'en',
      id: 16,
    },
  ],
  rules: [
    {
      type: 'regex',
      definition: '[A-Za-z0-9 -,]',
      messages: [
        {
          message: 'Description should follow the RegEx pattern',
          lang: 'en',
        },
      ],
    }],
};

const mockAttributeSelectObject = {
  name: 'status',
  enabled: true,
  required: true,
  default: null,
  dataType: 'select',
  manifest: 'Editable',
  flexValueSetId: null,
  dbColumn: 'select1',
  options: ['a', 'b'],
  isUniqueKey: false,
  uuid: 1,
  displayNames: [
    {
      displayName: 'Product Status',
      lang: 'en',
      id: 16,
    },
  ],
  toolTips: [
    {
      toolTip: 'Enter the product status',
      lang: 'en',
      id: 16,
    },
  ],
  rules: [
    {
      type: 'regex',
      definition: '[A-Za-z0-9 -,]',
      messages: [
        {
          message: 'Description should follow the RegEx pattern',
          lang: 'en',
        },
      ],
    }],
};


const expectedAttributeModel = { "default": null, "displayName": "Product Status", "enabled": true, "flexValueSetId": null, "id": 1, "isUniqueKey": false, "key": "string1", "manifest": "Editable", "name": "Product Status", "options": [], "regexRule": /[A-Za-z0-9 -,]/, "required": true, "rules": [{ "definition": "[A-Za-z0-9 -,]", "message": "Description should follow the RegEx pattern", "messages": [{ "lang": "en", "message": "Description should follow the RegEx pattern" }], "type": "regex" }], "toolTip": "Enter the product status", "type": "String", "value": "" }

const expectedSelectAttributeModel = { "default": null, "displayName": "Product Status", "enabled": true, "flexValueSetId": null, "id": 1, "isUniqueKey": false, "key": "select1", "manifest": "Editable", "name": "Product Status", "options": ["a", "b"], "regexRule": /[A-Za-z0-9 -,]/, "required": true, "rules": [{ "definition": "[A-Za-z0-9 -,]", "message": "Description should follow the RegEx pattern", "messages": [{ "lang": "en", "message": "Description should follow the RegEx pattern" }], "type": "regex" }], "toolTip": "Enter the product status", "type": "select", "value": "" }

const expectedDefaultAttributeModel = { "default": null, "displayName": "", "enabled": true, "flexValueSetId": null, "id": 1, "isUniqueKey": false, "key": "string1", "manifest": "Editable", "name": "", "options": [], "regexRule": /[A-Za-z0-9 -,]/, "required": true, "rules": [{ "definition": "[A-Za-z0-9 -,]", "message": "", "messages": [{ "lang": "en", "message": "Description should follow the RegEx pattern" }], "type": "regex" }], "toolTip": "", "type": "String", "value": "" }


const attributeGroupsPayload = {
  uuid: 'trn:tesco:attrgroup:uuid:0c3386c0-d4fc-11e7-a862-7b6a0d76adb4',
  name: 'lifecycleInfo',
  behaviour: 'Single Row',
  type: 'Dynamic',
  attributes: [
    {
      name: 'status',
      value: '',
      key: '',
      enabled: true,
      required: true,
      default: null,
      dataType: 'String',
      manifest: 'Editable',
      flexValueSetId: null,
      dbColumn: 'string1',
      isUniqueKey: false,
      id: 1,
      displayNames: [
        {
          displayName: 'Product Status',
          lang: 'en',
          id: 16,
        },
      ],
      toolTips: [
        {
          toolTip: 'Enter the product status',
          lang: 'en',
          id: 16,
        },
      ],
      rules: [
        {
          type: 'regex',
          definition: '[A-Za-z0-9 -,]',
          messages: [
            {
              message: 'Description should follow the RegEx pattern',
              lang: 'en',
            },
          ],
        }],
    },
    {
      name: 'targetLaunchDate',
      value: '',
      key: '',
      enabled: true,
      required: false,
      default: null,
      dataType: 'date',
      manifest: 'Editable',
      flexValueSetId: null,
      dbColumn: 'date1',
      isUniqueKey: false,
      id: 2,
      displayNames: [
        {
          displayName: 'Target Launch Date',
          lang: 'en',
          id: 17,
        },
      ],
      toolTips: [
        {
          toolTip: null,
          lang: 'en',
          id: 17,
        },
      ],
      rules: [],
    },
  ],
  displayNames: [
    {
      displayName: 'Product Lifecycle Info',
      lang: 'en',
      id: 11,
    },
  ],
  toolTips: [
    {
      toolTip: null,
      lang: 'en',
      id: 11,
    },
  ],
  inheritance: {
    base: '',
    tempVariant: 'Edit',
    gtin: 'Edit',
  },
};


const expectedAttributesGroupModel = {
  id: 'trn:tesco:attrgroup:uuid:0c3386c0-d4fc-11e7-a862-7b6a0d76adb4',
  name: 'lifecycleInfo',
  behaviour: 'Single Row',
  type: 'Dynamic',
  attributes: [{}, {}],
};

const siteDetailsMock = {
  "uuid":"1408618a-13b5-3c8d-bb67-824bb0b63fd7",
  "partnerRef":{"uuid":"b42addf8-0872-317b-b217-095f700ab74a"},
  "siteLanguage":"en",
  "siteContactRefs":[],
  "siteIdentifiers": [
    {
      "siteId":"838594689143204",
      "siteNumber":"5905546206",
      "source":"fusion",
      "type":"GFR",
      "countryCode":"uk"
    }
  ],
  "siteAttributes": [
    {
      "attributeGroup":"site",
      "attributes": [
        {
          "name":"siteCodeId",
          "values": [
            {"value":"4444","lang":"en"}
          ]
        },        
        {
          "name":"siteName",
          "values":[
            {"value":"Uniliver site","lang":"en"}
          ]
        },
        
      ]
    }
  ],
  "version":1,
  "createdDate":"08042019",
  "modifiedDate":"08042019",
  "date":"2019-04-08T07:09:24.016+0000"

}

const paymentDetailsMock = {
  "uuid":"1408618a-13b5-3c8d-bb67-824bb0b63fd8",
  "siteRef":{"uuid":"b42addf8-0872-317b-b217-095f700ab74a"},
  "siteLanguage":"en",
  "tncIdentifiers": [
    {
      "siteId":"838594689143207",
      "siteNumber":"5905546207",
      "source":"fusion",
      "type":"GFR",
      "countryCode":"uk"
    }
  ],
  "tncAttributes": [
    {
      "attributeGroup":"Payments",
      "attributes": [
        {
          "name":"paymentTermsName",
          "values": [
            {"value":"payment name","lang":"en"}
          ]
        }        
      ]
    }
  ],
  "version":1,
  "createdDate":"08042019",
  "modifiedDate":"08042019",
  "date":"2019-04-08T07:09:24.016+0000"

}


const expectedSiteDetailsModel = {
  "siteDetails":{
    "attributeGroups":[
      {"name":"site"}
    ],
    "indicators":{
      "0":{
        "site":{
          "value":10,"variant":"error"
        }
      }
    },
    "uuid":"1408618a-13b5-3c8d-bb67-824bb0b63fd7",
    "version":1,
    "selectedSiteName":"Uniliver site"
  }
}

const expectedPaymentDetailsModel = {
  "paymentDetails":{
    "attributeGroups":[
      {"name":"Payments"}
    ],
    "indicators":{
      "0":{
        "Payments":{
          "value":10,"variant":"error"
        }
      }
    },
    "uuid":"1408618a-13b5-3c8d-bb67-824bb0b63fd8",
    "version":1,
    "selectedPaymentName":"payment name"
  }
}

const mockDataWrongStructureForPayments = {
  tncAttributes: {
    name: 'some wrong data',
  }
}

const mockDataWrongStructureForSite = {
  siteAttributes: {
    name: 'some wrong data',
  }
}

const getAttributeAccessMock = {
  uamAccess: {
    resources: {
      attribute: {
        partner: {
          partner: [{ uuid: ['create', 'read'] }]
        }
      },
      attributeGroup: {
        partner: [{ partner: ['read', 'create', 'update'] }]
      }
    }
  },
  transformedMetaData: {
    attributeGroups: [{
      key: 'partner',
      attributes: [{key: 'uuid', manifest: 'hidden'}]
    }],
    attributeToRulesMapping: {
      uuid: {regexRule: '', required: true}
    }
  },
  entityType: 'partner'
} 

const expectedAttributeAccessMock = {
  attributeGroups: [
    {
      key: 'partner',
      attributes: [{ key: 'uuid', manifest: 'hidden', type: 'Hidden' }],
    },
  ],
  attributeToRulesMapping: {
    uuid: {
      regexRule: '',
      required: false,
      read: false,
      create: false,
      update: false,
    },
    partner: { create: true, read: true, update: true },
  },
};

const expectedAttributeAccessMockWithReadAccessOnly = {
  attributeGroups: [
    {
      key: 'partner',
      attributes: [{ key: 'uuid', manifest: 'Read Only', type: 'Hidden' }],
    },
  ],
  attributeToRulesMapping: {
    uuid: {
      regexRule: '',
      required: false,
      read: true,
      create: false,
      update: false,
    },
    partner: { create: true, read: true, update: true },
  },
};


const expectedManifestAccess = {
  hidden: { read: false, create: false, update: false },
  readOnly: { read: true },
  editable: { read: true, create: true, update: true },
  default: {read: false, create: false, update: false}
}

const expectedAttributeAccessMockWithUamEmpty = {
  attributeGroups: [
    {
      key: 'partner',
      attributes: [{ key: 'uuid', manifest: 'Read Only', type: 'Hidden' }],
    },
  ],
  attributeToRulesMapping: {
    uuid: {
      regexRule: '',
      required: false,
      read: true,
      create: false,
      update: false,
    },
    partner: { create: true, read: true, update: true },
  },
};



module.exports = {
  getSupplierHeaderMock,
  mockAttributeObject,
  mockAttributeSelectObject,
  expectedAttributeModel,
  expectedSelectAttributeModel,
  expectedDefaultAttributeModel,
  attributeGroupsPayload,
  expectedAttributesGroupModel,
  siteDetailsMock,  
  expectedSiteDetailsModel,
  paymentDetailsMock,
  expectedPaymentDetailsModel,
  mockDataWrongStructureForPayments,
  mockDataWrongStructureForSite,
  getAttributeAccessMock,
  expectedAttributeAccessMock,
  expectedAttributeAccessMockWithReadAccessOnly,
  expectedManifestAccess,
  expectedAttributeAccessMockWithUamEmpty
};
