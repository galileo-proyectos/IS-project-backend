import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.mandrillapp.com',
  port: 465,
  secure: true,
  auth: {
    user: 'alessandro.morales@galileo.edu',
    pass: process.env.MAILCHIMP_API_KEY
  }
});

export default class MailChimpServices {
  public static async sendEmail(subject: string, email: string, text: string) {
    await transporter.sendMail({
      from: 'alessandro.morales@galileo.edu',
      to: email,
      subject: subject,
      text
    });
  }

  public static async sendHTMLEmail(subject: string, email: string, html: string) {
    await transporter.sendMail({
      from: 'alessandro.morales@galileo.edu',
      to: email,
      subject,
      html
    });
  }
}
