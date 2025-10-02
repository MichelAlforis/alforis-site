const axios = require('axios');

const IG_ACCESS_TOKEN_VAR = 'IG_ACCESS_TOKEN';
const FB_PAGE_ID_VAR = 'FB_PAGE_ID'; // Instagram Business Account ID, used by Instagram API

function checkEnvVariables() {
  const accessToken = process.env[IG_ACCESS_TOKEN_VAR];
  const fbPageId = process.env[FB_PAGE_ID_VAR];

  if (!accessToken) {
    const message = `${IG_ACCESS_TOKEN_VAR} is not defined.`;
    // console.warn is already prefixed, but removing direct log from lib is cleaner.
    return { success: false, message: message, errorCode: "CONFIG_ERROR" };
  }
  if (!fbPageId) {
    const message = `${FB_PAGE_ID_VAR} (Instagram Business Account ID) is not defined.`;
    // console.warn is already prefixed, but removing direct log from lib is cleaner.
    return { success: false, message: message, errorCode: "CONFIG_ERROR" };
  }
  return { success: true };
}

function authenticate() {
  const envCheck = checkEnvVariables();
  if (!envCheck.success) {
    return { error: true, message: envCheck.message, errorCode: envCheck.errorCode, client: null };
  }
  const token = process.env[IG_ACCESS_TOKEN_VAR];
  return { error: false, client: token };
}

const INSTAGRAM_CAPTION_CHAR_LIMIT = 2200;

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

async function postImage(imageUrl, caption) {
  if (!imageUrl || imageUrl.trim() === "") {
    return { success: false, message: "Image URL cannot be empty for Instagram post.", errorCode: "VALIDATION_ERROR" };
  }
  if (!isValidHttpUrl(imageUrl)) {
    return { success: false, message: "Image URL must be a valid HTTP/HTTPS URL for Instagram post.", errorCode: "VALIDATION_ERROR" };
  }
  if (caption && caption.length > INSTAGRAM_CAPTION_CHAR_LIMIT) {
    return { success: false, message: `Instagram caption exceeds ${INSTAGRAM_CAPTION_CHAR_LIMIT} characters (currently ${caption.length} characters).`, errorCode: "VALIDATION_ERROR" };
  }

  const authResult = authenticate();
  if (authResult.error) {
    return { success: false, message: authResult.message, errorCode: authResult.errorCode || "AUTH_ERROR" };
  }
  const accessToken = authResult.client;
  const fbPageId = process.env[FB_PAGE_ID_VAR]; // Already checked
  const GRAPH_API_VERSION = 'v19.0';
  let containerId = null;

  // Step 1: Create media container
  try {
    const containerUrl = `https://graph.facebook.com/${GRAPH_API_VERSION}/${fbPageId}/media`;
    const containerParams = { image_url: imageUrl, caption: caption || '', access_token: accessToken };
    const containerResponse = await axios.post(containerUrl, containerParams);
    containerId = containerResponse.data.id;
    console.log('[INFO] Instagram - Step 1 successful. Container ID:', containerId);
  } catch (error) {
    let errorCode = "API_ERROR";
    if (error.request && !error.response) errorCode = "NETWORK_ERROR";
    else if (error.response?.status === 401 || error.response?.status === 403) errorCode = "AUTH_ERROR";
    else if (error.response?.status === 400 && error.response?.data?.error?.code === 100) errorCode = "VALIDATION_ERROR"; // Invalid parameter (e.g. bad image URL)

    const apiMessage = error.response?.data?.error?.message || 'No specific API message.';
    const fbTraceId = error.response?.headers ? (error.response.headers['x-fb-trace-id'] || error.response.headers['x-fb-request-id']) : 'N/A';
    const errMsg = `Instagram API Error (Container Upload): ${apiMessage} (Status: ${error.response?.status || 'N/A'}, FBTraceID: ${fbTraceId})`;
    console.error('[ERROR] Failed to upload image container to Instagram:', errMsg, error.response?.data?.error || '');
    return { success: false, message: errMsg, errorCode: errorCode };
  }

  // Step 2: Publish media container
  if (containerId) {
    try {
      const publishUrl = `https://graph.facebook.com/${GRAPH_API_VERSION}/${fbPageId}/media_publish`;
      const publishParams = { creation_id: containerId, access_token: accessToken };
      const publishResponse = await axios.post(publishUrl, publishParams);
      console.log('[INFO] Successfully posted image to Instagram:', publishResponse.data.id);
      return { success: true, data: publishResponse.data };
    } catch (error) {
      let errorCode = "API_ERROR";
      if (error.response?.data?.error?.code === 190) errorCode = "AUTH_ERROR";
      else if (error.response?.data?.error?.code === 9007 || error.response?.data?.error?.code === 9004 ) errorCode = "VALIDATION_ERROR";

      if (error.request && !error.response && errorCode === "API_ERROR") errorCode = "NETWORK_ERROR";
      else if ((error.response?.status === 401 || error.response?.status === 403) && errorCode === "API_ERROR") errorCode = "AUTH_ERROR";

      const apiMessage = error.response?.data?.error?.message || 'No specific API message.';
      const fbTraceId = error.response?.headers ? (error.response.headers['x-fb-trace-id'] || error.response.headers['x-fb-request-id']) : 'N/A';
      const errMsg = `Instagram API Error (Publish Container): ${apiMessage} (Status: ${error.response?.status || 'N/A'}, Code: ${error.response?.data?.error?.code || 'N/A'}, FBTraceID: ${fbTraceId})`;
      console.error('[ERROR] Failed to publish image to Instagram:', errMsg, error.response?.data?.error || '');
      return { success: false, message: errMsg, errorCode: errorCode };
    }
  }

  return { success: false, message: 'Instagram post failed: container ID was not obtained or another unknown issue occurred.', errorCode: 'UNKNOWN_ERROR' };
}
module.exports = { authenticate, postImage, checkEnvVariables };
