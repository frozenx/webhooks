const config = require('../config').get(process.env.APP_ENV);
const Httpclient = require('../clients/httpClient');
const logger = require('../lib/logger')(module);
const ErrorBuilder = require('../lib/error-handlers/ErrorBuilder');


class UamService {
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.httpClient = new Httpclient(this.accessToken);
    this.getAdditionalHeader = this.getAdditionalHeader.bind(this);
  }


  /* eslint-disable */
  getAdditionalHeader(accessToken) {
    return {
      Authorization: accessToken,
      Servicename: config.uamAccessList.headerServiceName,
      Auth: config.uamAccessList.headerAuth,
      'Content-Type': 'application/json'
    };
  }

  getRequestBody() {
    return {
      action: '',
      domain: config.uamAccessList.domain,
      resource: '',
      context: {}
    }
  }

  async fetchPolicyByDescription(accessToken) {
    try {
      const uamUrl = config.uamAccessList.baseUrl + config.uamAccessList.policyByDescEndpoint;
      const customHeaders = this.getAdditionalHeader(accessToken);
      const requestBody = this.getRequestBody();
      const uamResponse = await this.httpClient.post(uamUrl, requestBody, customHeaders);
      return uamResponse;
    } catch (error) {
      const serviceError = new ErrorBuilder('service', error);
      throw serviceError;
    }
  }
}

module.exports = UamService;