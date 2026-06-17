# Decisions Checklist — Make These Upfront

Use this before starting each phase. Changing these mid-flight causes expensive rework.

---

## Brand & domain

| Decision | Options | Recommendation | Status |
|----------|---------|----------------|--------|
| Primary domain | `dermacue.in`, `dermacueclinic.com`, `drdeepikaverma.com` | `dermacue.in` (short, brandable) | ☐ |
| Clinic legal name on footer | As registered | Dermacue Skin, Laser and Hair Transplant Clinic | ☐ |
| Single WhatsApp number | One number for all channels | Dedicated business SIM | ☐ |

---

## Compliance (India)

| Decision | Requirement | Status |
|----------|-------------|--------|
| Data region | GCP `asia-south1` (Mumbai) for any PII | ☐ |
| Privacy policy | Published before collecting form data | ☐ |
| Consent checkbox | On booking form (Phase 1 simple, Phase 2 logged) | ☐ |
| Before/after consent | Written form per patient | ☐ |
| Call recording consent | IVR or verbal script | ☐ (Phase 2+) |

---

## Technology forks

| Decision | Option A | Option B | Pick one | Status |
|----------|----------|----------|----------|--------|
| Phase 1 hosting | Firebase Hosting | Cloud Storage + CDN | Firebase (faster setup) | ☐ |
| Phase 2 CMS | Sanity | WordPress | Sanity if dev-led; WordPress if doctor self-serves | ☐ |
| WhatsApp | Click-to-chat only (P1) | Business API (P2) | Migrate fully in P2, don't dual-run | ☐ |
| Booking | Practo embed | Cal.com | Practo for discovery in NCR | ☐ |
| Phase 3 database | Cloud SQL PostgreSQL | Supabase (Mumbai) | Cloud SQL if all-in on GCP | ☐ |
| Phase 3 frontend | Next.js | Keep static + API | Next.js when portal needed | ☐ |

---

## Communication policy

| Decision | Notes | Status |
|----------|-------|--------|
| Primary patient channel | WhatsApp (not email) for India NCR | ☐ |
| Reminder timing | D-1 evening + morning of | ☐ |
| Marketing broadcasts | Monthly max; opt-in only | ☐ |
| Response SLA | e.g. 15 min during business hours | ☐ |

---

## Content & trust

| Decision | Notes | Status |
|----------|-------|--------|
| Hero differentiator | Ex-Associate Professor + 16 publications | ☐ |
| Machine transparency | Name devices on site (Soprano, Tri-Beam, etc.) | ☐ |
| Doctor video | 60–90 sec intro on YouTube + embed | ☐ |
| Review strategy | Ask every happy patient for Google review | ☐ |

---

## Phase gate criteria

### Start Phase 2 when:
- ☐ Phase 1 site live 2+ weeks
- ☐ Google Business Profile verified
- ☐ 20+ WhatsApp conversations logged
- ☐ Manual reminders becoming painful

### Start Phase 3 when:
- ☐ 50+ appointments/month in CRM
- ☐ Encrypted notes are a hard requirement
- ☐ Budget ₹5L+ approved
- ☐ 6+ months runway for build + ops

---

## Anti-patterns (do not do)

1. **Two WhatsApp numbers** — patients get confused
2. **US/EU servers for patient data** — DPDPA + migration pain later
3. **Custom EMR before 50 patients/day** — burn money
4. **Form-first booking** — WhatsApp converts better in India
5. **Generic stock photos** — hurts trust vs real doctor/clinic photos
6. **Skipping consent on before/after** — legal and ethical risk
