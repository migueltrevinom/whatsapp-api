const config = require('../config');

const Controller = require('./controller');

const Middleware = require('./middleware');

const base = '/whatsapp';

module.exports = (server) => {
    const PATH = config.basePath(base);

    server.get({
        path: PATH,
        version: '1.0.0',
    }, [Middleware.sendMessageValidation, Controller.sendMessage]);

    server.post({
        path: PATH,
        version: '1.0.0',
    }, [Middleware.sendMessageValidation, Controller.sendMessage]);

    server.post({
        path: `${PATH}/webhook`,
        version: '1.0.0',
    }, [Controller.webhookHandler]);
};