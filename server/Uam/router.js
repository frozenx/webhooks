const express = require('express');
const UAMController = require('./controller');

const router = express.Router();

const handlers = {
  uam: (req, res) => {
    const uamController = new UAMController(req, res);
    uamController.uam();  
  },
};

router.get('/uam', handlers.uam);

module.exports = {
  router,
  handlers,
};
