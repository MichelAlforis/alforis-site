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

const GCP_CLIENT_EMAIL_VAR = 'GCP_CLIENT_EMAIL';
const GCP_PRIVATE_KEY_VAR = 'GCP_PRIVATE_KEY';
const GCP_BUSINESS_ACCOUNT_NAME_VAR = 'GCP_BUSINESS_ACCOUNT_NAME';
// GMB_CTA_URL is optional, so not checked here as mandatory

function checkEnvVariables() {
  const clientEmail = process.env[GCP_CLIENT_EMAIL_VAR];
  const privateKey = process.env[GCP_PRIVATE_KEY_VAR];
  const businessAccountName = process.env[GCP_BUSINESS_ACCOUNT_NAME_VAR];

  let missingVars = [];
  if (!clientEmail) missingVars.push(GCP_CLIENT_EMAIL_VAR);
  if (!privateKey) missingVars.push(GCP_PRIVATE_KEY_VAR);
  if (!businessAccountName) missingVars.push(GCP_BUSINESS_ACCOUNT_NAME_VAR);

  if (missingVars.length > 0) {
    const message = `GMB environment variables missing: ${missingVars.join(', ')}. Please set these in .env.local.`;
    // console.warn is already prefixed. Removing direct log for consistency.
    return { success: false, message: message, errorCode: "CONFIG_ERROR" };
  }
  return { success: true };
}

async function authenticate() {
  const envCheck = checkEnvVariables();
  if (!envCheck.success) {
    return { error: true, message: envCheck.message, errorCode: envCheck.errorCode, client: null };
  }

  try {
    const privateKey = process.env[GCP_PRIVATE_KEY_VAR].replace(/\\n/g, '\n');
    const clientEmail = process.env[GCP_CLIENT_EMAIL_VAR];

    if (!clientEmail || !privateKey) { // Should be caught by checkEnvVariables, but double check
        return { error: true, message: "GCP client email or private key is null after env check, which is unexpected.", errorCode: "CONFIG_ERROR", client: null };
    }

    const auth = new google.auth.GoogleAuth({
      credentials: { client_email: clientEmail, private_key: privateKey },
      scopes: ['https://www.googleapis.com/auth/business.manage']
    });

    const authClient = await auth.getClient();
    google.options({ auth: authClient });
    return { error: false, client: authClient };
  } catch (err) {
    console.error('[ERROR] Google My Business authentication failed:', err.message);
    return { error: true, message: `GMB Authentication failed: ${err.message}`, errorCode: "AUTH_ERROR", client: null };
  }
}

function isValidHttpUrl(string) {
  if (!string) return false; // Allow empty/null URIs if actionType doesn't require it
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

async function createPost(textSummary, options = {}) {
  if (!textSummary || textSummary.trim() === "") {
    return { success: false, message: "Text summary cannot be empty for GMB post.", errorCode: "VALIDATION_ERROR" };
  }

  const { actionType = 'LEARN_MORE', uri, label } = options; // `label` is not directly used by GMB API for LocalPost, but its presence implies a CTA.

  // If a CTA button is implied by a label (or specific actionType that needs a URI), then URI must be valid.
  // GMB API might require a URI for certain actionTypes like 'CALL' (tel: URI) or 'LEARN_MORE' (http/https URI).
  // 'LEARN_MORE' is the default. If GMB_CTA_URL is used as fallback, it should be valid.
  // The main check is if `uri` from options is provided, it should be valid.
  const effectiveUri = uri || process.env.GMB_CTA_URL;

  if (actionType && actionType !== 'ACTION_TYPE_UNSPECIFIED') {
    if (!effectiveUri) {
      return { success: false, message: `Button URL (uri) is required for GMB post when actionType is ${actionType}.`, errorCode: "VALIDATION_ERROR" };
    }
    if (!isValidHttpUrl(effectiveUri) && !effectiveUri.startsWith('tel:')) { // Allow tel: for CALL
       return { success: false, message: `Button URL (uri: ${effectiveUri}) must be a valid HTTP/HTTPS or tel: URL for GMB post.`, errorCode: "VALIDATION_ERROR" };
    }
  }


  const authResult = await authenticate();
  if (authResult.error) {
    return { success: false, message: authResult.message, errorCode: authResult.errorCode || "AUTH_ERROR" };
  }

  const parentName = process.env[GCP_BUSINESS_ACCOUNT_NAME_VAR]; // Already checked

  let mybusinessClient;
  try {
    mybusinessClient = await google.discoverAPI('https://mybusiness.googleapis.com/$discovery/rest?version=v4');
  } catch (err) {
    console.error('[ERROR] Failed to load GMB API (discovery):', err.message);
    return { success: false, message: `GMB API Discovery failed: ${err.message}`, errorCode: "NETWORK_ERROR" };
  }

  const postBody = {
    languageCode: 'fr-FR',
    summary: textSummary,
    callToAction: { // Conditionally add callToAction if URI is present
      actionType: actionType, // Use actionType from options
      // uri will be set below if valid and present
    },
    topicType: 'STANDARD'
  };

  if (actionType && actionType !== 'ACTION_TYPE_UNSPECIFIED' && effectiveUri) {
    postBody.callToAction.uri = effectiveUri;
  } else {
    // If no valid URI or actionType is 'ACTION_TYPE_UNSPECIFIED', remove callToAction or set to minimal
    // GMB might require specific actionTypes to have a URI.
    // For 'STANDARD' topicType, callToAction is optional. If no URI, don't send callToAction.
    delete postBody.callToAction;
  }


  try {
    const response = await mybusinessClient.accounts.locations.localPosts.create({
      parent: parentName,
      requestBody: postBody
    });
    console.log('[INFO] GMB post créé avec succès. Resource name:', response.data.name);
    return { success: true, data: response.data };
  } catch (err) {
    let errorCode = "API_ERROR";
    if (err.code === 401 || err.code === 403) {
        errorCode = "AUTH_ERROR";
    } else if (err.code === 400) {
        errorCode = "VALIDATION_ERROR";
    } else if (err.errors && err.errors.some(e => e.reason === 'rateLimitExceeded')) {
        errorCode = "API_ERROR";
    } else if (!err.response && err.message.includes('ECONNREFUSED')) {
        errorCode = "NETWORK_ERROR";
    }

    const apiErrorDetails = err.errors?.map(e => `(${e.reason}: ${e.message})`).join(', ') || '';
    const errMsg = `GMB API Error: ${err.message} ${apiErrorDetails} (Code: ${err.code || 'N/A'})`;

    console.error('[ERROR] Failed to create GMB post:', errMsg, JSON.stringify(err.errors) || '');
    return { success: false, message: errMsg, errorCode: errorCode };
  }
}

module.exports = { authenticate, createPost, checkEnvVariables };

