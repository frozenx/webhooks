const mockActualPathName = 'supplierlist';

const mockContext = {
  page: {
    supplierlist: {},
  },
};

const mockRootPathName = '/';

const mockExpectedPageAccessList = {
  supplierlist: {},
};

const createSiteMockData = {
  siteAttributes: [
    {
      attributeGroup: 'site',
      attributes: [
        { name: 'siteCodeId', values: [{ value: '12314', lang: 'en' }] },
        { name: 'siteName', values: [{ value: 'TTC', lang: 'en' }] },
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
        { name: 'paymentTermsName', values: [{ value: 'NN', lang: 'en' }] },
      ],
    },
  ],
};

const rowDataForCreateSite = [
  { uuid: undefined, siteCodeId: '12314', siteName: 'TTC' },
];

const rowDataForCreatePayment = [
  { uuid: undefined, paymentTermsName: 'NN' },
];

const mockExistingData = [{ uuid: 1, name: 'test 1', data: 'yes' }, { uuid: 2, name: 'test 1' }];

const mockUpdatedData = [{ uuid: 1, name: 'sample 1', data: 'no' }, { uuid: 3, name: 'sample 3', data: 'no' }];

const mockExpectedMergedData = [
  {
    uuid: 1,
    name: 'sample 1',
    data: 'no',
  },
  {
    uuid: 2,
    name: 'test 1',
  },
  {
    uuid: 3,
    name: 'sample 3',
    data: 'no',
  },
];

export default {
  mockActualPathName,
  mockContext,
  mockRootPathName,
  mockExpectedPageAccessList,
  createSiteMockData,
  createPaymentMockData,
  rowDataForCreateSite,
  rowDataForCreatePayment,
  mockExistingData,
  mockUpdatedData,
  mockExpectedMergedData
};
