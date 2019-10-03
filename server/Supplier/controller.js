const SupplierService = require('./service');
const AddressService = require('../addressBook/service');
const ContactService = require('../contactBook/service');
const SuppliersModel = require('./models/Suppliers');
const SupplierAttributes = require('./models/SupplierAttributes');
const SiteAttributes = require('./models/SiteAttributes');
const PaymentAttributes = require('./models/PaymentAttributes');
const AddressModel = require('../addressBook/models/addressAttributes');
const logger = require('../lib/logger')(module);
const MetaDataService = require('../metadata/service');
const ErrorBuilder = require('../lib/error-handlers/ErrorBuilder');
const constants = require('../constants');

class SupplierController {
  constructor(req, res) {
    this.request = req;
    this.response = res;
    this.body = req.body;
    this.params = req.query;
    this.accessToken = req.cookies['OAuth.AccessToken.EP'];
    this.supplierService = new SupplierService(this.accessToken);
    this.addressService = new AddressService(this.accessToken);
    this.contactService = new ContactService(this.accessToken);
    this.metaData = new MetaDataService(this.accessToken);
  }

  async readSupplier() {
    try {
      const isFullText = false;
      const supplierServiceResponse = await this.supplierService.readSupplier(
        this.params,
        isFullText,
      );
      const suppliersModel = new SuppliersModel(supplierServiceResponse);
      this.response.send(JSON.stringify(suppliersModel));
    } catch (error) {
      const controllerError = new ErrorBuilder('controller', error);
      logger.info(controllerError.message);
      this.response.status(controllerError.code);
      this.response.end();
    }
  }

  async readAndCreate() {
    try {
      const isFullText = true;
      const {
        companyRegNumber,
      } = this.body;

      const getCompanyAddressResponse = await this.addressService.getCompanyAddress(companyRegNumber);
      const searchSupplierAndCreateResponse = await this.supplierService.readAndCreate({
        ...this.body,
        partnerName: getCompanyAddressResponse.company_name,
      },
        isFullText,
      );
      let model;
      if (searchSupplierAndCreateResponse.uuid) { // create response
        model = new SupplierAttributes(searchSupplierAndCreateResponse);
        const addressPayload = new AddressModel().mapCompanyHouseAttributesToAddressPayload(getCompanyAddressResponse);
        await this.addressService.saveAddress({
          attributes: {
            ...addressPayload,
          },
          partnerUuid: model.uuid,
        },
          addressPayload);
      } else { // search response
        model = new SuppliersModel(searchSupplierAndCreateResponse);
      }
      this.response.send(JSON.stringify(model));
    } catch (error) {
      const controllerError = new ErrorBuilder('controller', error);
      logger.info(controllerError.message);
      if (error.isCompanyAddressError) {
        this.response.send({
          errorKeys: [constants.COMPANY_REG_NUMBER],
        });
      } else {
        this.response.status(controllerError.code);
        this.response.end();
      }
    }
  }

  async createSupplier() {
    try {
      const supplierResponse = await this.supplierService.createSupplier(
        this.body,
      );
      const supplierModel = new SupplierAttributes(supplierResponse);
      this.response.json(supplierModel);
    } catch (error) {
      const controllerError = new ErrorBuilder('controller', error);
      logger.info(controllerError.message);
      this.response.status(controllerError.code);
      this.response.end();
    }
  }

  async getSupplierDetails() {
    try {
      const supplierResponse = await this.supplierService.getSupplierDetails(
        this.body,
      );
      const supplierModel = new SupplierAttributes(supplierResponse);
      const addressResponse = await this.addressService.getPartnerAddresses(1, this.body.uuid);
      const contactResponse = await this.contactService.getPartnerContacts(1, this.body.uuid);
      supplierModel.updateAddressAttributes(addressResponse);
      supplierModel.updateContacrAttributes(contactResponse);
      this.response.send(supplierModel);
    } catch (error) {
      const controllerError = new ErrorBuilder('controller', error);
      logger.info(controllerError.message);
      this.response.status(controllerError.code);
      this.response.end();
    }
  }

  async getSupplierSites() {
    try {
      const sitesResponse = await this.supplierService.getSupplierSites(
        this.body,
      );
      const siteRecords = sitesResponse.content.map(c => new SiteAttributes(c));
      this.response.send(siteRecords);
    } catch (error) {
      const controllerError = new ErrorBuilder('controller', error);
      logger.info(controllerError.message);
      this.response.status(controllerError.code);
      this.response.end();
    }
  }

  async getSupplierPayments() {
    try {
      const paymentsResponse = await this.supplierService.getSupplierPayments(
        this.body,
      );
      const paymentRecords = paymentsResponse.content.map(
        c => new PaymentAttributes(c),
      );
      this.response.send(paymentRecords);
    } catch (error) {
      const controllerError = new ErrorBuilder('controller', error);
      logger.info(controllerError.message);
      this.response.status(controllerError.code);
      this.respAonse.end();
    }
  }

  async getPartnerDetails() {
    try {
      const partnerResponse = await this.supplierService.getPartnerDetails(
        this.body,
      );
      const partnerModel = new SupplierAttributes(partnerResponse);
      this.response.send(partnerModel);
    } catch (error) {
      const controllerError = new ErrorBuilder('controller', error);
      logger.info(controllerError.message);
      this.response.status(controllerError.code);
      this.response.end();
    }
  }
}

module.exports = SupplierController;