const AddressService = require('./service');
const PartnerAddressModel = require('./models/PartnerAddressModel');
const AddressAttributes = require('./models/addressAttributes');
const logger = require('../lib/logger')(module);
const ErrorBuilder = require('../lib/error-handlers/ErrorBuilder');


class AddressController {
  constructor(req, res) {
    this.accessToken = req.cookies['OAuth.AccessToken.EP'];
    this.addressService = new AddressService(this.accessToken);
    this.body = req.body;
    this.request = req;
    this.response = res;
  }

  async getAddresses() {
    try {
      const {
        pageNumber,
        partnerUuid
      } = this.request.query;
      const partnerServiceAddressRecords = await this.addressService.getPartnerAddresses(pageNumber, partnerUuid);
      const partnerAddressModel = new PartnerAddressModel(partnerServiceAddressRecords);
      const addressServiceRecords = await this.addressService.getAddresses(partnerAddressModel.addressUuids);
      partnerAddressModel.update(addressServiceRecords);
      this.response.json(partnerAddressModel);
    } catch (error) {
      const controllerError = new ErrorBuilder('controller', error);
      logger.info(controllerError.message);
      this.response.status(controllerError.code);
      this.response.end();
    }
  }

  async saveAddress() {
    try {
      const requiredBodyAttr = new AddressAttributes();
      const isPatchOperation = this.request.query.operation === 'patch';
      const addressResponse = await this.addressService.saveAddress(this.body,
        requiredBodyAttr.getRequiredBodyAttr(this.body.attributes), isPatchOperation);
      this.response.send(JSON.stringify(addressResponse));
    } catch (error) {
      const controllerError = new ErrorBuilder('controller', error);
      logger.info(controllerError.message);
      this.response.status(controllerError.code);
      this.response.end();
    }
  }

  async getCompanyAddress() {
    try {
      const {
        companyHouseNumber,
      } = this.request.query;
      const companyHouseResponse = await this.addressService.getCompanyAddress(companyHouseNumber);
      this.response.send(companyHouseResponse);
    } catch (error) {
      const controllerError = new ErrorBuilder('controller', error);
      logger.info(controllerError.message);
      this.response.status(controllerError.code);
      this.response.end();
    }
  }
}

module.exports = AddressController;