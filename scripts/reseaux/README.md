# Social Media Posting Scripts

This directory contains scripts to automate posting content to various social media platforms based on data from an Airtable base.

## Overview

The main script, `index.js`, reads records from an Airtable table (e.g., "Posts_a_publier"). For each record marked ready for publication, it dispatches the content to the appropriate platform-specific module (LinkedIn, Instagram, Facebook, X (Twitter), Google My Business). The script then updates the Airtable record with the publication status.

## Setup

### 1. Environment Variables

Create a `.env.local` file in the root of this project (if it's a project-level `.env.local`, ensure it's correctly picked up by `dotenv` from `scripts/reseaux/index.js`, or place a copy in `scripts/reseaux/.env.local`). This file stores necessary API keys, tokens, and IDs.

**Airtable Configuration:**

*   `AIRTABLE_SOCIAL_API_KEY`: Your Airtable API key.
*   `AIRTABLE_SOCIAL_BASE_ID`: The ID of your Airtable base containing social media posts.
*   `AIRTABLE_SOCIAL_TABLE_NAME`: The name of the table within your base (e.g., "Publications").
*   `AIRTABLE_SOCIAL_VIEW_NAME`: (Optional) The name of a specific view within your table to select records from (e.g., "Posts_a_publier"). If omitted, all records in the table are considered.

**Platform-Specific Variables:**

*   **LinkedIn:**
    *   `LINKEDIN_ACCESS_TOKEN`: OAuth 2.0 access token for the LinkedIn API with `w_organization_social` and/or `w_member_social` permissions.
    *   `LINKEDIN_ORGANIZATION_ID`: Your LinkedIn Organization ID (if posting to a company page).
*   **Instagram (via Facebook Graph API):**
    *   `IG_ACCESS_TOKEN`: Facebook Page Access Token with permissions for `instagram_basic`, `instagram_content_publish`, `pages_show_list`, and `pages_read_engagement`. This token is associated with the Facebook Page linked to your Instagram Business Account.
    *   `FB_PAGE_ID`: The ID of the Facebook Page linked to your Instagram Business Account (also used as the Instagram Account ID in API calls).
*   **Facebook:**
    *   `FB_PAGE_ID`: Your Facebook Page ID.
    *   The `IG_ACCESS_TOKEN` is also used for Facebook posts, ensure it has `pages_manage_posts` permission.
*   **X (Twitter):**
    *   `TWITTER_API_KEY`: Your X App's API Key (Consumer Key).
    *   `TWITTER_API_SECRET_KEY`: Your X App's API Secret Key (Consumer Secret).
    *   `TWITTER_ACCESS_TOKEN`: The Access Token for your X App, associated with the posting user.
    *   `TWITTER_ACCESS_TOKEN_SECRET`: The Access Token Secret for your X App.
*   **Google My Business:**
    *   `GCP_CLIENT_EMAIL`: Email address of the Google Cloud Platform service account.
    *   `GCP_PRIVATE_KEY`: Private key for the GCP service account (ensure newline characters `
` are properly escaped as `\n` if storing in a single line in `.env.local`).
    *   `GCP_BUSINESS_ACCOUNT_NAME`: The full resource name of your GMB location (e.g., `accounts/YOUR_ACCOUNT_ID/locations/YOUR_LOCATION_ID`).
    *   `GMB_CTA_URL`: (Optional) Default URL for the "Learn More" button on GMB posts if not provided in Airtable.

### 2. Install Dependencies

Navigate to this directory (`scripts/reseaux/`) and run:
```bash
npm install
```

### 3. Airtable Base Structure

The script expects your Airtable table to have fields like:

*   `Date de publication` (Date/Time): The scheduled publication date and time.
*   `Réseau` (Single Select or Text): The target social media platform (e.g., "LinkedIn", "Instagram", "Facebook", "X (Twitter)", "Google My Business").
*   `Texte publication` (Long Text): The main text content for the post.
*   `Image (URL)` (URL or Text): URL of the image to be posted (required for Instagram, optional for Facebook).
*   `Bouton (Google)` (Text): (For GMB) Label for the call-to-action button (e.g., "Learn More", "Book").
*   `Lien bouton (Google)` (URL or Text): (For GMB) URL for the call-to-action button.
*   `Statut` (Single Select or Text): Updated by the script (e.g., "À publier", "Publié", "Erreur").
*   `Post ID` (Text): Updated by the script with the ID of the published post.
*   `Post URL` (URL or Text): Updated by the script with the URL of the published post.
*   `Message` (Long Text): Used by the script to log error messages if publication fails (will include an `errorCode`).
*   `Published At` (Date/Time): Timestamp of when the post was successfully published.


