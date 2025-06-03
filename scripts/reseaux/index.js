// scripts/reseaux/index.js

require('dotenv').config({ path: '../../.env.local' });
const Airtable = require('airtable');
const linkedin = require('./linkedin');
const instagram = require('./instagram');
const facebook = require('./facebook');
const twitter = require('./twitter');
const googlemybusiness = require('./googlemybusiness');

// On pointe explicitement sur la “Base Social”
const {
  AIRTABLE_SOCIAL_API_KEY,
  AIRTABLE_SOCIAL_BASE_ID,
  AIRTABLE_SOCIAL_TABLE_NAME,
  AIRTABLE_SOCIAL_VIEW_NAME
} = process.env;

if (!AIRTABLE_SOCIAL_API_KEY || !AIRTABLE_SOCIAL_BASE_ID || !AIRTABLE_SOCIAL_TABLE_NAME) {
  console.error(
    '[ERROR] Configuration Airtable manquante: veuillez définir AIRTABLE_SOCIAL_API_KEY, ' +
    'AIRTABLE_SOCIAL_BASE_ID et AIRTABLE_SOCIAL_TABLE_NAME dans .env.local'
  );
  process.exit(1);
}

const baseSocial = new Airtable({ apiKey: AIRTABLE_SOCIAL_API_KEY })
  .base(AIRTABLE_SOCIAL_BASE_ID);

function isReadyToPublish(airtableDate) {
  if (!airtableDate) return false;
  return new Date() >= new Date(airtableDate);
}

async function main() {
  console.log('[INFO] Démarrage du script de publication des réseaux sociaux.');
  console.log('[INFO] Lecture de la table Posts_a_publier dans Publications_Reseaux_Sociaux...');

  try {
    // On sélectionne uniquement les enregistrements de la vue “Posts_a_publier”
    const selectOpts = {
      ...(AIRTABLE_SOCIAL_VIEW_NAME && { view: AIRTABLE_SOCIAL_VIEW_NAME })
    };

    const records = await baseSocial(AIRTABLE_SOCIAL_TABLE_NAME)
      .select(selectOpts)
      .all();

    if (!records.length) {
      console.log('[INFO] Aucun record “à publier” trouvé dans la vue spécifiée.');
      return;
    }

    console.log(`[INFO] ${records.length} record(s) à traiter...`);

    for (const record of records) {
      const fields = record.fields;
      const recordId = record.id;
      const airtableDate = fields['Date de publication'];

      if (!isReadyToPublish(airtableDate)) {
        console.log(`[INFO] Record ${recordId} programmé pour ${airtableDate} (pas encore prêt).`);
        continue;
      }

      const plateforme  = fields['Réseau'];
      const text        = fields['Texte publication'] || '';
      const imageUrl    = fields['Image (URL)'] || '';
      const buttonLabel = fields['Bouton (Google)'] || ''; // Used by GMB
      const buttonUrl   = fields['Lien bouton (Google)'] || ''; // Used by GMB
      console.log(`[INFO] Traitement du Record ${recordId} → Plateforme: ${plateforme}`);

      let result = { success: false, message: 'Initial result state', errorCode: 'N/A' };

      try {
        switch (plateforme) {
          case 'LinkedIn':
            result = await linkedin.postTextUpdate(text);
            break;
          case 'Instagram':
            if (!imageUrl) throw new Error('Image (URL) requise pour Instagram');
            result = await instagram.postImage(imageUrl, text);
            break;
          case 'Facebook':
            result = imageUrl
              ? await facebook.postImage(imageUrl, text)
              : await facebook.postTextUpdate(text);
            break;
          case 'X (Twitter)':
            result = await twitter.postTweet(text);
            break;
          case 'Google My Business':
            result = await googlemybusiness.createPost(text, {
              actionType: 'LEARN_MORE',
              uri: buttonUrl,
              label: buttonLabel
            });
            break;
          default:
            throw new Error(`Plateforme inconnue: ${plateforme}`);
        }

        if (result.success) {
          const postId  = result.data?.id || result.data?.name || '';
          const postUrl = result.data?.url || '';

          await baseSocial(AIRTABLE_SOCIAL_TABLE_NAME).update(recordId, {
            Statut: 'Publié',
            'Post ID': postId,
            'Post URL': postUrl,
            'Published At': new Date().toISOString(),
            Message: '' // Clear previous error messages
          });
          console.log(`[INFO] Record ${recordId} mis à jour “Publié” (Plateforme: ${plateforme}, Post ID: ${postId || 'N/A'}).`);
        } else {
          await baseSocial(AIRTABLE_SOCIAL_TABLE_NAME).update(recordId, {
            Statut: 'Erreur',
            Message: result.message || 'Erreur inconnue lors de la publication.' // Ensure message is always a string
          });
          console.warn(`[WARN] Record ${recordId} mis à jour “Erreur” (Plateforme: ${plateforme}, Code: ${result.errorCode || 'N/A'}, Raison: ${result.message})`);
        }
      } catch (err) {
        // This catch block handles errors thrown directly by platform modules (e.g., if `imageUrl` is missing for Instagram)
        // or if the switch statement itself fails.
        await baseSocial(AIRTABLE_SOCIAL_TABLE_NAME).update(recordId, {
          Statut: 'Erreur',
          Message: err.message // err.message should be the detailed one from platform modules or new Error()
        });
        console.error(`[ERROR] Exception pour le record ${recordId} (Plateforme: ${plateforme}, Code: ${err.errorCode || 'N/A'}): ${err.message}`);
      }
    }

    console.log('[INFO] Traitement de tous les records terminé.');
  } catch (err) {
    // This catch block is for errors related to fetching records from Airtable (e.g., API key issue, base ID issue)
    console.error('[ERROR] Erreur lors de la récupération des records Airtable (base social):', err.message);
    process.exit(1); // Critical error, exit
  }
}

main().catch(err => {
  // This catch block is for any other unhandled promise rejections in main()
  console.error('[FATAL] Erreur non gérée dans la fonction main:', err.message, err.stack);
  process.exit(1); // Critical error, exit
});
