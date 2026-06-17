# Architecture Overview — Dermacue Clinic Platform

## Two products, one roadmap

You are building **two systems** that grow together:

| Layer | What patients see | What staff sees | Goal |
|-------|-------------------|-----------------|------|
| **Acquisition** | Website, ads, YouTube, Google Maps | Lead inbox, booking calendar | Convert visitors → appointments |
| **Management** | WhatsApp reminders, portal (later) | EMR, encrypted notes, follow-ups | Retain patients, reduce admin load |

**Critical rule:** Do not build a hospital-grade EMR on day 1. Choose foundations that scale without rework.

---

## Modular architecture (futuristic but realistic)

```
┌─────────────────────────────────────────────────────────────────┐
│                    PUBLIC LAYER (Phase 1–2)                       │
│  Next.js / static site → SEO, services, trust, lead capture       │
│  WhatsApp click-to-chat → API automation (Phase 2)                │
│  Practo / Cal.com embed → booking without custom backend          │
│  YouTube / Instagram → content links back to site                 │
└────────────────────────────┬────────────────────────────────────┘
                             │ leads, bookings
┌────────────────────────────▼────────────────────────────────────┐
│                 COMMUNICATION HUB (Phase 2)                       │
│  WhatsApp Business API (WATI / Interakt / AiSensy)                │
│  Templates: D-1 reminder, D-day confirm, post-treatment follow-up   │
│  Optional: Exotel / Knowlarity for call tracking + recording        │
└────────────────────────────┬────────────────────────────────────┘
                             │ patient events
┌────────────────────────────▼────────────────────────────────────┐
│              PATIENT DATA LAYER (Phase 3 — build or buy)          │
│  PostgreSQL (Cloud SQL Mumbai) or Supabase (ap-south-1)           │
│  Patient profile, appointment history, consent log                  │
│  Doctor notes: AES-256 at app layer, keys NOT on server           │
│  Audit log: who accessed what, when                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Google Cloud stack (your chosen platform)

| Component | Phase 1 | Phase 2 | Phase 3 |
|-----------|---------|---------|---------|
| **Hosting** | Firebase Hosting or Cloud Storage + CDN | Same | Cloud Run (Next.js API) |
| **Domain** | Cloud DNS + domain registrar | Same | Same |
| **Database** | None (forms → WhatsApp) | Firestore or Cloud SQL | Cloud SQL PostgreSQL (Mumbai) |
| **Secrets** | — | Secret Manager | Secret Manager + KMS for note keys |
| **Auth** | — | Firebase Auth (staff) | Firebase Auth + role-based access |
| **Compliance** | Privacy policy + consent checkbox | DPDPA consent log | Full audit + India region only |

**Region:** Always `asia-south1` (Mumbai) for anything storing patient data.

---

## Decisions that hurt if changed later

### 1. Single brand domain
Pick **one** primary domain early: `dermacue.in` or `dermacueclinic.com`.  
All ads, WhatsApp, Google Business, and YouTube links must use the same URL. Changing later breaks SEO and patient trust.

### 2. WhatsApp strategy — pick ONE path
- **Phase 1:** Click-to-chat link (free, manual).
- **Phase 2:** Migrate fully to WhatsApp Business API (WATI/Interakt).  
Do **not** run two different WhatsApp numbers long-term.

### 3. CMS vs static
- **Static (Phase 1):** Fast, cheap; developer edits content.
- **CMS (Phase 2):** Doctor edits services, blog, before/after herself.  
If she will publish content monthly → plan CMS in Phase 2, not Phase 3.

### 4. Patient data jurisdiction (DPDPA 2023)
- Store personal data on **Indian servers** (GCP Mumbai).
- Collect **explicit consent** on first booking form (checkbox + privacy policy link).
- Retrofitting consent is painful — add from day one.

### 5. Build vs buy EMR
| Volume | Recommendation |
|--------|----------------|
| &lt; 20 patients/day | Practo / Cliniko / Lybrate embed |
| 20–50/day | WhatsApp API + lightweight CRM (Firestore) |
| 50+/day or multi-doctor | Custom clinic OS (Phase 3) |

Custom encrypted notes + full EMR = **₹5–20L+** and 4–6 months. Do not start here.

### 6. Encrypted doctor notes (when you build Phase 3)
- AES-256 encryption **before** write to database.
- Encryption key derived from doctor password or hardware key — **never** stored on server.
- Server only stores ciphertext + metadata (patient ID, date).
- Audit every decrypt event.

---

## Standing out vs generic clinics

Reference: [SKINIQ Raipur](https://www.drkhubchandaniskiniq.com/) — premium aesthetic, machine transparency, testimonials.

**Dermacue differentiators to foreground:**

1. **Ex-Associate Professor** — patients see someone who taught doctors.
2. **16+ peer-reviewed publications** — rare for aesthetic clinics; use on homepage.
3. **Named devices** (Soprano Platinum, Tri-Beam, HydraFacial) — signals investment.
4. **Academic + clinical** positioning — YouTube education, not just before/after ads.
5. **WhatsApp-first** patient journey — faster than form-only competitors.

---

## Digital marketing integration

| Channel | Phase | Action |
|---------|-------|--------|
| **Google Business Profile** | 1 | Free; critical for "dermatologist near me" in Faridabad |
| **WhatsApp** | 1→2 | Click-to-chat → automated reminders + broadcast tips |
| **YouTube** | 2 | Short educational videos; embed on service pages |
| **Instagram Reels** | 2 | 15 km radius, women 25–45, ₹10–15k/month test budget |
| **Before/After gallery** | 2 | Signed consent forms; highest conversion in aesthetics |
| **Practo / Justdial** | 1–2 | Listing + booking widget embed |

Link every channel → same website → same WhatsApp number.

---

## Phase summary

| Phase | Document | Duration | Outcome |
|-------|----------|----------|---------|
| 1 | `phase-1-mvp-website.md` | 1–2 weeks | Live site, WhatsApp, GBP, booking embed |
| 2 | `phase-2-growth-system.md` | Month 2–4 | API automation, CMS, marketing engine |
| 3 | `phase-3-clinic-os.md` | Month 6–12+ | Patient portal, encrypted notes, clinic dashboard |

See `decisions-checklist.md` before each phase gate.  
See `cost-breakdown.md` for budget tiers.