## Running the Script

To run the main publishing script, navigate to this directory (`scripts/reseaux/`) and execute:

```bash
node index.js
```

The script will then:
1. Connect to Airtable.
2. Fetch records based on your configuration.
3. For each due record, attempt to publish to the specified social network.
4. Update the Airtable record with the outcome (success or error), including an error code in the `Message` field if applicable.

Check the console output for detailed logs of the process.

## Error Codes and Debugging

When errors occur, console logs and the `Message` field in Airtable will include an `errorCode` to help categorize the issue. Understanding these codes can help in diagnosing and resolving problems:

*   **`CONFIG_ERROR`**:
    *   **Explanation**: A required environment variable is missing or an essential configuration parameter is invalid.
    *   **Common Causes/Checks**:
        *   Verify all necessary API keys, tokens, and IDs are correctly set in your `.env.local` file for the platform in question.
        *   Ensure variable names match those expected by the scripts.
        *   Check for typos or copy-paste errors in environment variable values.

*   **`AUTH_ERROR`**:
    *   **Explanation**: Authentication with the social media platform's API failed.
    *   **Common Causes/Checks**:
        *   The access token may be invalid, expired, or revoked.
        *   The token might lack the necessary permissions/scopes for the intended action (e.g., trying to publish a post without write permissions).
        *   Client credentials (API key/secret) might be incorrect.
        *   The platform may have security measures blocking the request (e.g., unusual activity detected).
        *   For Google My Business, ensure the service account has appropriate roles and the My Business API is enabled.

*   **`VALIDATION_ERROR`**:
    *   **Explanation**: The data provided (from Airtable or generated by the script) does not meet the platform's requirements for a post, or an input parameter is invalid.
    *   **Common Causes/Checks**:
        *   Text content might be too long or too short for the platform's limits.
        *   An image URL might be missing when required (e.g., for Instagram).
        *   The URL provided for an image, link, or button may be invalid, not publicly accessible, or not in the correct format (HTTP/HTTPS).
        *   The media type of an image might not be supported, or the image dimensions/size could be outside the allowed limits.
        *   A specific parameter required by the API for the chosen post type might be missing or malformed.

*   **`API_ERROR`**:
    *   **Explanation**: A general error occurred on the social media platform's API side. This is not directly an issue with your input or authentication but rather how the API responded.
    *   **Common Causes/Checks**:
        *   The platform's API might be experiencing temporary service disruptions or downtime.
        *   Rate limits for API requests might have been exceeded. Wait and try again later.
        *   The specific API endpoint might be deprecated or changed.
        *   The platform might have encountered an internal server error while processing the request.
        *   Check the platform's official status page or developer forums for any known issues.

*   **`NETWORK_ERROR`**:
    *   **Explanation**: A problem occurred with network connectivity, preventing the script from reaching the platform's API or other necessary online resources (like an image URL).
    *   **Common Causes/Checks**:
        *   Verify the machine running the script has a stable internet connection.
        *   Check for DNS resolution issues.
        *   Firewalls or proxies might be blocking outbound connections to the API endpoints.
        *   The platform's API servers might be temporarily unreachable.

*   **`UNKNOWN_ERROR`**:
    *   **Explanation**: An unexpected error occurred within the script or from the API that doesn't fit into the more specific categories above.
    *   **Common Causes/Checks**:
        *   This may indicate a bug in the script itself or an unusual, unhandled error case from an API.
        *   Review the detailed error message in the console logs for more clues.

## Token Management

Most social media platforms secure their APIs using access tokens (e.g., OAuth 2.0 tokens). These tokens are the keys the scripts use to authenticate and perform actions on your behalf.

**Important Considerations:**

*   **Token Expiry**: Access tokens can expire after a certain period (minutes, hours, days, or months depending on the platform and token type).
*   **Current Script Behavior**: These scripts currently expect valid, and preferably long-lived, access tokens to be provided directly in the environment variables (`.env.local`). They do **not** implement logic to refresh expired tokens.
*   **Production Environments**: For reliable, long-term operation in a production environment, a robust token management strategy is crucial. This typically involves:
    *   Securely storing refresh tokens (if applicable for the platform).
    *   Implementing automated mechanisms to detect token expiry and use refresh tokens to obtain new access tokens.
    *   Monitoring for token-related errors (`AUTH_ERROR`) and alerting administrators.
    *   This token refresh and management logic should ideally be implemented as a separate process or service, outside the direct scope of these publishing scripts. Consult the specific platform's developer documentation for best practices on token management.
