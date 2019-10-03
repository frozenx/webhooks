const axios = require('axios');
const logger = require('../lib/logger')(module);
const ErrorBuilder = require('../lib/error-handlers/ErrorBuilder');
const config = require('../config').get(process.env.APP_ENV);
const secrets = require('../secrets');

class HttpClient {
  constructor(accessToken) {
    this.accessToken = `Bearer ${accessToken}`;
  }

  /* eslint-disable */
  get(url, customHeaders = {}, params = {}) {
    return axios({
      url,
      params,
      headers: Object.assign({ Authorization: this.accessToken }, customHeaders),
    })
      .then(response => response.data)
      .catch((error) => {
        // logger.error({
        //   message: {
        //     logMsg: error.message,
        //     statusCode: error.status
        //   }
        // });
        // throw error;

        const httpError = new ErrorBuilder('http', error);
        throw httpError;
      });
  }
  /* eslint-enable */

  post(url, data = {}, customHeaders) {
    return axios({
      url,
      data,
      method: 'post',
      headers: { Authorization: this.accessToken, ...customHeaders },
    })
      .then(response => response.data)
      .catch((error) => {
        const httpError = new ErrorBuilder('http', error);
        throw httpError;
      });
  }

  put(url, data, customHeaders) {
    return axios({
      url,
      data,
      method: 'put',
      headers: { Authorization: this.accessToken, ...customHeaders },
    })
      .then(response => response.data)
      .catch((error) => {
        const httpError = new ErrorBuilder('http', error);
        throw httpError;
      });
  }
  getClientToken() {
    const url = config.identity.baseUrl + config.identity.getAccessToken;
    return axios({
      url,
      data: {
        'client_id': secrets.client_id, //to be added
        'grant_type': secrets.superUserForIdentityService.grant_type,
        'scope': secrets.superUserForIdentityService.scope,
        'username': secrets.superUserForIdentityService.username, //to be added
        'password': secrets.superUserForIdentityService.password //to be added
      },
      method: 'post',
      headers: { 'content-type': 'application/json' },
    })
      .then(response => response.data.access_token)
      .catch((error) => {
        const httpError = new ErrorBuilder('http', error);
        throw httpError;
      });
  }
}

module.exports = HttpClient;
