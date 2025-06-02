const axios = require('axios');

function authenticate() {
  const token = process.env.IG_ACCESS_TOKEN; // Assuming this token can post to FB Page
  if (!token) {
    console.warn('IG_ACCESS_TOKEN not found in .env.local. Facebook posts will likely fail.');
    return null;
  }
  console.log('Using IG_ACCESS_TOKEN from .env.local for Facebook Page posts.');
  return token;
}
const GRAPH_API_VERSION = 'v19.0';

async function postTextUpdate(text) {
  const accessToken = authenticate();
  if (!accessToken) return { success: false, message: 'Access Token (IG_ACCESS_TOKEN) not found for Facebook.' };
  const pageId = process.env.FB_PAGE_ID;
  if (!pageId) return { success: false, message: 'Facebook Page ID (FB_PAGE_ID) not found.' };
  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${pageId}/feed`;
  try {
    const response = await axios.post(url, { message: text, access_token: accessToken });
    console.log('Successfully posted text to Facebook Page:', response.data.id);
    return { success: true, data: response.data };
  } catch (error) {
    const errMsg = error.response && error.response.data && error.response.data.error ? error.response.data.error.message : error.message;
    console.error('Failed to post text to Facebook Page:', errMsg);
    console.error('Ensure IG_ACCESS_TOKEN has pages_manage_posts permission for the FB_PAGE_ID.');
    return { success: false, message: `Facebook API Error (Text Post): ${errMsg}` };
  }
}

async function postLink(linkUrl, message) {
  const accessToken = authenticate();
  if (!accessToken) return { success: false, message: 'Access Token (IG_ACCESS_TOKEN) not found for Facebook.' };
  const pageId = process.env.FB_PAGE_ID;
  if (!pageId) return { success: false, message: 'Facebook Page ID (FB_PAGE_ID) not found.' };
  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${pageId}/feed`;
  try {
    const response = await axios.post(url, { link: linkUrl, message: message, access_token: accessToken });
    console.log('Successfully posted link to Facebook Page:', response.data.id);
    return { success: true, data: response.data };
  } catch (error) {
    const errMsg = error.response && error.response.data && error.response.data.error ? error.response.data.error.message : error.message;
    console.error('Failed to post link to Facebook Page:', errMsg);
    return { success: false, message: `Facebook API Error (Link Post): ${errMsg}` };
  }
}

async function postImage(imageUrl, caption) {
  const accessToken = authenticate();
  if (!accessToken) return { success: false, message: 'Access Token (IG_ACCESS_TOKEN) not found for Facebook.' };
  const pageId = process.env.FB_PAGE_ID;
  if (!pageId) return { success: false, message: 'Facebook Page ID (FB_PAGE_ID) not found.' };
  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${pageId}/photos`;
  try {
    const response = await axios.post(url, { url: imageUrl, caption: caption, access_token: accessToken });
    console.log('Successfully posted image to Facebook Page:', response.data.id);
    return { success: true, data: response.data };
  } catch (error) {
    const errMsg = error.response && error.response.data && error.response.data.error ? error.response.data.error.message : error.message;
    console.error('Failed to post image to Facebook Page:', errMsg);
    return { success: false, message: `Facebook API Error (Image Post): ${errMsg}` };
  }
}
module.exports = { authenticate, postTextUpdate, postLink, postImage };
