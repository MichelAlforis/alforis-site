// app/api/unsubscribe/route.js
import jwt from 'jsonwebtoken'

export async function POST(req) {
  try {
    const { token } = await req.json()

    console.log('📧 Demande de désabonnement avec token JWT')

    // Validation
    if (!token) {
      return new Response(JSON.stringify({
        error: 'Token requis',
        success: false
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Décoder et vérifier le token JWT
    let decoded
    try {
      const jwtSecret = process.env.JWT_SECRET
      if (!jwtSecret) {
        console.error('❌ JWT_SECRET non configuré')
        return new Response(JSON.stringify({
          error: 'Configuration serveur incorrecte',
          success: false
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      decoded = jwt.verify(token, jwtSecret)
      console.log('✅ Token JWT décodé:', decoded)
    } catch (err) {
      console.error('❌ Token JWT invalide:', err.message)

      if (err.name === 'TokenExpiredError') {
        return new Response(JSON.stringify({
          error: 'Le lien de désabonnement a expiré',
          success: false
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      return new Response(JSON.stringify({
        error: 'Token invalide',
        success: false
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Extraire les données du JWT
    const { email, send_id, type } = decoded

    // Validation du type
    if (type !== 'unsubscribe') {
      return new Response(JSON.stringify({
        error: 'Type de token invalide',
        success: false
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({
        error: 'Email invalide',
        success: false
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    console.log('✅ Email à désabonner:', email, 'send_id:', send_id)

    // Envoi au CRM pour désabonnement
    try {
      const crmBaseUrl = process.env.CRM_API_URL || 'https://crm.alforis.fr/api/v1'
      const crmUrl = `${crmBaseUrl}/unsubscribe`
      const crmApiKey = process.env.CRM_API_KEY

      const response = await fetch(crmUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${crmApiKey}`,
        },
        body: JSON.stringify({
          email: email,
          send_id: send_id,
          unsubscribed_at: new Date().toISOString(),
          source: 'web',
        }),
      })

      if (response.ok) {
        console.log('✅ Désabonnement envoyé au CRM')

        return new Response(JSON.stringify({
          success: true,
          message: 'Désabonnement réussi',
          email: email
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
      const jwtSecret = process.env.JWT_SECRET
      if (!jwtSecret) {
        return new Response(JSON.stringify({
          valid: false,
          error: 'Configuration serveur incorrecte'
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      const decoded = jwt.verify(token, jwtSecret)
      const { email, send_id, type } = decoded

      if (type !== 'unsubscribe') {
        return new Response(JSON.stringify({
          valid: false,
          error: 'Type de token invalide'
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (emailRegex.test(email)) {
        return new Response(JSON.stringify({
          valid: true,
          email: email,
          send_id: send_id
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      } else {
        return new Response(JSON.stringify({
          valid: false,
          error: 'Email invalide dans le token'
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return new Response(JSON.stringify({
          valid: false,
          error: 'Token expiré',
          expired: true
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      return new Response(JSON.stringify({
        valid: false,
        error: 'Token corrompu ou invalide'
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
