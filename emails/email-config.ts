import nodemailer from 'nodemailer';

export const emailTransport = nodemailer.createTransport({
  service: 'gmail',
  /* 
      setting service as 'gmail' is same as providing these setings:

      host: "smtp.gmail.com",
      port: 465,
      secure: true
      
      If you want to use a different email provider other than gmail, you need to provide these manually.
      Or you can go use these well known services and their settings at
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  */
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});