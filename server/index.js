const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); // HTTP request logger middleware
const httpContext = require('express-http-context');
const uuid = require('uuid');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const swaggerUI = require('swagger-ui-express');

const app = express();
const bodyParser = require('body-parser');
const logger = require('./lib/logger')(module); // Logger
const supplierRoutes = require('./Supplier/routes');
const metaDataRoutes = require('./metadata/router').router;
const profileRoutes = require('./Profile/routes');
const healthcheck = require('./healthcheck');
const swaggerDocument = require('./swagger.json');
const uam = require('./Uam/router');

const config = require('./config').get(process.env.APP_ENV);
const middleware = require('./middleware');
const addressRoutes = require('./addressBook/routes');
const contactRoutes = require('./contactBook/routes');
const LogMedium = require('./LogMediums');


// Use any third party middleware that does not need access to the context here
// app.use(some3rdParty.middleware);

app.use(httpContext.middleware);
// all code from here on has access to the same context for each request

// Run the context for each request.
// Assigning a unique identifier to each request
app.use((req, res, next) => {
  httpContext.set('traceId', uuid.v1());
  next();
});

// using morgan with winston(logger)
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const MorganLogMedium = new LogMedium('Console').writeMedium;
app.use(morgan('combined', { stream: new MorganLogMedium().logMessage }));

const root = '/tradingpartner/api';
app.use(root, healthcheck.router);
app.use(root, supplierRoutes.router);
app.use(root, metaDataRoutes);
app.use(root, profileRoutes.router);
app.use(root, middleware.isAuthenticated, uam.router);
app.use(root, addressRoutes.router);
app.use(root, contactRoutes.router);

const options = {
  customCss: 'body {margin: 0 15em;} .swagger-ui .info {margin: 15px 0;} .swagger-ui .info .title {font-size: 20px;} .swagger-ui .scheme-container {padding: 10px 0; background: none; box-shadow: none;} .markdown p {margin: 5px 0;} .swagger-ui table tbody tr td {padding-top: 0;} .swagger-ui .table-container {padding: 0 20px;} .swagger-ui .execute-wrapper {padding: 10px 20px;} .swagger-ui .opblock-body pre {max-height: 400px; overflow: auto;}',
};


app.use(`${root}/swagger`, swaggerUI.serve, swaggerUI.setup(swaggerDocument, options));

// For Dev, PPE, and Prod When Docker file is used
// To  serve static files
if (fs.existsSync(path.join(__dirname, '..', 'client', 'build'))) {
  app.use('/tradingpartner', express.static(path.join(__dirname, '..', 'client', 'build')));
  app.get('/tradingpartner/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

app.listen(4000, () => {
  console.log('Server running on port 4000'); // eslint-disable-line no-console
});
