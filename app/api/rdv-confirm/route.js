// app/api/rdv-confirm/route.js
export const runtime = 'nodejs'

import { NextResponse } from 'next/server'

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
  // Lecture du JSON
  let data
  try {
    data = await req.json()
    // Basic validation for required fields from frontend
    if (!data || !data.type || !data.date || !data.time || !data.Email) {
        console.error('❌ Missing required fields in payload:', data)
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
  } catch (e) {
    console.error('❌ JSON invalide:', e)
    return NextResponse.json({ error: 'Payload JSON invalide' }, { status: 400 })
  }

  // Primary actions: Save to Airtable and send emails
  try {
    // Use calBookingUid from the request payload
    const calBookingUidFromRequest = data.calBookingUid || null;
    if (calBookingUidFromRequest === null) {
      console.warn('⚠️ Cal.com booking UID (calBookingUid) not found in request payload:', data);
    }

    const rdvDetails = `${data.type} - ${data.date} ${data.time}`;

    const fieldsForAirtable = {
      nom: data.Nom || data.nom || '', // Ensure fallback for all
      prenom: data.Prenom || data.prenom || '',
      telephone: data.NumeroTelephone || data.telephone || '',
      email: data.Email || data.email, // Already validated above, but good practice
      rdv: rdvDetails,
      calbookingid: calBookingUidFromRequest
    };

    try {
      await saveRDV(fieldsForAirtable);
    } catch (airtableError) {
      console.error('Error saving to Airtable:', airtableError);
      // Optionally, you might want to return a specific error if Airtable save is critical
      // For now, just logging as per original logic for secondary actions
    }

    try {
      // Ensure data passed to email functions has all necessary fields
      // The `data` object from req.json() is used directly here
      await notifyAdminRDV({ fields: data });
    } catch (adminEmailError) {
      console.error('Error sending admin notification:', adminEmailError);
    }

    try {
      await sendClientMailRDV({ fields: data });
    } catch (clientEmailError) {
      console.error('Error sending client confirmation email:', clientEmailError);
    }
  } catch (processingError) {
    // This outer try-catch handles any unexpected errors during the processing
    console.error('Error during booking data processing (Airtable/Email):', processingError);
    // Still return a success=false or a more specific error to the client if desired,
    // but for now, the prompt implies these are secondary.
    // However, if data.calBookingUid was missing, it's already logged.
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
  // The endpoint should now return success if it has successfully received the data
  // and attempted the Airtable/email operations.
  return NextResponse.json({ success: true, message: "Booking data received and processed." });
}
