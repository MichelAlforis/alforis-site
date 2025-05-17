import { sendPartialToAirtable } from '@/lib/airtable/airtable-partial'

export async function POST(req) {
  try {
    const data = await req.json()
    const id = await sendPartialToAirtable(data)
    return Response.json({ id })
  } catch (err) {
    console.error('❌ API Airtable Partial:', err)
    return new Response(JSON.stringify({ error: err.message || 'Erreur serveur' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
