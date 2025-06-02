const { google } = require('googleapis');
// Using specific service versions for clarity
const mybusinesslocalposts = google.mybusinesslocalposts('v1');

async function authenticate() {
  console.log('Authenticating with Google My Business using service account...');
  try {
    const privateKey = process.env.GCP_PRIVATE_KEY ? process.env.GCP_PRIVATE_KEY.replace(/\n/g, '\n') : null;
    if (!process.env.GCP_CLIENT_EMAIL || !privateKey) {
      console.error('GCP_CLIENT_EMAIL or GCP_PRIVATE_KEY is missing in .env.local.');
      return null;
    }
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GCP_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/business.manage', 'https://www.googleapis.com/auth/plus.business.manage'],
    });
    const authClient = await auth.getClient();
    google.options({ auth: authClient });
    console.log('Google My Business authentication successful.');
    return authClient;
  } catch (error) {
    console.error('Google My Business authentication failed:', error.message);
    return null;
  }
}

async function createPost(textSummary) {
  console.log('Attempting to create post on Google My Business...');
  const authClient = await authenticate();
  if (!authClient) {
    return { success: false, message: 'GMB Authentication failed. Check credentials in .env.local.' };
  }
  const accountName = process.env.GCP_BUSINESS_ACCOUNT_NAME;
  if (!accountName) {
    console.error('GCP_BUSINESS_ACCOUNT_NAME is not defined in .env.local.');
    return { success: false, message: 'GCP_BUSINESS_ACCOUNT_NAME not found in .env.local.' };
  }
  const postBody = {
    languageCode: 'fr-FR', summary: textSummary,
    callToAction: { actionType: 'LEARN_MORE', uri: process.env.GMB_CTA_URL || 'https://www.google.com' },
    topicType: 'STANDARD'
  };
  try {
    console.log(`Creating GMB post for location: ${accountName}`);
    const response = await mybusinesslocalposts.localPosts.create({ parent: accountName, requestBody: postBody });
    console.log('Successfully created Google My Business post:', response.data.name);
    return { success: true, data: response.data };
  } catch (error) {
    const errMsg = error.response && error.response.data && error.response.data.error ? error.response.data.error.message : error.message;
    console.error('Failed to create Google My Business post:', errMsg);
    console.error('Ensure GCP_BUSINESS_ACCOUNT_NAME is the full path to a specific location (e.g., accounts/YOUR_ACCOUNT_ID/locations/YOUR_LOCATION_ID), the GMB API is enabled, and the service account has permissions.');
    return { success: false, message: `GMB API Error: ${errMsg}` };
  }
}
module.exports = { authenticate, createPost };
