const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, EMAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async(data)=> {
    const email = {...data, from: EMAIL_FROM};
    try {
        await sgMail.send(email);
        return true;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = sendEmail;