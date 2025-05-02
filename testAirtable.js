
const Airtable = require('airtable');

// 🔐 Configuration
const apiKey = 'patk4dpIf04y0RNMg.5f332e127471b92a1590c4005576dca78fe3d1a90f46f904f8979a2ab9b42a07';
const baseId = 'appU11o0eQg2HDLRb';
const tableName = 'Profil';

console.log("🔐 API Key loaded:", !!apiKey);
console.log("🆔 Base ID:", baseId);
console.log("📄 Table Name:", tableName);

// 🔧 Configuration de Airtable
Airtable.configure({ apiKey: apiKey });
const base = Airtable.base(baseId);

// 📤 Données à tester
const data = {
  fields: {
    Nom: 'Test Node',
    Email: 'test@alforis.fr',
    'Âge': 42,
    RGPD: 'Oui',
    Q1: 'Test Q1',
    Q2: 'Test Q2',
    Q3: 'Test Q3',
    Q4: 'Test Q4',
    Q5: 'Test Q5',
    Q6: 'Test Q6',
    Q7: 'Test Q7',
    Q8: 'Test Q8',
    Q9: 'Test Q9'
  }
};

console.log("📤 Données prêtes à l’envoi :", data.fields);

// ✅ Envoi vers Airtable
base(tableName).create([data], (err, records) => {
  if (err) {
    console.error("❌ Erreur Airtable :", err);
    return;
  }

  records.forEach(record => {
    console.log("✅ Enregistrement créé avec ID :", record.getId());
  });
});