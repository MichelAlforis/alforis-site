
// google.js
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const { GCP_CLIENT_EMAIL, GCP_PRIVATE_KEY, GCP_BUSINESS_ACCOUNT_NAME } = process.env;

if (!GCP_CLIENT_EMAIL || !GCP_PRIVATE_KEY || !GCP_BUSINESS_ACCOUNT_NAME) {
  console.error('❌ Veuillez définir GCP_CLIENT_EMAIL, GCP_PRIVATE_KEY, et GCP_BUSINESS_ACCOUNT_NAME dans .env.local');
  process.exit(1);
}

// Initialiser l'authentification JWT pour Google Business Profile API
const auth = new google.auth.JWT(
  GCP_CLIENT_EMAIL,
  null,
  GCP_PRIVATE_KEY.replace(/\\n/g, '\n'),
  ['https://www.googleapis.com/auth/business.manage']
);

/**
 * Publie un post sur Google Business Profile.
 * @param {Object} post Fields extrait de Airtable.
 */
export async function publishToGoogle(post) {
  const text = post['Texte publication'];
  const imageUrl = post['Image (URL)'];
  const ctaText = post['Bouton (Google)'];
  const ctaLink = post['Lien bouton (Google)'];

  await auth.authorize();
  const business = google.businessprofile({ version: 'v1', auth });

  const mediaItem = {
    mediaFormat: 'PHOTO',
    sourceUrl: imageUrl
  };

  const postBody = {
    languageCode: 'fr',
    summary: text,
    media: [mediaItem],
    callToAction: ctaText
      ? { actionType: 'LEARN_MORE', url: ctaLink }
      : undefined
  };

  await business.locations.localPosts.create({
    parent: `${GCP_BUSINESS_ACCOUNT_NAME}`,
    requestBody: postBody
  });
}
