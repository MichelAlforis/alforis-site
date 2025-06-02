// scripts/reseaux/googlemybusiness.js

/**
 * Module pour créer un "Local Post" (GMB) via l’API My Business v4 en Node.js
 * Utilise :
 *  • googleapis pour l’authentification (GoogleAuth) 
 *  • google.discoverAPI pour charger dynamiquement l’API My Business v4
 * 
 * Prérequis dans .env.local :
 *  GCP_CLIENT_EMAIL       → email du service account (xxx@yyy.iam.gserviceaccount.com)
 *  GCP_PRIVATE_KEY        → clé privée (avec retours à la ligne échappés en \\n)
 *  GCP_BUSINESS_ACCOUNT_NAME → chemin complet "accounts/ID_ACCOUNT/locations/ID_LOCATION"
 *  GMB_CTA_URL (facultatif) → URL pour le bouton "Learn More"
 * 
 * Exemple d’appel :
 *  const { createPost } = require('./googlemybusiness');
 *  const res = await createPost('Mon résumé pour GMB');
 */

require('dotenv').config({ path: '.env.local' }); // Charger .env.local

const { google } = require('googleapis');

async function authenticate() {
  console.log('🔐 Authenticating with Google My Business (service account)…');
  try {
    // Remplacer les "\n" littéraux par de vrais retours à la ligne
    const privateKey = process.env.GCP_PRIVATE_KEY
      ? process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n')
      : null;

    if (!process.env.GCP_CLIENT_EMAIL || !privateKey) {
      console.error(
        '❌ GCP_CLIENT_EMAIL ou GCP_PRIVATE_KEY manquant(e) dans .env.local.'
      );
      return null;
    }

    // Crée un client GoogleAuth avec JWT (service account)
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GCP_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/business.manage']
    });

    const authClient = await auth.getClient();
    // Appliquer cet auth à toutes les requêtes google APIs suivantes
    google.options({ auth: authClient });

    console.log('✅ Google My Business authentication successful.');
    return authClient;
  } catch (err) {
    console.error('❌ Google My Business authentication failed :', err.message);
    return null;
  }
}

async function createPost(textSummary) {
  console.log('✏️  Tentative de création d’un GMB post…');

  // 1) Authentifier
  const authClient = await authenticate();
  if (!authClient) {
    return {
      success: false,
      message: 'GMB Authentication failed. Vérifiez vos identifiants dans .env.local.'
    };
  }

  // 2) Vérifier que la variable d’environnement existe
  //    Elle doit être au format : "accounts/1234567890/locations/0987654321"
  const parentName = process.env.GCP_BUSINESS_ACCOUNT_NAME;
  if (!parentName) {
    console.error('❌ GCP_BUSINESS_ACCOUNT_NAME introuvable dans .env.local.');
    return {
      success: false,
      message: 'GCP_BUSINESS_ACCOUNT_NAME non défini dans .env.local.'
    };
  }

  // 3) Charger dynamiquement l’API My Business v4 via discovery
  let mybusinessClient;
  try {
    console.log('🔍 Chargement dynamique de l’API My Business v4 (discovery)…');
    mybusinessClient = await google.discoverAPI(
      'https://mybusiness.googleapis.com/$discovery/rest?version=v4'
    );
  } catch (err) {
    console.error(
      '❌ Échec du chargement de l’API My Business v4 via discovery :',
      err.message
    );
    return {
      success: false,
      message: 'Impossible de charger l’API My Business v4 (discovery failed).'
    };
  }

  // 4) Préparer le corps du post (LocalPost)
  const postBody = {
    languageCode: 'fr-FR',
    summary: textSummary,
    callToAction: {
      actionType: 'LEARN_MORE',
      uri: process.env.GMB_CTA_URL || 'https://www.google.com'
    },
    topicType: 'STANDARD'
  };

  // 5) Appeler accounts.locations.localPosts.create
  try {
    console.log(`🚀 Création du post pour ${parentName}…`);
    const response = await mybusinessClient.accounts.locations.localPosts.create({
      parent: parentName,
      requestBody: postBody
    });

    console.log('✅ GMB post créé avec succès. Resource name:', response.data.name);
    return { success: true, data: response.data };
  } catch (err) {
    // Extraire message d’erreur détaillé si possible
    const errMsg =
      err.response &&
      err.response.data &&
      err.response.data.error
        ? err.response.data.error.message
        : err.message;

    console.error('❌ Échec de la création du GMB post :', errMsg);
    console.error(
      '👉 Vérifiez que :\n' +
      '   • GCP_BUSINESS_ACCOUNT_NAME contient bien "accounts/ID/locations/ID"\n' +
      '   • l’API My Business v4 est activée dans Google Cloud Console\n' +
      '   • le service account a le rôle nécessaire (Business Profile Manager ou business.manage).'
    );
    return { success: false, message: `GMB API Error: ${errMsg}` };
  }
}

module.exports = { authenticate, createPost };

