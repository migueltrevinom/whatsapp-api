const restifyErrors = require('restify-errors');

/**
 * send message validation (check for required params)
 * @param {object} request
 * @param {object} response
 * @param {object} next
 * @author Miguel Trevino
 */
const sendMessageValidation = (request, response, next) => {
    const {
        template,
        language,
        personalizedMessage,
    } = request.params;

    if (!template && !personalizedMessage) {
        return next(new restifyErrors.MissingParameterError('required to have template or personalizedMessage'));
    }

    return next();
};

module.exports = {
    sendMessageValidation,
};