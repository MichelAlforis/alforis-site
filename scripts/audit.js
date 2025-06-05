
// scripts/audit.js

const { exec } = require('child_process');

const LOCAL_URL = 'http://localhost:3010';

console.log(`🚀 Audit en cours sur ${LOCAL_URL}...`);

exec(`npx lighthouse ${LOCAL_URL} --output html --output-path ./audit/lighthouse-report.html --view`, (error, stdout, stderr) => {
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

exec(`npx hint ${LOCAL_URL}`, (error, stdout, stderr) => {
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