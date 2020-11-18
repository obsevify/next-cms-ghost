import { NextApiRequest, NextApiResponse } from 'next'

import nodemailer from 'nodemailer'
import smtpTrans from 'nodemailer-smtp-transport'
import validator from 'email-validator'
import sanitize from 'sanitize-html'

interface SendEmailProps {
  name: string,
  email: string,
  subject: string,
  message: string
}

const smtp = {
  port: 465,
  secure: true,
  tls: { rejectUnauthorized: false },
  debug: false,
  host: process.env.SMTP_HOST || '',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  }
}

const transporter = nodemailer.createTransport(smtpTrans(smtp))

const sendEmail = async ({ name, email, subject, message }: SendEmailProps) => {
  const output = `
      <p>Hello,<p>
      <p>You got a new contact request.</p>
      <h3>Contact Details</h3>
      <ul><li>Name: ${name}</li><li>Email: ${email}</li></ul>
      <h3>Message:</h3>
      <p>${message}</p>
  `
  const sendData = {
    from: process.env.EMAIL_FROM || '',
    to: process.env.EMAIL_TO || '',
    subject: 'MY BLOG - ' + (subject && subject.toUpperCase()),
    html: sanitize(output, {
      allowedTags: sanitize.defaults.allowedTags.concat(['img'])
    })
  }
  return await transporter.sendMail(sendData)
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse | void> => {

  if (req.method !== 'POST') {
    return res.status(400).json({
      error: 400,
      message: 'Wrong request method.'
    })
  }

  const { body } = req
  if (!validator.validate(body.email)) {
    return res.status(400).json({
      error: 400,
      message: 'Wrong email.'
    })
  }

  try {
    await sendEmail(body)
  } catch (error) {
    console.warn(error)
    return res.status(404).json({
      error: 404,
      message: 'Sending message failed.'
    })
  }

  res.json({ status: "ok" })
}