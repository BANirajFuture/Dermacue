# Google Maps & Reviews Playbook

**Goal:** When someone in Faridabad searches “dermatologist Sector 85”, “laser hair removal Faridabad”, or “hair transplant near me”, Dermacue appears in the **Map pack** with strong stars and recent reviews — and they tap **Call**, **Directions**, or **Website**.

This is the **#1 client acquisition channel** for a local clinic. Ads and Reels amplify what Maps already proved.

---

## How patients actually find you

```
Search or Maps app
    → See 3 local results + stars
    → Open profile: photos, hours, reviews, services
    → Call / WhatsApp / Directions / Website
    → Book appointment
```

**What Google ranks on (simplified):**

1. **Relevance** — category, services, description match the search
2. **Distance** — you win “near me” in Sector-85 / Greater Faridabad
3. **Prominence** — review count, rating, recency, photos, activity

You cannot buy your way into the top 3 without reviews and a complete profile.

---

## Step 1 — Claim & verify (you likely have this)

Dermacue is on Maps: [Google Maps listing](https://www.google.com/maps/place/Dermacue+skin+clinic/) (see `phase-1-website/config.js` → `mapsUrl`).

**Verify ownership** in [Google Business Profile](https://business.google.com):

- [ ] Listing claimed by clinic (not a random third party)
- [ ] Verification complete (postcard / phone / video as offered)
- [ ] **Primary category:** Dermatologist (add secondary: Skin care clinic, Hair transplantation clinic, Laser hair removal service)
- [ ] **Business name:** Exact legal/trade name — no keyword stuffing (“Best dermatologist Faridabad” is not allowed)
- [ ] **Address:** D-72, 4th Floor, Sector 85, Faridabad 121002 — matches signage and website
- [ ] **Phone:** Same as website/WhatsApp (`+91 92174 80617`)
- [ ] **Website:** Live Vercel URL or `dermacue.in` when registered
- [ ] **Hours:** Match `config.js` (Mon–Sat 10–5, Sun closed)
- [ ] **Appointment link:** WhatsApp or Practo URL when ready

---

## Step 2 — Profile completeness (do this week)

Google rewards **complete** profiles. Aim for 100%.

| Item | Action |
|------|--------|
| **Logo** | Dermacue logo, square, clear on mobile |
| **Cover photo** | Clinic exterior or reception |
| **Interior** | 5+ photos: consultation room, laser room, reception |
| **Team** | Dr. Deepika professional headshot (same as `assets/doctor.jpg`) |
| **Services** | Add each service with description: HydraFacial, laser hair removal, hair transplant, acne, pigmentation, etc. |
| **Products** | Optional: top retail SKUs if you sell skincare |
| **Description** | 750 chars: credentials (MD Dermatology, ex-Associate Professor), machines (Soprano, Tri-Beam), languages (EN/HI), areas served (Faridabad, NCR) |
| **Attributes** | Women-led, appointment required, on-site parking if applicable |
| **Opening date** | Set accurately |
| **Social** | Link Instagram |

**Post weekly on GBP** (not optional for prominence):

- Tip: “Monsoon acne flare-ups — book consultation”
- Offer: “Free skin analysis with HydraFacial booking” (if true)
- Photo: new machine or happy patient (with consent, no identifiable face without consent)
- CTA button: Book / Call / Learn more

---

## Step 3 — Review engine (most important)

### Targets

| Timeline | Reviews | Avg rating |
|----------|---------|------------|
| Month 1 | 10+ | 4.8+ |
| Month 3 | 25+ | 4.8+ |
| Month 6 | 50+ | 4.8+ |

**Volume + recency** matter as much as 5 stars. Ten reviews from last month beat fifty reviews from two years ago.

### Who to ask

Ask **every satisfied patient** at checkout — especially after:

- First successful laser session
- Hair transplant follow-up (good growth)
- HydraFacial / visible skin improvement
- Long consultation where you explained the plan clearly

Do **not** ask angry or unresolved cases.

### How to ask (3-touch system)

1. **In clinic (best conversion):** Reception shows QR code on stand → opens Google review page. Doctor or staff: *“If you’re happy with today’s visit, a Google review really helps other patients find us.”*
2. **WhatsApp +2 hours:** See `review-request-scripts.md` — short message + direct review link
3. **WhatsApp +7 days (optional):** After follow-up message: gentle reminder if they haven’t reviewed

### Direct review link

In GBP dashboard: **Get more reviews** → copy short link → save as `digital-marketing/assets/google-review-link.txt` (create when you have it) and use in WhatsApp scripts.

Format looks like: `https://g.page/r/XXXXX/review`

### QR code

- Generate from the same GBP review link (free QR generators or Canva)
- Print A5 stand for reception desk
- Optional: small card with QR in take-home bag

### Rules (avoid suspension)

- ❌ Never buy fake reviews
- ❌ Never offer cash/discount **in exchange for** a review (Google policy)
- ✅ OK: “We’d appreciate an honest review” — no incentive
- ✅ Respond to **every** review within 24–48 hours (thank positive; address negative professionally)

### Responding to negative reviews

```
Thank you for your feedback, [Name]. We're sorry your experience didn't meet expectations.
Please call us at +91 92174 80617 or WhatsApp so we can understand and resolve this directly.
— Team Dermacue
```

Take heated discussion offline. Never argue publicly.

---

## Step 4 — Connect Maps ↔ Website ↔ WhatsApp

| Touchpoint | Must be consistent |
|------------|-------------------|
| GBP phone | `+91 92174 80617` |
| Website `config.js` | Same number |
| GBP website field | Same Vercel/domain URL |
| GBP “Message” / WhatsApp | Same Business account |
| Address on footer | Same as GBP |

**On website (future small win):** Add a “Find us on Google” / “Leave a review” button in footer linking to `mapsUrl` or direct review link.

**Search Console:** After domain is live, add property and verify — helps Google index the site and ties brand search to the clinic.

---

## Step 5 — Local SEO keywords (free)

Use these naturally in GBP services, website `i18n.js` meta, and posts:

- dermatologist Faridabad
- skin clinic Sector 85
- laser hair removal Faridabad
- hair transplant Faridabad / Delhi NCR
- HydraFacial Faridabad
- acne treatment Faridabad
- pigmentation / melasma treatment

**NAP consistency:** Name, Address, Phone identical on website, GBP, Instagram bio, Practo (when listed).

---

## Step 6 — Track what works

**Google Business Profile Insights** (monthly):

- Searches vs Maps views
- Calls, messages, direction requests, website clicks
- Which search terms triggered views (when available)

**Simple log (spreadsheet):**

| Date | Source (Maps/Referral/Instagram) | Service asked | Booked Y/N |
|------|--------------------------------|---------------|------------|

Ask new patients: *“How did you hear about us?”* — Maps will dominate early.

---

## When to add paid ads (Phase 2)

Start **Google Local Services / Maps ads** or **Meta WhatsApp ads** only when:

- [ ] 15+ genuine Google reviews
- [ ] Profile 100% complete with real photos
- [ ] WhatsApp response time &lt; 15 min during hours
- [ ] You can measure cost per booked appointment

Paid ads without reviews sends traffic to a weak profile — you pay for clicks that choose a competitor with more stars.

---

## Quick wins checklist (this week)

- [ ] GBP 100% complete (photos, services, description, hours)
- [ ] Review QR at reception
- [ ] Review link saved + added to WhatsApp quick reply
- [ ] Website URL on GBP
- [ ] Ask next 10 happy patients (in person + WhatsApp)
- [ ] First GBP weekly post published
- [ ] Respond to any existing reviews
