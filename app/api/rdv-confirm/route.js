// app/api/rdv-confirm/route.js
export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { saveRDV } from '../../../lib/airtable/saveRDV.js'
import { notifyAdminRDV, sendClientMailRDV } from '../../../lib/airtable/EmailServiceRDV.js'

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

  // Réponse au front
  // The endpoint should now return success if it has successfully received the data
  // and attempted the Airtable/email operations.
  return NextResponse.json({ success: true, message: "Booking data received and processed." });
}
