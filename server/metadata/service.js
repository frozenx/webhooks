const HttpClient = require('../clients/httpClient');
const config = require('../config').get(process.env.APP_ENV);
const constants = require('./constants');
const logger = require('../lib/logger')(module);
const { headerData, inValidAttrGroups } = require('./metaDataConfig');
const ErrorBuilder = require('../lib/error-handlers/ErrorBuilder');


class MetaDataService {
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.httpClient = new HttpClient(this.accessToken);
    // this.getSupplierHeader = this.getSupplierHeader.bind(this);
  }

  getAdditionalHeaders(accessToken) {
    return {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json'
    }
  }

  getAdditionalHeadersForQueryAPIS(accessToken) {
    return {
      Authorization: `Bearer ${accessToken}`,
      'Accept': 'application/json',
    }
  }

  getAttributes(body) {
    return Object.keys(body).map(attrGrp => {
      if (!inValidAttrGroups.includes(attrGrp)) {
        let tempObj = {}
        tempObj['attributeGroup'] = attrGrp
        let attributes = [];
        Object.keys(body[attrGrp]).map(attr => {
          const value = body[attrGrp][attr];

          let attrObj = {}
          attrObj['name'] = attr
          attrObj['values'] = [{ 'lang': 'en', value }] // need to modify the language from languagepack
          attributes.push(attrObj)
          tempObj['attributes'] = attributes
        });
        const autoGeneratedFields = constants.AUTOGENERATEDFIELDS[attrGrp] || [];
        autoGeneratedFields.forEach((autoGeneratedField) => {
          if (!body[attrGrp][autoGeneratedField]) {
            tempObj['attributes'].push({ name: autoGeneratedField, values: [{ 'lang': 'en', value: '' }] })
          }
        });
        return tempObj
      }
    }).filter(notDefined => notDefined)
  }

  getIdentifiers() {
    let Identifiers = {}
    Identifiers['id'] = Math.floor(Math.random() * Math.pow(10, 15))
    Identifiers['number'] = Math.floor(Math.random() * Math.pow(10, 10))
    return Identifiers
  }

  async getSupplierHeader() { // eslint-disable-line class-methods-use-this
    try {
      const baseConfig = config.tps;
      const url = `${baseConfig.baseUrl}${baseConfig.metadataHeader}`;
      const response = await this.httpClient.get(url);
      return response;
    } catch (error) {
      const serviceError = new ErrorBuilder('service', error);
      throw serviceError;
    }
  }

  async getSupplierSite() {
    try {
      const baseConfig = config.tps;
      const url = `${baseConfig.baseUrl}${baseConfig.metadataSite}`;
      const siteMetadata = await this.httpClient.get(url);
      return siteMetadata;
    } catch (error) {
      const serviceError = new ErrorBuilder('service', error);
      throw serviceError;
    }
  }

  async getSupplierPayments() {
    try {
      const baseConfig = config.tps;
      const url = `${baseConfig.baseUrl}${baseConfig.metaDataTncs}`;
      const response = await this.httpClient.get(url);
      return response;
    } catch (error) {
      const serviceError = new ErrorBuilder('service', error);
      throw serviceError;
    }
  }

  async createHeader(body) {
    const data = headerData
    data['uuid'] = body.uuid;
    data['version'] = body.version;
    let postData = this.getAttributes(body);
    let Identifiers = this.getIdentifiers();
    data.partnerIdentifiers[0]['partnerId'] = Identifiers.id
    data.partnerIdentifiers[0]['partnerNumber'] = Identifiers.number
    data.partnerAttributes = postData
    try {
      const url = config.tps.baseUrl + config.tps.saveHeader;
      const customHeaders = this.getAdditionalHeaders(this.accessToken);
      const response = await this.httpClient.put(url, data, customHeaders);
      return response;
    } catch (error) {
      const serviceError = new ErrorBuilder('service', error);
      throw serviceError;
    }
  }

  async createSite(body) {
    let siteData = {
      "partnerRef": {
        uuid: body.parentUuid
      },
      "siteAttributes": [],
      "siteIdentifiers": [
        {
          "countryCode": "uk",
          "source": "fusion",
          "type": "GFR"
        }
      ],
      "siteLanguage": "en",
    }
    const data = siteData
    data.partnerRef['uuid'] = body.parentUuid;
    body.uuid ? data['uuid'] = body.uuid : null;
    body.version ? data['version'] = body.version : null;
    let Identifiers = this.getIdentifiers();
    data.siteIdentifiers[0]['siteId'] = Identifiers.id;
    data.siteIdentifiers[0]['siteNumber'] = Identifiers.number;
    let postData = this.getAttributes(body);
    data.siteAttributes = postData;

    try {
      const url = config.tps.baseUrl + config.tps.saveSite;
      const customHeaders = this.getAdditionalHeaders(this.accessToken);
      const response = await this.httpClient.put(url, data, customHeaders);
      return response;
    } catch (error) {
      const serviceError = new ErrorBuilder('service', error);
      throw serviceError;
    }
  }

  async createPayment(body) {
    const paymentData = {
      "siteRef": {},
      "tncAttributes": [],
      "tncIdentifiers": [
        {
          "countryCode": "uk",
          "source": "fusion",
          "type": "GFR"
        }
      ],
    }
    const data = paymentData
    data.siteRef['uuid'] = body.parentUuid;
    body.uuid ? data['uuid'] = body.uuid : null
    body.version ? data['version'] = body.version : null
    let postData = this.getAttributes(body);
    let Identifiers = this.getIdentifiers();
    data.tncIdentifiers[0]['tncId'] = Identifiers.id
    data.tncIdentifiers[0]['tncNumber'] = Identifiers.number
    data.tncAttributes = postData;
    try {
      const url = config.tps.baseUrl + config.tps.savePayment;
      const customHeaders = this.getAdditionalHeaders(this.accessToken);
      const response = await this.httpClient.put(url, data, customHeaders);
      return response;
    } catch (error) {
      const serviceError = new ErrorBuilder('service', error);
      throw serviceError;
    }
  }

  async siteDetails(params) {
    try {
      const siteUrl = `${config.tps.baseUrl}${config.tps.site}/${params.uuid}`;
      const response = await this.httpClient.get(siteUrl,
        this.getAdditionalHeadersForQueryAPIS(this.accessToken));
      return response;
    } catch (error) {
      const serviceError = new ErrorBuilder('service', error);
      throw serviceError;
    }
  }

  async paymentDetails(params) {
    try {
      const paymentUrl = `${config.tps.baseUrl}${config.tps.payment}/${params.uuid}`;
      const response = await this.httpClient.get(paymentUrl,
        this.getAdditionalHeadersForQueryAPIS(this.accessToken));
      return response;
    } catch (error) {
      const serviceError = new ErrorBuilder('service', error);
      throw serviceError;
    }
  }

  async searchMetaData() {
    try {
      const partnerMetaData = await this.getSupplierHeader();
      const siteMetaData = await this.getSupplierSite();
      const tncMetaData = await this.getSupplierPayments();
      const searchMetaData = {
        partnerMetaData,
        siteMetaData,
        tncMetaData,
      };
      return searchMetaData;
    } catch (error) {
      const serviceError = new ErrorBuilder('service', error);
      throw serviceError;
    }
  }
}

module.exports = MetaDataService;
