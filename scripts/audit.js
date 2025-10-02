// scripts/audit.js

const { exec } = require('child_process');

// Met ici ton URL publique de production :
const PROD_URL = 'https://alforis.fr'; // remplace par l'URL du serveur si tu testes en staging

console.log(`🚀 Audit en cours sur ${PROD_URL}...`);

exec(`npx lighthouse ${PROD_URL} --output html --output-path ./audit/lighthouse-report.html --view`, (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Erreur Lighthouse: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`⚠️ Stderr: ${stderr}`);
    return;
  }
  console.log(`✅ Rapport Lighthouse généré avec succès.`);
});

exec(`npx hint ${PROD_URL}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Erreur Webhint: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`⚠️ Stderr: ${stderr}`);
    return;
  }
  console.log(`✅ Rapport Webhint terminé:`);
  console.log(stdout);
});
