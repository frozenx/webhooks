const config = require('../config').get(process.env.APP_ENV);
const metaDataConfig = require('../config').get(process.env.APP_ENV);
const HttpClient = require('../clients/httpClient');
const supplierData = require('./supplierData');
const ErrorBuilder = require('../lib/error-handlers/ErrorBuilder');
const constants = require('../constants');

class SupplierService {
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.httpClient = new HttpClient(this.accessToken);
    this.readSupplier = this.readSupplier.bind(this);
    this.getRequestBody = this.getRequestBody.bind(this);
  }

  /* eslint-disable */
  getRequestBody(payload, isFullText) {
    let customBody;
    if (payload.partnerName) {
      let partnerName = isFullText ? 'name.raw' : 'name';
      switch (isFullText) {
        case true:
          customBody = {
            query: {
              bool: {
                must: [{
                    match: {
                      [partnerName]: payload.partnerName
                    }
                  },
                  {
                    match: {
                      [constants.ENTITY_TYPE]: constants.entityType.partner,
                    },
                  },
                ],
              },
            },
          };
          break;
        case false:
          customBody = {
            query: {
              bool: {
                must: [{
                  match: {
                    [partnerName]: payload.partnerName
                  }
                }],
              },
            },
          };
          break;
        default:
          return;
      }
    } else {
      customBody = {
        query: {
          bool: {
            must: [{
              match: {
                number: payload.supplierNumber
              }
            }],
          },
        },
      };
    }
    return customBody;
  }
  /*elslint-enable */

  async readSupplier(params, isFullText) {
    try {
      const {
        searchQueryParamKeys: {
          LIMIT,
          OFFSET
        },
      } = constants;
      const {
        limit,
        offset
      } = params;
      const url = `${
        config.searchSupplier.baseUrl
        }?${LIMIT}=${limit}&${OFFSET}=${offset}`;
      const getRequestBody = this.getRequestBody(params, isFullText);
      const response = await this.httpClient.post(url, getRequestBody);
      return response;
    } catch (error) {
      if (error.code === 404) {
        return [];
      }
      const serviceError = new ErrorBuilder('service', error);
      throw serviceError;
    }
  }

  async readAndCreate(payload, isFullText) {
    try {
      const url = config.searchSupplier.baseUrl;
      const getRequestBody = this.getRequestBody(payload, isFullText);
      const response = await this.httpClient.post(url, getRequestBody);
      return response;
    } catch (error) {
      try {
        if (error.code === 404) {
          const response = await this.createSupplier(payload);
          return response;
        }
        const serviceError = new ErrorBuilder('service', error);
        throw serviceError;
      } catch (error) {
        const serviceError = new ErrorBuilder('service', error);
        throw serviceError;
      }
    }
  }

  getAdditionalHeader() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
      'content-type': 'application/json',
    };
  }

  getAdditionalHeadersForQueryAPIS() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
      Accept: 'application/json',
    };
  }

  async createSupplier(body) {
    let supplierBody = body;
    supplierBody['partnerNumber'] = ''
    const data = supplierData;
    const postData = Object.keys(supplierBody).map(attribute => {
      const supplierAttributes = {};
      supplierAttributes.name = attribute === 'partnerName' ? 'partnerName' : attribute;
      supplierAttributes.values = [{
        lang: 'en',
        value: supplierBody[attribute]
      }];
      return supplierAttributes;
    });
    const partnerId = Math.floor(Math.random() * Math.pow(10, 15));
    data.partnerIdentifiers[0].partnerId = partnerId;
    data.partnerAttributes[0].attributes = postData;
    try {
      const url = metaDataConfig.tps.baseUrl + metaDataConfig.tps.saveHeader;
      const customHeaders = this.getAdditionalHeader();
      const response = await this.httpClient.post(url, data, customHeaders);
      return response;
    } catch (error) {
      const serviceError = new ErrorBuilder('service', error);
      throw serviceError;
    }
  }

  async getSupplierDetails({
    uuid
  }) {
    try {
      const url =
        config.tps.baseUrl +
        config.tps.getSupplierDetails.replace('{uuid}', uuid);
      const customHeaders = this.getAdditionalHeadersForQueryAPIS();
      const response = await this.httpClient.get(url, customHeaders);
      return response;
    } catch (error) {
      const serviceError = new ErrorBuilder('service', error);
      throw serviceError;
    }
  }

  async getSupplierSites({
    uuid
  }) {
    try {
      const url = config.tps.baseUrl + config.tps.getSupplierSites;
      const customHeaders = this.getAdditionalHeadersForQueryAPIS();
      const response = await this.httpClient.get(url, customHeaders, {
        'siteidentifiers.partneruuid': uuid,
      });
      return response;
    } catch (error) {
      if (error.code) {
        if (error.code === 404) {
          return {
            content: []
          };
        }
        const serviceError = new ErrorBuilder('service', error);
        throw serviceError;
      }
      const serviceError = new ErrorBuilder('service', error);
      throw serviceError;
    }
  }

  async getSupplierPayments({
    uuid
  }) {
    try {
      const url = config.tps.baseUrl + config.tps.getSupplierPayments;
      const customHeaders = this.getAdditionalHeadersForQueryAPIS(
        this.accessToken,
      );
      const response = await this.httpClient.get(url, customHeaders, {
        'tncidentifiers.siteuuid': uuid,
      });
      return response;
    } catch (error) {
      if (error.code) {
        if (error.code === 404) {
          return {
            content: []
          };
        }
        const serviceError = new ErrorBuilder('service', error);
        throw serviceError;
      }
      const serviceError = new ErrorBuilder('service', error);
      throw serviceError;
    }
  }

  async getPartnerDetails(body) {
    try {
      const {
        partner,
        site,
        tnc
      } = constants.entityType;
      let response;
      let url;
      let customHeaders;
      let partnerUuid;
      switch (body.entityType) {
        case partner:
          response = await this.getSupplierDetails(body);
          break;
        case site: {
          url = `${config.tps.baseUrl}${config.tps.getSupplierSites}/${
            body.uuid
            }`;
          customHeaders = this.getAdditionalHeadersForQueryAPIS();
          const siteResponse = await this.httpClient.get(url, customHeaders);
          partnerUuid = siteResponse.partnerRef.uuid;
          response = await this.getSupplierDetails({
            uuid: partnerUuid
          });
          break;
        }
        case tnc: {
          const tncUrl = `${config.tps.baseUrl}${
            config.tps.getSupplierPayments
            }/${body.uuid}`;
          customHeaders = this.getAdditionalHeadersForQueryAPIS();
          const tncResponse = await this.httpClient.get(tncUrl, customHeaders);
          const siteUrl = `${config.tps.baseUrl}${
            config.tps.getSupplierSites
            }/${tncResponse.siteRef.uuid}`;
          const siteResponse = await this.httpClient.get(
            siteUrl,
            customHeaders,
          );
          partnerUuid = siteResponse.partnerRef.uuid;
          response = await this.getSupplierDetails({
            uuid: partnerUuid
          });
          break;
        }
        default:
          break;
      }
      return response;
    } catch (error) {
      const serviceError = new ErrorBuilder('service', error);
      throw serviceError;
    }
  }
}

module.exports = SupplierService;