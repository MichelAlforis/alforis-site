import { Resend } from 'resend'

// ✅ Logs propres avec couleurs
function logSuccessMail(message) {
  if (process.env.NODE_ENV === 'development') {  // Seulement en dev
    console.log(`\x1b[32m✅ ${message}\x1b[0m`)
  }
}

function logErrorMail(message) {
  console.error(`\x1b[31m❌ ${message}\x1b[0m`)  // Toujours logguer les erreurs
}

// ✅ Envoi mail Admin
export async function notifyAdmin(record) {
  const resend = new Resend(process.env.RESEND_API_KEY || 're_BvtdDGFw_EVhj4vySZXkqSoZACa6sT3hi')
  const to = 'michel.marques@alforis.fr'
  const subject = `📬 Nouvelle fiche profil : ${record.fields?.Nom || 'Sans nom'}`

  const html = `
    <h2>Nouvelle fiche complétée</h2>
    <p><strong>Nom :</strong> ${record.fields?.Nom || '-'}</p>
    <p><strong>Email :</strong> ${record.fields?.Email || '-'}</p>
    <p><strong>Profil :</strong> ${record.fields?.Profil || '-'}</p>
    <p><strong>Age :</strong> ${record.fields?.Age || '-'}</p>
    <p><strong>Phrase Libre :</strong><br>${record.fields?.PhraseLibre || '-'}</p>
    <p><strong>Téléphone :</strong> ${record.fields?.NumeroTelephone || '-'}</p>
  `

  try {
    await resend.emails.send({ from: 'no-reply@alforis.fr', to, subject, html })
    logSuccessMail(`Email admin envoyé à ${to}`)
  } catch (err) {
    logErrorMail(`Erreur envoi mail admin : ${err.message}`)
  }
}

// ✅ Envoi mail Client
export async function sendClientMail(record) {
  const to = record.fields?.Email;
  if (!to) return;

  const subject = `🎯 Votre profil patrimonial Alforis : ${record.fields?.Profil || ''}`;
  
  const confirmationLink = `https://alforis.fr/confirmation-email?id=${record.id}`;

  const html = `
    <h2>Bonjour ${record.fields?.Nom || ''},</h2>
    <p>Merci pour votre confiance.</p>
    <p>Nous avons analysé vos réponses et votre profil correspond à :</p>
    <h3>${record.fields?.Profil || 'Votre profil'}</h3>
    <p><strong>Pour confirmer votre email et continuer avec nous :</strong></p>
    <p><a href="${confirmationLink}" style="background-color:#C8A765; color:white; padding:10px 20px; text-decoration:none; border-radius:5px;">Confirmer mon email</a></p>
    <p><em>Nous vous enverrons ensuite une analyse plus détaillée.</em></p>
    <p>✉️ Si vous souhaitez vous désinscrire de nos communications, il suffit de répondre STOP par mail.</p>
    <p>— L'équipe Alforis</p>
  `;

  try {
    await resend.emails.send({ from: 'no-reply@alforis.fr', to, subject, html });
    logSuccessMail(`Email client envoyé à ${to}`)
  } catch (err) {
    logErrorMail(`Erreur envoi mail client : ${err.message}`)
  }
}
