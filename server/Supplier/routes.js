const express = require('express');
const SupplierController = require('./controller');


const router = express.Router();


const handlers = {
  readSupplier: (req, res) => {
    const supplierController = new SupplierController(req, res);
    supplierController.readSupplier();
  },
  createSupplier: (req, res) => {
    const controller = new SupplierController(req, res);
    controller.createSupplier();
  },
  searchAndCreate: (req, res) => {
    const controller = new SupplierController(req, res);
    controller.readAndCreate();
  },
  getSupplierDetails: (req, res) => {
    const controller = new SupplierController(req, res);
    controller.getSupplierDetails();
  },
  getSupplierSites: (req, res) => {
    const controller = new SupplierController(req, res);
    controller.getSupplierSites();
  },
  getSupplierPayments: (req, res) => {
    const controller = new SupplierController(req, res);
    controller.getSupplierPayments();
  },
  getPartnerDetails: (req, res) => {
    const controller = new SupplierController(req, res);
    controller.getPartnerDetails(); 
  },
};

router.get('/supplier', handlers.readSupplier);
router.post('/supplier', handlers.createSupplier);
router.post('/searchAndCreate', handlers.searchAndCreate);
router.post('/supplier-details', handlers.getSupplierDetails);
router.post('/supplier-details/sites', handlers.getSupplierSites);
router.post('/supplier-details/payments', handlers.getSupplierPayments);
router.post('/partner-details-search', handlers.getPartnerDetails);

module.exports = {
  router,
  handlers,
};
