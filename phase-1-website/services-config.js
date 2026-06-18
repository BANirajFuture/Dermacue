/**
 * Treatment carousel — reorder this array to change display + booking priority.
 * First item appears leftmost; move a service to index 0 to promote it.
 *
 * id:     matches i18n keys service.{id} and svc.card.{id}
 * image:  path under phase-1-website/ (replace JPG anytime in assets/services/)
 */
const TREATMENTS = [
  { id: "hair_transplant", image: "assets/services/hair-transplant.jpg" },
  { id: "hair_thinning", image: "assets/services/hair-thinning.jpg" },
  { id: "laser_hair", image: "assets/services/laser-hair.jpg" },
  { id: "pigmentation", image: "assets/services/pigmentation.jpg" },
  { id: "hydrafacial", image: "assets/services/hydrafacial.jpg" },
  { id: "injectables", image: "assets/services/injectables.jpg" },
  { id: "antiaging", image: "assets/services/anti-aging.jpg" },
  { id: "consultation", image: "assets/services/consultation.jpg" },
  { id: "acne", image: "assets/services/acne.jpg" },
];

/** Booking dropdown uses the same order as the carousel. */
const SERVICE_OPTIONS = TREATMENTS.map((t) => t.id);
