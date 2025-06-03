// app/api/rdv-confirm/route.js
export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { saveRDV } from '../../../lib/airtable/saveRDV.js'
import { notifyAdminRDV, sendClientMailRDV } from '../../../lib/airtable/EmailServiceRDV.js'

const CAL_API_KEY = process.env.CAL_COM_TOKEN
const EVENT_TYPE_IDS = {
  appel:       '2283473',
  visio:       '2283484',
  patrimonial: '2283489'
}

function toUTC(date, time) {
  return new Date(`${date}T${time}:00+02:00`).toISOString()
}

async function createCalBooking(data) {
  const {
    type,
    date,
    time,
    Nom, nom,
    Prenom, prenom,
    Email, email,
    NumeroTelephone, telephone
  } = data

  const eventTypeId = EVENT_TYPE_IDS[type]
  if (!eventTypeId) {
    throw new Error('Type de RDV inconnu pour Cal.com')
  }

  // Calcul de l’heure de début en ISO UTC
  const startISO = toUTC(date, time)

  // Préparation de l’invité
  const attendeeEmail = Email || email || ''
  const attendeePhone = NumeroTelephone || telephone || ''
  const name = [Prenom || prenom, Nom || nom].filter(Boolean).join(' ')

  // Payload v2 (sans end ni lengthInMinutes), avec champ location pour physique
  const payload = {
    eventTypeId: Number(eventTypeId),
    start:       startISO,
    metadata:    { source: 'site web' },
    attendee: {
      name,
      email:       attendeeEmail,
      phoneNumber: attendeePhone,
      timeZone:    'Europe/Paris',
      language:    'fr'
    },
    // Spécifier le lieu pour les RDV physiques
    ...(type === 'patrimonial' && {
      location: {
        type: 'in_person',
        location: 'Adresse à renseigner'  // <— Remplacez par votre lieu
      }
    })
  }

  const res = await fetch('https://api.cal.com/v2/bookings', {
    method: 'POST',
    headers: {
      'Content-Type':    'application/json',
      'Authorization':   `Bearer ${CAL_API_KEY}`,
      'cal-api-version': '2024-08-13'
    },
    body: JSON.stringify(payload)
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`Cal.com ${res.status} — ${txt}`)
  }
  return res.json()
}

export async function POST(req) {
  // Vérification de la clé Cal.com
  if (!CAL_API_KEY) {
    console.error('❌ Clé Cal.com manquante')
    return NextResponse.json({ error: 'Clé Cal.com manquante' }, { status: 500 })
  }

  // Lecture du JSON
  let data
  try {
    data = await req.json()
  } catch (e) {
    console.error('❌ JSON invalide:', e)
    return NextResponse.json({ error: 'Payload JSON invalide' }, { status: 400 })
  }

  // Création du booking sur Cal.com
  let booking
  try {
    booking = await createCalBooking(data)
  } catch (e) {
    console.error('❌ Erreur Cal.com :', e)
    if (e.message.includes('not available') || e.message.includes('already has booking')) {
      return NextResponse.json({ error: 'Ce créneau n’est plus disponible.' }, { status: 409 })
    }
    return NextResponse.json({ error: e.message }, { status: 500 })
  }

  // Secondary actions: Save to Airtable and send emails
  try {
    const calbookingid = booking?.uid || booking?.id || null
    if (calbookingid === null) {
      console.warn('⚠️ Cal.com booking ID (uid or id) not found in response:', booking)
    }

    const rdvDetails = `${data.type} - ${data.date} ${data.time}`

    const fieldsForAirtable = {
      nom: data.Nom || data.nom,
      prenom: data.Prenom || data.prenom,
      telephone: data.NumeroTelephone || data.telephone,
      email: data.Email || data.email,
      rdv: rdvDetails,
      calbookingid: calbookingid
    }

    try {
      await saveRDV(fieldsForAirtable)
    } catch (airtableError) {
      console.error('Error saving to Airtable:', airtableError)
    }

    try {
      await notifyAdminRDV({ fields: data })
    } catch (adminEmailError) {
      console.error('Error sending admin notification:', adminEmailError)
    }

    try {
      await sendClientMailRDV({ fields: data })
    } catch (clientEmailError) {
      console.error('Error sending client confirmation email:', clientEmailError)
    }
  } catch (secondaryActionsError) {
    // Log errors from secondary actions but do not let them block the primary success response
    console.error('Error during secondary actions (Airtable/Email):', secondaryActionsError)
  }

  // Réponse au front
  return NextResponse.json({ success: true, booking })
}
