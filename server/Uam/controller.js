const UamService = require('./service');
const logger = require('../lib/logger')(module);
const UAMModel = require('./models/UAMModel');
const helper = require('../helper/');
const ErrorBuilder = require('../lib/error-handlers/ErrorBuilder');
// const logger = require('../lib/logger');

class UamController {
  constructor(req, res) {
    this.accessToken = req.cookies['OAuth.AccessToken.EP'];
    this.uamService = new UamService(this.accessToken);
    this.res = res;
  }

  async getUamUrls() {
    try {
      const responseData = await this.uamService.fetchPolicyByDescription(
        this.accessToken,
      );
      if (responseData.response && responseData.response.status) {
        helper.handleError(responseData);
      } else {
        const uamModel = new UAMModel(responseData[0]);
        this.res.urls = uamModel.resources.api;
        return this.res;
      }
    } catch (error) {
      const controllerError = new ErrorBuilder('controller', error);
      logger.info(controllerError.message);
      this.res.status(controllerError.code);
      this.res.end();
    }
  }

  async uam() {
    try {
      const responseData = await this.uamService.fetchPolicyByDescription(
        this.accessToken,
      );
      if (responseData.response && responseData.response.status) {
        helper.handleError(responseData);
      } else if (responseData.length > 0) {
        const uamModel = new UAMModel(responseData[0]);
        this.res.send([uamModel]);
      } else {
        this.res.send(responseData);
      }
    } catch (error) {
      const controllerError = new ErrorBuilder('controller', error);
      logger.info(controllerError.message)
      this.res.status(controllerError.code);
      this.res.end();
    }
  }
}

module.exports = UamController;
