// app/api/unsubscribe/route.js
import crypto from 'crypto'

export async function POST(req) {
  try {
    const { token, email } = await req.json()

    console.log('📧 Demande de désabonnement:', { token, email })

    // Validation
    if (!token && !email) {
      return new Response(JSON.stringify({
        error: 'Token ou email requis',
        success: false
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Décoder le token si fourni (le token peut être l'email encodé en base64)
    let emailToUnsubscribe = email
    if (token && !email) {
      try {
        emailToUnsubscribe = Buffer.from(token, 'base64').toString('utf-8')
      } catch (e) {
        console.error('❌ Token invalide:', e)
        return new Response(JSON.stringify({
          error: 'Token invalide',
          success: false
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailToUnsubscribe)) {
      return new Response(JSON.stringify({
        error: 'Email invalide',
        success: false
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    console.log('✅ Email à désabonner:', emailToUnsubscribe)

    // Envoi au CRM pour désabonnement
    try {
      const crmUrl = process.env.CRM_API_URL?.replace('/webhooks/resend', '/unsubscribe')
        || 'https://crm.alforis.fr/api/unsubscribe'
      const crmApiKey = process.env.CRM_API_KEY

      const response = await fetch(crmUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${crmApiKey}`,
        },
        body: JSON.stringify({
          email: emailToUnsubscribe,
          unsubscribed_at: new Date().toISOString(),
          source: 'web',
        }),
      })

      if (response.ok) {
        console.log('✅ Désabonnement envoyé au CRM')

        return new Response(JSON.stringify({
          success: true,
          message: 'Désabonnement réussi',
          email: emailToUnsubscribe
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      } else {
        const errorText = await response.text()
        console.error('⚠️ Erreur CRM:', response.status, errorText)

        return new Response(JSON.stringify({
          error: 'Erreur lors du désabonnement',
          success: false
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        })
      }
    } catch (crmError) {
      console.error('❌ Erreur envoi au CRM:', crmError.message)

      return new Response(JSON.stringify({
        error: 'Erreur serveur',
        success: false
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

  } catch (err) {
    console.error('❌ Erreur unsubscribe:', err)

    return new Response(JSON.stringify({
      error: err.message,
      success: false
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

// Méthode GET pour vérifier le token avant affichage
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    if (!token) {
      return new Response(JSON.stringify({
        error: 'Token manquant',
        valid: false
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Décoder le token pour vérifier qu'il est valide
    try {
      const email = Buffer.from(token, 'base64').toString('utf-8')
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (emailRegex.test(email)) {
        return new Response(JSON.stringify({
          valid: true,
          email: email
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      } else {
        return new Response(JSON.stringify({
          valid: false,
          error: 'Token invalide'
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }
    } catch (e) {
      return new Response(JSON.stringify({
        valid: false,
        error: 'Token corrompu'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

  } catch (err) {
    return new Response(JSON.stringify({
      error: err.message,
      valid: false
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
