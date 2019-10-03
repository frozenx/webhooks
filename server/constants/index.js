const DATA_NOT_AVAILABLE = 'Data not available';
const SERVICE_ERROR = 'Service is down try later';
const INVALID_USER = 'Invalid User';
const UNEXPECTED_ERROR = 'Unexpected Error';
const UNAUTHORIZED = 'Unauthorized';
const CASE = 'Case';
const partnerName = 'partnerName';
const searchKeys = ['partneruuid', 'partnerName', 'partnerNumber'];
const partnerIdentifier = 'partnerIdentifier';
const partner = 'partner';
const searchQueryParamKeys = {
  LIMIT: 'limit',
  OFFSET: 'offset'
};

const entityType = {
  partner: 'partner',
  site: 'site',
  tnc: 'tnc',
};

const ENTITY_TYPE = 'entityType';
const staticAttributes = {
  vatRegNumber: true,
  companyRegNumber: true,
  partnerNumber: true,
  partnerName: true

}

const uamAccessKeyWords = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
};

const manifestKeys = {
  Hidden: 'Hidden',
  ReadOnly: 'Read Only',
  Editable: 'Editable',
};


const COMPANY_REG_NUMBER = 'companyRegNumber';

module.exports = {
  DATA_NOT_AVAILABLE,
  SERVICE_ERROR,
  INVALID_USER,
  UNEXPECTED_ERROR,
  UNAUTHORIZED,
  CASE,
  partnerName,
  searchKeys,
  partner,
  partnerIdentifier,
  searchQueryParamKeys,
  entityType,
  ENTITY_TYPE,
  uamAccessKeyWords,
  staticAttributes,
  manifestKeys,
  COMPANY_REG_NUMBER,
};
