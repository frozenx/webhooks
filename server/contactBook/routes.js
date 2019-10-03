const express = require('express');
const ContactController = require('./controller');

const router = express.Router();

const handlers = {
  getContacts: (req, res) => {
    const controller = new ContactController(req, res);
    controller.getContacts();
  },
  saveContact: (req, res) => {
    const controller = new ContactController(req, res);
    controller.saveContact();
  }

}

router.post('/contact', handlers.saveContact);
router.get('/contacts', handlers.getContacts);

module.exports = {
  router,
  handlers,
};
