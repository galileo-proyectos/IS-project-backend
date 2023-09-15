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

class MailChimpServices {
  async sendEmail(subject: string, email: string, text: string) {
    await transporter.sendMail({
      from: 'alessandro.morales@galileo.edu',
      to: email,
      subject: subject,
      text
    });
  }

  async sendHTMLEmail(subject: string, email: string, html: string) {
    await transporter.sendMail({
      from: 'alessandro.morales@galileo.edu',
      to: email,
      subject,
      html
    });
  }
}

const svc = new MailChimpServices();
export default svc;
