import { updateRecordInAirtable } from '@/lib/airtable/airtableAPI'
import { notifyAdmin, sendClientMail } from '@/lib/airtable/EmailService'
import Airtable from 'airtable'

export async function PATCH(req) {
  try {
    const { id, fields } = await req.json()

    if (!id || !fields) {
      return new Response(JSON.stringify({ error: 'ID ou fields manquants.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Mise à jour du record dans Airtable
    const updatedOk = await updateRecordInAirtable(id, fields)

    if (updatedOk) {
      // On récupère le record à jour pour le contenu du mail
      const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
      const tableName = process.env.AIRTABLE_TABLE_NAME1 || 'Parcours'
      const record = await base(tableName).find(id)

      // Appels asynchrones mais non bloquants pour rapidité de réponse API
      notifyAdmin(record).catch(console.error)
      sendClientMail(record).catch(console.error)

      return Response.json({ message: 'Mise à jour réussie ✅' })
    } else {
      return new Response(JSON.stringify({ error: 'Erreur inconnue lors de la mise à jour.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }
  } catch (error) {
    console.error('❌ API Airtable Update:', error)
    return new Response(JSON.stringify({ error: 'Erreur serveur interne.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
