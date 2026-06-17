# Deploy Dermacue to GitHub + Vercel

Use this for **review/staging** (free HTTPS URL to share with Dr. Deepika and testers). Production custom domain (`dermacue.in`) can be added in Vercel later.

---

## 1. GitHub repository

Repo layout (this folder is the git root):

```
dermacue/
├── README.md
├── plans/
└── phase-1-website/    ← Vercel Root Directory
    ├── index.html
    ├── config.js         ← phone, WhatsApp, booking URL
    ├── i18n.js
    ├── app.js
    ├── styles.css
    ├── vercel.json
    └── assets/
```

### First-time push (from your machine)

```bash
cd /path/to/study_Agent/dermacue
git init
git add .
git commit -m "Add Dermacue Phase 1 website with EN/HI i18n"
gh repo create dermacue --public --source=. --remote=origin --push
```

If the repo already exists on GitHub:

```bash
git remote add origin https://github.com/YOUR_USERNAME/dermacue.git
git branch -M main
git push -u origin main
```

---

## 2. Vercel (connect GitHub)

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. **Import** the `dermacue` GitHub repository
3. Configure:
   - **Framework Preset:** Other
   - **Root Directory:** `phase-1-website` ← important
   - **Build Command:** leave empty
   - **Output Directory:** leave empty (static files in root)
4. Click **Deploy**

Every push to `main` auto-deploys. Share the URL: `https://dermacue-xxxx.vercel.app`

### Custom domain (optional)

Vercel project → **Settings → Domains** → add `dermacue.in` and follow DNS instructions.

---

## 3. Before sharing the review link

Edit `config.js`:

- `whatsapp` — real clinic WhatsApp number
- `phoneDisplay` / `phoneTel`
- `email`
- `bookingUrl` — Practo or Cal.com link (optional)
- `social` — Instagram, Facebook, YouTube URLs

Add photos per `plans/phase-1-mvp-website.md` → **Add photos**.

---

## 4. Troubleshooting

| Issue | Fix |
|-------|-----|
| 404 on deploy | Root Directory must be `phase-1-website` |
| WhatsApp opens wrong number | Check `config.js` → `whatsapp` (digits only, `91` prefix) |
| Hindi font looks off | Hard refresh; Noto Sans Devanagari loads from Google Fonts |
| Language modal every visit | Normal in incognito; `localStorage` key `dermacue-lang` stores choice |

---

## 5. GCP vs Vercel

| | Vercel (this doc) | GCP (`deploy-gcp.md`) |
|--|-------------------|------------------------|
| Best for | Review, staging, quick share | Production India hosting preference |
| Cost | Free tier | Firebase free / low cost |
| Setup | 5 minutes | 15–30 minutes |

You can run **both**: Vercel for reviewers, custom domain on GCP or Vercel for production.
