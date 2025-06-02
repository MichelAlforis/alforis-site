// app/api/airtable-update/route.js

export async function PATCH(req) {
  try {
    const { default: Airtable } = await import('airtable')
    const base = new Airtable({ apiKey: process.env.AIRTABLE_CRM_API_KEY })
      .base(process.env.AIRTABLE_CRM_BASE_ID)
    const tableName = process.env.AIRTABLE_CRM_TABLE_NAME

    const { id, fields } = await req.json()
    if (!id || !fields) {
      return new Response(
        JSON.stringify({ error: 'ID ou fields manquants.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    await base(tableName).update([{ id, fields }])
    return Response.json({ success: true })
  } catch (err) {
    console.error('❌ API Airtable Update:', err)
    return new Response(
      JSON.stringify({ error: err.message || 'Erreur serveur' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
