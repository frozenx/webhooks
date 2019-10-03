const createSiteMockData = {
  siteAttributes: [
    {
      attributeGroup: 'site',
      attributes: [
        { name: 'siteCodeId', values: [{ value: '12314', lang: 'en' }] },
        { name: 'siteName', values: [{ value: 'TTC', lang: 'en' }] }
      ],
    },
  ],
};

const createPaymentMockData = {
  tncAttributes: [
    {
      attributeGroup: 'Payment Terms',
      attributes: [
        { name: 'status', values: [{ value: '123', lang: 'en' }] },
        { name: 'paymentTermsName', values: [{ value: 'NN', lang: 'en' }] }
      ],
    },
  ],
};

const createSiteExistingData = [{ uuid: undefined, siteCodeId: '12332', siteName: 'ITC' }];

const createPaymentExistingData = [{ uuid: undefined, paymentTermsName: '345345' }];


export default {
  createSiteMockData,
  createPaymentMockData,
  createSiteExistingData,
  createPaymentExistingData,
};
