// Importing nodemailer

import nodemailer from "nodemailer";

//configure email

const sendMail = (req, res, next) => {
  //1. create an email transport
  //using SMTP

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bhukkad.dhaba404@gmail.com",
      pass: "nfqlzlcpkpseetdy",
    },
  });

  const mailOptions = {
    from: "bhukkad.dhaba404@gmail.com",
    to: req.body["email"],
    subject: "Thank you for applying ! We received your application.",
    text: "This is an acknowledgement that we have received your application. We will contact you once your profile is shortlisted!",
  };

  const result = transporter.sendMail(mailOptions);

  result
    .then(() => {
      console.log("mail sent successfully !");
    })
    .catch((err) => console.log(err));

  next();
};

export { sendMail };