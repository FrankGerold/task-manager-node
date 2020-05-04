const sendgridKey = process.env.SENDGRID_API_KEY

const sgMail = require('@sendgrid/mail')

const me = process.env.EMAIL

sgMail.setApiKey(sendgridKey)

// sgMail.send({
//   to: 'jollyrogerbass@gmail.com',
//   from: `FrankEtsGerold@gmail.com`,
//   subject: `My First Email`,
//   text: `ayy lmao`
// })

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: me,
    subject: `Welcome to Task Manager!`,
    text: `Welcome to the task manager, ${name}!
Please let me know if you have any questions.`
  })
}

const sendFarewell = (email, name) => {
  sgMail.send({
    to: email,
    from: me,
    subject: 'Goodbye!',
    text: `Hi ${name}, we went ahead and deleted your account. Thanks for using Task Manager!
-Frank`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendFarewell
}
