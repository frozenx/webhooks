const rootPath = '/tradingpartner';
const toolkitPath = 'https://toolkit.tesco.com';

module.exports = {
  rootPath,
  redirect: {
    pageNotFound: `${toolkitPath}/404`,
    unauthorized: `${toolkitPath}/sign-in/#/403`,
    serviceUnavailable: `${toolkitPath}/503`,
    serverError: `${toolkitPath}/500`,
    inactive: `${toolkitPath}/registration/#/set-details`,
    deactivated: `${toolkitPath}/sign-in/#/451`,
    b2b: '/toolkit/clubcard/',
    externalUrl: `${toolkitPath}/sign-in/`,
  },

  endPoints: {
    searchAndCreate: `${rootPath}/api/searchAndCreate`,
    supplier: `${rootPath}/api/supplier`,
    supplierHeaderEndPoint: `${rootPath}/api/supplier-header`,
    supplierSiteEndPoint: `${rootPath}/api/supplier-site`,
    paymentEndPoint: `${rootPath}/api/supplier-payments`,
    profileEndPoint: `${rootPath}/api/profile`,
    supplierPage: `${rootPath}/supplier`,
    logoutEndpoint: '/logout',
    uamEndPoint: `${rootPath}/api/uam`,
    siteGetDetails: `${rootPath}/api/site-details`,
    paymentGetDetails: `${rootPath}/api/payment-details`,
    getSupplierDetails: `${rootPath}/api/supplier-details`,
    getSiteDetails: `${rootPath}/api/supplier-details/sites`,
    getPaymentDetails: `${rootPath}/api/supplier-details/payments`,
    searchMetaData: `${rootPath}/api/search-meta-data`,
    getPartnerDetails: `${rootPath}/api/partner-details-search`,
    addressEndPoint: `${rootPath}/api/address`,
    saveAddress: editMode => editMode ? `${rootPath}/api/address?operation=patch` : `${rootPath}/api/address`,
    saveContact:editMode=>editMode? `${rootPath}/api/contact?operation=patch` : `${rootPath}/api/contact`,
    getAddressesPerPage: (pageNumber, partnerUuid) => `${rootPath}/api/adresses?partnerUuid=${partnerUuid}&pageNumber=${pageNumber}`,
    getContactsPerPage: (pageNumber, partnerUuid) => `${rootPath}/api/contacts?partnerUuid=${partnerUuid}&pageNumber=${pageNumber}`

  },

  regex: {
    nameRegex: /^[A-Za-z0-9\s]+$/,
    numberRegex: /^[0-9]*$/,
  },

  collectionRecords: ['address', 'contact'],
  addressKey: 'address',
  pageSize: 10,

  siteAddressList: [
    { id: 'primaryAddress', label: 'Primary address'},
    { id: 'orderingAddress', label: 'Ordering address'},
    { id: 'remmitanceAddress', label: 'Remmitance address'},
    { id: 'rfqBiddingAddress', label: 'RFQ bidding address'},
    { id: 'shippingAddress', label: 'Shipping address'},
  ],

  siteContactList: [
    { id: 'billToContact', label: 'BillTo Contact'},
    { id: 'shipToContact', label: 'ShipTo Contact'},
    { id: 'correspondenceContact', label: 'Correspondence Contact'},
    { id: 'dunningContact', label: 'Dunning Contact'},
    { id: 'InvoicesContact', label: 'Invoices Contact'},
  ],

  collectionKeys: {
    address: 'Back to Address book',
    contact: 'Back to Contact book',
    default: 'Back to Partner overview'
  },

  routerPath: {
    successfulCreationOfSupplier: `${rootPath}/supplier`,
  },

  entityTypes: {
    partner: 'partner',
    site: 'site',
    tnc: 'tnc',
  },
  forceCapitalizationAttributes: {
    partnerName: true,
  },
};
