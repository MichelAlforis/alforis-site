import { NextResponse } from 'next/server'
import Airtable from 'airtable'
import { Resend } from 'resend'

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)

const CAL_API_KEY = process.env.CAL_COM_TOKEN

// Helper : trouve le record à supprimer selon date, time, email, et récupère le bookingId Cal.com
async function findAndDeleteRDV({ date, time, email }) {
  return new Promise((resolve, reject) => {
    const filter = `AND({EMAIL} = '${email}', FIND('${date}', {RDV}), FIND('${time}', {RDV}))`
    base('RDV').select({ filterByFormula: filter, maxRecords: 1 }).firstPage((err, records) => {
      if (err) return reject(err)
      if (records.length) {
        const recordId = records[0].id
        const calbookingid = records[0].get('CALBOOKINGID')
        base('RDV').destroy(recordId, (delErr, deletedRecord) => {
          if (delErr) return reject(delErr)
          resolve(calbookingid)
        })
      } else {
        resolve(null)
      }
    })
  })
}

async function cancelCalBooking(bookingId) {
  if (!bookingId) return false
  const res = await fetch(`https://api.cal.com/v1/bookings/${bookingId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${CAL_API_KEY}`
    }
  })
  return res.ok
}

export async function POST(req) {
  const { date, time, email } = await req.json()

  // 1. Supprime dans Airtable & récupère l'ID Cal.com
  let calbookingid = null
  try {
    calbookingid = await findAndDeleteRDV({ date, time, email })
  } catch (e) {
    return NextResponse.json({ error: "Erreur Airtable : " + e.message }, { status: 500 })
  }

  // 2. Annule sur Cal.com si possible
  let calCancelOK = false
  if (calbookingid) {
    try {
      calCancelOK = await cancelCalBooking(calbookingid)
    } catch (err) {
      // log ou ignore
    }
  }

  // 3. Notifie admin
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'no-reply@alforis.fr',
      to: 'michel.marques@alforis.fr',
      subject: `⛔️ Annulation RDV par client`,
      html: `<p>Le client <b>${email}</b> a annulé son RDV du ${date} à ${time}.</p>
      <ul>
        <li>Supprimé dans Airtable : ${!!calbookingid ? 'OUI' : 'NON'}</li>
        <li>Supprimé dans Cal.com : ${calCancelOK ? 'OUI' : 'NON (ou pas trouvé)'}</li>
      </ul>`
    })
  } catch (err) {
    // log ou ignore
  }

  return NextResponse.json({ ok: true, calCancelOK })
}
