const axios = require('axios');

const config = require('../config');

let _axios = null;

const _whatsAppInstance = () => {
    _axios = axios.create({
        baseURL: 'https://graph.facebook.com/v13.0',
    });

    _axios.defaults.headers.common['Content-Type'] = 'application/json';

    _axios.defaults.headers.common['Authorization'] = config.whatsAppToken ? `Bearer ${config.whatsAppToken}` : null;

    return _axios;
};

const sendMessage = async (data) => {
    _axios = _whatsAppInstance();

    const {
        template,
        language,
        to,
        components,
    } = data;

    if (!template) {
        throw new Error('403:only_template_allowed_for_now');
    }

    const response = await _axios.post(`/${config.whatsAppPhoneIdentifier}/messages`, {
        messaging_product: "whatsapp",
        to,
        type: template ? "template" : null, // we will use templates only for now 
        template: {
            name: template,
            language: {
                code: language || "en_US",
            },
            "components": components,
        },
    }, );

    return response ? response.data : null;
};

const webhookHandler = async (data) => {

};

module.exports = {
    sendMessage,
    webhookHandler,
};