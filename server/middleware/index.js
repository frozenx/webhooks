const constants = require('../constants');

const isAuthenticated = (req, res, next) => {
  if (req.cookies['OAuth.AccessToken.EP']) {
    next();
  } else {
    res.send({
      status: 401,
      message: constants.UNAUTHORIZED,
    });
  }
};


module.exports = {
  isAuthenticated,
};
