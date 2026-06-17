# Phase 3 — Clinic OS (Patient Portal + Encrypted EMR)

**Goal:** Full patient management — encrypted doctor notes, interaction history, staff dashboard, optional AI intake.  
**Duration:** 6–12 months after launch; only when Phase 2 volume justifies build cost  
**Budget:** ₹5,00,000–20,00,000 build + ₹15,000–30,000/month operations

---

## When NOT to build Phase 3

Stay on Practo + Firestore CRM + WhatsApp API if:
- Single doctor, &lt; 30 patients/day
- Notes on paper or simple dictation app are acceptable
- No multi-branch plans within 12 months

Build Phase 3 when:
- Custom workflows (treatment protocols, consent chains) outgrow SaaS
- Doctor insists notes never leave encrypted system
- Multi-doctor / multi-branch expansion planned
- Patient portal (view appointments, prescriptions) is a competitive requirement

---

## Target architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  PATIENT-FACING (Next.js on Firebase / Cloud Run)               │
│  - Marketing pages (from CMS)                                   │
│  - Patient portal login (OTP via SMS/WhatsApp)                  │
│  - View appointments, treatment summaries (non-clinical)        │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│  API LAYER (NestJS or FastAPI on Cloud Run, asia-south1)        │
│  - REST / GraphQL                                               │
│  - Role-based access: doctor, coordinator, reception            │
│  - Audit middleware on every request                            │
└────────────────────────────┬────────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                    ▼
┌───────────────┐  ┌─────────────────┐  ┌──────────────────┐
│ Cloud SQL     │  │ Cloud Storage   │  │ Secret Manager   │
│ PostgreSQL    │  │ encrypted blobs │  │ API keys         │
│ patients,     │  │ attachments     │  │                  │
│ appointments, │  │ call recordings │  │ Cloud KMS        │
│ audit_logs    │  │                 │  │ (optional HSM)   │
└───────────────┘  └─────────────────┘  └──────────────────┘
```

---

## Encrypted doctor notes — detailed design

### Threat model
- **Protect against:** DB breach, curious staff, cloud provider access
- **Not protecting against:** Doctor's own device compromise (endpoint security separate)

### Encryption approach

```
Doctor writes note in browser
    → Client-side AES-256-GCM encrypt with key derived from:
         PBKDF2(doctor_master_password, per-doctor salt, 600k iterations)
    → Ciphertext + IV + auth tag sent to API
    → PostgreSQL stores ONLY ciphertext in clinical_notes table
    → Server NEVER has decryption key
```

**Tables:**
```sql
clinical_notes (
  id UUID PRIMARY KEY,
  patient_id UUID REFERENCES patients(id),
  doctor_id UUID,
  ciphertext BYTEA NOT NULL,
  iv BYTEA NOT NULL,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)

audit_log (
  id UUID PRIMARY KEY,
  user_id UUID,
  action TEXT,  -- 'note_decrypt', 'note_create', 'patient_view'
  resource_id UUID,
  ip_address INET,
  created_at TIMESTAMPTZ
)
```

**Session flow:**
1. Doctor logs in (Firebase Auth + MFA)
2. Prompt for "clinical unlock password" (separate from login password)
3. Key held in memory only; cleared on tab close / 15 min idle
4. Every decrypt logged to `audit_log`

**Recovery:** Doctor must set up recovery key on first use (printed QR stored physically). No "forgot password" for notes — by design.

---

## Interaction recording

| Channel | Integration | Storage |
|---------|-------------|---------|
| WhatsApp | API webhook → interaction log | Message metadata in SQL; media in GCS |
| Phone calls | Exotel recording webhook | Encrypted MP3 in private GCS bucket |
| In-clinic visit | Manual note + optional voice memo | Voice → encrypt like clinical notes |

**Consent:** Record consent flag per patient per channel before first recording.

---

## AI patient intake (optional, high ROI)

**Flow:**
```
Patient messages WhatsApp (ad or website)
    → AI bot (GPT-4o via Vertex AI, Mumbai region option)
    → Collects: name, concern, skin type, current meds, appointment preference
    → Structured JSON → Firestore/SQL lead record
    → Hands off to human: "Thanks! Coordinator will confirm shortly."
```

**Guardrails:**
- No medical diagnosis in bot responses
- Escalate to human on medication questions
- Log all conversations for doctor review

**GCP:** Vertex AI + Cloud Functions

---

## Staff dashboard features

| Module | Users | Features |
|--------|-------|----------|
| Reception | Coordinator | Book, reschedule, check-in, print consent |
| Clinical | Doctor | Encrypted notes, treatment plan, before/after link |
| Marketing | Owner | Campaign stats, review requests, broadcast |
| Admin | Owner | Staff roles, audit log export, data deletion requests |

---

## Multi-specialty expansion (future-proofing)

Design `specialties` and `clinics` tables from day one of Phase 3:

```
clinics (id, name, address, specialty_default)
specialties (id, name)  -- dermatology, dental, etc.
services (id, clinic_id, specialty_id, name, ...)
```

Dermacue launches with one row each; adding dental later does not require schema rewrite.

---

## GCP production checklist (Phase 3)

- [ ] All resources in `asia-south1` (Mumbai)
- [ ] Cloud SQL private IP + VPC connector for Cloud Run
- [ ] IAM least privilege per service account
- [ ] Cloud Armor on public API (DDoS)
- [ ] Automated daily backups (Cloud SQL) + retention policy
- [ ] DPDPA data deletion workflow tested
- [ ] Penetration test before go-live with real patient data

---

## Build vs buy (Phase 3 decision matrix)

| Need | Buy (SaaS) | Build (Custom) |
|------|------------|----------------|
| Scheduling | Cliniko, Practo Pro | If multi-branch complex rules |
| Notes | Kivo, local EMR | If encryption + custom workflows mandatory |
| WhatsApp | WATI (keep) | Never build |
| Marketing site | CMS (keep) | Reuse Phase 2 |
| Patient portal | Rare in India SaaS | Build if differentiator |

**Hybrid (recommended):** Buy WhatsApp + telephony; build encrypted notes + portal only.

---

## Phase 3 timeline (indicative)

| Month | Milestone |
|-------|-----------|
| 1 | Schema design, auth, patient CRUD |
| 2 | Appointment system + WhatsApp sync |
| 3 | Encrypted notes MVP + audit log |
| 4 | Staff dashboard, coordinator workflows |
| 5 | Call recording integration, patient portal beta |
| 6 | Security review, DPDPA compliance audit, go-live |

---

## Success metrics

| Metric | Target |
|--------|--------|
| Note encryption | 100% clinical notes ciphertext at rest |
| Audit coverage | 100% decrypt events logged |
| Coordinator time per booking | &lt; 2 min |
| Patient portal adoption | 30%+ of returning patients |
| System uptime | 99.5% |
