import { updateRecordInAirtable } from '@/app/api/airtableAPI/route'
import { notifyAdmin, sendClientMail } from '@/app/api/EmailService'

export async function PATCH(req) {
  try {
    const { id, fields } = await req.json()

    if (!id || !fields) {
      return new Response(JSON.stringify({ error: 'ID ou fields manquants.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const updated = await updateRecordInAirtable(id, fields)

    if (updated) {
      await notifyAdmin(updated)
      await sendClientMail(updated)
      return Response.json({ message: 'Mise à jour réussie ✅' })
    } else {
      return new Response(JSON.stringify({ error: 'Erreur inconnue lors de la mise à jour.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  } catch (error) {
    console.error('❌ API Airtable Update:', error)
    return new Response(JSON.stringify({ error: 'Erreur serveur interne.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
