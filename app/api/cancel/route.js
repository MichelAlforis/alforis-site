// /api/cancel
import Airtable from 'airtable'

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE)

export async function POST(request) {
  const { email, date } = await request.json()
  const safeEmail = email.replace(/'/g, "\\'")
  const safeDate = date.replace(/'/g, "\\'")

  try {
    const records = await base('RDV').select({
      filterByFormula: `AND({Email} = '${safeEmail}', {Date} = '${safeDate}')`,
      maxRecords: 1,
    }).firstPage()

    if (records.length === 0) {
      return NextResponse.json({ error: 'RDV non trouvé' }, { status: 404 })
    }

    await base('RDV').destroy(records[0].id)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Erreur annulation RDV:', err)
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 })
  }
}