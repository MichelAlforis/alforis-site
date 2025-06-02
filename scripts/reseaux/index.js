// scripts/reseaux/index.js

/**
 * Script “Social Media Poster” qui lit les enregistrements “à publier” dans Airtable
 * et appelle les modules de publication (LinkedIn, Instagram, Facebook, X, GMB).
 *
 * Prérequis dans .env.local :
 *   AIRTABLE_API_KEY=…
 *   AIRTABLE_BASE_ID=…
 *   AIRTABLE_TABLE_NAME=Posts Réseaux
 *
 *   (et toutes les autres clés d’API nécessaires à vos modules réseaux,
 *    ex. LINKEDIN_ACCESS_TOKEN, etc.)
 *
 * Structure de la table “Posts Réseaux” :
 *   • Réseau               (Single select) : “LinkedIn”, “Instagram”, “Facebook”, “X (Twitter)”, “Google My Business”
 *   • Type de post          (Single select) : “Text Update”, “Article”, “Link Post”, “Image Post” (selon plateforme)
 *   • Texte publication     (Long text)     : champ principal pour le texte du post
 *   • Image (URL)           (Single line text) : URL publique d’image pour Instagram/Facebook
 *   • Bouton (Google)       (Single line text) : libellé du bouton GMB (ex : “En savoir plus”)
 *   • Lien bouton (Google)  (URL)           : lien à associer au bouton GMB
 *   • Date de publication   (Date/Time)     : date/heure à partir de laquelle on peut publier
 *   • Statut                (Single select) : “à publier”, “Publié”, “Erreur”
 *   • Post ID               (Single line text) : l’ID retourné par l’API, après publication
 *   • Post URL              (URL)           : l’URL publique du post (si disponible)
 *   • Message               (Long text)     : message d’erreur en cas d’échec
 *   • Published At          (Date/Time)     : date/heure effective de publication
 */

require('dotenv').config({ path: '.env.local' });

const Airtable = require('airtable');
const moment = require('moment'); // pour manipuler les dates plus simplement
const linkedin = require('./linkedin');
const instagram = require('./instagram');
const facebook = require('./facebook');
const twitter = require('./twitter');
const googlemybusiness = require('./googlemybusiness');

// Vérification basique des variables d’environnement Airtable
const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME2 } = process.env;
if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME2) {
  console.error('❌ Merci de définir AIRTABLE_API_KEY, AIRTABLE_BASE_ID et AIRTABLE_TABLE_NAME2 dans .env.local');
  process.exit(1);
}

// Initialisation du client Airtable
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);
const tableName = AIRTABLE_TABLE_NAME2;

// Helper : parser “Date de publication” et la comparer à maintenant
function isReadyToPublish(airtableDate) {
  if (!airtableDate) return false;
  // airtableDate est déjà en ISO (format string JavaScript)
  return moment().isSameOrAfter(moment(airtableDate));
}

async function main() {
  console.log('🔍 Starting “Social Media Poster” – fetching records “à publier”…');

  try {
    // 1) Récupérer tous les enregistrements dont Statut = "à publier"
    const records = await base(tableName)
      .select({
        filterByFormula: `{Statut} = 'à publier'`
      })
      .all();

    if (records.length === 0) {
      console.log('→ Aucun enregistrement “à publier” trouvé.');
      return;
    }

    console.log(`→ ${records.length} enregistrement(s) trouvé(s) en statut “à publier”`);

    for (const record of records) {
      const fields = record.fields;
      const recordId = record.id;

      // 2) Vérifier la date de publication
      const airtableDate = fields['Date de publication'];
      if (!isReadyToPublish(airtableDate)) {
        console.log(`   • Record ${recordId} scheduled for ${airtableDate} (not ready yet)`);
        continue; // passer au suivant
      }

      const plateforme = fields['Réseau'];
      const typePost   = fields['Type de post'] || '';
      const text       = fields['Texte publication'] || '';
      const imageUrl   = fields['Image (URL)'] || '';
      const buttonLabel= fields['Bouton (Google)'] || '';
      const buttonUrl  = fields['Lien bouton (Google)'] || '';

      console.log(`\n🚀 Publishing record ${recordId} → Platform: ${plateforme}`);

      let result = { success: false, message: 'No action performed.' };

      try {
        switch (plateforme) {
          case 'LinkedIn':
            // Treat all LinkedIn posts as Text Update
            result = await linkedin.postTextUpdate(text);
            break;

          case 'Instagram':
            if (!imageUrl) {
              throw new Error('Image URL is required for Instagram posts.');
            }
            result = await instagram.postImage(imageUrl, text);
            break;

          case 'Facebook':
            if (imageUrl) {
              result = await facebook.postImage(imageUrl, text);
            } else {
              result = await facebook.postTextUpdate(text);
            }
            break;

          case 'X (Twitter)':
            result = await twitter.postTweet(text);
            break;

          case 'Google My Business':
            // Modifier createPost pour accepter un objet callToAction en second argument
            result = await googlemybusiness.createPost(text, {
              actionType: 'LEARN_MORE',
              uri: buttonUrl,
              label: buttonLabel
            });
            break;

          default:
            throw new Error(`Unknown platform: ${plateforme}`);
        }

        // 3) Mettre à jour Airtable selon succès ou échec
        if (result.success) {
          const postId  = result.data?.id || result.data?.name || '';
          const postUrl = result.data?.url || '';

          await base(tableName).update(recordId, {
            Statut: 'Publié',
            'Post ID': postId,
            'Post URL': postUrl,
            'Published At': new Date().toISOString(),
            Message: ''
          });
          console.log(`   ✅ Record ${recordId} marked as “Publié” (Post ID: ${postId})`);
        } else {
          await base(tableName).update(recordId, {
            Statut: 'Erreur',
            Message: result.message || 'Unknown error'
          });
          console.warn(`   ⚠️ Record ${recordId} marked as “Erreur” (Reason: ${result.message})`);
        }
      } catch (err) {
        // Exception inattendue durant la publication
        await base(tableName).update(recordId, {
          Statut: 'Erreur',
          Message: err.message || String(err)
        });
        console.error(`   ❌ Exception for record ${recordId}: ${err.message}`);
      }
    }

    console.log('\n🎉 Processing complete.');
  } catch (err) {
    console.error('🚨 Error fetching records from Airtable:', err.message);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('🚨 Fatal error in main():', err);
  process.exit(1);
});
