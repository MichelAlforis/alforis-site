const Airtable = require('airtable');
require('dotenv').config();

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
const tableName = process.env.AIRTABLE_TABLE_NAME;

(async () => {
  console.log(`📥 Lecture des champs depuis la table "${tableName}"...`);

  try {
    const records = await base(tableName).select({ maxRecords: 10 }).firstPage();

    const firstFilled = records.find(r => Object.keys(r.fields).length > 0);

    if (!firstFilled) {
      console.log('❌ Aucun enregistrement rempli trouvé.');
      return;
    }

    const fieldNames = Object.keys(firstFilled.fields);
    console.log('✅ Champs détectés :');
    fieldNames.forEach((field) => console.log(' -', field));

  } catch (err) {
    console.error('❌ Erreur lors de la lecture des champs :', err);
  }
})();
