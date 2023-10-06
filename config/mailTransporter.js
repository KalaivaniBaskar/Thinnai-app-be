import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    secure: false,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PWD
    }
  });

export function verifyTransporter() 
    { transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email Server is ready to take our messages", success);
        }
      });
    }