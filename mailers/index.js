'use strict';
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'myhealthapp2019@gmail.com',
        pass: 'jGJkQMeuNwuQSgKkZEmPCA87'
    }
});


const welcomeMailer = require('./welcome')
module.exports = {
    sendWelcomeEmail: welcomeMailer(transport)
}