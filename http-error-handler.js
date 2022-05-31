const restifyErrors = require('restify-errors');

/**
 * error handler for http try catch methods in the controllers
 * @param {Object} exception 
 * @author Miguel Trevino
 */
const errorHandler = (exception, optionalMessage) => {
    let exceptionObject = null;

    switch (exception.message) {
        case '400':
            exceptionObject = new restifyErrors.BadRequestError(optionalMessage || 'Bad Request');
            break;
        case '403':
            exceptionObject = new restifyErrors.ForbiddenError(optionalMessage || 'Access forbidden');
            break;
        case '404':
            exceptionObject = new restifyErrors.NotFoundError(optionalMessage || 'Record not found.');
            break;
        case '409':
            exceptionObject = new restifyErrors.ConflictError(optionalMessage || 'Record conflicts with existing records in place.');
            break;
        case '412':
            exceptionObject = new restifyErrors.PreconditionFailedError(optionalMessage || 'Pre condition to create this request, failed');
            break;
        case '422':
            exceptionObject = new restifyErrors.UnprocessableEntityError(optionalMessage || 'Record cannot be saved with the current params');
            break;
        case '423':
            exceptionObject = new restifyErrors.LockedError(optionalMessage || 'The resource that is being accessed is locked');
            break;
        case 'cant_save_card':
            exceptionObject = new restifyErrors.PaymentRequiredError(optionalMessage || 'ard could not be saved');
            break;
        case '500':
            exceptionObject = new restifyErrors.InternalServerError(optionalMessage || 'Server error.');
            break;
        case '504':
            exceptionObject = new restifyErrors.GatewayTimeoutError(optionalMessage || 'Endpoint timedout, try again later.');
        default:
            if (exception.message) {

                const exceptionArray = exception.message.split(':');

                if (exceptionArray.length === 2) {
                    return errorHandler({
                        message: exceptionArray[0],
                    }, exceptionArray[1]);
                }
            }

            exceptionObject = new restifyErrors.InternalServerError(exception);
            
            break;
    }
    return exceptionObject;
};


module.exports = {
    errorHandler,
};