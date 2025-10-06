import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import validator from 'validator'
import { checkRateLimit } from '@/lib/rateLimit'

const resend = new Resend(process.env.RESEND_API_KEY)

// Schéma de validation
const contactSchema = z.object({
  nom: z.string().min(2).max(50),
  prenom: z.string().min(2).max(50),
  email: z.string().email(),
  telephone: z.string().optional(),
  societe: z.string().max(100).optional(),
  message: z.string().min(10).max(1000)
})

export async function POST(request) {
  try {
    // 1. Rate limiting par IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    if (!checkRateLimit(ip, 3, 60000)) {
      return NextResponse.json(
        { error: 'Trop de tentatives. Réessayez dans 1 minute.' },
        { status: 429 }
      )
    }

    // 2. Parsing
    const body = await request.json()
    
    // 3. HONEYPOT CHECK - Ajoutez ces 3 lignes ici
    if (body.website) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 })
    }

    // 4. Validation
    const data = contactSchema.parse(body)

    // 5. Nettoyage des données
    const cleaned = {
      nom: validator.escape(data.nom.trim()),
      prenom: validator.escape(data.prenom.trim()),
      email: validator.normalizeEmail(data.email),
      telephone: data.telephone ? validator.escape(data.telephone.trim()) : '',
      societe: data.societe ? validator.escape(data.societe.trim()) : '',
      message: validator.escape(data.message.trim())
    }

    // 6. Détection basique de spam
    const spamKeywords = ['viagra', 'casino', 'crypto', 'bitcoin', 'loan']
    const hasSpam = spamKeywords.some(keyword => 
      cleaned.message.toLowerCase().includes(keyword)
    )
    
    if (hasSpam) {
      return NextResponse.json(
        { error: 'Message rejeté' },
        { status: 400 }
      )
    }

    // 7. Envoi des emails
    await resend.emails.send({
      from: 'Alforis B2B <contact@alforis.fr>',
      to: 'michel.marques@alforis.fr',
      subject: `Nouveau contact B2B - ${cleaned.societe || 'Sans société'}`,
      html: `
        <h2>Nouveau message de contact B2B</h2>
        <p><strong>Nom:</strong> ${cleaned.prenom} ${cleaned.nom}</p>
        <p><strong>Email:</strong> ${cleaned.email}</p>
        <p><strong>Téléphone:</strong> ${cleaned.telephone || 'Non renseigné'}</p>
        <p><strong>Société:</strong> ${cleaned.societe || 'Non renseignée'}</p>
        <p><strong>Message:</strong></p>
        <p>${cleaned.message}</p>
        <hr>
        <small>IP: ${ip}</small>
      `
    })

    await resend.emails.send({
      from: 'Alforis <contact@alforis.fr>',
      to: cleaned.email,
      subject: 'Votre message a bien été reçu - Alforis',
      html: `
        <p>Bonjour ${cleaned.prenom},</p>
        <p>Nous avons bien reçu votre message et nous vous répondrons dans les 24 heures.</p>
        <p>À très bientôt,<br/>L'équipe Alforis</p>
      `
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}