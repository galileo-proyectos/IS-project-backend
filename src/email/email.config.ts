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

export default transporter
