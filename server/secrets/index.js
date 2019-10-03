const env = process.env.APP_ENV || 'local';
const secretsFileName = './slm-ftp-ui-secrets-' + env + '.json';
const secrets = require(secretsFileName);
module.exports = secrets;