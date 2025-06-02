// publishAll.js
import { fetchScheduledPosts } from './airtableClient.js';
import { publishToLinkedIn } from './linkedin.js';
import { publishToInstagram } from './instagram.js';
import { publishToGoogle } from './google.js';

/**
 * Mapping entre le nom du réseau et la fonction de publication.
 */
const dispatcher = {
  linkedin: publishToLinkedIn,
  instagram: publishToInstagram,
  google: publishToGoogle
};

(async () => {
  console.log('🔔 Démarrage du script de publication multi-réseaux');
  let posts;
  try {
    posts = await fetchScheduledPosts();
  } catch {
    console.error('❌ Impossible de récupérer les publications planifiées.');
    process.exit(1);
  }

  if (posts.length === 0) {
    console.log('✅ Aucune publication à traiter. Fin du script.');
    return;
  }

  for (const post of posts) {
    const networkKey = post['Réseau'].toLowerCase();
    const publishFn = dispatcher[networkKey];

    if (!publishFn) {
      console.warn(`⚠️ Réseau non supporté: "${post['Réseau']}"`);
      continue;
    }

    try {
      console.log(`
🚀 Publication sur ${post['Réseau'].toUpperCase()} planifiée à ${post['Date de publication']}`);
      await publishFn(post);
      console.log(`✅ Publication réussie pour ${post['Réseau']}`);
      // TODO: Mettre à jour le statut Airtable en 'publié' via API si besoin
    } catch (err) {
      console.error(`❌ Erreur lors de la publication sur ${post['Réseau']}:`, err);
    }
  }
})();