'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

/* ─── Steps ────────────────────────────────────────────────────── */

const steps = [
  {
    num: 'ÉTAPE 01',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    titleKey: 'howItWorks.step1.title',
    descKey: 'howItWorks.step1.description',
  },
  {
    num: 'ÉTAPE 02',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    titleKey: 'howItWorks.step2.title',
    descKey: 'howItWorks.step2.description',
  },
  {
    num: 'ÉTAPE 03',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    titleKey: 'howItWorks.step3.title',
    descKey: 'howItWorks.step3.description',
  },
];

/* ─── Section ──────────────────────────────────────────────────── */

export const HowItWorks = () => {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="relative py-20 lg:py-24 overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-16 lg:gap-24 items-stretch">

          {/* Left: title + vertical process timeline */}
          <div className="relative z-10 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
              className="mb-14"
            >
              <h2
                className="text-5xl md:text-6xl font-semibold tracking-tight mb-5 text-white"
                style={{ letterSpacing: '-0.035em' }}
              >
                {t('howItWorks.title')}
              </h2>
              <p className="text-lg font-light max-w-md text-white/60 leading-relaxed">
                {t('howItWorks.subtitle')}
              </p>
            </motion.div>

            {/* Vertical timeline */}
            <div className="relative">
              {/* Connector line running through the nodes */}
              <div
                className="absolute top-7 bottom-7 left-7 w-px"
                style={{ background: 'linear-gradient(to bottom, rgba(152,182,144,0.55), rgba(152,182,144,0.15) 55%, rgba(255,255,255,0.04))' }}
              />

              <div className="flex flex-col gap-10">
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.14, duration: 0.6, ease: "easeOut" as const }}
                    className="relative flex items-start gap-6"
                  >
                    {/* Icon node */}
                    <div
                      className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                      style={{
                        background: 'rgba(78,102,69,0.2)',
                        border: '1px solid rgba(152,182,144,0.4)',
                        color: '#98B690',
                        boxShadow: '0 0 0 8px #0a1f38',
                      }}
                    >
                      {step.icon}
                    </div>
                    <div className="pt-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] mb-2" style={{ color: 'rgba(152,182,144,0.85)' }}>
                        {step.num}
                      </p>
                      <h3 className="text-xl font-semibold mb-1.5 leading-snug text-white">
                        {t(step.titleKey)}
                      </h3>
                      <p className="text-[15px] font-light leading-relaxed text-white/55 max-w-sm">
                        {t(step.descKey)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: large cinematic nurse photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            className="relative"
          >
            {/* Subtle green ambient glow behind the photo — kept low so the
                background stays a single clean shade */}
            <div
              className="absolute -inset-6 -z-10 pointer-events-none"
              style={{ background: 'radial-gradient(50% 50% at 55% 42%, rgba(78,102,69,0.22), transparent 70%)' }}
            />
            <div
              className="relative w-full min-h-[460px] lg:h-full lg:min-h-[560px] rounded-[2.5rem] overflow-hidden shadow-[0_50px_120px_rgba(0,0,0,0.6)]"
              style={{ border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <Image
                src="/nurses/nurse-08.jpeg"
                alt="Infirmière MobiSoins prodiguant des soins à une patiente à domicile"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
                style={{ objectPosition: '50% 22%' }}
              />
              {/* Cinematic gradient anchoring the caption */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, rgba(3,18,38,0) 45%, rgba(3,18,38,0.5) 78%, rgba(3,18,38,0.85) 100%)' }}
              />

              {/* Credential caption inside the frame */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.5, ease: "easeOut" as const }}
                className="glass-dark absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7 flex items-center gap-3.5 px-5 py-4 !rounded-2xl"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse block shrink-0" />
                <div>
                  <p className="text-sm font-semibold leading-tight text-white">
                    Infirmière OIIQ
                  </p>
                  <p className="text-xs font-light text-white/60">
                    Soins professionnels à domicile
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
