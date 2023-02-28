const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    let transporter = await nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  
    let message = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: options.email,
      subject: options.subject,
      text: options.message
    });

    // const info = await transporter.sendMail(message);
    // console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendEmail;