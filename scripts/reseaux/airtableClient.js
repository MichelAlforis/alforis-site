// airtableClient.js
import Airtable from 'airtable';
import dotenv from 'dotenv';

dotenv.config();

const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env;

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  console.error('❌ Veuillez définir AIRTABLE_API_KEY et AIRTABLE_BASE_ID dans .env.local');
  process.exit(1);
}

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

/**
 * Récupère les publications planifiées dont le statut est "à publier".
 * @ returns {Promise<Array<Object>>} Liste des objets fields de chaque enregistrement.
 */
export async function fetchScheduledPosts() {
  try {
    const results = [];
    await base('Posts_a_publier')
      .select({
        filterByFormula: `{Statut} = 'à publier'`,
        sort: [{ field: 'Date de publication', direction: 'asc' }]
      })
      .eachPage(
        (records, fetchNextPage) => {
          records.forEach(record => results.push(record.fields));
          fetchNextPage();
        }
      );
    return results;
  } catch (err) {
    console.error('❌ Erreur Airtable:', err);
    throw err;
  }
}