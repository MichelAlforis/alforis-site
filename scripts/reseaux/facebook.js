const axios = require('axios');

// Using IG_ACCESS_TOKEN for Facebook Page posts, as Meta often uses the same token.
// FB_PAGE_ID is specific to the Facebook Page.
const FB_ACCESS_TOKEN_VAR = 'IG_ACCESS_TOKEN'; // Re-using IG token name as per original code
const FB_PAGE_ID_VAR = 'FB_PAGE_ID';
const GRAPH_API_VERSION = 'v19.0';

function checkEnvVariables() {
  const accessToken = process.env[FB_ACCESS_TOKEN_VAR];
  const pageId = process.env[FB_PAGE_ID_VAR];

  if (!accessToken) {
    const message = `${FB_ACCESS_TOKEN_VAR} (for Facebook) is not defined.`;
    // console.warn is already prefixed, but removing direct log from lib is cleaner.
    return { success: false, message: message, errorCode: "CONFIG_ERROR" };
  }
  if (!pageId) {
    const message = `${FB_PAGE_ID_VAR} is not defined.`;
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
  const token = process.env[FB_ACCESS_TOKEN_VAR];
  // Successfully authenticated (token is present)
  return { success: true, client: token };
}

// Facebook has high character limits (e.g., 63,206 for posts),
// so only basic "not empty" checks are implemented for text/message/caption.
// A helper function for URL validation.
function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

async function postTextUpdate(text) {
  if (!text || text.trim() === "") {
    return { success: false, message: "Text content cannot be empty for Facebook post.", errorCode: "VALIDATION_ERROR" };
  }
  // Add any other specific text validation if needed, e.g. length for practical purposes, though API limit is high.
  const authResult = authenticate();
  if (!authResult.success) {
    return { success: false, message: authResult.message, errorCode: authResult.errorCode }; // No need for || "AUTH_ERROR" as authenticate now standardizes
  }
  const accessToken = authResult.client;
  const pageId = process.env[FB_PAGE_ID_VAR];

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${pageId}/feed`;
  try {
    const response = await axios.post(url, { message: text, access_token: accessToken });
    console.log('[INFO] Successfully posted text to Facebook Page:', response.data.id);
    return { success: true, data: response.data };
  } catch (error) {
    let errorCode = "API_ERROR"; // Default
    if (error.request && !error.response) {
        errorCode = "NETWORK_ERROR";
    } else if (error.response) {
        const status = error.response.status;
        const apiErrorCode = error.response.data?.error?.code;
        if (status === 400) {
            if (apiErrorCode === 100) errorCode = "VALIDATION_ERROR";
            // else keep API_ERROR for other 400s
        } else if (status === 401 || status === 403 || apiErrorCode === 190) {
            errorCode = "AUTH_ERROR";
        } else if (status === 429) {
            errorCode = "API_ERROR"; // Or RATE_LIMIT_ERROR if defined globally
        } else if (status >= 500 && status <= 599) {
            errorCode = "API_ERROR"; // Server-side Facebook error
        }
    }

    const apiMessage = error.response?.data?.error?.message || 'No specific API message.';
    const fbTraceId = error.response?.headers ? (error.response.headers['x-fb-trace-id'] || error.response.headers['x-fb-request-id']) : 'N/A';
    const errMsg = `Facebook API Error (Text Post): ${apiMessage} (Status: ${error.response?.status || 'N/A'}, Code: ${error.response?.data?.error?.code || 'N/A'}, FBTraceID: ${fbTraceId})`;
    console.error('[ERROR] Failed to post text to Facebook Page:', errMsg, error.response?.data?.error || '');
    return { success: false, message: errMsg, errorCode: errorCode };
  }
}

async function postLink(linkUrl, message) {
  if (!linkUrl || linkUrl.trim() === "" || !isValidHttpUrl(linkUrl)) {
    return { success: false, message: "A valid HTTP/HTTPS Link URL is required for Facebook link post.", errorCode: "VALIDATION_ERROR" };
  }

  const authResult = authenticate();
  if (!authResult.success) {
    return { success: false, message: authResult.message, errorCode: authResult.errorCode };
  }
  const accessToken = authResult.client;
  const pageId = process.env[FB_PAGE_ID_VAR];

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${pageId}/feed`;
  try {
    const response = await axios.post(url, { link: linkUrl, message: message || '', access_token: accessToken });
    console.log('[INFO] Successfully posted link to Facebook Page:', response.data.id);
    return { success: true, data: response.data };
  } catch (error) {
    let errorCode = "API_ERROR"; // Default
    if (error.request && !error.response) {
        errorCode = "NETWORK_ERROR";
    } else if (error.response) {
        const status = error.response.status;
        const apiErrorCode = error.response.data?.error?.code;
        if (status === 400) {
            if (apiErrorCode === 100) errorCode = "VALIDATION_ERROR";
            // else keep API_ERROR for other 400s
        } else if (status === 401 || status === 403 || apiErrorCode === 190) {
            errorCode = "AUTH_ERROR";
        } else if (status === 429) {
            errorCode = "API_ERROR"; // Or RATE_LIMIT_ERROR if defined globally
        } else if (status >= 500 && status <= 599) {
            errorCode = "API_ERROR"; // Server-side Facebook error
        }
    }

    const apiMessage = error.response?.data?.error?.message || 'No specific API message.';
    const fbTraceId = error.response?.headers ? (error.response.headers['x-fb-trace-id'] || error.response.headers['x-fb-request-id']) : 'N/A';
    const errMsg = `Facebook API Error (Link Post): ${apiMessage} (Status: ${error.response?.status || 'N/A'}, Code: ${error.response?.data?.error?.code || 'N/A'}, FBTraceID: ${fbTraceId})`;
    console.error('[ERROR] Failed to post link to Facebook Page:', errMsg, error.response?.data?.error || '');
    return { success: false, message: errMsg, errorCode: errorCode };
  }
}

async function postImage(imageUrl, caption) {
  if (!imageUrl || imageUrl.trim() === "" || !isValidHttpUrl(imageUrl)) {
    return { success: false, message: "A valid HTTP/HTTPS Image URL is required for Facebook image post.", errorCode: "VALIDATION_ERROR" };
  }

  const authResult = authenticate();
  if (!authResult.success) {
    return { success: false, message: authResult.message, errorCode: authResult.errorCode };
  }
  const accessToken = authResult.client;
  const pageId = process.env[FB_PAGE_ID_VAR];

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${pageId}/photos`;
  try {
    const response = await axios.post(url, { url: imageUrl, caption: caption || '', access_token: accessToken });
    console.log('[INFO] Successfully posted image to Facebook Page:', response.data.id);
    return { success: true, data: response.data };
  } catch (error) {
    let errorCode = "API_ERROR"; // Default
    if (error.request && !error.response) {
        errorCode = "NETWORK_ERROR";
    } else if (error.response) {
        const status = error.response.status;
        const apiErrorCode = error.response.data?.error?.code;
        if (status === 400) {
            if (apiErrorCode === 100) errorCode = "VALIDATION_ERROR";
            // else keep API_ERROR for other 400s
        } else if (status === 401 || status === 403 || apiErrorCode === 190) {
            errorCode = "AUTH_ERROR";
        } else if (status === 429) {
            errorCode = "API_ERROR"; // Or RATE_LIMIT_ERROR if defined globally
        } else if (status >= 500 && status <= 599) {
            errorCode = "API_ERROR"; // Server-side Facebook error
        }
    }

    const apiMessage = error.response?.data?.error?.message || 'No specific API message.';
    const fbTraceId = error.response?.headers ? (error.response.headers['x-fb-trace-id'] || error.response.headers['x-fb-request-id']) : 'N/A';
    const errMsg = `Facebook API Error (Image Post): ${apiMessage} (Status: ${error.response?.status || 'N/A'}, Code: ${error.response?.data?.error?.code || 'N/A'}, FBTraceID: ${fbTraceId})`;
    console.error('[ERROR] Failed to post image to Facebook Page:', errMsg, error.response?.data?.error || '');
    return { success: false, message: errMsg, errorCode: errorCode };
  }
}
module.exports = { authenticate, postTextUpdate, postLink, postImage, checkEnvVariables };
