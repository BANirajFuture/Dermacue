# Deploy Dermacue Phase 1 to Google Cloud

Static site — no build step. Choose **Firebase Hosting** (recommended) or **Cloud Storage + Load Balancer**.

---

## Before deploy

1. Edit `config.js` — set real `whatsapp`, `phoneTel`, `phoneDisplay`, `email`.
2. Add `assets/doctor.jpg` and update `index.html` doctor photo block.
3. Register domain (e.g. `dermacue.in`) — point DNS after hosting is live.

---

## Option A — Firebase Hosting (recommended)

Fastest path on GCP. Free tier covers a new clinic site.

### 1. Install tools

```bash
npm install -g firebase-tools
firebase login
```

### 2. Init in this folder

```bash
cd dermacue/phase-1-website
firebase init hosting
```

Choose:
- **Use an existing project** or create `dermacue-prod`
- **Public directory:** `.` (current folder)
- **Single-page app:** No
- **Overwrite index.html:** No

### 3. `firebase.json` (create if not present)

```json
{
  "hosting": {
    "public": ".",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**", "deploy-gcp.md"],
    "headers": [
      {
        "source": "**/*.@(css|js)",
        "headers": [{ "key": "Cache-Control", "value": "max-age=31536000" }]
      }
    ]
  }
}
```

### 4. Deploy

```bash
firebase deploy --only hosting
```

Live URL: `https://dermacue-prod.web.app` (or your custom domain after DNS).

### 5. Custom domain

Firebase Console → Hosting → Add custom domain → follow DNS TXT/A records.

---

## Option B — Cloud Storage static website

For teams that prefer raw GCS (no Firebase).

```bash
# Set project and bucket (name must be globally unique)
export PROJECT_ID=dermacue-prod
export BUCKET=dermacue-website-prod

gcloud config set project $PROJECT_ID
gsutil mb -l asia-south1 gs://$BUCKET/
gsutil web set -m index.html -e index.html gs://$BUCKET/
gsutil -m cp -r index.html styles.css config.js i18n.js app.js assets gs://$BUCKET/
gsutil iam ch allUsers:objectViewer gs://$BUCKET
```

For HTTPS + custom domain, add Cloud CDN + Load Balancer (more setup than Firebase).

---

## Post-deploy checklist

- [ ] `config.js` has real phone/WhatsApp numbers
- [ ] Site loads on mobile over 4G
- [ ] Booking form opens WhatsApp with pre-filled message
- [ ] Google Business Profile links to live URL
- [ ] Google Search Console property added
- [ ] Optional: Google Analytics 4 snippet in `<head>`

---

## Local preview

```bash
cd dermacue/phase-1-website
python3 -m http.server 8080
```

Open http://localhost:8080

---

## Phase 2 note

When you add CMS or API, migrate to Cloud Run + Cloud SQL per `plans/phase-2-growth-system.md`. Firebase Hosting can still serve the marketing frontend with rewrites to Cloud Run.
