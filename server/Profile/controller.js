const ProfileService = require('./service');
const ProfileModel = require('./models/ProfileModel');
const logger = require('../lib/logger')(module);
const ErrorBuilder = require('../lib/error-handlers/ErrorBuilder');

class ProfileController {
  constructor(req, res) {
    this.request = req;
    this.response = res;
    this.accessToken = req.cookies['OAuth.AccessToken.EP'];
    this.profileService = new ProfileService(this.accessToken);
  }

  async readProfile() {
    try {
      const profileServiceResponse = await this.profileService.readProfile(this.accessToken);
      const profileModel = new ProfileModel(profileServiceResponse);
      this.response.send(JSON.stringify(profileModel));
    } catch (error) {
      const controllerError = new ErrorBuilder('controller', error);
      logger.info(controllerError.message);
      this.response.status(controllerError.code);
      this.response.end();
    }
  }
}

module.exports = ProfileController;
