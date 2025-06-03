# Social Media Posting Scripts

This directory contains scripts to automate posting content to various social media platforms based on data from an Airtable base.

## 🚀 Overview

The main script, `index.js`, reads records from an Airtable table (e.g., "Posts\_a\_publier"). For each record marked ready for publication, it dispatches the content to the appropriate platform-specific module (LinkedIn, Instagram, Facebook, X (Twitter), Google My Business). It then updates the Airtable record with the publication status, including errors if any occur.

This automation is especially useful for:

* Planning social media calendars via Airtable
* Centralizing copy + media per post
* Ensuring consistent cross-platform publishing

## ⚙️ Setup

### 1. Environment Variables

Create a `.env.local` file in the root of the project (or directly inside `scripts/reseaux/` if needed).

#### **Airtable Configuration:**

* `AIRTABLE_SOCIAL_API_KEY`: Your Airtable API key
* `AIRTABLE_SOCIAL_BASE_ID`: The ID of the base
* `AIRTABLE_SOCIAL_TABLE_NAME`: Table name (e.g., `Publications`)
* `AIRTABLE_SOCIAL_VIEW_NAME`: (Optional) View filter (e.g., `Posts_a_publier`)

#### **Platform-Specific Configuration:**

**LinkedIn**

* `LINKEDIN_ACCESS_TOKEN`
* `LINKEDIN_ORGANIZATION_ID`

**Instagram (via Meta Graph API)**

* `IG_ACCESS_TOKEN`
* `FB_PAGE_ID`

**Facebook**

* `FB_PAGE_ID` (same as above)
* Uses `IG_ACCESS_TOKEN`

**X (Twitter)**

* `TWITTER_API_KEY`
* `TWITTER_API_SECRET_KEY`
* `TWITTER_ACCESS_TOKEN`
* `TWITTER_ACCESS_TOKEN_SECRET`

**Google My Business**

* `GCP_CLIENT_EMAIL`
* `GCP_PRIVATE_KEY` (escaped with `\n`)
* `GCP_BUSINESS_ACCOUNT_NAME`
* `GMB_CTA_URL` (optional default)

### 2. Install Dependencies

Navigate to the working directory:

```bash
cd scripts/reseaux/
npm install
```

### 3. Airtable Base Structure

Your Airtable table should include the following fields:

| Field Name           | Type          | Purpose                                       |
| -------------------- | ------------- | --------------------------------------------- |
| Date de publication  | Date/Time     | When to publish                               |
| Réseau               | Text          | Platform name ("LinkedIn", "Instagram", etc.) |
| Texte publication    | Long Text     | The main body of the post                     |
| Image (URL)          | Text/URL      | Required for Instagram, optional elsewhere    |
| Bouton (Google)      | Text          | CTA label for GMB                             |
| Lien bouton (Google) | URL/Text      | CTA link for GMB                              |
| Statut               | Single Select | "À publier", "Publié", "Erreur"               |
| Post ID              | Text          | ID returned by platform                       |
| Post URL             | URL/Text      | Final link to the post                        |
| Message              | Long Text     | Stores error logs                             |
| Published At         | Date/Time     | Date/time of publication                      |

## ▶️ Running the Script

To launch the script manually:

```bash
cd scripts/reseaux/
node index.js
```

It will:

1. Connect to Airtable
2. Read eligible records
3. Post to the appropriate network
4. Update each Airtable row accordingly

Use a scheduler like `cron`, GitHub Actions, or Vercel's CRON feature to automate.

## 🧪 Example Output

```
[INFO] Démarrage du script de publication...
[INFO] 3 record(s) à traiter...
[INFO] Traitement du Record recABC123 → Plateforme: LinkedIn
[INFO] Record recABC123 mis à jour “Publié” (Post ID: xyz123).
```

## 🔝 Error Handling

The script updates Airtable with:

* `Statut`: set to `Erreur`
* `Message`: the error reason

You may also see logs like:

| Code               | Description                              |
| ------------------ | ---------------------------------------- |
| `CONFIG_ERROR`     | Missing or invalid `.env.local` variable |
| `AUTH_ERROR`       | Token/API key invalid or expired         |
| `VALIDATION_ERROR` | Missing image, invalid field             |
| `API_ERROR`        | Platform API error (rate limit, etc.)    |
| `NETWORK_ERROR`    | Timeout or DNS issues                    |
| `UNKNOWN_ERROR`    | Any uncaught exception                   |

---

## ✅ Best Practices

* Always validate tokens beforehand using dedicated test posts
* Use Airtable views to prevent accidental re-publication
* Avoid scheduling multiple posts with the exact same timestamp

## 🔐 Security Notes

Do **not** commit `.env.local` or any tokens. Add this to `.gitignore`:

```
.env.local
```

---

Happy publishing ✨
