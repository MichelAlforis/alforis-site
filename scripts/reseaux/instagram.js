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
    // Propagate error from checkEnvVariables, ensuring standard return object
    return { success: false, message: envCheck.message, errorCode: envCheck.errorCode };
  }
  const token = process.env[IG_ACCESS_TOKEN_VAR];
  // Successfully authenticated (token is present)
  return { success: true, client: token };
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
  if (!authResult.success) {
    // authResult already contains standardized { success: false, message, errorCode }
    return authResult;
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
    let errorCode = "API_ERROR"; // Default
    if (error.request && !error.response) {
        errorCode = "NETWORK_ERROR";
    } else if (error.response) {
        const status = error.response.status;
        const apiErrorCode = error.response.data?.error?.code;
        if (status === 400) {
            // For Instagram, error code 100 is 'Invalid parameter', but other 400s can occur.
            // Specific API error codes might be more granular, e.g., for media processing issues if they came at this stage.
            if (apiErrorCode === 100 || apiErrorCode === 80004) errorCode = "VALIDATION_ERROR"; // 80004: "There was a problem with the media".
            // else keep API_ERROR for other 400s
        } else if (status === 401 || status === 403) {
            errorCode = "AUTH_ERROR";
        } else if (status >= 500 && status <= 599) {
            errorCode = "API_ERROR"; // Server-side Facebook/Instagram error
        }
        // Note: 429 (Rate Limit) would also fall under generic API_ERROR here or need specific handling if desired.
    }

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
      let errorCode = "API_ERROR"; // Default
      if (error.request && !error.response) {
          errorCode = "NETWORK_ERROR";
      } else if (error.response) {
          const status = error.response.status;
          const apiErrorCode = error.response.data?.error?.code;

          if (apiErrorCode === 190) { // Specific API code for token issues
              errorCode = "AUTH_ERROR";
          } else if (apiErrorCode === 9007 || apiErrorCode === 9004 || apiErrorCode === 24 || apiErrorCode === 352) {
              // 9007: Media processing failed, 9004: Action not allowed on video, 24: Media Eligible for Feed but not for Story, 352: Video too long or too short
              errorCode = "VALIDATION_ERROR";
          } else if (status === 400) { // General bad request not caught by specific API codes above
              errorCode = "VALIDATION_ERROR"; // Could be other validation issues not covered by specific codes
          } else if (status === 401 || status === 403) { // General auth errors if not code 190
              errorCode = "AUTH_ERROR";
          } else if (status >= 500 && status <= 599) {
              errorCode = "API_ERROR"; // Server-side Facebook/Instagram error
          }
          // Note: 429 (Rate Limit) would also fall under generic API_ERROR here or need specific handling if desired.
      }

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
