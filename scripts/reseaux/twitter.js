// X (Twitter) API Module
const { TwitterApi } = require('twitter-api-v2');

// Environment variable names
const API_KEY_VAR = 'TWITTER_API_KEY';
const API_SECRET_KEY_VAR = 'TWITTER_API_SECRET_KEY';
const ACCESS_TOKEN_VAR = 'TWITTER_ACCESS_TOKEN';
const ACCESS_TOKEN_SECRET_VAR = 'TWITTER_ACCESS_TOKEN_SECRET';

function checkEnvVariables() {
  const appKey = process.env[API_KEY_VAR];
  const appSecret = process.env[API_SECRET_KEY_VAR];
  const accessToken = process.env[ACCESS_TOKEN_VAR];
  const accessSecret = process.env[ACCESS_TOKEN_SECRET_VAR];

  let missingVars = [];
  if (!appKey) missingVars.push(API_KEY_VAR);
  if (!appSecret) missingVars.push(API_SECRET_KEY_VAR);
  if (!accessToken) missingVars.push(ACCESS_TOKEN_VAR);
  if (!accessSecret) missingVars.push(ACCESS_TOKEN_SECRET_VAR);

  if (missingVars.length > 0) {
    const message = `Twitter API credentials missing: ${missingVars.join(', ')}. Please set these environment variables.`;
    // console.warn is already prefixed. Removing direct log for consistency.
    return { success: false, message: message, errorCode: "CONFIG_ERROR" };
  }
  return { success: true };
}

function authenticate() {
  const envCheck = checkEnvVariables();
  if (!envCheck.success) {
    return { error: true, message: envCheck.message, errorCode: envCheck.errorCode, client: null };
  }

  try {
    const client = new TwitterApi({
      appKey: process.env[API_KEY_VAR],
      appSecret: process.env[API_SECRET_KEY_VAR],
      accessToken: process.env[ACCESS_TOKEN_VAR],
      accessSecret: process.env[ACCESS_TOKEN_SECRET_VAR],
    });
    return { error: false, client: client.readWrite };
  } catch (error) {
    // This catch is for errors during client instantiation, which could be due to malformed keys
    // but are distinct from API call authentication errors.
    console.error('[ERROR] Error instantiating Twitter client:', error.message);
    return { error: true, message: `Twitter client instantiation failed: ${error.message}`, errorCode: "AUTH_ERROR", client: null };
  }
}

const TWITTER_CHAR_LIMIT = 280;
const TWITTER_CHAR_LIMIT_WITH_IMAGE = 280; // Typically the same, but could differ. For now, assume same.

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

async function postTweet(text) {
  if (!text || text.trim() === "") {
    return { success: false, message: 'Text content cannot be empty for a Tweet.', errorCode: "VALIDATION_ERROR" };
  }
  if (text.length > TWITTER_CHAR_LIMIT) {
    return { success: false, message: `Tweet text exceeds ${TWITTER_CHAR_LIMIT} characters (currently ${text.length} characters).`, errorCode: "VALIDATION_ERROR" };
  }

  const authResult = authenticate();
  if (authResult.error) {
    return { success: false, message: authResult.message, errorCode: authResult.errorCode || "AUTH_ERROR" };
  }
  const client = authResult.client;

  try {
    const { data: createdTweet } = await client.v2.tweet(text);
    console.log('[INFO] Tweet posted successfully:', createdTweet.id);
    return { success: true, data: { id: createdTweet.id, text: createdTweet.text } };
  } catch (error) {
    let errorCode = "API_ERROR";
    if (error.code === 'ETIMEDOUT' || error.code === 'ENETUNREACH') {
        errorCode = "NETWORK_ERROR";
    } else if (error.isAuthError || error.statusCode === 401 || error.statusCode === 403) {
        errorCode = "AUTH_ERROR";
    } else if (error.statusCode === 429) {
        errorCode = "API_ERROR";
    } else if (error.data?.type?.includes('validation')) {
        errorCode = "VALIDATION_ERROR";
    }

    const apiMessage = error.data?.detail || error.data?.title || error.message || 'Unknown error posting tweet.';
    const twitterStatus = error.statusCode || 'N/A';
    const errMsg = `Twitter API Error: ${apiMessage} (Status: ${twitterStatus}, Type: ${error.data?.type || 'N/A'})`;

    console.error('[ERROR] Error posting tweet to Twitter:', errMsg, JSON.stringify(error.data) || '');
    return { success: false, message: errMsg, errorCode: errorCode };
  }
}

async function postTweetWithImage(text, imageUrl) {
  if (!text || text.trim() === "") {
    return { success: false, message: 'Text content cannot be empty for a Tweet with image.', errorCode: "VALIDATION_ERROR" };
  }
  if (text.length > TWITTER_CHAR_LIMIT_WITH_IMAGE) {
    return { success: false, message: `Tweet text exceeds ${TWITTER_CHAR_LIMIT_WITH_IMAGE} characters (currently ${text.length} characters) for a tweet with image.`, errorCode: "VALIDATION_ERROR" };
  }
  if (!imageUrl || imageUrl.trim() === "") {
    return { success: false, message: 'Image URL cannot be empty for a Tweet with image.', errorCode: "VALIDATION_ERROR" };
  }
  if (!isValidHttpUrl(imageUrl)) {
    return { success: false, message: 'Image URL must be a valid HTTP/HTTPS URL.', errorCode: "VALIDATION_ERROR" };
  }

  const authResult = authenticate();
  if (authResult.error) {
    return { success: false, message: authResult.message, errorCode: authResult.errorCode || "AUTH_ERROR" };
  }
  // const client = authResult.client; // Client would be used here

  console.warn('[WARN] postTweetWithImage is not fully implemented. This is a placeholder.');
  return {
    success: false,
    message: 'postTweetWithImage is not yet implemented.',
    errorCode: "UNKNOWN_ERROR"
  };
}

module.exports = {
  authenticate,
  postTweet,
  postTweetWithImage,
  checkEnvVariables,
  API_KEY_VAR,
  API_SECRET_KEY_VAR,
  ACCESS_TOKEN_VAR,
  ACCESS_TOKEN_SECRET_VAR
};
