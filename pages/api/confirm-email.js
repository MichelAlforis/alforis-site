// pages/api/confirm-email.js

import { updateRecordInAirtable } from '@/pages/api/airtableAPI'

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Méthode non autorisée' })
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID manquant' });
  }

  try {
    await updateRecordInAirtable(id, { EmailValidé: true });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('❌ Erreur de validation email :', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
