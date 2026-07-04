'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Stethoscope, Syringe, HeartPulse, ClipboardCheck, ShieldCheck, Baby,
  HeartHandshake, FlaskConical, Building2, Check, ArrowRight, ArrowLeft,
  ShieldCheck as ShieldIcon, Home, Clock,
} from 'lucide-react';
import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';
import { getServiceBySlug, type ServiceCategory } from '../../../data/services';
import { useLanguage } from '../../../contexts/LanguageContext';

const WAITLIST_URL =
  'https://docs.google.com/forms/d/1TaBNJ9M7Ks6LW5_Vfyqx5DodEPQZbo06bxX8PvJFLiw/viewform';

const ICONS: Record<ServiceCategory['icon'], React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  nursing: Stethoscope, vaccination: Syringe, chronic: HeartPulse, checkup: ClipboardCheck,
  sexual: ShieldCheck, pediatrics: Baby, seniors: HeartHandshake, analysis: FlaskConical, enterprises: Building2,
};

const COPY = {
  FR: {
    back: 'Tous les services',
    whatTitle: 'En quoi ça consiste',
    goodTitle: 'Ce qui est inclus',
    howTitle: 'Comment ça se passe',
    steps: [
      { t: 'Réservez en ligne', d: 'Choisissez le soin, la date et l’heure qui vous conviennent.' },
      { t: 'Une infirmière se déplace', d: 'Certifiée OIIQ, elle vient directement chez vous.' },
      { t: 'Le soin est prodigué', d: 'En toute sécurité, dans le confort de votre domicile.' },
      { t: 'Rapport dans l’application', d: 'Un compte rendu clinique est disponible après la visite.' },
    ],
    reassure: ['Infirmières certifiées OIIQ', 'À domicile', 'Environ 30 minutes'],
    ctaTitle: 'Besoin de ce soin à la maison ?',
    ctaButton: 'Rejoindre la liste d’attente',
    related: 'Autres soins dans cette catégorie',
    notFound: 'Ce service est introuvable.',
    notFoundCta: 'Voir tous les services',
  },
  EN: {
    back: 'All services',
    whatTitle: 'What it involves',
    goodTitle: 'What’s included',
    howTitle: 'How it works',
    steps: [
      { t: 'Book online', d: 'Pick the service, date and time that work for you.' },
      { t: 'A nurse comes to you', d: 'OIIQ-certified, she comes straight to your home.' },
      { t: 'Care is delivered', d: 'Safely, in the comfort of your own home.' },
      { t: 'Report in the app', d: 'A clinical summary is available after the visit.' },
    ],
    reassure: ['OIIQ-certified nurses', 'At home', 'About 30 minutes'],
    ctaTitle: 'Need this care at home?',
    ctaButton: 'Join the waiting list',
    related: 'Other services in this category',
    notFound: 'This service could not be found.',
    notFoundCta: 'View all services',
  },
} as const;

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : (params?.slug as string);
  const { language } = useLanguage();
  const c = COPY[language];
  const lang = language === 'FR' ? 'fr' : 'en';

  const found = slug ? getServiceBySlug(slug) : undefined;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a1f38' }}>
      <Header />
      <main className="flex-grow pt-28 pb-8">
        {!found ? (
          <div className="container-custom text-center py-24">
            <p className="text-white/70 mb-6">{c.notFound}</p>
            <Link href="/services" className="text-[#98B690] font-semibold underline underline-offset-4">
              {c.notFoundCta}
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
  const Icon = ICONS[category.icon];
  const name = lang === 'fr' ? service.nameFr : service.nameEn;
  const short = lang === 'fr' ? service.shortFr : service.shortEn;
  const long = lang === 'fr' ? service.longFr : service.longEn;
  const points = lang === 'fr' ? service.pointsFr : service.pointsEn;
  const catName = lang === 'fr' ? category.nameFr : category.nameEn;
  const reassureIcons = [ShieldIcon, Home, Clock];
  const siblings = category.services.filter((s) => s.slug !== service.slug);

  return (
    <div className="container-custom relative overflow-hidden">
      {/* Back link */}
      <Link href="/services" className="relative inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" />
        {c.back}
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-3xl mb-12"
      >
        <div className="flex items-center gap-3 mb-5">
          <span className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: 'rgba(78,102,69,0.2)', border: '1px solid rgba(152,182,144,0.35)' }}>
            <Icon className="w-6 h-6" style={{ color: '#98B690' }} />
          </span>
          <span className="text-sm font-semibold uppercase tracking-wider text-[#98B690]">{catName}</span>
        </div>
        <h1 className="text-4xl lg:text-6xl font-semibold tracking-tight mb-5 text-white" style={{ letterSpacing: '-0.035em' }}>
          {name}
        </h1>
        <p className="text-xl font-light leading-relaxed text-white/70">{short}</p>
      </motion.div>

      <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-start">
        {/* Left: what it is + how it works */}
        <div className="flex flex-col gap-10">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">{c.whatTitle}</h2>
            <p className="text-base font-light leading-relaxed text-white/65">{long}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-5">{c.howTitle}</h2>
            <div className="flex flex-col gap-6">
              {c.steps.map((s, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold"
                    style={{ background: 'rgba(78,102,69,0.2)', border: '1px solid rgba(152,182,144,0.35)', color: '#98B690' }}>
                    {i + 1}
                  </span>
                  <div className="pt-0.5">
                    <p className="text-[15px] font-semibold text-white leading-snug">{s.t}</p>
                    <p className="text-sm font-light text-white/55 leading-relaxed mt-0.5">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: included + reassurance */}
        <aside className="glass-dark !rounded-2xl p-6 lg:sticky lg:top-28">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-4">{c.goodTitle}</h2>
          <ul className="flex flex-col gap-3 mb-6">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                  style={{ background: 'rgba(152,182,144,0.15)' }}>
                  <Check className="w-3 h-3" style={{ color: '#98B690' }} strokeWidth={2.5} />
                </span>
                <span className="text-sm font-light leading-snug text-white/75">{p}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2.5 pt-5 border-t border-white/10">
            {c.reassure.map((r, i) => {
              const RI = reassureIcons[i];
              return (
                <div key={r} className="flex items-center gap-2.5 text-sm text-white/60">
                  <RI className="w-4 h-4 shrink-0" style={{ color: '#98B690' }} />
                  {r}
                </div>
              );
            })}
          </div>
          <a
            href={WAITLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(180deg, #0a4a85 0%, #003366 55%, #00264d 100%)', boxShadow: '0 10px 30px rgba(0,51,102,0.4), inset 0 1px 0 rgba(255,255,255,0.18)' }}
          >
            {c.ctaButton}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </aside>
      </div>

      {/* Related services */}
      {siblings.length > 0 && (
        <section className="relative mt-16 pt-10 border-t border-white/10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-5">{c.related}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {siblings.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="glass-dark !rounded-2xl p-5 flex items-center justify-between gap-3 group transition-all duration-300 hover:-translate-y-0.5"
              >
                <div>
                  <p className="text-[15px] font-semibold text-white leading-snug">{lang === 'fr' ? s.nameFr : s.nameEn}</p>
                  <p className="text-xs font-light text-white/50 mt-1 line-clamp-2">{lang === 'fr' ? s.shortFr : s.shortEn}</p>
                </div>
                <ArrowRight className="w-4 h-4 shrink-0 text-white/40 transition-all group-hover:text-[#98B690] group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
