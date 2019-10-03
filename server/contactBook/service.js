const config = require('../config').get(process.env.APP_ENV);
const HttpClient = require('../clients/httpClient');
const ErrorBuilder = require('../lib/error-handlers/ErrorBuilder');
const contactConfig = require('./contact-config');


class ContactService {
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.httpClient = new HttpClient(this.accessToken);
  }



  get customHeaders() {
    return {
      "Authorization": `Bearer ${this.accessToken}`,
      "Accept": "application/json"
    }
  }

  
  async getPartnerContacts(pageNumber, partnerUuid) {
    try {
      const { tps: partnerEndpoint } = config;
      const url = pageNumber=='full'? `${partnerEndpoint.baseUrl}${partnerEndpoint.getPartnerFullContacts}`.replace('{id}', partnerUuid) : `${partnerEndpoint.baseUrl}${partnerEndpoint.getPartnerContacts}`
      .replace('{id}', partnerUuid)
      .replace('{pageNumber}', pageNumber)
      .replace('{pageSize}', contactConfig.pageSize)
//console.log("geturl",url)
      const partnerContactRecords = await this.httpClient.get(url, this.customHeaders);
      return partnerContactRecords;
    }
    catch (error) {
      const serviceError = new ErrorBuilder("service", error);
      throw serviceError;
    }


  }
  async saveContact(body, data, isPatchOperation) {
    try {
      let saveContactCustomHeaders
      const saveContactUrl = config.tps.baseUrl + config.tps.contact;
      saveContactCustomHeaders = this.customHeaders;
     

      const res = isPatchOperation?
      await this.httpClient.put(saveContactUrl, data, saveContactCustomHeaders)
      :
      await this.httpClient.post(saveContactUrl, data, saveContactCustomHeaders);
      return res
    }
    catch (error) {
      const serviceError = new ErrorBuilder("service", error);
      throw serviceError;
    }
  }
}
module.exports = ContactService;