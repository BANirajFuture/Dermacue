# Treatment images (`assets/services/`)

Each treatment in the horizontal carousel uses one JPG here.

| File | Treatment id (`services-config.js`) |
|------|-------------------------------------|
| `hair-transplant.jpg` | `hair_transplant` |
| `hair-thinning.jpg` | `hair_thinning` |
| `laser-hair.jpg` | `laser_hair` |
| `pigmentation.jpg` | `pigmentation` |
| `hydrafacial.jpg` | `hydrafacial` |
| `injectables.jpg` | `injectables` |
| `anti-aging.jpg` | `antiaging` |
| `consultation.jpg` | `consultation` |
| `acne.jpg` | `acne` |

## Replace an image

1. Save a new JPG with the **same filename** (recommended ~560×420 px, 4:3, under 200 KB).
2. Commit and push — Vercel redeploys automatically.

## Change order (promote a service)

Edit **`services-config.js`** — move any `{ id, image }` entry to the top of `TREATMENTS`.  
The carousel **and** booking dropdown both follow this order.

Example — put HydraFacial first during a monsoon campaign:

```javascript
const TREATMENTS = [
  { id: "hydrafacial", image: "assets/services/hydrafacial.jpg" },
  { id: "hair_transplant", image: "assets/services/hair-transplant.jpg" },
  // ...
];
```

## Source catalog

`_catalog-source.png` is the original 3×3 grid used to generate the initial crops.
