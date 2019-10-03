const config = {
  default: {
    logLevel: 'info',
    address: {
      baseUrl: 'https://api-ppe.tesco.com/address',
      getSaveAddress: '/v5/addresses',
      getAddress: '/v5/addresses/{addressId}'
    },

    identity: {
      "baseUrl": "https://api-ppe.tesco.com/identity",
      "getAccessToken": "/v3/api/auth/oauth/v2/token",
      "validateToken": "/v3/api/auth/validateToken?access_token="
    },
    profile: {
      baseUrl: 'https://api-ppe.tesco.com/profile',
      getName: '/v3/pii/my/name',
    },
    tpsMetaData: {
      baseUrl: 'https://tps-meta-data-ppe.api.tesco.com',
      getData: '/data',
    },
    supplier: {
      baseUrl: 'http://172.17.0.1:3001/rest/v1/api/supplier',
      getData: '/data',
    },
    header: {
      baseUrl: 'https://header-ppe.api.tesco.com',
      getData: '/data',
    },
    search: {
      baseUrl: 'http://localhost:3001/rest/v1/api/search',
    },
    uamAccessList: {
      baseUrl: 'https://uam-proxy.dev.tnedevs.com',
      policyByDescEndpoint: '/uam/api/v1/uam/resolvedAccessList',
      headerServiceName: 'uam-admin-api-dev.uam-dev.svc.cluster.local',
      headerAuth: 'off',
      domain: 'TPS',
    },
    uamPolicyDescriptions: {
      defaultPolicyDes: 'policy-principal-all-filter-role-ceo',
    },
    payment: {
      baseUrl: 'http: //localhost:3001/rest/v1/api/payments',
    },
    tps: {
      baseUrl: 'https://api-dev.tesco.com/tradingpartner/',
      metadataHeader: 'v4/slm/partners/metadata/',
      metadataSite: 'v4/slm/partners/sites/metadata/',
      metaDataTncs: 'v4/slm/partners/sites/tncs/metadata/',
      saveHeader: 'v4/slm/partners',
      saveSite: 'v4/slm/partners/sites',
      savePayment: 'v4/slm/partners/sites/tncs',
      getSupplierDetails: 'v4/partners/{uuid}',
      getSupplierSites: '/v4/partners/sites',
      getSupplierPayments: '/v4/partners/sites/tncs',
      address: 'v4/slm/address-book',
      getPartnerAddresses: 'v4/slm/partners/{id}/address-book?pageNumber={pageNumber}&pageSize={pageSize}',
      getPartnerFullAddresses: 'v4/slm/partners/{id}/address-book',
      contact: 'v4/slm/contact-book',
      getPartnerContacts: 'v4/slm/partners/{id}/contact-book?pageNumber={pageNumber}&pageSize={pageSize}',
      getPartnerFullContacts: 'v4/slm/partners/{id}/contact-book',
    },
    searchSupplier: {
      baseUrl: 'https://api-dev.tesco.com/tradingpartner/v4/partners/search',
    },
    companyHouse: {
      baseUrl: 'https://api.companieshouse.gov.uk/',
      getCompanyAddress: 'company/{companyHouseNumber}',
    },
  },
  dev: {
    logLevel: 'info',
    address: {
      baseUrl: 'https://api-ppe.tesco.com/address',
      getSaveAddress: '/v5/addresses',
      getAddress: '/v5/addresses/{addressId}',
    },

    identity: {
      "baseUrl": "https://api-ppe.tesco.com/identity",
      "getAccessToken": "/v3/api/auth/oauth/v2/token",
      "validateToken": "/v3/api/auth/validateToken?access_token="
    },
    profile: {
      baseUrl: 'https://api-ppe.tesco.com/profile',
      getName: '/v3/pii/my/name',
    },
    tpsMetaData: {
      baseUrl: 'https://tps-meta-data-ppe.api.tesco.com',
      getData: '/data',
    },
    supplier: {
      baseUrl: 'http://172.17.0.1:3001/rest/v1/api/supplier',
      getData: '/data',
    },
    header: {
      baseUrl: 'https://header-ppe.api.tesco.com',
      getData: '/data',
    },
    search: {
      baseUrl: 'http://localhost:3001/rest/v1/api/search',
    },
    uamAccessList: {
      baseUrl: 'https://uam-proxy.dev.tnedevs.com',
      policyByDescEndpoint: '/uam/api/v1/uam/resolvedAccessList',
      headerServiceName: 'uam-admin-api-dev.uam-dev.svc.cluster.local',
      headerAuth: 'off',
      domain: 'TPS',
    },
    uamPolicyDescriptions: {
      defaultPolicyDes: 'policy-principal-all-filter-role-ceo',
    },
    payment: {
      baseUrl: 'http://localhost:3001/rest/v1/api/payments',
    },
    tps: {
      baseUrl: 'https://api-dev.tesco.com/tradingpartner/',
      metadataHeader: 'v4/slm/partners/metadata/',
      metadataSite: 'v4/slm/partners/sites/metadata/',
      metaDataTncs: 'v4/slm/partners/sites/tncs/metadata/',
      saveHeader: 'v4/slm/partners',
      saveSite: 'v4/slm/partners/sites',
      savePayment: 'v4/slm/partners/sites/tncs',
      headerServiceName: 'tps-partner-api-dev.tps-dev.svc.cluster.local',
      getSupplierDetails: 'v4/partners/{uuid}',
      getSupplierSites: '/v4/partners/sites',
      getSupplierPayments: '/v4/partners/sites/tncs',
      address: 'v4/slm/address-book',
      getPartnerAddresses: 'v4/slm/partners/{id}/address-book?pageNumber={pageNumber}&pageSize={pageSize}',
      getPartnerFullAddresses: 'v4/slm/partners/{id}/address-book',
      contact: 'v4/slm/contact-book',
      getPartnerContacts: 'v4/slm/partners/{id}/contact-book?pageNumber={pageNumber}&pageSize={pageSize}',
      getPartnerFullContacts: 'v4/slm/partners/{id}/contact-book',

    },
    searchSupplier: {
      baseUrl: 'https://api-dev.tesco.com/tradingpartner/v4/partners/search',
    },
    companyHouse: {
      baseUrl: 'https://api.companieshouse.gov.uk/',
      getCompanyAddress: 'company/{companyHouseNumber}'
    },
  },
  ppe: {
    logLevel: 'info',
    address: {
      baseUrl: 'https://api-ppe.tesco.com/address',
      getSaveAddress: '/v5/addresses',
      getAddress: '/v5/addresses/{addressId}'
    },

    identity: {
      "baseUrl": "https://api-ppe.tesco.com/identity",
      "getAccessToken": "/v3/api/auth/oauth/v2/token",
      "validateToken": "/v3/api/auth/validateToken?access_token="
    },
    profile: {
      baseUrl: 'https://api-ppe.tesco.com/profile',
      getName: '/v3/pii/my/name',
    },
    tpsMetaData: {
      baseUrl: 'https://tps-meta-data-ppe.api.tesco.com',
      getData: '/data',
    },
    supplier: {
      baseUrl: 'http://172.17.0.1:3001/rest/v1/api/supplier',
      getData: '/data',
    },
    header: {
      baseUrl: 'https://header-ppe.api.tesco.com',
      getData: '/data',
    },
    search: {
      baseUrl: 'http://localhost:3001/rest/v1/api/search',
    },
    uamAccessList: {
      baseUrl: 'https://uam-proxy.ppe.tnedevs.com',
      policyByDescEndpoint: '/uam/api/v1/uam/resolvedAccessList',
      headerServiceName: 'uam-admin-api-ppe.uam-ppe.svc.cluster.local',
      headerAuth: 'off',
      domain: 'TPS',
    },
    uamPolicyDescriptions: {
      defaultPolicyDes: 'policy-principal-all-filter-role-ceo',
    },
    payment: {
      baseUrl: 'http: //localhost:3001/rest/v1/api/payments',
    },
    tps: {
      baseUrl: 'https://api-ppe.tesco.com/tradingpartner/',
      metadataHeader: 'v4/slm/partners/metadata/',
      metadataSite: 'v4/slm/partners/sites/metadata/',
      metaDataTncs: 'v4/slm/partners/sites/tncs/metadata/',
      saveHeader: 'v4/slm/partners',
      saveSite: 'v4/slm/partners/sites',
      savePayment: 'v4/slm/partners/sites/tncs',
      getSupplierDetails: 'v4/partners/{uuid}',
      getSupplierSites: '/v4/partners/sites',
      getSupplierPayments: '/v4/partners/sites/tncs',
      address: 'v4/slm/address-book',
      getPartnerAddresses: 'v4/slm/partners/{id}/address-book?pageNumber={pageNumber}&pageSize={pageSize}',
      getPartnerFullAddresses: 'v4/slm/partners/{id}/address-book',
      contact: 'v4/slm/contact-book',
      getPartnerContacts: 'v4/slm/partners/{id}/contact-book?pageNumber={pageNumber}&pageSize={pageSize}',
      getPartnerFullContacts: 'v4/slm/partners/{id}/contact-book',
    },
    searchSupplier: {
      baseUrl: 'https://api-ppe.tesco.com/tradingpartner/v4/partners/search'
    },
    companyHouse: {
      baseUrl: 'https://api.companieshouse.gov.uk/',
      getCompanyAddress: 'company/{companyHouseNumber}'
    },
  },
  prod: {
    logLevel: 'info',
    address: {
      baseUrl: 'https://api-ppe.tesco.com/address',
      getSaveAddress: '/v5/addresses',
      getAddress: '/v5/addresses/{addressId}'
    },

    identity: {
      "baseUrl": "https://api-ppe.tesco.com/identity",
      "getAccessToken": "/v3/api/auth/oauth/v2/token",
      "validateToken": "/v3/api/auth/validateToken?access_token="
    },
    profile: {
      baseUrl: 'https://api-ppe.tesco.com/profile',
      getName: '/v3/pii/my/name',
    },
    tpsMetaData: {
      baseUrl: 'https://tps-meta-data-ppe.api.tesco.com',
      getData: '/data',
    },
    supplier: {
      baseUrl: 'http://172.17.0.1:3001/rest/v1/api/supplier',
      getData: '/data',
    },
    header: {
      baseUrl: 'https://header-ppe.api.tesco.com',
      getData: '/data',
    },
    search: {
      baseUrl: 'http://localhost:3001/rest/v1/api/search',
    },
    uamAccessList: {
      baseUrl: 'https://uam-proxy.dev.tnedevs.com',
      policyByDescEndpoint: '/uam/api/v1/uam/admin/byDescription?domain=EP&&description=',
      headerServiceName: 'uam-admin-api-dev.uam-dev.svc.cluster.local',
      headerAuth: 'off',
    },
    uamPolicyDescriptions: {
      defaultPolicyDes: 'policy-principal-all-filter-role-ceo',
    },
    payment: {
      baseUrl: 'http: //localhost:3001/rest/v1/api/payments',
    },
    tps: {
      baseUrl: 'https://tps.ppe.tnedevs.com/',
      baseUrlCreateSupplier: 'https://tps.ppe.tnedevs.com/',
      metadataHeader: 'v4/slm/partners/metadata/',
      metadataSite: 'v4/slm/partners/sites/metadata/',
      metaDataTncs: 'v4/slm/partners/sites/tncs/metadata/',
      saveHeader: 'v4/slm/partners',
      saveSite: 'v4/slm/partners/sites',
      savePayment: 'v4/slm/partners/sites/tncs',
      getSupplierDetails: 'v4/partners/{uuid}',
      getSupplierSites: '/v4/partners/sites',
      getSupplierPayments: '/v4/partners/sites/tncs',
      address: 'v4/slm/address-book',
      getPartnerAddresses: 'v4/slm/partners/{id}/address-book?pageNumber={pageNumber}&pageSize={pageSize}',
      getPartnerFullAddresses: 'v4/slm/partners/{id}/address-book',
      contact: 'v4/slm/contact-book',
      getPartnerContacts: 'v4/slm/partners/{id}/contact-book?pageNumber={pageNumber}&pageSize={pageSize}',
      getPartnerFullContacts: 'v4/slm/partners/{id}/contact-book',
    },
    searchSupplier: {
      baseUrl: 'https://tps.ppe.tnedevs.com/v4/partners/search'
    },
    companyHouse: {
      baseUrl: 'https://api.companieshouse.gov.uk/',
      getCompanyAddress: 'company/{companyHouseNumber}'
    },
  },
};
exports.get = function get(env) {
  return config[env] || config.default;
};