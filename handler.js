'use strict';

const AWS = require('aws-sdk');
const SES = new AWS.SES();

function validateOrigins(input) {
  const VALID = ['http://localhost:8000'];
  return VALID.filter(origin => origin === input)[0] || VALID[0];
}

function sendEmail(formData, callback) {
  const emailParams = {
    Source: formData.sesSend,
    ReplyToAddresses: [formData.replyTo],
    Destination: { ToAddresses: [formData.sesReceive] },// SES RECEIVING EMAIL
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `${formData.message}\n\nName: ${formData.name}\nEmail: ${formData.replyTo}\nPhone: ${formData.phone}`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'SUPR form submission',
      },
    }
  }
  SES.sendEmail(emailParams, callback);
}

module.exports.contactMe = (event, context, callback) => {
  const origin = event.headers.Origin || event.headers.origin;
  const formData = JSON.parse(event.body);

  if (formData.honeyPot) {
    console.log('Spam');
    return;
  }

  if (!validateOrigins(origin)) {
    console.log('Invalid origin');
    return;
  }

  sendEmail(formData, function (error, data) {
    const response = {
      statusCode: error ? 500 : 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin
      },
      body: JSON.stringify({
        message: error ? error.message : data
      })
    }
    callback(null, response);
  });
};
