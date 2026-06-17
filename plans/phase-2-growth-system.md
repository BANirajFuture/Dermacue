# Phase 2 — Growth System (Communication + CMS + Marketing)

**Goal:** Automate appointment reminders, let doctor update content, and run a repeatable patient acquisition engine.  
**Duration:** Month 2–4 after Phase 1 launch  
**Prerequisite:** Phase 1 live, WhatsApp number active, 20+ patient conversations logged

---

## Deliverables checklist

- [ ] WhatsApp Business API live (WATI / Interakt / AiSensy)
- [ ] Automated D-1 and morning-of appointment reminders
- [ ] CMS for services, blog, before/after gallery
- [ ] Google Analytics 4 + conversion tracking
- [ ] YouTube channel linked from website
- [ ] Instagram business account + 2 Reels/week
- [ ] Before/after gallery with signed consent forms
- [ ] Privacy policy + DPDPA consent on all forms
- [ ] Lightweight patient lead CRM (Firestore or Airtable)

---

## Architecture upgrade

```
Phase 1 static site
        │
        ▼
┌───────────────────┐     ┌─────────────────────┐
│  CMS (Sanity or   │────▶│  Rebuild site as    │
│  WordPress)       │     │  Next.js OR keep    │
└───────────────────┘     │  static + CMS API   │
                          └──────────┬──────────┘
                                     │
┌───────────────────┐     ┌──────────▼──────────┐
│ WhatsApp Business │◀────│  Cloud Function /   │
│ API (WATI etc.)   │     │  Firebase trigger   │
└───────────────────┘     │  (appointment cron) │
                          └──────────┬──────────┘
                                     │
                          ┌──────────▼──────────┐
                          │ Firestore (Mumbai)  │
                          │ leads, appointments │
                          └─────────────────────┘
```

---

## Plugin-by-plugin execution

### 1. WhatsApp Business API

