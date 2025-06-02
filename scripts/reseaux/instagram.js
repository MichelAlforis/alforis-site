const axios = require('axios');

function authenticate() {
  const token = process.env.IG_ACCESS_TOKEN;
  if (!token) {
    console.warn('IG_ACCESS_TOKEN not found in .env.local. Instagram posts will likely fail.');
    return null;
  }
  console.log('Using direct Instagram Access Token from .env.local.');
  return token;
}

async function postImage(imageUrl, caption) {
  const accessToken = authenticate();
  if (!accessToken) return { success: false, message: 'Instagram Access Token (IG_ACCESS_TOKEN) not found in .env.local.' };
  const fbPageId = process.env.FB_PAGE_ID; // Instagram Business Account ID
  if (!fbPageId) return { success: false, message: 'Instagram Business Account ID (FB_PAGE_ID) not found in .env.local.' };
  const GRAPH_API_VERSION = 'v19.0';
  let containerId = null;
  try {
    console.log('Instagram - Step 1: Uploading image container...');
    const containerUrl = `https://graph.facebook.com/${GRAPH_API_VERSION}/${fbPageId}/media`;
    const containerParams = { image_url: imageUrl, caption: caption, access_token: accessToken };
    const containerResponse = await axios.post(containerUrl, containerParams);
    containerId = containerResponse.data.id;
    console.log('Instagram - Step 1 successful. Container ID:', containerId);
  } catch (error) {
    const errMsg = error.response && error.response.data && error.response.data.error ? error.response.data.error.message : error.message;
    console.error('Failed to upload image container to Instagram:', errMsg);
    console.error('Ensure IG_ACCESS_TOKEN is valid, has necessary permissions (instagram_content_publish etc.), and FB_PAGE_ID is correct.');
    return { success: false, message: `Instagram API Error (Container Upload): ${errMsg}` };
  }
  if (containerId) {
    try {
      console.log('Instagram - Step 2: Publishing media container...');
      const publishUrl = `https://graph.facebook.com/${GRAPH_API_VERSION}/${fbPageId}/media_publish`;
      const publishParams = { creation_id: containerId, access_token: accessToken };
      const publishResponse = await axios.post(publishUrl, publishParams);
      console.log('Successfully posted image to Instagram:', publishResponse.data.id);
      return { success: true, data: publishResponse.data };
    } catch (error) {
      const errMsg = error.response && error.response.data && error.response.data.error ? error.response.data.error.message : error.message;
      console.error('Failed to publish image to Instagram:', errMsg);
      console.error('This can happen if container is not ready or due to other restrictions.');
      return { success: false, message: `Instagram API Error (Publish Container): ${errMsg}` };
    }
  }
  return { success: false, message: 'Instagram post failed due to an unknown issue before publishing container.' };
}
module.exports = { authenticate, postImage };
