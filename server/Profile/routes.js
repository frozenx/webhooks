const express = require('express');
const ProfileController = require('./controller');

const router = express.Router();

const handlers = {
  readProfile: (req, res) => {
    const profileController = new ProfileController(req, res);
    profileController.readProfile(req, res);
  },
};

router.get('/profile', handlers.readProfile);

module.exports = {
  router,
  handlers,
};
