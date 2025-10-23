// app/api/webhooks/resend/route.js
import { headers } from 'next/headers'
import crypto from 'crypto'

export async function POST(req) {
  try {
    console.log('🔔 Webhook Resend reçu')

    // 1. Récupération du corps de la requête
    const body = await req.text()
    const payload = JSON.parse(body)

    // 2. Vérification de la signature Resend (SÉCURITÉ IMPORTANTE)
    const headersList = await headers()
    const svixId = headersList.get('svix-id')
    const svixTimestamp = headersList.get('svix-timestamp')
    const svixSignature = headersList.get('svix-signature')

    if (svixId && svixTimestamp && svixSignature) {
      const signingSecret = process.env.RESEND_SIGNING_SECRET

      if (signingSecret) {
        // Construction du message signé (format Svix/Resend)
        const signedContent = `${svixId}.${svixTimestamp}.${body}`

        // Extraction du secret (format whsec_XXX)
        const secret = signingSecret.startsWith('whsec_')
          ? signingSecret.slice(7)
          : signingSecret

        // Calcul de la signature HMAC
        const expectedSignature = crypto
          .createHmac('sha256', Buffer.from(secret, 'base64'))
          .update(signedContent)
          .digest('base64')

        // Vérification (le header peut contenir plusieurs signatures v1,v2,...)
        const signatures = svixSignature.split(' ')
        const isValid = signatures.some(sig => {
          const [version, signature] = sig.split(',')
          return signature === expectedSignature
        })

        if (!isValid) {
          console.error('❌ Signature invalide - Webhook rejeté')
          return new Response(JSON.stringify({ error: 'Invalid signature' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          })
        }

        console.log('✅ Signature vérifiée')
      } else {
        console.warn('⚠️ RESEND_SIGNING_SECRET non configuré - signature non vérifiée')
      }
    }

    console.log('📝 Event type:', payload.type)
    console.log('📧 Email data:', payload.data)

    // 3. Extraction des données selon le type d'événement
    const eventType = payload.type
    const eventData = payload.data

    // Données communes pour tous les événements
    const webhookData = {
      event_type: eventType,
      email_id: eventData.email_id || 'N/A',
      to: Array.isArray(eventData.to) ? eventData.to[0] : eventData.to || 'N/A',
      from: eventData.from || 'N/A',
      subject: eventData.subject || 'N/A',
      created_at: eventData.created_at || new Date().toISOString(),
      timestamp: new Date().toISOString(),
    }

    // Données spécifiques selon le type d'événement
    switch (eventType) {
      case 'email.sent':
        // Email accepté par Resend pour envoi
        webhookData.status = 'sent'
        break

      case 'email.delivered':
        // Email bien livré au serveur destinataire
        webhookData.status = 'delivered'
        break

      case 'email.delivery_delayed':
        // Tentative de livraison retardée
        webhookData.status = 'delayed'
        webhookData.delay_reason = eventData.delay?.reason || 'unknown'
        break

      case 'email.failed':
        // Email n'a pas pu être envoyé (bounce ou erreur SMTP)
        webhookData.status = 'failed'
        webhookData.failure_reason = eventData.error?.message || 'unknown'
        webhookData.error_code = eventData.error?.code || 'N/A'
        break

      case 'email.bounced':
        // Email rejeté par le serveur destinataire
        webhookData.status = 'bounced'
        webhookData.bounce_type = eventData.bounce?.type || 'unknown'
        webhookData.bounce_reason = eventData.bounce?.message || 'N/A'
        break

      case 'email.opened':
        // Destinataire a ouvert l'email (pixel tracking)
        webhookData.status = 'opened'
        webhookData.opened_at = eventData.opened_at || new Date().toISOString()
        break

      case 'email.clicked':
        // Destinataire a cliqué sur un lien
        webhookData.status = 'clicked'
        webhookData.clicked_url = eventData.click?.link || 'N/A'
        webhookData.clicked_at = eventData.clicked_at || new Date().toISOString()
        break

      case 'email.complained':
        // Message signalé comme spam
        webhookData.status = 'complained'
        webhookData.complaint_type = eventData.complaint?.type || 'spam'
        break

      case 'email.scheduled':
        // Email planifié pour envoi futur
        webhookData.status = 'scheduled'
        webhookData.scheduled_at = eventData.scheduled_at || 'N/A'
        break

      default:
        // Événement non reconnu
        webhookData.status = 'unknown'
        console.warn('⚠️ Type d\'événement non géré:', eventType)
    }

    console.log('💾 Données préparées pour le CRM:', webhookData)

    // 4. Envoi direct au CRM via API
    try {
      const crmUrl = process.env.CRM_API_URL || 'https://crm.alforis.fr/api/webhooks/resend'
      const crmApiKey = process.env.CRM_API_KEY

      const response = await fetch(crmUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${crmApiKey}`, // ou 'X-API-Key': crmApiKey
        },
        body: JSON.stringify({
          event_type: webhookData.event_type,
          email_id: webhookData.email_id,
          to: webhookData.to,
          from: webhookData.from,
          subject: webhookData.subject,
          timestamp: webhookData.timestamp,
          data: eventData, // Données complètes de Resend
          ...webhookData, // Toutes les données extraites
        }),
      })

      if (response.ok) {
        console.log('✅ Événement envoyé au CRM')
      } else {
        const errorText = await response.text()
        console.error('⚠️ Erreur CRM:', response.status, errorText)
      }
    } catch (crmError) {
      console.error('⚠️ Erreur envoi au CRM (non-bloquant):', crmError.message)
      // On continue même si le CRM est inaccessible
    }

    // 5. Réponse de succès (important pour Resend)
    return new Response(JSON.stringify({
      success: true,
      received: true,
      event_type: eventType
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (err) {
    console.error('❌ Erreur webhook Resend:', err)

    // Réponse d'erreur
    return new Response(JSON.stringify({
      error: err.message,
      success: false
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

// Méthode GET pour vérification (optionnel)
export async function GET() {
  return new Response(JSON.stringify({
    status: 'Webhook Resend actif',
    endpoint: '/api/webhooks/resend',
    methods: ['POST']
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
