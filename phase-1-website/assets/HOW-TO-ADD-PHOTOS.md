# How to add photos — Dermacue website

Drop image files into **this folder** (`phase-1-website/assets/`), then push to GitHub. Vercel redeploys automatically.

---

## Step 1 — Prepare the image files

| Save as | What | Recommended size | Tips |
|---------|------|------------------|------|
| **`doctor.jpg`** | Dr. Deepika professional headshot | 800 × 1060 px (portrait) | Neutral background, good lighting, JPG under 500 KB |
| **`hero-before.jpg`** | Patient “before” (with consent) | 900 × 1200 px | Same patient, same angle as “after” |
| **`hero-after.jpg`** | Patient “after” (with consent) | 900 × 1200 px | Same framing as “before” |

**Before/after:** Only use photos if the patient signed a **consent form** allowing marketing use.

**Compress before upload:** [squoosh.app](https://squoosh.app) — quality 80–85, target &lt; 500 KB each.

---

## Step 2 — Copy files into this folder

```
dermacue/phase-1-website/assets/
├── doctor.jpg          ← add this
├── hero-before.jpg     ← add this
├── hero-after.jpg      ← add this
└── README.md
```

Exact path on your Mac:

```
/Users/nirajverma/study_Agent/dermacue/phase-1-website/assets/
```

---

## Step 3 — Preview locally

```bash
cd /Users/nirajverma/study_Agent/dermacue/phase-1-website
python3 -m http.server 8080
```

Open http://localhost:8080

- **About section** → Dr. Deepika photo (replaces “DV” placeholder)
- **Hero (top right)** → before/after split with real photos

If a file is missing, the site still works: brown/cream placeholders for hero; “DV” initials for doctor.

---

## Step 4 — Push to GitHub (goes live on Vercel)

```bash
cd /Users/nirajverma/study_Agent/dermacue
git add phase-1-website/assets/doctor.jpg phase-1-website/assets/hero-before.jpg phase-1-website/assets/hero-after.jpg
git commit -m "Add doctor and before/after clinic photos"
git push
```

Wait ~1 minute for Vercel to redeploy, then refresh your live site.

---

## Where each photo appears

```
┌─────────────────────────────────────────┐
│  HERO (top of page)                     │
│  ┌──────────────┬──────────────┐        │
│  │ hero-before  │ hero-after   │        │
│  │    .jpg      │    .jpg      │        │
│  └──────────────┴──────────────┘        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  ABOUT — Meet your specialist             │
│  ┌──────────┐  Dr. Deepika Verma bio…    │
│  │ doctor   │                            │
│  │  .jpg    │                            │
│  └──────────┘                            │
└─────────────────────────────────────────┘
```

---

## Optional — different filenames

If your files have different names, either rename them to match above **or** edit:

**Doctor** — `index.html` (About section):

```html
<img src="assets/YOUR-FILENAME.jpg" alt="Dr. Deepika Verma, MD Dermatology" ...>
```

**Before/after** — `styles.css`:

```css
url("assets/YOUR-BEFORE.jpg")
url("assets/YOUR-AFTER.jpg")
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Still see “DV” | File must be named exactly `doctor.jpg` in `assets/` |
| Hero still brown/cream only | Check names `hero-before.jpg` and `hero-after.jpg` |
| Photo looks cropped wrong | Use portrait photos; or adjust `object-fit` in `styles.css` |
| Slow load on mobile | Compress each file to under 500 KB |
| Not on live site after push | Confirm files were `git add`’d (JPG not in `.gitignore`) |
