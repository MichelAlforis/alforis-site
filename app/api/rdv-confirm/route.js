// app/api/rdv-confirm/route.js
export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { saveRDV } from '@/lib/airtable/saveRDV'
import { notifyAdminRDV, sendClientMailRDV } from '@/lib/airtable/EmailServiceRDV'

const CAL_API_KEY = process.env.CAL_COM_TOKEN

const EVENT_TYPE_IDS = {
  appel:       '2283473',
  visio:       '2283484',
  patrimonial: '2283489'
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
  const [h, m] = time.split(':').map(Number)
  const local    = new Date(`${date}T${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:00`)
  const startISO = local.toISOString()

  // Préparation de l’invité
  const attendeeEmail = Email || email || ''
  const attendeePhone = NumeroTelephone || telephone || ''
  const name = [Prenom||prenom, Nom||nom].filter(Boolean).join(' ')

  // Payload v2 (sans end ni lengthInMinutes)
  const payload = {
    eventTypeId: Number(eventTypeId),
    start:       startISO,
    attendee: {
      name,
      email:       attendeeEmail,
      phoneNumber: attendeePhone,
      timeZone:    'Europe/Paris',
      language:    'fr'
    },
    metadata: { source: 'site web' }
  }

  // Appel à Cal.com v2
  const res = await fetch('https://api.cal.com/v2/bookings', {
    method: 'POST',
    headers: {
      'Content-Type':     'application/json',
      'Authorization':    `Bearer ${CAL_API_KEY}`,
      'cal-api-version':  '2024-08-13'
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
  // Vérification de la clé
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
    // Cas de créneau déjà pris
    if (e.message.includes('not available') || e.message.includes('already has booking')) {
      return NextResponse.json(
        { error: 'Ce créneau n’est plus disponible. Veuillez en choisir un autre.' },
        { status: 409 }
      )
    }
    return NextResponse.json({ error: e.message }, { status: 500 })
  }

  // Sauvegarde dans Airtable
  const rdvStr = `${data.type} le ${data.date} à ${data.time}`
  try {
    await saveRDV({
      nom:          data.Nom || data.nom || '',
      prenom:       data.Prenom || data.prenom || '',
      telephone:    data.NumeroTelephone || data.telephone || '',
      email:        data.Email || data.email || '',
      rdv:          rdvStr,
      calbookingid: booking.id
    })
  } catch (e) {
    console.error('❌ Erreur Airtable :', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }

  // Notifications (non bloquantes)
  notifyAdminRDV({ fields: data }).catch(console.error)
  sendClientMailRDV({ fields: data }).catch(console.error)

  // Retour au front
  return NextResponse.json({ success: true, booking })
}
