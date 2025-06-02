// scripts/reseaux/index.js

require('dotenv').config({ path: '.env.local' });
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
    '✅ ERREUR : veuillez définir AIRTABLE_SOCIAL_API_KEY, ' +
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
  console.log('🔍 Lecture de la table Posts_a_publier dans Publications_Reseaux_Sociaux…');

  try {
    // On sélectionne uniquement les enregistrements de la vue “Posts_a_publier”
    const selectOpts = {
      ...(AIRTABLE_SOCIAL_VIEW_NAME && { view: AIRTABLE_SOCIAL_VIEW_NAME })
    };

    const records = await baseSocial(AIRTABLE_SOCIAL_TABLE_NAME)
      .select(selectOpts)
      .all();

    if (!records.length) {
      console.log('→ Aucun record “à publier” dans Posts_a_publier.');
      return;
    }

    console.log(`→ ${records.length} record(s) à traiter…`);

    for (const record of records) {
      const fields = record.fields;
      const recordId = record.id;
      const airtableDate = fields['Date de publication'];

      if (!isReadyToPublish(airtableDate)) {
        console.log(`   • Record ${recordId} programmé pour ${airtableDate} (pas encore prêt)`);
        continue;
      }

      const plateforme  = fields['Réseau'];
      const text        = fields['Texte publication'] || '';
      const imageUrl    = fields['Image (URL)'] || '';
      const buttonLabel = fields['Bouton (Google)'] || '';
      const buttonUrl   = fields['Lien bouton (Google)'] || '';
      console.log(`\n🚀 Publication du record ${recordId} → Plateforme: ${plateforme}`);

      let result = { success: false, message: '' };

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
            Message: ''
          });
          console.log(`   ✅ Record ${recordId} mis à jour “Publié” (ID: ${postId})`);
        } else {
          await baseSocial(AIRTABLE_SOCIAL_TABLE_NAME).update(recordId, {
            Statut: 'Erreur',
            Message: result.message || 'Erreur inconnue'
          });
          console.warn(`   ⚠️ Record ${recordId} mis à jour “Erreur” (raison: ${result.message})`);
        }
      } catch (err) {
        await baseSocial(AIRTABLE_SOCIAL_TABLE_NAME).update(recordId, {
          Statut: 'Erreur',
          Message: err.message
        });
        console.error(`   ❌ Exception pour le record ${recordId} : ${err.message}`);
      }
    }

    console.log('\n🎉 Traitement terminé pour Publications_Reseaux_Sociaux.');
  } catch (err) {
    console.error('🚨 Erreur Airtable (base social) :', err.message);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('🚨 Erreur fatale :', err);
  process.exit(1);
});
