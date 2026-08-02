'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Stethoscope, Syringe, HeartPulse, ClipboardCheck,
  ShieldCheck, Baby, HeartHandshake, FlaskConical, Building2, ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { SERVICE_CATEGORIES, type ServiceCategory } from '../../data/services';

/* ─── Index des services ───────────────────────────────────────────────────
   Was: a 3×3 grid of nine identical cards — icon, name, three example names,
   count. Nine equal cards is the most generic layout available, and it never
   showed what was actually inside a category: the visitor read "5 soins" and
   had to leave the page to find out which five.

   Now: an index on the left, a detail panel on the right. Selecting a
   specialty reveals its real treatments with their real one-line clinical
   descriptions, straight from data/services.ts — all 30 become readable
   without a navigation. Sits on the recessed ground so it reads as a
   reference band, not another content section.

   Still driven entirely by data/services.ts. No invented copy, and the counts
   are computed, so they cannot drift from the catalog.
   ---------------------------------------------------------------------- */

const ICONS: Record<ServiceCategory['icon'], React.ComponentType<{ className?: string }>> = {
  nursing: Stethoscope,
  vaccination: Syringe,
  chronic: HeartPulse,
  checkup: ClipboardCheck,
  sexual: ShieldCheck,
  pediatrics: Baby,
  seniors: HeartHandshake,
  analysis: FlaskConical,
  enterprises: Building2,
};

// Local bilingual copy, reusing ServicesCatalog.tsx's exact wording so the
// landing page and the catalog page stay consistent.
const COPY = {
  FR: {
    badge: 'Nos services',
    title: 'Des soins complets, directement à domicile',
    lede: 'Des infirmières certifiées OIIQ, des tout-petits aux aînés.',
    treatments: 'soins',
    seeAll: 'Voir tous nos services',
    specialties: 'spécialités',
    detail: 'Voir le détail',
  },
  EN: {
    badge: 'Our services',
    title: 'Complete care, right at home',
    lede: 'OIIQ-certified nurses, from toddlers to seniors.',
    treatments: 'treatments',
    seeAll: 'See all our services',
    specialties: 'specialties',
    detail: 'See details',
  },
} as const;

const EASE = [0.16, 1, 0.3, 1] as const;

export function ServicesOverview() {
  const { language } = useLanguage();
  const c = COPY[language];
  const [activeIndex, setActiveIndex] = useState(0);

  const totalTreatments = SERVICE_CATEGORIES.reduce((n, cat) => n + cat.services.length, 0);
  const active = SERVICE_CATEGORIES[activeIndex];
  const ActiveIcon = ICONS[active.icon];

  return (
    <section
      id="services"
      className="relative border-y ms-rule py-24 sm:py-32"
      style={{ background: 'var(--color-ground-deep)' }}
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-10 sm:mb-14"
        >
          <div className="lg:col-span-8">
            <p className="ms-eyebrow mb-4">{c.badge}</p>
            <h2 className="ms-title mb-5">{c.title}</h2>
            <p className="ms-lede">
              {SERVICE_CATEGORIES.length} {c.specialties} · {totalTreatments} {c.treatments}. {c.lede}
            </p>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-sage transition-colors hover:text-ink-1"
            >
              {c.seeAll}
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                strokeWidth={2}
              />
            </Link>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 border-t ms-rule">

          {/* ── Index ── */}
          <div className="lg:col-span-5" role="tablist" aria-label={c.badge}>
            {SERVICE_CATEGORIES.map((cat, i) => {
              const Icon = ICONS[cat.icon];
              const name = language === 'FR' ? cat.nameFr : cat.nameEn;
              const selected = i === activeIndex;

              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  id={`svc-tab-${cat.id}`}
                  aria-selected={selected}
                  aria-controls={`svc-panel-${cat.id}`}
                  onClick={() => setActiveIndex(i)}
                  className={`group w-full ms-rule-soft border-b flex items-center gap-3.5 py-4 pr-4 text-left cursor-pointer transition-all duration-300 ${
                    selected ? 'text-ink-1' : 'text-ink-2 hover:text-ink-1 hover:pl-1.5'
                  }`}
                >
                  <Icon
                    className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                      selected ? 'text-sage' : 'text-ink-3 group-hover:text-sage'
                    }`}
                  />
                  <span className="text-[0.9375rem] font-semibold tracking-[-0.005em] min-w-0">
                    {name}
                  </span>
                  <span className="ms-meta ml-auto shrink-0 tabular-nums">
                    {cat.services.length} {c.treatments}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Detail panel ──
              Keyed on the category id so Framer Motion remounts and replays
              the reveal on every selection, rather than silently swapping
              text inside a static box. */}
          <div
            className="lg:col-span-7 ms-rule lg:border-l border-t lg:border-t-0 p-6 sm:p-8 flex flex-col"
            style={{ background: 'rgba(235,243,251,0.02)' }}
            role="tabpanel"
            id={`svc-panel-${active.id}`}
            aria-labelledby={`svc-tab-${active.id}`}
          >
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="flex flex-col h-full"
            >
              <div className="flex items-center gap-3 mb-6">
                <ActiveIcon className="w-5 h-5 shrink-0 text-sage" />
                <h3 className="ms-title-sm">
                  {language === 'FR' ? active.nameFr : active.nameEn}
                </h3>
              </div>

              <ul className="flex flex-col">
                {active.services.map((s, i) => (
                  <li
                    key={s.slug}
                    className="ms-rule-soft border-t flex gap-4 py-4"
                  >
                    <span className="ms-meta shrink-0 w-6 tabular-nums pt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <p className="ms-item-title mb-1">
                        {language === 'FR' ? s.nameFr : s.nameEn}
                      </p>
                      <p className="ms-body-sm text-ink-3 max-w-[56ch]">
                        {language === 'FR' ? s.shortFr : s.shortEn}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                href={`/services#${active.id}`}
                className="group mt-auto pt-7 inline-flex items-center gap-2 text-sm font-semibold text-sage transition-colors hover:text-ink-1"
              >
                {c.detail}
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
