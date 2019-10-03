const httpContext = require('express-http-context');
const { format: { printf } } = require('winston');
const loggerHelper = require('../../../helper');

/**
 * @method checkMessageProp
 * @param {message} can be object if developer defined, else it will be string
 *                  if its a network request (morgan requests)
 * @returns a fixed format how the status code and message should show
 */
const returnLogMessage = (message) => {
  const { statusCode, logMsg, maskedData } = message;
  switch (typeof message) {
    case 'object': {
      const statusCodeToBeLogged = statusCode || 'Status code not defined';
      const logMessageToBeLogged = logMsg || 'Log message not defined';
      const maskedDataToBeLogged = maskedData && Object.keys(maskedData).length > 0 ? loggerHelper.maskData(4, 4, maskedData) : 'Masked data not defined';
      return `${statusCodeToBeLogged} || ${logMessageToBeLogged} || ${maskedDataToBeLogged}`;
    }
    case 'string': {
      if (message) {
        const messageSplit = message.split('"');
        const statusCodeToBeLogged = messageSplit[2].trim().split(' ')[0];
        const logMessageToBeLogged = messageSplit[1];
        return `${statusCodeToBeLogged} || ${logMessageToBeLogged}`;
      }
      return 'Status Code Not Defined || Log Message Not Defined || Mask Data Not Defined';
    }
    default:
      return message;
  }
};

/**
 * @method getFileName
 * @param {moduleObj} the module realted object passed from the require of logger file
 * @returns the file name where the logger was invoked
 */
const getFileName = (moduleObj) => {
  if (Object.keys(moduleObj).length > 0) {
    const tempFileNameParts = moduleObj.filename.split('/');
    const fileName = tempFileNameParts.slice(Math.max(tempFileNameParts.length - 2, 1)).join('/');
    return fileName;
  }
  return 'Module not passed while requiring the logger';
};

/**
 * @method customFormat
 * @param {log} the log passed by the developer or based on network requests
 * @returns a customFormat how it should be logged to the log files
 */

const customFormat = () => printf((log) => {
  const traceId = httpContext.get('traceId');
  return `${new Date(log.timestamp)} || ${log.level.toUpperCase()} || ${log.label} || ${traceId} || ${returnLogMessage(log.message)} `;
});


module.exports = {
  returnLogMessage,
  getFileName,
  customFormat,
};
