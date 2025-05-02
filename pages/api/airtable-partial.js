import { sendPartialToAirtable } from './airtableAPI';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
const tableName = process.env.AIRTABLE_TABLE_NAME;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const data = req.body;

  try {
    // Vérifie si l'email existe déjà
    const existing = await base(tableName)
      .select({ filterByFormula: `{Email} = '${data.email}'` })
      .firstPage();

    if (existing.length > 0) {
      console.log("⚠️ Email déjà présent dans Airtable, record ID :", existing[0].id);
      return res.status(200).json({ id: existing[0].id });
    }

    const recordId = await sendPartialToAirtable(data);
    res.status(200).json({ id: recordId });
  } catch (err) {
    console.error('❌ API Airtable Partial:', err);
    res.status(500).json({ error: err.message || 'Erreur serveur' });
  }
}
