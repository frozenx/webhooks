const getAction = {
  input: { read: true },
  output: { create: undefined, read: true, update: undefined },
};

const arrayToObject = {
  input: ['read'],
  output: { read: true },
};

const extractAccessForAttributeGrps = {
  input: {
    access: {
      resources: {
        attributeGroup: {
          header: [
            {
              partner: ['read'],
            },
          ],
        },
      },
    },
    entityType: 'header',
    attrGrpName: 'partner',
  },
  output: { read: true, create: undefined, update: undefined },
};

const mergeMetaDataBasedOnUamAccess = {
  input: {
    uam: {
      resources: {
        attributeGroup: {
          header: [
            {
              partner: ['read'],
            },
          ],
        },
        attribute: {
          header: {
            partner: [
              {
                taxOrganisationType: ['read', 'create'],
              },
            ],
          },
        },
      },
    },
    metaData: {
      attributeToRulesMapping: {},
    },
    entityType: 'header',
  },
  output: {
    attributeToRulesMapping: {
      partner: { read: true, create: undefined, update: undefined },
      taxOrganisationType: { read: true, create: true, update: undefined },
    },
  },
  inputWithReadAccessOnlyAttribute: {
    uam: {
      resources: {
        attributeGroup: {
          header: [
            {
              partner: ['read'],
            },
          ],
        },
        attribute: {
          header: {
            partner: [
              {
                taxOrganisationType: ['read'],
              },
            ],
          },
        },
      },
    },
    metaData: {
      attributeToRulesMapping: {},
    },
    entityType: 'header',
  },
  outputWithReadAccessOnlyAttribute: {
    attributeToRulesMapping: {
      partner: { read: true, create: undefined, update: undefined },
      taxOrganisationType: {
        read: true,
        create: undefined,
        update: undefined,
        required: false,
      },
    },
  },
};

module.exports = {
  getAction,
  arrayToObject,
  extractAccessForAttributeGrps,
  mergeMetaDataBasedOnUamAccess,
};
