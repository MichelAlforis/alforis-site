import { sendPartialToAirtable } from './airtableAPI';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
                .base(process.env.AIRTABLE_BASE_ID);
const tableName = process.env.AIRTABLE_TABLE_NAME;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const data = req.body;

  try {
    // Vérifie si l'Email existe déjà (majuscules)
    const existing = await base(tableName)
      .select({ filterByFormula: `{Email} = '${data.Email}'` })
      .firstPage();

    if (existing.length > 0) {
      return res.status(200).json({ id: existing[0].id });
    }

    const recordId = await sendPartialToAirtable(data);
    return res.status(200).json({ id: recordId });
  } catch (err) {
    console.error('❌ API Airtable Partial:', err);
    return res.status(500).json({ error: err.message || 'Erreur serveur' });
  }
}
