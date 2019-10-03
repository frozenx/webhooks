const headerData = {
  partnerAttributes: [],
  partnerIdentifiers: [
    {
      source: 'fusion',
    },
  ],
  partnerLanguage: 'en',
};

const siteData = {
  partnerRef: {},
  siteAttributes: [],
  siteIdentifiers: [
    {
      countryCode: 'uk',
      source: 'fusion',
      type: 'GFR',
    },
  ],
  siteLanguage: 'en',
};

const paymentData = {
  siteRef: {},
  tncAttributes: [],
  tncIdentifiers: [
    {
      countryCode: 'uk',
      source: 'fusion',
      type: 'GFR',
    },
  ],
};

const searchMetaDataConfig = [
  'taxOrganisationType',
  'partnerStatus',
  'partnerTaxRegime',
  'siteInvoiceCurrency',
  'productCategory',
  'subGroup',
];

const inValidAttrGroups = [
  'uuid',
  'version',
  'status',
  'siteUuid',
  'siteVersion',
  'paymentUuid',
  'paymentVersion',
  'parentUuid',
];

module.exports = {
  headerData,
  siteData,
  paymentData,
  inValidAttrGroups,
  searchMetaDataConfig,
};


let labels = {
  partnerName: {
    displayName: 'Trading Partner Name',
  }
}
