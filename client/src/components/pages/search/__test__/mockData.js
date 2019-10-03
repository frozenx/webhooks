const mockUamContext = {
  resources: {
    api: [{ '/supplier': ['view'] }, { '/supplier-site': ['view'] }],
    page: {
      '/': {
        tabs: [{ managesupplier: ['view'] }, { createsupplier: ['view'] }],
      },
      supplierlist: { button: [{ select: ['enable'] }] },
    },
  },
};

const mockUamContextWithEmptyAccessForRootPage = {
  resources: {
    page: {
      '/': null,
    },
  },
};

const mockUamContextWithFailureDataForRootPage = {
  resources: {
    page: {
      '/': {
        tabs: {},
      },
    },
  },
};

export default {
  mockUamContext,
  mockUamContextWithEmptyAccessForRootPage,
  mockUamContextWithFailureDataForRootPage,
};
