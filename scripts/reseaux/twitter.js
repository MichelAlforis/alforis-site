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

const axios = require('axios'); // Import axios for image download

function authenticate() {
  const envCheck = checkEnvVariables();
  if (!envCheck.success) {
    // Propagate error from checkEnvVariables, ensuring standard return object
    return { success: false, message: envCheck.message, errorCode: envCheck.errorCode };
  }

  try {
    const client = new TwitterApi({
      appKey: process.env[API_KEY_VAR],
      appSecret: process.env[API_SECRET_KEY_VAR],
      accessToken: process.env[ACCESS_TOKEN_VAR],
      accessSecret: process.env[ACCESS_TOKEN_SECRET_VAR],
    });
    // Successfully authenticated (client instantiated)
    return { success: true, client: client.readWrite };
  } catch (error) {
    // This catch is for errors during client instantiation
    console.error('[ERROR] Error instantiating Twitter client:', error.message);
    return { success: false, message: `Twitter client instantiation failed: ${error.message}`, errorCode: "AUTH_ERROR" };
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
  if (!authResult.success) {
    // authResult already contains standardized { success: false, message, errorCode }
    return authResult;
  }
  const client = authResult.client;

  try {
    const { data: createdTweet } = await client.v2.tweet(text);
    console.log('[INFO] Tweet posted successfully:', createdTweet.id);
    return { success: true, data: { id: createdTweet.id, text: createdTweet.text } };
  } catch (error) {
    let errorCode = "API_ERROR"; // Default
    // TwitterError properties: error.code (numeric, e.g. 400), error.statusCode (http status)
    // error.data (parsed response body), error.isAuthError (boolean)
    if (error.code === 'ETIMEDOUT' || error.code === 'ENETUNREACH' || typeof error.code === 'string' && error.code.startsWith('E')) { // System errors
        errorCode = "NETWORK_ERROR";
    } else if (error.isAuthError || error.statusCode === 401 || error.statusCode === 403) {
        errorCode = "AUTH_ERROR";
    } else if (error.statusCode === 429) { // Rate limit
        errorCode = "API_ERROR"; // Could be RATE_LIMIT_ERROR if defined globally
    } else if (error.statusCode === 400 || error.data?.type?.includes('validation') || error.message?.toLowerCase().includes('validation')) {
        errorCode = "VALIDATION_ERROR";
    } else if (error.statusCode >= 500 && error.statusCode <= 599) {
        errorCode = "API_ERROR"; // Server-side Twitter error
    }
    // For other client-side errors that aren't network or auth, VALIDATION_ERROR might be suitable if due to bad input not caught by initial checks.
    // Otherwise, API_ERROR is a general fallback.

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
    return { success: false, message: 'Image URL must be a valid HTTP/HTTPS URL for a Tweet with image.', errorCode: "VALIDATION_ERROR" };
  }

  const authResult = authenticate();
  if (!authResult.success) {
    return authResult;
  }
  const client = authResult.client;
  let mediaId;

  // Step 1: Download image
  let imageBuffer;
  try {
    console.log(`[INFO] Downloading image for Tweet from: ${imageUrl}`);
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    imageBuffer = Buffer.from(response.data);
    console.log('[INFO] Image downloaded successfully.');
  } catch (error) {
    let downloadErrorCode = "NETWORK_ERROR";
    let detailedMessage = `Failed to download image from ${imageUrl}.`;
    if (error.response) { // Error from server (4xx, 5xx for image URL)
        downloadErrorCode = "API_ERROR"; // Or VALIDATION_ERROR if 404 on image
        detailedMessage += ` Status: ${error.response.status}.`;
    } else if (error.request) { // Network error (no response)
        detailedMessage += ` No response received.`;
    } else { // Other errors
        detailedMessage += ` Error: ${error.message}.`;
    }
    console.error('[ERROR] Image download failed:', detailedMessage, error);
    return { success: false, message: detailedMessage, errorCode: downloadErrorCode };
  }

  // Step 2: Upload image to Twitter
  try {
    console.log('[INFO] Uploading image to Twitter...');
    // Assuming imageBuffer is a Buffer.
    // uploadMedia can take a path or a Buffer. Ensure your twitter-api-v2 version supports Buffer.
    mediaId = await client.v1.uploadMedia(imageBuffer, { mimeType: 'image/jpeg' }); // Adjust mimeType if needed (e.g. image/png)
    console.log('[INFO] Image uploaded to Twitter successfully. Media ID:', mediaId);
  } catch (error) {
    let uploadErrorCode = "API_ERROR";
    if (error.code === 'ETIMEDOUT' || error.code === 'ENETUNREACH' || typeof error.code === 'string' && error.code.startsWith('E')) {
        uploadErrorCode = "NETWORK_ERROR";
    } else if (error.isAuthError || error.statusCode === 401 || error.statusCode === 403) {
        uploadErrorCode = "AUTH_ERROR";
    } else if (error.statusCode === 400) { // e.g. media type not supported, file too large
        uploadErrorCode = "VALIDATION_ERROR";
    }
    // Other errors (429 Rate Limit, 5xx Server Error) default to API_ERROR
    const apiMessage = error.data?.error || error.message || 'Unknown error uploading media.';
    const twitterStatus = error.statusCode || 'N/A';
    const errMsg = `Twitter API Error (Media Upload): ${apiMessage} (Status: ${twitterStatus})`;
    console.error('[ERROR] Error uploading media to Twitter:', errMsg, error.data || '');
    return { success: false, message: errMsg, errorCode: uploadErrorCode };
  }

  // Step 3: Post tweet with media ID
  try {
    console.log(`[INFO] Posting tweet with text and media ID: ${mediaId}`);
    const { data: createdTweet } = await client.v2.tweet(text, { media: { media_ids: [mediaId] } });
    console.log('[INFO] Tweet with image posted successfully:', createdTweet.id);
    return { success: true, data: { id: createdTweet.id, text: createdTweet.text } };
  } catch (error) {
    let tweetErrorCode = "API_ERROR";
     if (error.code === 'ETIMEDOUT' || error.code === 'ENETUNREACH' || typeof error.code === 'string' && error.code.startsWith('E')) {
        tweetErrorCode = "NETWORK_ERROR";
    } else if (error.isAuthError || error.statusCode === 401 || error.statusCode === 403) {
        tweetErrorCode = "AUTH_ERROR";
    } else if (error.statusCode === 429) {
        tweetErrorCode = "API_ERROR";
    } else if (error.statusCode === 400 || error.data?.type?.includes('validation')) {
        tweetErrorCode = "VALIDATION_ERROR";
    } else if (error.statusCode >= 500 && error.statusCode <= 599) {
        tweetErrorCode = "API_ERROR";
    }
    const apiMessage = error.data?.detail || error.data?.title || error.message || 'Unknown error posting tweet with image.';
    const twitterStatus = error.statusCode || 'N/A';
    const errMsg = `Twitter API Error (Tweet with Image): ${apiMessage} (Status: ${twitterStatus}, Type: ${error.data?.type || 'N/A'})`;
    console.error('[ERROR] Error posting tweet with image to Twitter:', errMsg, JSON.stringify(error.data) || '');
    return { success: false, message: errMsg, errorCode: tweetErrorCode };
  }
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
