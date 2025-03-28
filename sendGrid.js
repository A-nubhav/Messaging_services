const sgMail=require("@sendgrid/mail");
require('dotenv').config();
sgMail.setApiKey(process.env.apiKey);


// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const otpgenerator=require("otp-generator");


const msg = {
    to: 'siddhartheandeyhoneypandey@gmail.com', 
    from: process.env.user, 
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    trackingSettings: {
      clickTracking: { enable: true, enableText: true },
      openTracking: { enable: true }
    }
};
  
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent');
  })
  .catch((error) => {
    console.error(error)
  })