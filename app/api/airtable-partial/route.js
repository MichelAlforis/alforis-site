// app/api/airtable-partial/route.js

export async function POST(req) {
  try {
    // Dynamic import pour ne pas exiger la clé à la build
    const { default: Airtable } = await import('airtable')

    // Instantiation au runtime
    const base = new Airtable({ apiKey: process.env.AIRTABLE_CRM_API_KEY })
      .base(process.env.AIRTABLE_CRM_BASE_ID)

    const tableName = process.env.AIRTABLE_CRM_TABLE_NAME

    const data = await req.json()

    // Si l’API key est absente, renvoie une erreur claire
    if (!process.env.AIRTABLE_CRM_API_KEY || !process.env.AIRTABLE_CRM_BASE_ID) {
      return new Response(
        JSON.stringify({ error: 'Clé Airtable non configurée.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Vérifie si l’email existe déjà
    const existing = await base(tableName)
      .select({
        filterByFormula: `{Email} = '${data.Email}'`,
        maxRecords: 1,
      })
      .firstPage()

    if (existing.length > 0) {
      return Response.json({ id: existing[0].id })
    }

    // Création partielle du record
    const [created] = await base(tableName).create([
      { fields: data }
    ])

    return Response.json({ id: created.id })
  } catch (err) {
    console.error('❌ API Airtable Partial:', err)
    return new Response(
      JSON.stringify({ error: err.message || 'Erreur serveur Airtable' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
