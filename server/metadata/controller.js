
const presets = require('./presets');
const MetaDataService = require('./service');
const SupplierHeaderModel = require('./models/_supplierHeader');
const SupplierAttributesModel = require('../Supplier/models/SupplierAttributes');
const SiteAttributesModel = require('../Supplier/models/SiteAttributes');
const PaymentAttributesModel = require('../Supplier/models/PaymentAttributes');
const logger = require('../lib/logger')(module);
const SiteDetails = require('./models/SiteDetails');
const PaymentDetails = require('./models/PaymentDetails');
const SearchMetaData = require('./models/SearchMetaData');
const ErrorBuilder = require('../lib/error-handlers/ErrorBuilder');
const UAMService = require('../Uam/service');
const UAMModel = require('../Uam/models/UAMModel');
const helper = require('../helper');
const constants = require('../constants');
const AttributeAccess = require('./models/AttributeAccess');

class MetaDataController {
  constructor(req, res) {
    this.accessToken = req.cookies['OAuth.AccessToken.EP'];
    this.service = new MetaDataService(this.accessToken);
    this.body = req.body;
    this.req = req;
    this.res = res;
  }

  async getPresets(req, res) {
    try {
      res.send(presets);
    } catch (error) {
      const controllerError = new ErrorBuilder('controller', error);
      logger.info(controllerError.message);
      this.res.status(controllerError.code);
      this.res.end();
    }

  }

  async getSupplierHeader() {
    try {
      const response = await this.service.getSupplierHeader();
      const supplierHeaderModel = new SupplierHeaderModel(response);
      const uamService = new UAMService(this.accessToken);
      const uamResponse = await uamService.fetchPolicyByDescription(this.accessToken);
      const uamModel = new UAMModel(uamResponse[0]);
      const attributeAccess = new AttributeAccess({
        uamAccess: uamModel,
        transformedMetaData: supplierHeaderModel,
        entityType: constants.entityType.partner,
      });
      const { updatedMetaData } = attributeAccess;
      this.res.json(updatedMetaData);
    } catch (error) {
      const controllerError = new ErrorBuilder('controller', error);
      logger.info(controllerError.message);
      this.res.status(controllerError.code);
      this.res.end();
    }
  }

  async getSupplierSite() {
    try {
      const response = await this.service.getSupplierSite();
      const supplierHeaderModel = new SupplierHeaderModel(response);
      const uamService = new UAMService(this.accessToken);
      const uamResponse = await uamService.fetchPolicyByDescription(this.accessToken);
      const uamModel = new UAMModel(uamResponse[0]);
      const attributeAccess = new AttributeAccess({
        uamAccess: uamModel,
        transformedMetaData: supplierHeaderModel,
        entityType: constants.entityType.site,
      });
      const { updatedMetaData } = attributeAccess;
      this.res.json(updatedMetaData);
    } catch (error) {
      const controllerError = new ErrorBuilder('controller', error);
      logger.info(controllerError.message);
      this.res.status(controllerError.code);
      this.res.end();
    }
  }

  async getSupplierPayments() {
    try {
      const response = await this.service.getSupplierPayments();
      const supplierHeaderModel = new SupplierHeaderModel(response);
      const uamService = new UAMService(this.accessToken);
      const uamResponse = await uamService.fetchPolicyByDescription(this.accessToken);
      const uamModel = new UAMModel(uamResponse[0]);
      const attributeAccess = new AttributeAccess({
        uamAccess: uamModel,
        transformedMetaData: supplierHeaderModel,
        entityType: constants.entityType.tnc,
      });
      const { updatedMetaData } = attributeAccess;
      this.res.json(updatedMetaData);
    } catch (error) {
      const controllerError = new ErrorBuilder('controller', error);
      logger.info(controllerError.message);
      this.res.status(controllerError.code);
      this.res.end();
    }
  }

  async createHeader() {
    try {
      const response = await this.service.createHeader(this.body);
      const supplierAttributesModel = new SupplierAttributesModel(response);
      this.res.send(supplierAttributesModel);
    } catch (error) {
      const controllerError = new ErrorBuilder('controller', error);
      logger.info(controllerError.message);
      this.res.status(controllerError.code);
      this.res.end();
    }
  }

  async createSite() {
    try {
      const response = await this.service.createSite(this.body);
      const siteAttributesModel = new SiteAttributesModel(response);
      this.res.send(siteAttributesModel);
    } catch (error) {
      const controllerError = new ErrorBuilder('controller', error);
      logger.info(controllerError.message);
      this.res.status(controllerError.code);
      this.res.end();
    }
  }

  async createPayment() {
    try {
      const response = await this.service.createPayment(this.body);
      const paymentAttributesModel = new PaymentAttributesModel(response);
      this.res.send(paymentAttributesModel);
    } catch (error) {
      const controllerError = new ErrorBuilder('controller', error);
      logger.info(controllerError.message);
      this.res.status(controllerError.code);
      this.res.end();
    }
  }

  async siteDetails() {
    try {
      const response = await this.service.siteDetails(this.req.query);
      const siteDetailsModel = new SiteDetails(response);
      this.res.send(siteDetailsModel);
    } catch (error) {
      const controllerError = new ErrorBuilder('controller', error);
      logger.info(controllerError.message);
      this.res.status(controllerError.code);
      this.res.end();
    }
  }

  async paymentDetails() {
    try {
      const response = await this.service.paymentDetails(this.req.query);
      const paymentDetailsModel = new PaymentDetails(response);
      this.res.send(paymentDetailsModel);
    } catch (error) {
      const controllerError = new ErrorBuilder('controller', error);
      logger.info(controllerError.message);
      this.res.status(controllerError.code);
      this.res.end();
    }
  }

  async searchMetaData() {
    try {
      const response = await this.service.searchMetaData();
      const searchMetaDataModel = new SearchMetaData(response);
      this.res.send(searchMetaDataModel);
    } catch (error) {
      const controllerError = new ErrorBuilder('controller', error);
      logger.info(controllerError.message);
      this.res.status(controllerError.code);
      this.res.end();
    }
  }
}

module.exports = MetaDataController;
