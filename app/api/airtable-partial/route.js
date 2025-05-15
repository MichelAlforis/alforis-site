import { sendPartialToAirtable } from '@/app/api/airtableAPI/route' // ajusté au bon chemin
import Airtable from 'airtable'

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
const tableName = process.env.AIRTABLE_TABLE_NAME

export async function POST(req) {
  try {
    const data = await req.json()

    // Vérifie si l'email existe déjà dans Airtable
    const existing = await base(tableName)
      .select({
        filterByFormula: `{Email} = '${data.Email}'`,
        maxRecords: 1,
      })
      .firstPage()

    if (existing.length > 0) {
      return Response.json({ id: existing[0].id })
    }

    const recordId = await sendPartialToAirtable(data)
    return Response.json({ id: recordId })

  } catch (err) {
    console.error('❌ API Airtable Partial:', err)
    return new Response(JSON.stringify({ error: err.message || 'Erreur serveur' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
