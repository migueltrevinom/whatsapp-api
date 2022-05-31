const config = require("./config");

const restify = require("restify");

const restifyPlugins = require("restify-plugins");

/**
 * Initialize Server
 */
const server = restify.createServer({
    name: config.name,
    version: config.version
});

/**
 * Middleware
 */
server.use(restifyPlugins.jsonBodyParser({
    mapParams: true
}));

server.use(restifyPlugins.acceptParser(server.acceptable));

server.use(restifyPlugins.queryParser({
    mapParams: true
}));

server.use(restifyPlugins.fullResponse());

server.use(restifyPlugins.throttle({
    burst: 100,
    rate: 30,
    ip: true,
}));

module.exports = server;