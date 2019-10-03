const express = require('express');
const AddressController = require('./controller');

const router = express.Router();

const handlers = {
  getAddresses: (req, res) => {
    const controller = new AddressController(req, res);
    controller.getAddresses();
  },
  saveAddress: (req, res) => {
    const controller = new AddressController(req, res);
    controller.saveAddress();
  },
  getCompanyAddress: (req, res) => {
    const controller = new AddressController(req, res);
    controller.getCompanyAddress();
  }

}

router.post('/address', handlers.saveAddress);
router.get('/adresses', handlers.getAddresses);
router.get('/company-address', handlers.getCompanyAddress);

module.exports = {
  router,
  handlers,
};
