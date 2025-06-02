import Airtable from 'airtable';
import { notifyAdmin, sendClientMail } from '@/pages/api/EmailService';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
const tableName = process.env.AIRTABLE_TABLE_NAME1;

export async function sendPartialToAirtable(data) {
  try {
    const created = await base(tableName).create([
      {
        fields: {
          Nom: data.nom,
          Email: data.email,
          Age: Number(data.age),
          RGPD: data.rgpd ? true : false,
        },
      },
    ]);

    // 📩 Email au fondateur après l'étape 1
    await notifyAdmin({
      nom: data.nom,
      email: data.email,
      age: data.age,
    });

    return created[0].id;
  } catch (error) {
    console.error('❌ Erreur Airtable création partielle :', error);
    throw error;
  }
}

export async function updateRecordInAirtable(recordId, data) {
  try {
    await base(tableName).update([
      {
        id: recordId,
        fields: {
          Profil: data.profil,
          PhraseLibre: data.phraseLibre,
          PatrimoineActuel: Number(data.patrimoineActuel || 0),
          SituationActuelle: data.situationActuelle || '',
          ObjectifVie: data.objectifVie || false,
          RevenusAnnuels: Number(data.revenusAnnuels || 0),
          RisquePercu: data.risquePercu || '',
          Q1: data.reponses[0] || '',
          Q2: data.reponses[1] || '',
          Q3: data.reponses[2] || '',
          Q4: data.reponses[3] || '',
          Q5: data.reponses[4] || '',
          Q6: data.reponses[5] || '',
          Q7: data.reponses[6] || '',
          Q8: data.reponses[7] || '',
          Q9: data.reponses[8] || '',
          NumeroTelephone: data.numeroTelephone || '',
          MarketingOk: data.marketingOk || false,
          Desinscription: data.desinscription || false,
        },
      },
    ]);

    // 📩 Email au client après l'étape 2
    await sendClientMail({
      email: data.email,
      profil: data.profil,
    });

    return true;
  } catch (error) {
    console.error('❌ Erreur Airtable mise à jour :', error);
    throw error;
  }
}
