const express = require('express');

const router = express.Router();

const handlers = {
  readHealthCheck: (req, res) => {
    const { BUILD_NUMBER, APP_ENV } = process.env;
    const data = { BUILD_NUMBER: Number(BUILD_NUMBER), APP_ENV };
    res.send(JSON.stringify(data));
  },
};

router.get('/healthcheck', handlers.readHealthCheck);

module.exports = { router, handlers };
