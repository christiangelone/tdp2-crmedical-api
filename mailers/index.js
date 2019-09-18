'use strict';
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: 'myhealthapp@outlook.com',
        pass: 'health1234'
    }
});


const welcomeMailer = require('./welcome')
module.exports = {
    sendWelcomeEmail: welcomeMailer(transport)
}