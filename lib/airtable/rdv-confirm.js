// app/api/rdv-confirm/route.js
import { NextResponse } from 'next/server'
import { sendPartialToAirtable } from '@/lib/airtable/airtableAPI'
import { notifyAdmin, sendClientMail } from '@/lib/airtable/EmailService'

export async function POST(req) {
  try {
    const data = await req.json()
    const recordId = await sendPartialToAirtable(data)
    // Optionnel : Notifie admin & envoie mail
    await notifyAdmin({ fields: data })
    await sendClientMail({ fields: data })
    return NextResponse.json({ success: true, id: recordId })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
