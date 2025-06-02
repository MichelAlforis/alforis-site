// instagram.js
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const { FB_PAGE_ID, IG_ACCESS_TOKEN } = process.env;

if (!FB_PAGE_ID || !IG_ACCESS_TOKEN) {
  console.error('❌ Veuillez définir FB_PAGE_ID et IG_ACCESS_TOKEN dans .env.local');
  process.exit(1);
}

/**
 * Publie une photo avec légende sur Instagram via la Graph API.
 * @param {Object} post Fields extrait de Airtable.
 */
export async function publishToInstagram(post) {
  const caption = post['Texte publication'];
  const imageUrl = post['Image (URL)'];

  // Étape 1: Créer un container media
  const containerResponse = await fetch(
    `https://graph.facebook.com/v15.0/${FB_PAGE_ID}/media?image_url=${encodeURIComponent(imageUrl)}&caption=${encodeURIComponent(caption)}&access_token=${IG_ACCESS_TOKEN}`
  );
  const containerData = await containerResponse.json();
  if (!containerResponse.ok) {
    throw new Error(`Instagram container error: ${JSON.stringify(containerData)}`);
  }

  const creationId = containerData.id;

  // Étape 2: Publier le container
  const publishResponse = await fetch(
    `https://graph.facebook.com/v15.0/${FB_PAGE_ID}/media_publish?creation_id=${creationId}&access_token=${IG_ACCESS_TOKEN}`
  );
  const publishData = await publishResponse.json();
  if (!publishResponse.ok) {
    throw new Error(`Instagram publish error: ${JSON.stringify(publishData)}`);
  }
}