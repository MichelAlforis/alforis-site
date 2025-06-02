const axios = require('axios');

function authenticate() {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  if (!token) {
    console.warn('LINKEDIN_ACCESS_TOKEN not found in .env.local. LinkedIn posts will likely fail.');
    return null;
  }
  console.log('Using direct LinkedIn Access Token from .env.local.');
  return token;
}

async function postTextUpdate(text) {
  const accessToken = authenticate();
  if (!accessToken) return { success: false, message: 'LinkedIn Access Token not found in .env.local.' };
  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;
  if (!organizationId) {
    return { success: false, message: 'LINKEDIN_ORGANIZATION_ID not found in .env.local.' };
  }
  const authorUrn = `urn:li:organization:${organizationId}`;
  const API_URL = 'https://api.linkedin.com/v2/ugcPosts';
  const requestBody = { author: authorUrn, lifecycleState: 'PUBLISHED', specificContent: { 'com.linkedin.ugc.ShareContent': { shareCommentary: { text: text }, shareMediaCategory: 'NONE' } }, visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' } };
  try {
    console.log('Posting text update to LinkedIn...');
    const response = await axios.post(API_URL, requestBody, { headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json', 'X-Restli-Protocol-Version': '2.0.0' } });
    console.log('Successfully posted text update to LinkedIn:', response.data.id);
    return { success: true, data: response.data };
  } catch (error) {
    const errMsg = error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message;
    console.error('Failed to post text update to LinkedIn:', errMsg);
    console.error('Check token permissions (e.g., w_organization_social), org ID, and API limits.');
    return { success: false, message: `LinkedIn API Error: ${errMsg}` };
  }
}

async function postArticle(articleUrl, title, description) {
  const accessToken = authenticate();
  if (!accessToken) return { success: false, message: 'LinkedIn Access Token not found in .env.local.' };
  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;
  if (!organizationId) return { success: false, message: 'LINKEDIN_ORGANIZATION_ID not found in .env.local.' };
  const authorUrn = `urn:li:organization:${organizationId}`;
  const API_URL = 'https://api.linkedin.com/v2/ugcPosts';
  const requestBody = { author: authorUrn, lifecycleState: 'PUBLISHED', specificContent: { 'com.linkedin.ugc.ShareContent': { shareCommentary: { text: description }, shareMediaCategory: 'ARTICLE', media: [{ status: 'READY', description: { text: description }, originalUrl: articleUrl, title: { text: title } }] } }, visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' } };
  try {
    console.log('Posting article to LinkedIn...');
    const response = await axios.post(API_URL, requestBody, { headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json', 'X-Restli-Protocol-Version': '2.0.0' } });
    console.log('Successfully posted article to LinkedIn:', response.data.id);
    return { success: true, data: response.data };
  } catch (error) {
    const errMsg = error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message;
    console.error('Failed to post article to LinkedIn:', errMsg);
    return { success: false, message: `LinkedIn API Error: ${errMsg}` };
  }
}
module.exports = { authenticate, postTextUpdate, postArticle };
