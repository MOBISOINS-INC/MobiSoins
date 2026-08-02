'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PRICE_RANGE, CITIES_SERVED, SERVICE_PRICING } from '../../data/pricing';
import { SERVICE_CATEGORIES } from '../../data/services';

/* ─── Tarifs et couverture ─────────────────────────────────────────────────
   New section, and the one that changes the page most.

   The landing page never stated what anything costs, how long a visit takes,
   or which cities are actually served — while the FAQ, further down and
   collapsed by default, answered all three. A visitor deciding whether this
   is a real service had to open an accordion to find out. That gap is what
   made the page read as atmosphere rather than as something bookable.

   Every figure here already existed on the site: the 45–95 $ range is
   faq.answer3 and the six cities are faq.answer4. Per-treatment prices are
   the one thing never stated anywhere, so they are not invented — they live
   in data/pricing.ts and the table appears only once that file is filled in.

   (Named PricingCoverage rather than Pricing because sections/Pricing.tsx
   already exists as an older, unrendered subscription-tier section.)
   ---------------------------------------------------------------------- */

const EASE = [0.16, 1, 0.3, 1] as const;

// Resolve a priced row against the catalog, so a mistyped slug drops the row
// instead of rendering a blank one in production.
function resolveRow(slug: string, categoryId: string, language: 'FR' | 'EN') {
  const category = SERVICE_CATEGORIES.find((c) => c.id === categoryId);
  const service = category?.services.find((s) => s.slug === slug);
  if (!category || !service) return null;
  return {
    name: language === 'FR' ? service.nameFr : service.nameEn,
    category: language === 'FR' ? category.nameFr : category.nameEn,
  };
}

export function PricingCoverage() {
  const { t, language } = useLanguage();

  const facts = [
    { title: t('pricing.fact1Title'), desc: t('pricing.fact1Desc') },
    { title: t('pricing.fact2Title'), desc: t('pricing.fact2Desc') },
    { title: t('pricing.fact3Title'), desc: t('pricing.fact3Desc') },
  ];

  const rows = SERVICE_PRICING
    .map((p) => ({ ...p, resolved: resolveRow(p.slug, p.categoryId, language) }))
    .filter((p): p is typeof p & { resolved: NonNullable<typeof p.resolved> } =>
      p.resolved !== null
    );

  return (
    <section
      id="pricing"
      className="relative border-y ms-rule py-24 sm:py-32"
      style={{ background: 'var(--color-ground-deep)' }}
    >
      <div className="container-custom">

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-[52ch] mb-12 sm:mb-16"
        >
          <p className="ms-eyebrow mb-4">{t('pricing.badge')}</p>
          <h2 className="ms-title mb-5">{t('pricing.title')}</h2>
          <p className="ms-lede">{t('pricing.lede')}</p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* ── Range + payment facts ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:col-span-7"
          >
            <div className="border-t ms-rule pt-7 pb-8">
              <p className="ms-stat mb-3">
                {PRICE_RANGE.min}
                <span className="text-ink-3 mx-2">–</span>
                {PRICE_RANGE.max}
                <span className="text-ink-2 ml-1">{PRICE_RANGE.currency}</span>
              </p>
              <p className="ms-label mb-1.5">{t('pricing.rangeLabel')}</p>
              <p className="ms-meta">{t('pricing.rangeSub')}</p>
            </div>

            <div className="border-t ms-rule">
              {facts.map(({ title, desc }) => (
                <div key={title} className="ms-rule-soft border-b py-5">
                  <p className="ms-item-title mb-1.5">{title}</p>
                  <p className="ms-body-sm text-ink-3 max-w-[52ch]">{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Coverage ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="lg:col-span-5"
          >
            <div className="ms-panel rounded-2xl p-6 sm:p-7">
              <div className="flex items-center gap-2.5 mb-5">
                <MapPin className="w-4 h-4 shrink-0 text-sage" strokeWidth={1.75} />
                <p className="ms-label">{t('pricing.coverageLabel')}</p>
              </div>

              <ul className="flex flex-col">
                {CITIES_SERVED.map((city) => (
                  <li
                    key={city}
                    className="ms-rule-soft border-t py-3 flex items-center gap-3"
                  >
                    <span className="w-1 h-1 rounded-full bg-sage shrink-0" />
                    <span className="text-[0.9375rem] font-medium text-ink-1">
                      {city}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="ms-meta mt-6 pt-5 border-t ms-rule-soft">
                {t('pricing.coverageNote')}
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Per-treatment table ──
            Hidden entirely while data/pricing.ts has no rows. A table reading
            "sur demande" in every cell looks like a broken promise; no table
            simply means the range above is what we can currently state. */}
        {rows.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-14 sm:mt-20 overflow-x-auto"
          >
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr>
                  <th scope="col" className="ms-label text-left pb-3.5 pr-4 border-b ms-rule">
                    {t('pricing.tableService')}
                  </th>
                  <th scope="col" className="ms-label text-left pb-3.5 pr-4 border-b ms-rule">
                    {t('pricing.tableCategory')}
                  </th>
                  <th scope="col" className="ms-label text-left pb-3.5 pr-4 border-b ms-rule">
                    {t('pricing.tableDuration')}
                  </th>
                  <th scope="col" className="ms-label text-right pb-3.5 border-b ms-rule">
                    {t('pricing.tablePrice')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.slug}>
                    <td className="ms-item-title py-4 pr-4 border-b ms-rule-soft align-baseline">
                      {row.resolved.name}
                    </td>
                    <td className="ms-body-sm py-4 pr-4 border-b ms-rule-soft align-baseline">
                      {row.resolved.category}
                    </td>
                    <td className="ms-body-sm py-4 pr-4 border-b ms-rule-soft align-baseline tabular-nums">
                      {row.minutes === null ? (
                        <span className="text-ink-3">{t('pricing.onRequest')}</span>
                      ) : (
                        `${row.minutes} min`
                      )}
                    </td>
                    <td className="ms-body-sm text-right py-4 border-b ms-rule-soft align-baseline tabular-nums">
                      {row.priceFrom === null ? (
                        <span className="text-ink-3">{t('pricing.onRequest')}</span>
                      ) : (
                        <span className="text-ink-1 font-semibold">
                          {row.priceFrom} {PRICE_RANGE.currency}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </section>
  );
}
