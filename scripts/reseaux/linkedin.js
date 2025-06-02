
// linkedin.js
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const { LINKEDIN_ACCESS_TOKEN, LINKEDIN_ORGANIZATION_ID } = process.env;

if (!LINKEDIN_ACCESS_TOKEN || !LINKEDIN_ORGANIZATION_ID) {
  console.error('❌ Veuillez définir LINKEDIN_ACCESS_TOKEN et LINKEDIN_ORGANIZATION_ID dans .env.local');
  process.exit(1);
}

/**
 * Publie un post image + texte sur la page LinkedIn.
 * @param {Object} post Fields extrait de Airtable.
 */
export async function publishToLinkedIn(post) {
  const text = post['Texte publication'];
  const imageUrl = post['Image (URL)'];

  // Préparer le payload pour LinkedIn API
  const payload = {
    author: `urn:li:organization:${LINKEDIN_ORGANIZATION_ID}`,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: { text },
        shareMediaCategory: 'IMAGE',
        media: [
          {
            status: 'READY',
            description: { text: '' },
            media: imageUrl,
            title: { text: '' }
          }
        ]
      }
    },
    visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' }
  };

  const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`LinkedIn API error: ${response.status} ${errorText}`);
  }
}