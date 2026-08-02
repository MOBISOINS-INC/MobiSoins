'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';
import { getServiceBySlug } from '../../../data/services';
import { SERVICE_PRICING, PRICE_RANGE } from '../../../data/pricing';
import { useLanguage } from '../../../contexts/LanguageContext';

/* ─── Fiche de soin ────────────────────────────────────────────────────────
   The structure was sound; the shell was from the old design language —
   `glass-dark` aside, `text-white/55`, Inter headings, an icon tile. Rebuilt
   on the ms-* system to match the rest of the site.

   Two substantive changes:

   • The aside becomes a real booking rail: price, duration and availability
     above the action, and it stays stuck while the description is read. This
     is the page where someone decides, so the action should never scroll away.
   • The hardcoded "Environ 30 minutes" is gone. It was applied identically to
     all 28 treatments, which cannot be true — a suture removal and a full
     health check-up are not the same visit. Duration now comes per-slug from
     data/pricing.ts and the row is omitted when unknown.
   ---------------------------------------------------------------------- */

const WAITLIST_URL =
  'https://docs.google.com/forms/d/1TaBNJ9M7Ks6LW5_Vfyqx5DodEPQZbo06bxX8PvJFLiw/viewform';

const COPY = {
  FR: {
    back: 'Tous les services',
    whatTitle: 'En quoi ça consiste',
    goodTitle: 'Ce qui est inclus',
    howTitle: 'Comment se déroule la visite',
    steps: [
      { t: 'Réservez en ligne', d: 'Choisissez le soin, la date et l’heure qui vous conviennent.' },
      { t: 'Une infirmière se déplace', d: 'Certifiée OIIQ, elle vient directement chez vous.' },
      { t: 'Le soin est prodigué', d: 'En toute sécurité, dans le confort de votre domicile.' },
      { t: 'Rapport dans l’application', d: 'Un compte rendu clinique est disponible après la visite.' },
    ],
    priceLabel: 'À partir de',
    onRequest: 'Sur demande',
    duration: 'Durée',
    insurance: 'Assurance',
    insuranceValue: 'Reçu fourni',
    availability: 'Disponibilité',
    availabilityValue: 'Jour même',
    nurse: 'Infirmière',
    nurseValue: 'Certifiée OIIQ',
    ctaButton: 'Rejoindre la liste d’attente',
    priceNote: 'Le prix exact est affiché avant la réservation.',
    related: 'Autres soins dans cette catégorie',
    notFound: 'Ce service est introuvable.',
    notFoundCta: 'Voir tous les services',
  },
  EN: {
    back: 'All services',
    whatTitle: 'What it involves',
    goodTitle: 'What’s included',
    howTitle: 'How the visit works',
    steps: [
      { t: 'Book online', d: 'Pick the service, date and time that work for you.' },
      { t: 'A nurse comes to you', d: 'OIIQ-certified, she comes straight to your home.' },
      { t: 'Care is delivered', d: 'Safely, in the comfort of your own home.' },
      { t: 'Report in the app', d: 'A clinical summary is available after the visit.' },
    ],
    priceLabel: 'From',
    onRequest: 'On request',
    duration: 'Duration',
    insurance: 'Insurance',
    insuranceValue: 'Receipt provided',
    availability: 'Availability',
    availabilityValue: 'Same day',
    nurse: 'Nurse',
    nurseValue: 'OIIQ-certified',
    ctaButton: 'Join the waiting list',
    priceNote: 'The exact price is shown before booking.',
    related: 'Other treatments in this category',
    notFound: 'This service could not be found.',
    notFoundCta: 'View all services',
  },
} as const;

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : (params?.slug as string);
  const { language } = useLanguage();
  const c = COPY[language];
  const lang = language === 'FR' ? 'fr' : 'en';

  const found = slug ? getServiceBySlug(slug) : undefined;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-ground)' }}>
      <Header />
      <main className="flex-grow pt-28 pb-8">
        {!found ? (
          <div className="container-custom text-center py-24">
            <p className="ms-lede mx-auto mb-6">{c.notFound}</p>
            <Link
              href="/services"
              className="text-sm font-semibold text-sage transition-colors hover:text-ink-1"
            >
              {c.notFoundCta} →
            </Link>
          </div>
        ) : (
          <ServiceBody found={found} c={c} lang={lang} />
        )}
      </main>
      <Footer />
    </div>
  );
}

