import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.mandrillapp.com',
  port: 465,
  secure: true,
  auth: {
    user: 'alessandro.morales@galileo.edu',
    pass: process.env.MAILCHIMP_API_KEY
  }
})

export async function sendEmail (subject: string, email: string, text: string): Promise<void> {
  await transporter.sendMail({
    from: 'alessandro.morales@galileo.edu',
    to: email,
    subject,
    text
  })
}

export async function sendHTMLEmail (subject: string, email: string, html: string): Promise<void> {
  await transporter.sendMail({
    from: 'alessandro.morales@galileo.edu',
    to: email,
    subject,
    html
  })
}
