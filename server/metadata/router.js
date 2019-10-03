const express = require('express');
const MetaDataController = require('./controller');
const uamMiddleware = require('../Uam/middleware').getUam;

const router = express.Router();

const handlers = {
  getPresets: (req, res) => {
    const controller = new MetaDataController(req, res);
    controller.getPresets();
  },
  getSupplierHeader: (req, res) => {
    const controller = new MetaDataController(req, res);
    controller.getSupplierHeader();
  },
  getSupplierSite: (req, res) => {
    const controller = new MetaDataController(req, res);
    controller.getSupplierSite();
  },
  getSupplierPayments: (req, res) => {
    const controller = new MetaDataController(req, res);
    controller.getSupplierPayments();
  },
  createHeader: (req, res) => {
    const controller = new MetaDataController(req, res);
    controller.createHeader();
  },
  createSite: (req, res) => {
    const controller = new MetaDataController(req, res);
    controller.createSite();
  },
  createPayment: (req, res) => {
    const controller = new MetaDataController(req, res);
    controller.createPayment();
  },
  siteDetails: (req, res) => {
    const controller = new MetaDataController(req, res);
    controller.siteDetails();
  },
  paymentDetails: (req, res) => {
    const controller = new MetaDataController(req, res);
    controller.paymentDetails();
  },
  searchMetaData: (req, res) => {
    const controller = new MetaDataController(req, res);
    controller.searchMetaData();
  },
};

router.get('/supplier-header', handlers.getSupplierHeader);
router.get('/supplier-site', handlers.getSupplierSite);
router.get('/supplier-payments', handlers.getSupplierPayments);
router.post('/supplier-header', handlers.createHeader);
router.post('/supplier-site', handlers.createSite);
router.post('/supplier-payments', handlers.createPayment);
router.get('/site-details', handlers.siteDetails);
router.get('/payment-details', handlers.paymentDetails);
router.get('/search-meta-data', handlers.searchMetaData);
router.get('/presets', handlers.getPresets);


module.exports = { router, uamMiddleware, handlers };
