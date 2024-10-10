'use server'

import { z } from 'zod'
import { ContactFormSchema } from '@/lib/schemas'
import { renderContactFormEmail } from '@/emails/contact-form-email'
import Mail from 'nodemailer/lib/mailer'
import { emailTransport } from '@/emails/email-config'

type ContactFormInputs = z.infer<typeof ContactFormSchema>

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data)
  
  if (result.error) {
    return { error: result.error.format() }
  }

  try {
    const { name, email, message } = result.data

    const emailHtml = renderContactFormEmail({ name, email, message });

    const mailOptions: Mail.Options = {
      from: process.env.EMAIL_ADDRESS,
      to: [email],
      cc: process.env.EMAIL_ADDRESS,
      subject: 'Contact form submission',
      html: emailHtml
    }

    await emailTransport.sendMail(mailOptions)

    return { success: true }
  } catch (error) {
    return { error }
  }
}
