import { updateRecordInAirtable } from './airtableAPI';
import { notifyAdmin, sendClientMail } from './EmailService';

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Méthode non autorisée. Utilisez PATCH.' });
  }

  try {
    const { id, fields } = req.body;
    if (!id || !fields) {
      return res.status(400).json({ error: 'ID ou fields manquants.' });
    }

    const updated = await updateRecordInAirtable(id, fields);
    if (updated) {
      await notifyAdmin(updated);
      await sendClientMail(updated);
      return res.status(200).json({ message: 'Mise à jour réussie ✅' });
    } else {
      return res.status(500).json({ error: 'Erreur inconnue lors de la mise à jour.' });
    }
  } catch (error) {
    console.error('❌ API Airtable Update:', error);
    return res.status(500).json({ error: 'Erreur serveur interne.' });
  }
}
