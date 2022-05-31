require('dotenv').config();

const API_ROOT = '/api';

module.exports = {
    port: process.env.PORT || 3000,
    env: process.env.ENV || 'development',
    name: process.env.NAME || 'Whatsapp project',
    version: process.env.VERSION || 1,
    whatsAppToken: process.env.WHATSAPP_TOKEN || null,
    whatsAppPhoneIdentifier: process.env.WHATSAPP_PHONE_IDENTIFIER || '114437841277918',
    whatsAppReceiver: process.env.WHATSAPP_RECEIVER || '1541653148',
    basePath: (path) => {
        return API_ROOT.replace(/\/$/, '') + '/' + path.replace(/^\//, '')
    },
};