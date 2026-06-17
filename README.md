# Dermacue — Clinic Website & Patient Management System

**Clinic:** Dermacue Skin, Laser and Hair Transplant Clinic  
**Location:** D-72, 4th Floor, Sector-85, Faridabad 121002 (Delhi NCR)  
**Founder:** Dr. Deepika Verma — MBBS, MD (Dermatology)

## Folder structure

```
dermacue/
├── README.md                 ← you are here
├── plans/                    ← phased execution plans (read before building)
│   ├── 00-architecture-overview.md
│   ├── phase-1-mvp-website.md
│   ├── phase-2-growth-system.md
│   ├── phase-3-clinic-os.md
│   ├── decisions-checklist.md
│   └── cost-breakdown.md
└── phase-1-website/          ← LIVE customer-facing site (Phase 1)
    ├── index.html
    ├── styles.css
    ├── deploy-gcp.md
    └── assets/               ← add photos here before go-live
```

## Quick start (Phase 1)

1. Preview locally: `cd phase-1-website && python3 -m http.server 8080`
2. Edit **`phase-1-website/config.js`** — phone, WhatsApp, email, optional `bookingUrl`
3. Add photos → **`plans/phase-1-mvp-website.md`** (Add photos section)
4. **Deploy for review:** **`phase-1-website/deploy-vercel.md`** (GitHub + Vercel)
5. Production on GCP (optional): **`phase-1-website/deploy-gcp.md`**

## Reference site

Design and structure inspired by [Dr. Khubchandani's SKINIQ](https://www.drkhubchandaniskiniq.com/) — warm editorial aesthetic, trust-first layout, multi-channel contact.

## Rollout timeline

| Phase | Timeline | Focus |
|-------|----------|-------|
| **1** | Week 1–2 | Website + WhatsApp + Google Business Profile |
| **2** | Month 2–4 | WhatsApp API automation, CMS, marketing |
| **3** | Month 6–12+ | Patient portal, encrypted notes, clinic OS |

Read `plans/00-architecture-overview.md` first.

**Repo:** https://github.com/BANirajFuture/dermacue
