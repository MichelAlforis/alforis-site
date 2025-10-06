import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.EMAIL_FROM || 'no-reply@alforis.fr'
const ADMIN = process.env.EMAIL_ADMIN || 'michel.marques@alforis.fr'

function logSuccess(message) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`\x1b[32m✅ ${message}\x1b[0m`)
  }
}

function logError(message) {
  console.error(`\x1b[31m❌ ${message}\x1b[0m`)
}

const TYPE_LABELS = {
  partenariat: 'Partenariat Stratégique',
  decouverte: 'Découverte Solutions',
  info: 'Information TPM'
}

export async function notifyAdminB2B({
  nom,
  prenom,
  email,
  telephone,
  entreprise,
  fonction,
  type,
  date,
  heure
}) {
  const typeLabel = TYPE_LABELS[type] || type
  const subject = `Nouveau RDV B2B (${typeLabel}) - ${entreprise || nom}`
  
  const dateFormatted = new Date(date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #4A5568 0%, #2D3748 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
    .content { background: #f7f7f7; padding: 30px; border-radius: 0 0 8px 8px; }
    .info-block { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #C8A765; }
    .label { font-weight: bold; color: #4A5568; }
    .value { color: #2D3748; }
    .footer { text-align: center; margin-top: 30px; color: #718096; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">Nouvelle demande B2B</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">${typeLabel}</p>
    </div>
    <div class="content">
      <div class="info-block">
        <p><span class="label">Contact :</span> <span class="value">${prenom} ${nom}</span></p>
        <p><span class="label">Email :</span> <span class="value">${email}</span></p>
        <p><span class="label">Téléphone :</span> <span class="value">${telephone || '-'}</span></p>
      </div>
      
      <div class="info-block">
        <p><span class="label">Entreprise :</span> <span class="value">${entreprise || '-'}</span></p>
        <p><span class="label">Fonction :</span> <span class="value">${fonction || '-'}</span></p>
      </div>
      
      <div class="info-block">
        <p><span class="label">Date :</span> <span class="value">${dateFormatted}</span></p>
        <p><span class="label">Heure :</span> <span class="value">${heure}</span></p>
      </div>
    </div>
    <div class="footer">
      <p>Système de gestion des RDV Alforis B2B</p>
    </div>
  </div>
</body>
</html>
  `

  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
      reply_to: email,
      to: ADMIN,
      subject,
      html
    })

    if (error) throw error
    logSuccess(`Email admin envoyé à ${ADMIN} (${data?.id || 'OK'})`)
    return data
  } catch (err) {
    logError(`Erreur envoi mail admin B2B : ${err.message}`)
    throw err
  }
}

export async function sendClientMailB2B({
  nom,
  prenom,
  email,
  type,
  date,
  heure
}) {
  if (!email) {
    logError('Aucun email client fourni')
    return
  }

  const typeLabel = TYPE_LABELS[type] || type
  const subject = `Confirmation de votre rendez-vous avec Alforis`
  
  const dateFormatted = new Date(date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #C8A765 0%, #B89656 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
    .content { background: #f7f7f7; padding: 30px; border-radius: 0 0 8px 8px; }
    .highlight-box { background: white; padding: 25px; margin: 20px 0; border-radius: 8px; border: 2px solid #C8A765; text-align: center; }
    .date-time { font-size: 24px; font-weight: bold; color: #4A5568; margin: 10px 0; }
    .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #718096; font-size: 14px; }
    .btn { display: inline-block; background: #C8A765; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">Rendez-vous confirmé</h1>
    </div>
    <div class="content">
      <p>Bonjour ${prenom} ${nom},</p>
      
      <p>Nous avons bien reçu votre demande de rendez-vous pour un <strong>${typeLabel}</strong>.</p>
      
      <div class="highlight-box">
        <p style="margin: 0; color: #718096;">Rendez-vous programmé le</p>
        <div class="date-time">${dateFormatted}</div>
        <div class="date-time" style="font-size: 20px;">à ${heure}</div>
      </div>
      
      <p>Un membre de notre équipe vous contactera sous <strong>24h ouvrées</strong> pour confirmer ce créneau et préparer notre échange.</p>
      
      <p>En attendant, n'hésitez pas à consulter nos ressources B2B :</p>
      <a href="https://alforis.fr/b2b/ressources" class="btn">Accéder aux ressources</a>
      
      <p>À très bientôt,</p>
      <p><strong>L'équipe Alforis</strong></p>
    </div>
    <div class="footer">
      <p>Alforis - Gestion de patrimoine et solutions B2B</p>
      <p style="font-size: 12px; margin-top: 10px;">
        Si vous souhaitez annuler ou reporter ce rendez-vous, répondez simplement à cet email.
      </p>
    </div>
  </div>
</body>
</html>
  `

  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
      reply_to: ADMIN,
      to: email,
      subject,
      html
    })

    if (error) throw error
    logSuccess(`Email client envoyé à ${email} (${data?.id || 'OK'})`)
    return data
  } catch (err) {
    logError(`Erreur envoi mail client B2B : ${err.message}`)
    throw err
  }
}