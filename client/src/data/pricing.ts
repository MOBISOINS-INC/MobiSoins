/**
 * Pricing and coverage for the landing page's "Tarifs et couverture" section.
 *
 * ─── Where these numbers come from ────────────────────────────────────────
 * Everything in `PRICE_RANGE` and `CITIES_SERVED` is already asserted
 * elsewhere on the site — the 45–95 $ range and the six-city list are both
 * stated verbatim in the FAQ answers (faq.answer3 / faq.answer4 in
 * LanguageContext.tsx). Nothing here is new marketing copy.
 *
 * ─── SERVICE_PRICING is deliberately empty ────────────────────────────────
 * Per-treatment prices and durations are the one thing the site has never
 * stated, so they are not guessed here. The table renders only when this
 * array has entries; while it is empty the section still stands on the range,
 * the payment facts and the coverage list.
 *
 * To turn the table on, add rows below. `slug` must match a service slug in
 * ./services.ts so the two can never drift:
 *
 *   { slug: 'prise-sang', categoryId: 'checkup', minutes: 20, priceFrom: 55 }
 *
 * Leave `minutes` or `priceFrom` as null on any row that is genuinely
 * quote-based — that cell renders as "Sur demande" rather than a fake number.
 */

export interface ServicePrice {
  /** Must match a ServiceDef.slug in ./services.ts */
  slug: string;
  /** Must match a ServiceCategory.id in ./services.ts */
  categoryId: string;
  /** Typical visit length in minutes, or null if quote-based */
  minutes: number | null;
  /** Starting price in CAD, or null if quote-based */
  priceFrom: number | null;
}

/** Overall per-visit range — stated in faq.answer3. */
export const PRICE_RANGE = { min: 45, max: 95, currency: '$' } as const;

/** Cities currently served — stated in faq.answer4. */
export const CITIES_SERVED = [
  'Montréal',
  'Québec',
  'Laval',
  'Gatineau',
  'Longueuil',
  'Sherbrooke',
] as const;

/** Empty until real per-treatment figures are supplied. See note above. */
export const SERVICE_PRICING: ServicePrice[] = [];
