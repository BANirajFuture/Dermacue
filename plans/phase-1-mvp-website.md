# Phase 1 — MVP Website & Lead Capture

**Goal:** Get Dermacue live on the web this week. Convert mobile visitors into WhatsApp chats and booked appointments.  
**Duration:** 1–2 weeks  
**Build location:** `dermacue/phase-1-website/`

---

## Deliverables checklist

- [x] Single-page responsive website (SKINIQ-inspired design)
- [x] English + Hindi language switcher (first-visit modal + nav toggle)
- [ ] Real phone number, email, business hours in `config.js`
- [ ] Dr. Deepika professional headshot uploaded
- [ ] Before/after hero photos (with patient consent)
- [ ] GitHub repo pushed (`dermacue`)
- [ ] Vercel review URL shared with stakeholders
- [ ] Domain registered (`dermacue.in` or similar) — optional for review
- [ ] Google Business Profile created for Sector-85 Faridabad
- [ ] WhatsApp Business account on clinic number
- [ ] Optional: Practo / Cal.com booking URL in `config.js`

---

## Deploy for review (GitHub + Vercel)

**Full steps:** `phase-1-website/deploy-vercel.md`

Quick version:

```bash
cd dermacue
git init && git add . && git commit -m "Dermacue Phase 1 website"
gh repo create dermacue --public --source=. --remote=origin --push
```