function ServiceBody({
  found, c, lang,
}: {
  found: NonNullable<ReturnType<typeof getServiceBySlug>>;
  c: (typeof COPY)[keyof typeof COPY];
  lang: 'fr' | 'en';
}) {
  const { service, category } = found;
  const name = lang === 'fr' ? service.nameFr : service.nameEn;
  const short = lang === 'fr' ? service.shortFr : service.shortEn;
  const long = lang === 'fr' ? service.longFr : service.longEn;
  const points = lang === 'fr' ? service.pointsFr : service.pointsEn;
  const catName = lang === 'fr' ? category.nameFr : category.nameEn;
  const siblings = category.services.filter((s) => s.slug !== service.slug);

  const pricing = SERVICE_PRICING.find((p) => p.slug === service.slug);

  // Only rows we can actually substantiate. Duration is dropped entirely when
  // data/pricing.ts has no entry, rather than repeating a generic figure.
  const railRows = [
    ...(pricing?.minutes != null
      ? [{ label: c.duration, value: `${pricing.minutes} min` }]
      : []),
    { label: c.nurse, value: c.nurseValue },
    { label: c.insurance, value: c.insuranceValue },
    { label: c.availability, value: c.availabilityValue },
  ];

  return (
    <div className="container-custom">

      <Link
        href="/services"
        className="group inline-flex items-center gap-2 text-sm font-medium text-ink-3 hover:text-ink-1 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
        {c.back}
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="max-w-[46ch] mb-12 sm:mb-16"
      >
        <p className="ms-eyebrow mb-4">{catName}</p>
        <h1 className="ms-title mb-5">{name}</h1>
        <p className="ms-lede text-[1.0625rem]">{short}</p>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

        {/* ── Description ── */}
        <div className="lg:col-span-7">
          <section>
            <h2 className="ms-label mb-4">{c.whatTitle}</h2>
            <p className="ms-body max-w-[66ch]">{long}</p>
          </section>

          <section className="mt-12">
            <h2 className="ms-title-sm text-[1.3rem] mb-1">{c.howTitle}</h2>
            <div className="border-t ms-rule mt-5">
              {c.steps.map((s, i) => (
                <div key={s.t} className="ms-rule-soft border-b flex gap-4 py-4">
                  <span className="ms-label text-sage shrink-0 w-6 pt-1 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <p className="ms-item-title mb-1">{s.t}</p>
                    <p className="ms-body-sm text-ink-3 max-w-[52ch]">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="ms-label mb-4">{c.goodTitle}</h2>
            <ul className="flex flex-col gap-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
                    style={{ background: 'rgba(152,182,144,0.15)' }}
                  >
                    <Check className="w-2.5 h-2.5 text-sage" strokeWidth={3} />
                  </span>
                  <span className="ms-body-sm max-w-[52ch]">{p}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* ── Booking rail ── */}
        <aside className="lg:col-span-5 lg:sticky lg:top-32">
          <div className="ms-panel rounded-2xl p-6 sm:p-7">
            <p className="ms-label mb-3">{c.priceLabel}</p>
            <p className="ms-stat mb-6">
              {pricing?.priceFrom != null ? (
                <>
                  {pricing.priceFrom}
                  <span className="text-ink-2 ml-1">{PRICE_RANGE.currency}</span>
                </>
              ) : (
                <span className="text-[1.5rem] text-ink-2">{c.onRequest}</span>
              )}
            </p>

            <div className="border-t ms-rule">
              {railRows.map(({ label, value }) => (
                <div
                  key={label}
                  className="ms-rule-soft border-b py-3 flex items-baseline justify-between gap-4"
                >
                  <span className="ms-meta">{label}</span>
                  <span className="text-[0.875rem] font-semibold text-ink-1 text-right">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <a
              href={WAITLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 w-full inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-4 text-[0.9375rem] font-semibold transition-transform duration-300 ease-out hover:-translate-y-0.5"
              style={{
                background: 'var(--color-ink-1)',
                color: '#0a1f38',
                boxShadow: '0 16px 38px rgba(0,0,0,0.34)',
              }}
            >
              {c.ctaButton}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <p className="ms-meta text-center mt-4">{c.priceNote}</p>
          </div>
        </aside>
      </div>

      {siblings.length > 0 && (
        <section className="mt-16 sm:mt-24 border-t ms-rule pt-10">
          <h2 className="ms-label mb-5">{c.related}</h2>
          <div className="border-t ms-rule">
            {siblings.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group ms-rule-soft border-b py-4 flex items-center justify-between gap-6"
              >
                <div className="min-w-0">
                  <p className="ms-item-title transition-colors group-hover:text-sage">
                    {lang === 'fr' ? s.nameFr : s.nameEn}
                  </p>
                  <p className="ms-body-sm text-ink-3 mt-1 max-w-[64ch]">
                    {lang === 'fr' ? s.shortFr : s.shortEn}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 shrink-0 text-ink-3 transition-all group-hover:text-sage group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
