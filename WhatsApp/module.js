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
        personalizedMessage,
    } = data;

    const response = await _axios.post(`/${config.whatsAppPhoneIdentifier}/messages`, { 
        messaging_product: "whatsapp", 
        to: "50762647737", 
        type: template ? "template" : null, // to identify, we will use templates only for now 
        template: 
            { 
                name: template, 
                language: 
                    { 
                        code: language || "en_US", 
                    } 
                } 
            }
    );

    return response ? response.data : null;
};

const webhookHandler = async (data) => {

};

module.exports = {
    sendMessage,
    webhookHandler,
};