Then on [vercel.com](https://vercel.com): **Import** repo → set **Root Directory** to `phase-1-website` → Deploy.

Share the `*.vercel.app` link with Dr. Deepika and reviewers. Every push to `main` redeploys automatically.

Production on Google Cloud (optional): `phase-1-website/deploy-gcp.md`

---

## Connect WhatsApp (required)

All WhatsApp buttons read from **one file**: `phase-1-website/config.js`

### Step 1 — Get the clinic number

Use a mobile number with **WhatsApp Business** installed (dedicated clinic SIM recommended).

### Step 2 — Format for `config.js`

| Field | Example | Rules |
|-------|---------|-------|
| `whatsapp` | `"919876543210"` | Digits only. Country code `91`, no `+`, no spaces, no leading `0` |
| `phoneDisplay` | `"+91 98765 43210"` | Human-readable, shown on site |
| `phoneTel` | `"+919876543210"` | Used for click-to-call links |

```javascript
// config.js
const CLINIC = {
  whatsapp: "919876543210",
  phoneDisplay: "+91 98765 43210",
  phoneTel: "+919876543210",
  // ...
};
```

### Step 3 — Test every entry point

After saving, reload the site and verify:

1. **Contact strip** — green “WhatsApp us now”
2. **Floating green button** (bottom-right)
3. **Booking form** — submit opens WhatsApp with pre-filled message
4. **Book section** — WhatsApp channel card

Messages use **English or Hindi** based on the visitor’s language choice.

### Step 4 — WhatsApp Business app setup (clinic side)

On the clinic phone:

1. Install **WhatsApp Business**
2. Business name: **Dermacue**
3. Add address, hours, website (Vercel URL)
4. **Quick replies:** “Book appointment”, “Location”, “Pricing”
5. **Away message** with hours when closed
6. Optional: **Catalog** with top 5 services

### WhatsApp message format (auto-generated)

**English booking form submit:**

```
Hello Dermacue, I would like to book an appointment.

Name: Priya Sharma
Phone: +91 98765 43210
Treatment: HydraFacial
Preferred date: 2026-06-20
Preferred time: 10:00 am – 12:00 pm
Notes: First visit
```

**Hindi (when site language is हिंदी):**

```
नमस्ते डर्माक्यू, मैं अपॉइंटमेंट बुक करना चाहता/चाहती हूँ।

नाम: ...
फ़ोन: ...
उपचार: हाइड्राफेशियल
...
```

---

## Add photos

Images live in `phase-1-website/assets/`. See `assets/README.md` for recommended sizes.

### 1. Doctor headshot (`assets/doctor.jpg`)

1. Save a professional photo as `phase-1-website/assets/doctor.jpg` (JPG, ~800×1060 px, under 500 KB).
2. In `index.html`, find the **About** section `doctor-photo-frame` and replace:

**Before (placeholder):**

```html
<div class="doctor-photo-frame">
  <div class="doctor-initials">DV</div>
  <div class="doctor-photo-caption" data-i18n="about.photoCaption">...</div>
</div>
```

**After:**

```html
<div class="doctor-photo-frame">
  <img src="assets/doctor.jpg" alt="Dr. Deepika Verma, MD Dermatology">
</div>
```

3. Commit and push — Vercel redeploys automatically.

### 2. Hero before/after (`assets/hero-before.jpg`, `assets/hero-after.jpg`)

**Option A — CSS backgrounds (no HTML change)**

Add to the bottom of `styles.css`:

```css
.ba-before {
  background: url("assets/hero-before.jpg") center/cover no-repeat;
}
.ba-after {
  background: url("assets/hero-after.jpg") center/cover no-repeat;
}
```

Remove or override the existing gradient rules on `.ba-before` / `.ba-after`.

**Option B — Keep gradient placeholders until real consent photos are ready**

The brown/cream split still looks professional for review.

### 3. Before/after compliance

- Signed **patient consent** for each photo used in marketing
- Store consent forms offline (Google Drive / clinic records)
- Label on site: “Patient results · With consent” (already in hero)

### 4. Social & email (optional)

In `config.js`:

```javascript
email: "contact@dermacue.in",
social: {
  instagram: "https://instagram.com/dermacueclinic",
  facebook: "https://facebook.com/...",
  youtube: "https://youtube.com/@...",
},
```

---

## Connect booking link (Practo / Cal.com / Lybrate)

Phase 1 default: **WhatsApp form** (no third-party account needed).

### Option A — Secondary “Book on Practo” button (recommended)

1. Create clinic profile on [Practo for Clinics](https://www.practo.com/for-doctors) (or Cal.com / Lybrate).
2. Copy the public booking URL.
3. Add to `config.js`:

```javascript
bookingUrl: "https://www.practo.com/faridabad/clinic/dermacue-...",
```

4. A second button **“Or book on Practo →”** appears under the WhatsApp submit button (hidden when `bookingUrl` is empty).

### Option B — Embed Practo widget (iframe)

In `index.html`, inside the `#book` section, add above the form:

```html
<div class="practo-embed" style="margin-bottom:2rem;min-height:420px;">
  <iframe
    src="YOUR_PRACTO_EMBED_URL"
    width="100%"
    height="420"
    style="border:0;border-radius:12px;"
    title="Book appointment on Practo"
    loading="lazy">
  </iframe>
</div>
```

Get embed code from Practo dashboard → Clinic settings → Website widget.

### Option C — WhatsApp only (current default)

Leave `bookingUrl: ""` — patients book via WhatsApp form only. Simplest for launch week.

---

## Site sections (implemented in `index.html`)

| Section | Purpose |
|---------|---------|
| Language modal | EN / हिंदी on first visit |
| Contact strip | Phone, WhatsApp, hours, address |
| Hero | Headline + before/after visual |
| About Dr. Deepika | Credentials, publications |
| Why choose us | Trust pillars |
| Technology | Soprano, Tri-Beam, HydraFacial, DermaFrac |
| Services | Grid cards |
| Reviews | Testimonial placeholders |
| FAQ | Accordion |
| Book | WhatsApp form + optional Practo link |
| Footer | Address, social, contact |

---

## Technical stack (Phase 1)

```
HTML5 + CSS3 + vanilla JS (no build step)
i18n: i18n.js (EN + HI)
Config: config.js (phone, WhatsApp, booking URL)
Hosting (review): Vercel — Root Directory = phase-1-website
Hosting (prod option): Firebase / GCP — deploy-gcp.md
Forms: Client-side → WhatsApp deep link
```

---

## Local test

```bash
cd dermacue/phase-1-website
python3 -m http.server 8080
# http://localhost:8080 — test WhatsApp links on your phone
```

Checklist:

- [ ] Language modal → EN and HI both work
- [ ] All WhatsApp CTAs open correct number
- [ ] Booking form message matches selected language
- [ ] Click-to-call works on mobile
- [ ] Doctor photo displays after adding `assets/doctor.jpg`

---

## Week 2 — Discovery

1. **Google Business Profile** — category Dermatologist; address D-72, Sector 85; link Vercel or custom domain
2. **Practo listing** — if using Option A/B above
3. **Ask first patients** for Google reviews

---

## SEO basics (launch day)

| Item | Value |
|------|-------|
| Title | Set via `i18n.js` → `meta.title` (EN/HI) |
| Meta description | `i18n.js` → `meta.description` |
| Local keywords | dermatologist Faridabad, laser Sector 85, hair transplant NCR |

Submit site to [Google Search Console](https://search.google.com/search-console) after domain is live.

---

## Phase 1 success metrics (30 days)

| Metric | Target |
|--------|--------|
| Review URL shared with clinic | Yes |
| WhatsApp number live on site | Yes |
| Google Business Profile live | Yes |
| WhatsApp enquiries/week | Track baseline |
| Google reviews | 5+ |

---

## Phase 1 → Phase 2 gate

Proceed to Phase 2 when:

- Site is live 2+ weeks
- 20+ WhatsApp conversations logged
- Manual reminders feel unsustainable

Next: `phase-2-growth-system.md`
