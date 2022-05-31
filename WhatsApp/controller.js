const HttpHandler = require('../http-error-handler');

const Module = require('./module');

const sendMessage = async (request, response, next) => {
    try {
        console.log({
            params: request.params,
        });

        const data = await Module.sendMessage(request.params);

        response.send({data});
    } catch (exception) {
        console.error({
            exception,
            message: exception.response ? exception.response.data : exception.response
        });

        return next(HttpHandler.errorHandler(exception));
    }

    return next();
};

const webhookHandler = async (request, response, next) => {
    try {
        const data = await Module.webhookHandler(request.params);

        response.send({data});
    } catch (exception) {
        return next(HttpHandler.errorHandler(exception));
    }

    return next();
};


module.exports = {
    sendMessage,
    webhookHandler,
}