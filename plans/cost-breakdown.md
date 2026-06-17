# Cost Breakdown — Low to High

All figures approximate for India (2026). One-time = setup; monthly = recurring.

---

## Tier 1 — Launch fast (Phase 1)

**Best for:** Urgent Delhi NCR launch this week  
**Total:** ₹15,000–50,000 one-time + ₹500–2,000/month

| Item | Cost | Notes |
|------|------|-------|
| Domain (`.in`) | ₹600–1,200/yr | GoDaddy, Namecheap, Google Domains |
| Website development | ₹15,000–40,000 one-time | Freelancer or self-build from `phase-1-website/` |
| Firebase Hosting | Free tier → ₹0 | Scales to Blaze ~₹500/mo at low traffic |
| WhatsApp click-to-chat | ₹0 | Uses existing mobile number |
| Google Business Profile | ₹0 | Essential |
| Practo basic listing | ₹0 | Optional embed |
| Professional photos | ₹5,000–15,000 | One-time shoot |
| SSL | ₹0 | Included with Firebase |

**Monthly ops:** ₹500–2,000 (hosting + domain amortized)

---

## Tier 2 — Professional growth (Phase 2)

**Best for:** Month 2–4, automated reminders + marketing  
**Total:** ₹80,000–2,00,000 one-time + ₹8,000–20,000/month

| Item | Cost | Notes |
|------|------|-------|
| Tier 1 baseline | (above) | — |
| CMS setup (Sanity/WordPress) | ₹30,000–80,000 one-time | Migration from static site |
| WhatsApp Business API | ₹2,000–5,000/mo | WATI, Interakt |
| Cloud Functions + Firestore | ₹500–3,000/mo | Reminder automation |
| Cal.com / Practo Pro | ₹0–2,500/mo | — |
| SEO setup | ₹15,000–30,000 one-time | Local SEO, Search Console |
| Instagram Reels ads | ₹10,000–15,000/mo | Test budget |
| YouTube production | ₹5,000–20,000/video | Or phone + ring light DIY |
| Exotel (optional calls) | ₹3,000–8,000/mo | Call tracking + recording |
| Airtable CRM (no-code alt) | ₹1,500/mo | Instead of custom Firestore |

**Monthly ops:** ₹8,000–20,000

---

## Tier 3 — Full clinic OS (Phase 3)

**Best for:** 50+ patients/day, multi-staff, encrypted EMR  
**Total:** ₹5,00,000–20,00,000 build + ₹15,000–50,000/month

| Item | Cost | Notes |
|------|------|-------|
| Custom backend (NestJS/FastAPI) | ₹3,00,000–8,00,000 | 4–6 months dev |
| Next.js patient portal + admin | ₹1,50,000–4,00,000 | — |
| Encrypted notes module | ₹1,00,000–3,00,000 | Security review included |
| Cloud SQL PostgreSQL | ₹5,000–15,000/mo | Mumbai, HA optional |
| Cloud Run | ₹2,000–10,000/mo | API traffic dependent |
| Cloud KMS | ₹1,000–3,000/mo | Key management |
| Vertex AI intake bot | ₹2,000–8,000/mo | Usage-based |
| Security / pen test | ₹50,000–1,50,000 one-time | Before production PHI |
| DPDPA legal review | ₹25,000–75,000 one-time | Privacy policy + processes |
| Ongoing maintenance | ₹30,000–80,000/mo | 0.5–1 FTE developer |

**Monthly ops:** ₹15,000–50,000+ (excluding dev retainer)

---

## Comparison summary

| Tier | One-time | Monthly | Timeline | Capability |
|------|----------|---------|----------|------------|
| **1** | ₹15–50k | ₹0.5–2k | 1–2 weeks | Website, WhatsApp, GBP |
| **2** | ₹80k–2L | ₹8–20k | 2–4 months | Automation, CMS, ads |
| **3** | ₹5–20L | ₹15–50k+ | 6–12 months | EMR, encrypted notes, portal |

---

## Recommended path for Dermacue

1. **This week:** Tier 1 using `phase-1-website/` (can be near ₹0 if self-deployed)
2. **Month 2:** Add WhatsApp API only (~₹3k/mo) — highest ROI single upgrade
3. **Month 4:** CMS + Instagram ads if leads are converting
4. **Month 12:** Re-evaluate Tier 3 only if Practo + Firestore is limiting

---

## Hidden costs to plan for

| Item | Estimate |
|------|----------|
| GST registration (if billing treatments online) | Accountant-dependent |
| Meta ad account minimums | ₹500/day typical test |
| WhatsApp template rejection rework | Time, not money |
| Patient photo consent legal template | ₹5,000–15,000 one-time |
| Backup internet at clinic | ₹1,000/mo |

---

## DIY savings

If you deploy Phase 1 yourself from this repo:
- **Development:** ₹0 (your time)
- **Domain + Firebase:** ~₹1,000/year
- **Total launch:** Under ₹5,000 until you add professional photography
