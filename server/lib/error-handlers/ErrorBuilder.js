const constants = require('./constants');
const HttpError = require('./HttpError');
const ServiceError = require('./ServiceError');
const ControllerError = require('./ControllerError');

function ErrorBuilder(type, error) {

    if (error.appCode) {
        return error;
    }
    switch (type) {
        case constants.HTTP_ERROR:
            return new HttpError(error);
        case constants.SERVICE_ERROR:
            return new ServiceError(error);
        case constants.CONTROLLER_ERROR:
            return new ControllerError(error);
    }
}

module.exports = ErrorBuilder;