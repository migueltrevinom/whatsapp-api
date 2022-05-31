const server = require('./index');

const config = require('./config');

/**
 * Start Server, Connect to DB & Require Routes
 */
server.listen(config.port, () => {
    console.log('server listening on', config.port);
    require("./Routes/index")(server);
});

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

process.on('SIGINT', () => {
    console.info('SIGINT: Attempting to terminate');
 
    console.info('exiting...');

    process.exit(1);
});

process.on('SIGTERM', () => {
    console.info('SIGTERM: Attempting to terminate');
    console.info('exiting...');

    process.exit(1);
});

process.on('SIGUSR2', async () => {
    console.info('SIGUSR2: Attempting to terminate');
    console.info('exiting...');

    process.exit(1);
});