'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Stethoscope, Syringe, HeartPulse, ClipboardCheck,
  ShieldCheck, Baby, HeartHandshake, FlaskConical, Building2, ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { SERVICE_CATEGORIES, type ServiceCategory } from '../../data/services';

const WAITLIST_URL =
  'https://docs.google.com/forms/d/1TaBNJ9M7Ks6LW5_Vfyqx5DodEPQZbo06bxX8PvJFLiw/viewform';

const ICONS: Record<ServiceCategory['icon'], React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  nursing: Stethoscope, vaccination: Syringe, chronic: HeartPulse, checkup: ClipboardCheck,
  sexual: ShieldCheck, pediatrics: Baby, seniors: HeartHandshake, analysis: FlaskConical, enterprises: Building2,
};

const COPY = {
  FR: {
    badge: 'Nos services',
    title: 'Des soins complets, directement à domicile',
    subtitle:
      '9 spécialités et plus de 25 soins offerts par des infirmières certifiées OIIQ — des tout-petits aux aînés. Touchez un soin pour découvrir en quoi il consiste.',
    featureCaption: 'Soins professionnels à domicile',
    vaccineCaption: 'Vaccination pour toute la famille',
    seniorCaption: 'Accompagnement des aînés',
    hint: 'Touchez un soin pour en savoir plus',
    ctaTitle: 'Prêt à recevoir des soins à la maison ?',
    ctaButton: 'Rejoindre la liste d’attente',
  },
  EN: {
    badge: 'Our services',
    title: 'Complete care, right at home',
    subtitle:
      '9 specialties and 25+ treatments delivered by OIIQ-certified nurses — from toddlers to seniors. Tap any service to see what it involves.',
    featureCaption: 'Professional home care',
    vaccineCaption: 'Vaccination for the whole family',
    seniorCaption: 'Dedicated senior care',
    hint: 'Tap a service to learn more',
    ctaTitle: 'Ready to get care at home?',
    ctaButton: 'Join the waiting list',
  },
} as const;

export function ServicesCatalog() {
  const { language } = useLanguage();
  const c = COPY[language];
  const lang = language === 'FR' ? 'fr' : 'en';

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="container-custom relative">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-8 sm:mb-12"
        >
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 sm:mb-3 text-[#98B690]">{c.badge}</p>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold tracking-tight mb-3 sm:mb-5 text-white" style={{ letterSpacing: '-0.035em' }}>
            {c.title}
          </h1>
          <p className="text-base sm:text-lg font-light leading-relaxed text-white/65">{c.subtitle}</p>
        </motion.div>

        {/* Feature image band */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid md:grid-cols-3 gap-4 mb-14"
        >
          <figure className="md:col-span-2 relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-[190px] sm:h-[280px] md:h-[420px] group">
            <img src="/nurses/hero-nurse.png" alt={c.featureCaption}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ objectPosition: '50% 20%' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <figcaption className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-full px-4 py-2"
              style={{ background: 'rgba(3,18,38,0.55)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.16)' }}>
              <span className="w-2 h-2 rounded-full bg-[#98B690]" />
              <span className="text-sm font-medium text-white">{c.featureCaption}</span>
            </figcaption>
          </figure>
          {/* Secondary image — desktop only, fills the side column */}
          <figure className="hidden md:block relative rounded-3xl overflow-hidden border border-white/10 shadow-xl md:h-[420px] group">
            <img src="/nurses/elder-06.jpeg" alt={c.seniorCaption}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
            <figcaption className="absolute bottom-3 left-3 text-xs font-medium text-white/90">{c.seniorCaption}</figcaption>
          </figure>
        </motion.div>

        <p className="text-xs font-medium uppercase tracking-widest text-white/35 mb-5">{c.hint}</p>

        {/* Catalog — one card per expertise; each service links to its detail page */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 items-start">
          {SERVICE_CATEGORIES.map((cat, ci) => {
            const Icon = ICONS[cat.icon];
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (ci % 2) * 0.06, ease: 'easeOut' }}
                className="glass-dark !rounded-2xl p-3.5 sm:p-6"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <span className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 [&_svg]:w-4 [&_svg]:h-4 sm:[&_svg]:w-5 sm:[&_svg]:h-5"
                    style={{ background: 'rgba(78,102,69,0.2)', border: '1px solid rgba(152,182,144,0.35)' }}>
                    <Icon style={{ color: '#98B690' }} />
                  </span>
                  <h3 className="text-[13px] sm:text-base font-semibold text-white leading-snug">{lang === 'fr' ? cat.nameFr : cat.nameEn}</h3>
                </div>

                <ul className="flex flex-col divide-y divide-white/[0.06]">
                  {cat.services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="flex items-center justify-between gap-2 sm:gap-3 py-2 sm:py-3 group"
                      >
                        <span className="text-xs sm:text-sm text-white/75 group-hover:text-white transition-colors leading-snug">
                          {lang === 'fr' ? s.nameFr : s.nameEn}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-white/35 transition-all group-hover:text-[#98B690] group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="glass-dark !rounded-3xl mt-14 px-8 py-12 flex flex-col items-center text-center gap-6"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight" style={{ letterSpacing: '-0.02em' }}>
            {c.ctaTitle}
          </h2>
          <a
            href={WAITLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(180deg, #0a4a85 0%, #003366 55%, #00264d 100%)', boxShadow: '0 10px 30px rgba(0,51,102,0.45), inset 0 1px 0 rgba(255,255,255,0.18)' }}
          >
            {c.ctaButton}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
