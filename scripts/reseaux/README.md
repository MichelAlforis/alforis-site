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
*   `Message` (Long Text): Used by the script to log error messages if publication fails.
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
4. Update the Airtable record with the outcome (success or error).

Check the console output for detailed logs of the process.

## Error Codes in Logs

When errors occur, console logs may include an `errorCode` to help categorize the issue:

*   `CONFIG_ERROR`: Missing or invalid environment variable.
*   `AUTH_ERROR`: Authentication failure with the platform API (e.g., invalid token).
*   `VALIDATION_ERROR`: Invalid input data from Airtable (e.g., text too long, missing image).
*   `API_ERROR`: General error from the platform's API (e.g., rate limits, server issues).
*   `NETWORK_ERROR`: Network connectivity problems.
*   `UNKNOWN_ERROR`: Other unexpected errors.