**Providers (India):** [WATI](https://www.wati.io), [Interakt](https://www.interakt.ai), AiSensy  
**Cost:** ₹2,000–5,000/month  
**Trial:** Most offer 7-day free trial

**Setup steps:**
1. Register clinic on Meta Business Manager
2. Verify business + phone number (dedicated number recommended)
3. Connect provider dashboard
4. Create approved message templates:
   - `appointment_reminder_d1` — "Hi {{1}}, reminder: your appointment at Dermacue is tomorrow {{2}} at {{3}}. Reply YES to confirm or call {{4}} to reschedule."
   - `appointment_reminder_day` — morning of appointment
   - `post_treatment_followup` — 7 days after HydraFacial / laser etc.
   - `seasonal_tip` — monsoon skincare (marketing broadcast)

**Automation flow:**
```
Google Sheet / Firestore row: appointment_date, patient_phone, service
    → Cloud Scheduler (daily 6pm IST)
    → Cloud Function queries tomorrow's appointments
    → Calls WATI API → sends template to each patient
    → Logs delivery status back to Firestore
```

**GCP services:** Cloud Scheduler + Cloud Functions (2nd gen) + Firestore (`asia-south1`)

---

### 2. Appointment scheduling upgrade

| Option | Pros | Cons | Cost |
|--------|------|------|------|
| **Practo for Clinics** | Patient discovery + booking | Less customizable | Free–₹2,500/mo |
| **Cal.com** | Self-hosted option, clean UX | No patient discovery | Free–₹1,500/mo |
| **Google Calendar + Form** | Free | Manual sync | Free |

**Recommendation:** Keep Practo embed + sync confirmed slots to Firestore via Zapier/Make or custom webhook.

---

### 3. CMS (content management)

**When doctor needs to edit without developer:**

| CMS | Best for | Hosting | Cost |
|-----|----------|---------|------|
| **Sanity** | Structured content, before/after, blog | Sanity cloud + GCP frontend | Free tier → ₹2k/mo |
| **WordPress** | Fastest for non-technical editors | Cloud Run or WP Engine | ₹500–3k/mo |
| **Firebase + Admin UI** | Minimal blog only | GCP | Dev time |

**Content types to model:**
- Services (title, description, category, image)
- Before/After (before img, after img, treatment, consent_id)
- Blog posts (title, body, youtube_embed)
- FAQ items
- Doctor bio (single document)

**Migration:** Export Phase 1 HTML content into CMS seed data.

---

### 4. Patient lead CRM (lightweight)

**Firestore schema (starter):**

```
patients/{patientId}
  name, phone, email?, createdAt, consentGiven, source (web|whatsapp|practo)

appointments/{appointmentId}
  patientId, doctorId, service, scheduledAt, status (booked|confirmed|completed|no-show)
  reminderSentD1: boolean
  reminderSentDay: boolean

interactions/{interactionId}
  patientId, channel (whatsapp|call|visit), summary, createdAt
```

**Access:** Firebase Auth for clinic coordinator only. No doctor notes yet (Phase 3).

**Alternative:** Airtable + Zapier if you want zero code (₹1,500/mo).

---

### 5. Call tracking (optional Phase 2)

**Providers:** Exotel, Knowlarity  
**Cost:** ₹3,000–8,000/month  
**Use case:** Track which ads drive calls; optional recording with patient consent announcement.

```
Website "Call" button → Exotel virtual number → forwards to clinic mobile
    → Call logged with duration, recording URL (encrypted storage)
    → Webhook → Firestore interaction record
```

**Consent:** IVR or staff script: "This call may be recorded for quality purposes."

---

### 6. Digital marketing engine

#### YouTube (highest long-term ROI for dermatology)

**Content pillars for Dr. Deepika:**
1. Condition explainers (melasma, acne, hair fall)
2. Treatment walkthroughs (what happens in a HydraFacial)
3. Myth busting (hair transplant pain, laser safety)
4. Machine spotlights (Soprano Platinum demo)

**Format:** 3–7 min videos + 60 sec Shorts cut from same footage  
**Embed:** Each service page links relevant video  
**GCP:** No hosting needed — YouTube CDN

#### Instagram Reels ads

- Target: Women 25–45, radius 15 km from Sector-85 Faridabad
- Budget: ₹10,000–15,000/month test
- CTA: WhatsApp button (not website form)
- Track: Cost per WhatsApp conversation

#### Google Business Profile posts

- Weekly post: tip + CTA to book
- Respond to all reviews within 24 hours

#### WhatsApp broadcast lists

- Segment: laser patients, hair patients, HydraFacial patients
- Monthly: 1 educational tip + 1 offer (comply with WhatsApp marketing policies)

---

### 7. Before/After gallery (compliance)

1. Written patient consent form (treatment + photo use for marketing)
2. Store consent PDF in Google Drive / Cloud Storage (private bucket)
3. Reference `consent_id` in CMS before/after entry
4. Watermark optional: "Results may vary"

---

### 8. Privacy & DPDPA (mandatory before storing CRM data)

- Publish `/privacy` page on website
- Booking form checkbox: "I agree to collection of my data per Privacy Policy"
- Log `consentGiven: true` + timestamp in Firestore
- Data deletion request process (email to clinic)

---

## GCP services map (Phase 2)

| Service | Purpose |
|---------|---------|
| Firebase Hosting | Website |
| Firestore (`asia-south1`) | Leads, appointments |
| Cloud Functions | Reminder cron, webhooks |
| Cloud Scheduler | Daily reminder job |
| Secret Manager | WATI API keys |
| Cloud Storage | Consent PDFs, images |
| Google Analytics 4 | Traffic + conversions |

---

## Phase 2 success metrics (90 days)

| Metric | Target |
|--------|--------|
| Automated reminder delivery rate | &gt; 95% |
| No-show rate | Decrease vs Phase 1 baseline |
| WhatsApp response time | &lt; 15 min business hours |
| YouTube videos published | 8+ |
| Google reviews | 25+ |
| Cost per booked appointment (ads) | Measured and improving |

---

## Phase 2 → Phase 3 gate

Proceed when:
- 50+ appointments/month tracked in CRM
- Doctor wants encrypted clinical notes in-system (not paper/WhatsApp)
- Multiple staff need role-based access
- Practo + spreadsheet feels limiting

Next: `phase-3-clinic-os.md`
