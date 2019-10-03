const uamMockData = ['/supplier-header', '/supplier', '/header'];
const expectedUamMockData = ['/supplier-header', '/supplier', '/header'];

const uamMockResourceData = {
  resources: ['/supplier-header', '/supplier', '/header']
};

const uamModelMockData = {
  claims: [
    {
      resources: ['api|/supplier'],
      actions: ['view'],
      effect: 'Allow',
    },
    {
      resources: ['api|/supplier-site'],
      actions: ['view'],
      effect: 'Allow',
    },
    {
      resources: ['page|supplierlist|button|select'],
      actions: ['enable'],
      effect: 'Allow',
    },
    {
      resources: ['page|/|tabs|managesupplier'],
      actions: ['view'],
      effect: 'Allow',
    },
    {
      resources: ['page|/|tabs|createsupplier'],
      actions: ['view'],
      effect: 'Allow',
    },
  ],
};

const expectedUamModelMockData = {
  currentIndex: 4,
  resources: {
    api: [{ '/supplier': ['view'] }, { '/supplier-site': ['view'] }],
    page: {
      '/': {
        tabs: [{ managesupplier: ['view'] }, { createsupplier: ['view'] }]
      },
      supplierlist: { button: [{ select: ['enable'] }] }
    },
  },
};

const uamFailMockDataExtractResources = {};

const uamFailMockDataResolveAccessList = {
  claims: [
    {
      resources: [undefined],
      actions: [''],
      effect: 'Allow',
    },
    {
      resources: [undefined],
      actions: [''],
      effect: 'Allow',
    },
  ],
};

const uamDefaultObjectMockData = {
  claims: []
};

module.exports = {
  uamMockData,
  expectedUamMockData,
  uamMockResourceData,
  uamModelMockData,
  expectedUamModelMockData,
  uamFailMockDataExtractResources,
  uamFailMockDataResolveAccessList,
  uamDefaultObjectMockData,
};
