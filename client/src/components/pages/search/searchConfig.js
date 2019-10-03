const comboKey = 'comboKey';

const groupedKeys = [
  ['partnerTaxRegime', 'siteInvoiceCurrency'],
  ['productCategory', 'subGroup'],
];

const keyDelimiter = ' and ';

const orderOfFields = [
  'taxOrganisationType',
  'partnerStatus',
  'partnerTaxRegime',
  'siteInvoiceCurrency',
  'productCategory',
  'subGroup',
];

const searchResultsLimit = 10;

const searchQueryParamKeys = {
  PARTNER_NAME: 'partnerName',
  SUPPLIER_NUMBER: 'supplierNumber',
  LIMIT: 'limit',
  OFFSET: 'offset',
};

export default {
  comboKey,
  groupedKeys,
  keyDelimiter,
  orderOfFields,
  searchResultsLimit,
  searchQueryParamKeys,
};
