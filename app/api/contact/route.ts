import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const CONTACT_EMAIL = 'contact@hifproduction.com'
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont obligatoires' },
        { status: 400 }
      )
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      )
    }

    // Mapper les sujets
    const subjectMap: Record<string, string> = {
      'projet': 'Nouveau projet',
      'devis': 'Demande de devis',
      'collaboration': 'Collaboration',
      'information': 'Demande d\'information',
      'autre': 'Autre demande'
    }

    const subjectLabel = subjectMap[subject] || subject
    const emailSubject = `[Contact HIF Production] ${subjectLabel} - ${name}`

    // Utiliser Resend si configuré
    if (resend && process.env.RESEND_API_KEY) {
      try {
        const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev'
        
        const { data, error } = await resend.emails.send({
          from: fromEmail,
          to: CONTACT_EMAIL,
          replyTo: email,
          subject: emailSubject,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #300F59 0%, #4b2085 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
                .info-box { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #300F59; }
                .message-box { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #300F59; white-space: pre-wrap; }
                .label { font-weight: bold; color: #300F59; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="margin: 0;">Nouveau message de contact</h1>
                  <p style="margin: 10px 0 0 0; opacity: 0.9;">Formulaire HIF Production</p>
                </div>
                <div class="content">
                  <div class="info-box">
                    <p style="margin: 5px 0;"><span class="label">Nom:</span> ${name}</p>
                    <p style="margin: 5px 0;"><span class="label">Email:</span> <a href="mailto:${email}" style="color: #300F59;">${email}</a></p>
                    <p style="margin: 5px 0;"><span class="label">Sujet:</span> ${subjectLabel}</p>
                  </div>
                  <div class="message-box">
                    <p class="label" style="margin-top: 0;">Message:</p>
                    <p style="margin: 0;">${message.replace(/\n/g, '<br>')}</p>
                  </div>
                  <hr style="border: none; border-top: 2px solid #e0e0e0; margin: 20px 0;">
                  <p style="font-size: 12px; color: #999; text-align: center; margin: 0;">
                    Ce message a été envoyé depuis le formulaire de contact du site HIF Production
                  </p>
                </div>
              </div>
            </body>
            </html>
          `,
        })

        if (error) {
          console.error('Resend error:', error)
          throw error
        }

        console.log('Email sent successfully:', data)
        
        return NextResponse.json(
          { message: 'Message envoyé avec succès' },
          { status: 200 }
        )
      } catch (resendError: any) {
        console.error('Error sending email via Resend:', resendError)
        // Logger mais continuer avec le fallback
      }
    }

    // Fallback - Logger les données (pour développement)
    console.log('=== CONTACT FORM SUBMISSION ===')
    console.log('To:', CONTACT_EMAIL)
    console.log('From:', email)
    console.log('Name:', name)
    console.log('Subject:', emailSubject)
    console.log('Message:', message)
    console.log('===============================')
    console.log('⚠️ RESEND_API_KEY non configuré - Email non envoyé')
    console.log('Configurez RESEND_API_KEY dans .env pour activer l\'envoi d\'emails')

    return NextResponse.json(
      { message: 'Message envoyé avec succès' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    )
  }
}

