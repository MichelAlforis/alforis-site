const axios = require('axios');

const LINKEDIN_ACCESS_TOKEN_VAR = 'LINKEDIN_ACCESS_TOKEN';
const LINKEDIN_ORGANIZATION_ID_VAR = 'LINKEDIN_ORGANIZATION_ID';

function checkEnvVariables() {
  const accessToken = process.env[LINKEDIN_ACCESS_TOKEN_VAR];
  const organizationId = process.env[LINKEDIN_ORGANIZATION_ID_VAR];

  if (!accessToken) {
    const message = `${LINKEDIN_ACCESS_TOKEN_VAR} is not defined.`;
    // console.warn already has [WARN]
    return { success: false, message: message, errorCode: "CONFIG_ERROR" };
  }
  if (!organizationId) {
    const message = `${LINKEDIN_ORGANIZATION_ID_VAR} is not defined.`;
    // console.warn already has [WARN]
    return { success: false, message: message, errorCode: "CONFIG_ERROR" };
  }
  return { success: true };
}

function authenticate() {
  const envCheck = checkEnvVariables();
  if (!envCheck.success) {
    // Pass the errorCode from checkEnvVariables
    return { error: true, message: envCheck.message, errorCode: envCheck.errorCode, client: null };
  }

  const token = process.env[LINKEDIN_ACCESS_TOKEN_VAR];
  // console.log('Using direct LinkedIn Access Token from .env.local.');
  // For authenticate itself, if it were to make an API call that failed,
  // it might return an AUTH_ERROR. Here, it's just checking env vars and returning a token.
  // So, the main error source is from checkEnvVariables.
  return { error: false, client: token };
}

const LINKEDIN_POST_CHAR_LIMIT = 3000; // LinkedIn general post character limit.
// For articles, the body limit is much higher (e.g. 120,000), but shareCommentary for an article link is shorter.
const LINKEDIN_ARTICLE_COMMENTARY_CHAR_LIMIT = 700;

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
    return { success: false, message: "Text content cannot be empty for LinkedIn post.", errorCode: "VALIDATION_ERROR" };
  }
  if (text.length > LINKEDIN_POST_CHAR_LIMIT) {
    return { success: false, message: `LinkedIn post text exceeds ${LINKEDIN_POST_CHAR_LIMIT} characters (currently ${text.length} characters).`, errorCode: "VALIDATION_ERROR" };
  }

  const authResult = authenticate();
  if (authResult.error) {
    return { success: false, message: authResult.message, errorCode: authResult.errorCode || "AUTH_ERROR" };
  }
  const accessToken = authResult.client;
  const organizationId = process.env[LINKEDIN_ORGANIZATION_ID_VAR]; // Already checked
  const authorUrn = `urn:li:organization:${organizationId}`;
  const API_URL = 'https://api.linkedin.com/v2/ugcPosts';
  const requestBody = {
    author: authorUrn,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: { text: text },
        shareMediaCategory: 'NONE'
      }
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
    }
  };

  try {
    const response = await axios.post(API_URL, requestBody, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    console.log('[INFO] Successfully posted text update to LinkedIn:', response.data.id);
    return { success: true, data: response.data };
  } catch (error) {
    let errorCode = "API_ERROR";
    if (error.request && !error.response) {
      errorCode = "NETWORK_ERROR";
    } else if (error.response?.status === 401) {
      errorCode = "AUTH_ERROR";
    } else if (error.response?.status === 403) {
      errorCode = "AUTH_ERROR";
    } else if (error.response?.status === 422) { // Unprocessable Entity - often validation
      errorCode = "VALIDATION_ERROR";
    }

    const apiMessage = error.response?.data?.message || 'No specific API message.';
    const serviceErrorCode = error.response?.data?.serviceErrorCode || 'N/A';
    const errMsg = `LinkedIn API Error: ${apiMessage} (Status: ${error.response?.status || 'N/A'}, ServiceErrCode: ${serviceErrorCode})`;
    console.error('[ERROR] Failed to post text update to LinkedIn:', errMsg, error.response?.data || '');
    return { success: false, message: errMsg, errorCode: errorCode };
  }
}

async function postArticle(articleUrl, title, description) {
  if (!articleUrl || articleUrl.trim() === "") {
    return { success: false, message: "Article URL cannot be empty for LinkedIn post.", errorCode: "VALIDATION_ERROR" };
  }
  if (!isValidHttpUrl(articleUrl)) {
    return { success: false, message: "Article URL must be a valid HTTP/HTTPS URL.", errorCode: "VALIDATION_ERROR" };
  }
  if (!title || title.trim() === "") {
    return { success: false, message: "Article title cannot be empty for LinkedIn post.", errorCode: "VALIDATION_ERROR" };
  }
  if (description && description.length > LINKEDIN_ARTICLE_COMMENTARY_CHAR_LIMIT) {
     return { success: false, message: `LinkedIn article commentary exceeds ${LINKEDIN_ARTICLE_COMMENTARY_CHAR_LIMIT} characters (currently ${description.length} characters).`, errorCode: "VALIDATION_ERROR" };
  }

  const authResult = authenticate();
  if (authResult.error) {
    return { success: false, message: authResult.message, errorCode: authResult.errorCode || "AUTH_ERROR" };
  }
  const accessToken = authResult.client;
  const organizationId = process.env[LINKEDIN_ORGANIZATION_ID_VAR];
  const authorUrn = `urn:li:organization:${organizationId}`;
  const API_URL = 'https://api.linkedin.com/v2/ugcPosts';
  const requestBody = {
    author: authorUrn,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: { text: description || '' },
        shareMediaCategory: 'ARTICLE',
        media: [{
          status: 'READY',
          description: { text: description || '' },
          originalUrl: articleUrl,
          title: { text: title }
        }]
      }
    },
    visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' }
  };

  try {
    const response = await axios.post(API_URL, requestBody, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    console.log('[INFO] Successfully posted article to LinkedIn:', response.data.id);
    return { success: true, data: response.data };
  } catch (error) {
    let errorCode = "API_ERROR";
    if (error.request && !error.response) {
      errorCode = "NETWORK_ERROR";
    } else if (error.response?.status === 401) {
      errorCode = "AUTH_ERROR";
    } else if (error.response?.status === 403) {
      errorCode = "AUTH_ERROR";
    } else if (error.response?.status === 422) {
      errorCode = "VALIDATION_ERROR";
    }

    const apiMessage = error.response?.data?.message || 'No specific API message.';
    const serviceErrorCode = error.response?.data?.serviceErrorCode || 'N/A';
    const errMsg = `LinkedIn API Error (Article): ${apiMessage} (Status: ${error.response?.status || 'N/A'}, ServiceErrCode: ${serviceErrorCode})`;
    console.error('[ERROR] Failed to post article to LinkedIn:', errMsg, error.response?.data || '');
    return { success: false, message: errMsg, errorCode: errorCode };
  }
}
module.exports = { authenticate, postTextUpdate, postArticle, checkEnvVariables };
