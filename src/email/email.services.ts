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
  async sendEmail(email: string, text: string) {
    const info = await transporter.sendMail({
      from: 'alessandro.morales@galileo.edu',
      to: email,
      subject: 'mailchimp test',
      text
    });
  }
}

const svc = new MailChimpServices();
export default svc;
