const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

const APP_NAME = 'grid-dashboard';

/**
 * Send email to new users
 * @param {string} email The user email.
 * @param {string} displayName The user name.
 * @return {null}
 */
async function sendWelcomeEmail(email, displayName) {
  const mailOptions = {
    from: `${APP_NAME} <email@email.com>`,
    to: email,
  };

  mailOptions.subject = `Welcome to ${APP_NAME}`;
  mailOptions.text = `Hey ${displayName || ''}! Welcome to the team`;

  await mailTransport.sendMail(mailOptions);

  console.log('New Welcome email sent to: ', email);

  return null;
}

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  const email = user.email;
  const displayName = user.displayName;

  return sendWelcomeEmail(email, displayName);
});
