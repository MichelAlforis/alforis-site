import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_CRM_API_KEY }).base(process.env.AIRTABLE_CRM_BASE_ID);
const tableName = process.env.AIRTABLE_CRM_TABLE_NAME;

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email manquant' });
  }

  try {
    // Cherche le record par email
    const records = await base(tableName)
      .select({ filterByFormula: `{Email} = '${email}'` })
      .firstPage();

    if (records.length === 0) {
      return res.status(404).json({ error: 'Email non trouvé' });
    }

    const recordId = records[0].id;

    // Met à jour le champ Desinscription
    await base(tableName).update([
      {
        id: recordId,
        fields: {
          Desinscription: true
        }
      }
    ]);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('❌ Erreur désinscription :', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
