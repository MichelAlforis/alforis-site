import { NextResponse } from 'next/server'
import { saveRDV } from '@/lib/airtable/saveRDV'
import { notifyAdminRDV, sendClientMailRDV } from '@/lib/airtable/EmailServiceRDV'

const CAL_API_KEY = process.env.CAL_COM_TOKEN

const EVENT_TYPE_IDS = {
  appel: '2283473',
  visio: '2283484',
  patrimonial: '2283489'
}

async function createCalBooking({ type, date, time, Nom, nom, Prenom, prenom, Email, email, NumeroTelephone, telephone }) {
  const eventTypeId = EVENT_TYPE_IDS[type]
  if (!eventTypeId) throw new Error('Type de RDV inconnu pour Cal.com')
  const startDateTime = `${date}T${time}:00` // ex: 2025-06-01T10:15:00
  const name = `${Prenom || prenom || ''} ${Nom || nom || ''}`.trim()
  const attendeeEmail = Email || email
  const attendeePhone = NumeroTelephone || telephone

  // Cal.com booking API
  const res = await fetch('https://api.cal.com/v1/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CAL_API_KEY}`,
    },
    body: JSON.stringify({
      eventTypeId: Number(eventTypeId),
      title: `RDV ${type}`,
      description: `RDV demandé via le tunnel Alforis.`,
      start: startDateTime,
      attendees: [
        { email: attendeeEmail, name, phone: attendeePhone }
      ]
    })
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Cal.com: ${res.status} ${errorText}`)
  }
  return res.json()
}

export async function POST(req) {
  try {
    const data = await req.json()

    // Normalise les champs pour Airtable
    const rdvStr = `${data.type} le ${data.date} à ${data.time}`
    await saveRDV({
      nom: data.Nom || data.nom || '',
      prenom: data.Prenom || data.prenom || '',
      telephone: data.NumeroTelephone || data.telephone || '',
      email: data.Email || data.email || '',
      rdv: rdvStr,
    })

    // Crée le RDV sur Cal.com
    const booking = await createCalBooking(data)

    // Notifications (optionnel)
await notifyAdminRDV({ fields: data })
await sendClientMailRDV({ fields: data })

    // On peut renvoyer le booking Cal.com pour log ou future confirmation
    return NextResponse.json({ success: true, booking })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
