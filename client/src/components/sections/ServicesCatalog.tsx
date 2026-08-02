'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Stethoscope, Syringe, HeartPulse, ClipboardCheck,
  ShieldCheck, Baby, HeartHandshake, FlaskConical, Building2, ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { SERVICE_CATEGORIES, type ServiceCategory } from '../../data/services';
import { SERVICE_PRICING, PRICE_RANGE } from '../../data/pricing';

/* ─── Catalogue des services (/services) ───────────────────────────────────
   Was a grid of nine `glass-dark` cards, two per row, each listing its
   treatments as bare links — plus a full marketing header and a two-image
   band before any of it. Combined with the `Services` section stacked above,
   the page opened with two complete headers before the first piece of data.

   The page's job is not to convince. That happens on the landing page; by the
   time someone is on /services they are looking for a specific treatment and
   want to know whether it is offered, how long it takes and what it costs.

   So this is now a directory: a sticky specialty nav on the left, all 28
   treatments listed on the right with their real one-line clinical
   descriptions. Deep links (/services#pediatrics) still land on the right
   group — the landing page's index relies on them.

   Duration and price columns render per row only when data/pricing.ts has an
   entry for that slug. While that file is empty the column is simply absent,
   rather than filling the page with "sur demande".
   ---------------------------------------------------------------------- */

const WAITLIST_URL =
  'https://docs.google.com/forms/d/1TaBNJ9M7Ks6LW5_Vfyqx5DodEPQZbo06bxX8PvJFLiw/viewform';

const ICONS: Record<ServiceCategory['icon'], React.ComponentType<{ className?: string }>> = {
  nursing: Stethoscope, vaccination: Syringe, chronic: HeartPulse, checkup: ClipboardCheck,
  sexual: ShieldCheck, pediatrics: Baby, seniors: HeartHandshake, analysis: FlaskConical,
  enterprises: Building2,
};

const COPY = {
  FR: {
    badge: 'Catalogue',
    title: 'Tous nos soins à domicile',
    specialties: 'spécialités',
    treatments: 'soins',
    lede: 'Infirmières certifiées OIIQ, des tout-petits aux aînés.',
    nav: 'Spécialités',
    ctaTitle: 'Prêt à recevoir des soins à la maison ?',
    ctaButton: 'Rejoindre la liste d’attente',
  },
  EN: {
    badge: 'Catalogue',
    title: 'Every treatment we offer at home',
    specialties: 'specialties',
    treatments: 'treatments',
    lede: 'OIIQ-certified nurses, from toddlers to seniors.',
    nav: 'Specialties',
    ctaTitle: 'Ready to get care at home?',
    ctaButton: 'Join the waiting list',
  },
} as const;

const EASE = [0.16, 1, 0.3, 1] as const;

export function ServicesCatalog() {
  const { language } = useLanguage();
  const c = COPY[language];

  // Computed, never written by hand — the old copy claimed "plus de 25 soins"
  // while the catalog held 28.
  const totalTreatments = SERVICE_CATEGORIES.reduce((n, cat) => n + cat.services.length, 0);

  const priceBySlug = new Map(SERVICE_PRICING.map((p) => [p.slug, p]));
  const hasFigures = SERVICE_PRICING.length > 0;

  return (
    <section className="relative py-12 sm:py-16">
      <div className="container-custom">

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-[46ch] mb-10 sm:mb-14"
        >
          <p className="ms-eyebrow mb-4">{c.badge}</p>
          <h1 className="ms-title mb-5">{c.title}</h1>
          <p className="ms-lede">
            {SERVICE_CATEGORIES.length} {c.specialties} · {totalTreatments} {c.treatments}. {c.lede}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-0 border-t ms-rule">

          {/* ── Sticky specialty nav. Scrolls horizontally below lg rather
                than stacking nine rows above the content. ── */}
          <nav
            aria-label={c.nav}
            className="lg:col-span-3 ms-rule border-b lg:border-b-0 lg:border-r py-4 lg:py-6 lg:pr-6"
          >
            <p className="ms-label mb-3 hidden lg:block">{c.nav}</p>
            <div className="flex lg:flex-col gap-4 lg:gap-0 overflow-x-auto lg:overflow-visible lg:sticky lg:top-32">
              {SERVICE_CATEGORIES.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="group flex items-center gap-2.5 lg:gap-3 py-1 lg:py-2 whitespace-nowrap text-sm text-ink-2 transition-colors hover:text-sage"
                >
                  {language === 'FR' ? cat.nameFr : cat.nameEn}
                  <span className="ms-meta tabular-nums hidden lg:inline lg:ml-auto">
                    {cat.services.length}
                  </span>
                </a>
              ))}
            </div>
          </nav>

          {/* ── Groups ── */}
          <div className="lg:col-span-9 lg:pl-10">
            {SERVICE_CATEGORIES.map((cat, ci) => {
              const Icon = ICONS[cat.icon];
              return (
                <motion.section
                  key={cat.id}
                  // Deep-link target for /services#<id>; scroll-mt clears the
                  // fixed header.
                  id={cat.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: Math.min(ci, 3) * 0.05, duration: 0.55, ease: EASE }}
                  className="scroll-mt-28 md:scroll-mt-32 pt-8 sm:pt-10 first:pt-6"
                >
                  <div className="flex items-baseline gap-3 border-b ms-rule pb-3">
                    <Icon className="w-[18px] h-[18px] shrink-0 text-sage translate-y-0.5" />
                    <h2 className="ms-title-sm text-[1.3rem]">
                      {language === 'FR' ? cat.nameFr : cat.nameEn}
                    </h2>
                    <span className="ms-meta ml-auto shrink-0 tabular-nums">
                      {cat.services.length} {c.treatments}
                    </span>
                  </div>

                  <ul>
                    {cat.services.map((s) => {
                      const price = priceBySlug.get(s.slug);
                      return (
                        <li key={s.slug} className="ms-rule-soft border-b">
                          <Link
                            href={`/services/${s.slug}`}
                            className="group grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[1fr_auto] items-baseline"
                          >
                            <span className="ms-item-title transition-colors group-hover:text-sage">
                              {language === 'FR' ? s.nameFr : s.nameEn}
                            </span>

                            {hasFigures && (
                              <span className="flex items-baseline gap-5 tabular-nums sm:row-span-2 sm:self-center">
                                <span className="ms-meta">
                                  {price?.minutes != null ? `${price.minutes} min` : '—'}
                                </span>
                                <span className="ms-item-title">
                                  {price?.priceFrom != null
                                    ? `${price.priceFrom} ${PRICE_RANGE.currency}`
                                    : '—'}
                                </span>
                              </span>
                            )}

                            <span className="ms-body-sm text-ink-3 max-w-[68ch] sm:col-start-1">
                              {language === 'FR' ? s.shortFr : s.shortEn}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </motion.section>
              );
            })}
          </div>
        </div>

        {/* ── Closing action ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-14 sm:mt-20 border-t ms-rule pt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
        >
          <h2 className="ms-title-sm max-w-[24ch]">{c.ctaTitle}</h2>
          <a
            href={WAITLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-[0.9375rem] font-semibold transition-transform duration-300 ease-out hover:-translate-y-0.5 shrink-0 self-start"
            style={{
              background: 'var(--color-ink-1)',
              color: '#0a1f38',
              boxShadow: '0 16px 38px rgba(0,0,0,0.34)',
            }}
          >
            {c.ctaButton}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
