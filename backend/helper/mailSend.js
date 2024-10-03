import nodemailer from "nodemailer";
import { SENDMAIL } from "../config/constants";

var transport = nodemailer.createTransport({
  
  secure: false,
  auth: {
    user: SENDMAIL,
    pass: "pass",
  },
});

// console.log(transport);
const sendRegistrationEmail = (email, firstName, lastName) => {
  const mailConfig = {
    from: `"Student Registery" <${SENDMAIL}>`,
    to: email,
    subject: "This an sample mail for NodeMailer",
    text: `Hello! ${firstName} ${lastName}, \n\nThis is Regarding your Account Registration in our organization. We Welcome you to our Team.!!`,
  };
  return transport.sendMail(mailConfig);
};

export default sendRegistrationEmail;
