const UamController = require('./controller');

const uamMiddleware = {

  getUam: async (req, res, next) => {
    const uamController = new UamController(req, res);
    await uamController.getUamUrls();
    let accessUrls = uamController.res.urls.map(urlObj => Object.keys(urlObj));
    accessUrls = [].concat(...accessUrls);
    if (accessUrls.length > 0 && accessUrls.includes(uamController.res.req.url)) {
      next();
    } else {
      res.status(401);
      res.send(uamController.res.message);
    }
  },
};

module.exports = uamMiddleware;
