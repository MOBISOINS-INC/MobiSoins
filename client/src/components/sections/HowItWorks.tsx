'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

/* ─── Comment ça marche ────────────────────────────────────────────────────
   Was: three hairline-divided text columns with large ghosted numerals, then
   a full-bleed photo strip. It described the product without ever showing it,
   and the photo strip was the third large photo in four screens.

   Now: a sticky header column on the left, the three steps stacked on the
   right, each paired with the app screen at that exact moment. The screens
   are composed in markup rather than screenshotted so they stay translated,
   stay sharp on every display, and cost no image weight.

   Numbering is kept HERE AND ONLY HERE. This is the one section on the page
   whose content is a genuine sequence, so 01/02/03 carries information; the
   restructure strips it out everywhere it was purely decorative.
   ---------------------------------------------------------------------- */

const EASE = [0.16, 1, 0.3, 1] as const;

/* Shared shell for the three screens — a raised panel on whatever ground the
   section sits on. */
function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="ms-panel rounded-2xl p-3.5 flex flex-col gap-2.5"
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

function ScreenHead({ label, meta }: { label: string; meta: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="ms-label text-[0.625rem]">{label}</span>
      <span className="text-[0.6875rem] font-semibold text-sage tabular-nums">
        {meta}
      </span>
    </div>
  );
}

function Row({
  label,
  meta,
  active = false,
}: {
  label: string;
  meta: string;
  active?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5"
      style={{
        background: active ? 'rgba(152,182,144,0.10)' : 'rgba(235,243,251,0.045)',
        border: `1px solid ${
          active ? 'rgba(152,182,144,0.42)' : 'var(--color-hairline-soft)'
        }`,
      }}
    >
      <span className="text-[0.8125rem] font-semibold text-ink-1 truncate">
        {label}
      </span>
      <span
        className={`text-[0.75rem] shrink-0 ${active ? 'text-sage' : 'text-ink-3'}`}
      >
        {meta}
      </span>
    </div>
  );
}

export const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    {
      n: '01',
      title: t('howItWorks.step1.title'),
      desc: t('howItWorks.step1.description'),
      screen: (
        <Screen>
          <ScreenHead label={t('howItWorksApp.s1Label')} meta={t('howItWorksApp.s1Step')} />
          <Row label={t('howItWorksApp.s1Service')} meta={t('howItWorksApp.s1ServiceMeta')} active />
          <Row label={t('howItWorksApp.s1Time')} meta={t('howItWorksApp.s1TimeMeta')} />
          <Row label={t('howItWorksApp.s1Address')} meta={t('howItWorksApp.s1AddressMeta')} />
          <div className="h-1 rounded-full overflow-hidden bg-[rgba(235,243,251,0.12)]">
            <div className="h-full w-1/3 bg-sage" />
          </div>
        </Screen>
      ),
    },
    {
      n: '02',
      title: t('howItWorks.step2.title'),
      desc: t('howItWorks.step2.description'),
      screen: (
        <Screen>
          <ScreenHead label={t('howItWorksApp.s2Label')} meta={t('howItWorksApp.s2Eta')} />
          {/* Route sketch. A dashed path between two pins says "en route"
              faster than any label, and needs no map tiles or API key. */}
          <div
            className="relative h-[74px] rounded-lg overflow-hidden"
            style={{
              background: 'linear-gradient(140deg, #0e2b4b, #0a1f38)',
              border: '1px solid var(--color-hairline-soft)',
            }}
          >
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 190 74"
              preserveAspectRatio="none"
            >
              <path
                d="M18 58 C 60 58, 62 26, 104 26 S 150 16, 172 16"
                fill="none"
                stroke="rgba(152,182,144,0.55)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
            </svg>
            <span
              className="absolute w-[7px] h-[7px] rounded-full bg-sage"
              style={{ left: 14, top: 53, boxShadow: '0 0 0 4px rgba(152,182,144,0.20)' }}
            />
            <span
              className="absolute w-[7px] h-[7px] rounded-full"
              style={{
                left: 166,
                top: 11,
                background: 'var(--color-ink-1)',
                boxShadow: '0 0 0 4px rgba(242,247,252,0.16)',
              }}
            />
          </div>
          <Row label={t('howItWorksApp.s2Nurse')} meta={t('howItWorksApp.s2NurseMeta')} active />
        </Screen>
      ),
    },
    {
      n: '03',
      title: t('howItWorks.step3.title'),
      desc: t('howItWorks.step3.description'),
      screen: (
        <Screen>
          <ScreenHead label={t('howItWorksApp.s3Label')} meta={t('howItWorksApp.s3Meta')} />
          <Row label={t('howItWorksApp.s3Row1')} meta={t('howItWorksApp.s3Row1Meta')} />
          <Row label={t('howItWorksApp.s3Row2')} meta={t('howItWorksApp.s3Row2Meta')} />
          <Row label={t('howItWorksApp.s3Row3')} meta={t('howItWorksApp.s3Row3Meta')} active />
        </Screen>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Sticky header column — the title stays in view while the three
              steps are read past it, instead of scrolling away above them. */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:col-span-4 lg:sticky lg:top-32"
          >
            {/* No eyebrow here: the only available key is `header.howItWorks`,
                which is the section title verbatim. Repeating it above itself
                is exactly the filler the restructure is removing. */}
            <h2 className="ms-title mb-5">{t('howItWorks.title')}</h2>
            <p className="ms-lede">{t('howItWorks.subtitle')}</p>

            {/* Fills the dead space under the lede in the sticky column. The source is
                portrait, so it sits at its natural-ish 4:5 here without being cropped
                into a band the way a full-width placement would force. */}
            <figure className="relative mt-8 lg:mt-10 overflow-hidden rounded-2xl aspect-[4/5]">
              <Image
                src="/nurses/how-it-works.jpg"
                alt={t('howItWorks.photoAlt')}
                fill
                quality={90}
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-[50%_28%]"
              />
            </figure>
          </motion.div>

          <div className="lg:col-span-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.09, duration: 0.65, ease: EASE }}
                /* The screen column is sized so the longest row label ("Confirm
                   address" / "Confirmer l'adresse") and its status still fit
                   side by side. At 210px both were being ellipsed. */
                className="ms-rule border-t grid sm:grid-cols-[1fr_250px] lg:grid-cols-[1fr_300px] gap-6 sm:gap-8 items-center py-8 sm:py-10"
              >
                <div>
                  <p className="ms-label text-sage mb-3">{step.n}</p>
                  <h3 className="ms-item-title mb-2.5">{step.title}</h3>
                  <p className="ms-body-sm max-w-[44ch]">{step.desc}</p>
                </div>
                {step.screen}
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
