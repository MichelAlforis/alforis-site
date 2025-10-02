// lib/airtable/EmailServiceRDV.js

import { Resend } from 'resend'

// ✅ Logs propres (vert = succès, rouge = erreur)
function logSuccessMail(message) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`\x1b[32m✅ ${message}\x1b[0m`)
  }
}
function logErrorMail(message) {
  console.error(`\x1b[31m❌ ${message}\x1b[0m`)
}

// ✅ Email Admin — Nouvelle demande de RDV
export async function notifyAdminRDV({ fields }) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const to = 'michel.marques@alforis.fr'
  const subject = `📅 Nouvelle demande de RDV : ${fields.Nom || fields.nom || 'Sans nom'}`
  const html = `
    <h2>Nouvelle prise de rendez-vous</h2>
    <p><strong>Nom :</strong> ${fields.Nom || fields.nom || '-'}</p>
    <p><strong>Prénom :</strong> ${fields.Prenom || fields.prenom || '-'}</p>
    <p><strong>Email :</strong> ${fields.Email || fields.email || '-'}</p>
    <p><strong>Téléphone :</strong> ${fields.NumeroTelephone || fields.telephone || '-'}</p>
    <p><strong>Type :</strong> ${fields.type || '-'}</p>
    <p><strong>Date :</strong> ${fields.date || '-'}</p>
    <p><strong>Heure :</strong> ${fields.time || '-'}</p>
  `
  try {
    await resend.emails.send({ from: 'no-reply@alforis.fr', to, subject, html })
    logSuccessMail(`Email admin RDV envoyé à ${to}`)
  } catch (err) {
    logErrorMail(`Erreur envoi mail admin RDV : ${err.message}`)
  }
}

// ✅ Email Client — Confirmation prise de RDV
export async function sendClientMailRDV({ fields }) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const to = fields.Email || fields.email
  if (!to) return

  const subject = `🤝 Votre demande de RDV Alforis — Confirmation`
  const dateStr = fields.date
    ? new Date(fields.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
    : '-'
  const heureStr = fields.time || '-'

  // Crée un token ou juste encode les infos RDV dans l'URL (basique)
  const cancelToken = encodeURIComponent(
    `${fields.date || ''}|${fields.time || ''}|${to}`
  )
  const cancelLink = `https://alforis.fr/annulation-rdv?token=${cancelToken}`

  const html = `
    <h2>Bonjour ${fields.Prenom || fields.prenom || ''} ${fields.Nom || fields.nom || ''},</h2>
    <p>Nous avons bien reçu votre demande de rendez-vous <strong>${fields.type || ''}</strong> pour le <strong>${dateStr}</strong> à <strong>${heureStr}</strong>.</p>
    <p>Un membre de notre équipe vous confirmera ce créneau sous 24h.</p>
    <p>Si vous souhaitez <b>annuler ou déplacer ce rendez-vous</b> :<br>
      <a href="${cancelLink}" style="background:#E39F70;color:white;padding:10px 22px;border-radius:6px;text-decoration:none;">Gérer mon rendez-vous</a>
    </p>
    <hr>
    <small>— L’équipe Alforis</small>
  `
  try {
    await resend.emails.send({ from: 'no-reply@alforis.fr', to, subject, html })
    logSuccessMail(`Email client RDV envoyé à ${to}`)
  } catch (err) {
    logErrorMail(`Erreur envoi mail client RDV : ${err.message}`)
  }
}
