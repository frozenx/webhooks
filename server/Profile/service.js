const HttpClient = require('../clients/httpClient');
const logger = require('../lib/logger')(module);
const config = require('../config').get(process.env.APP_ENV);
const ErrorBuilder = require('../lib/error-handlers/ErrorBuilder');

class ProfileService {
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.httpClient = new HttpClient(this.accessToken);
  }

  async readProfile() {
    try {
      const url = config.profile.baseUrl + config.profile.getName;
      const res = await this.httpClient.get(url, { 'Accept-Language': 'en-GB' });
      return res;
    } catch (error) {
      const serviceError = new ErrorBuilder('service', error);
      throw serviceError;
    }
  }
}

module.exports = ProfileService;
