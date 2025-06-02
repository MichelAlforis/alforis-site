// getLinkedinToken.js (version CommonJS compatible LinkedIn 2024)
const readline = require('readline');
require('dotenv').config();
const axios = require('axios');

const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:3010/auth/linkedin/callback';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('❌ Veuillez définir LINKEDIN_CLIENT_ID et LINKEDIN_CLIENT_SECRET dans .env.local');
  process.exit(1);
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log('🔗 Ouvre cette URL dans ton navigateur pour autoriser :');
console.log(
  `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=openid%20profile%20email%20w_member_social`
);

rl.question("\n👉 Colle ici le code reçu dans l'URL (code=...) :\n> ", async (code) => {
  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code.trim());
    params.append('redirect_uri', REDIRECT_URI);
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);

    const { data } = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      params,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    console.log('\n✅ Token LinkedIn obtenu avec succès :\n');
    console.log(data);

    // Facultatif : obtenir les infos du profil avec le nouveau endpoint
    const userinfo = await axios.get('https://api.linkedin.com/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    });

    console.log('\n👤 Infos du profil :\n');
    console.log(userinfo.data);
  } catch (err) {
    console.error('\n❌ Échec :', err.response?.data || err.message);
  } finally {
    rl.close();
  }
});
