'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

/* ─── À propos ─────────────────────────────────────────────────────────────
   Was 376 lines and six sections, each one badge + centred title + a
   `glass-dark` panel, each at py-16/24. Mission, engagement, problème,
   histoire, équipe, valeurs — six times the same shape, so nothing stood out
   and the strongest thing on the page (a founder's mother waiting two days in
   a Montreal hospital for a Tylenol) had exactly the same weight as a list of
   values.

   The copy was never the problem. It is specific, dated and verifiable — 2025
   in Montreal, 36+ combined years at the bedside, engineers from Microsoft,
   IBM and Constellation, four named founders. Only the presentation was
   flattening it.

   Now five blocks of deliberately different densities: a serif statement, a
   facts rail on the recessed ground, the problem as an editorial spread, the
   story led by its own quote, and team + values as hairline rows. Every
   string is the one that was already there.
   ---------------------------------------------------------------------- */

const EASE = [0.16, 1, 0.3, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
} as const;

export const About = () => {
  const { t } = useLanguage();

  const facts = [
    { value: t('about.fact1Value'), label: t('about.fact1Label') },
    { value: t('about.fact2Value'), label: t('about.fact2Label') },
    { value: t('about.fact3Value'), label: t('about.fact3Label') },
  ];

  const team = [
    { title: t('about.team1Title'), desc: t('about.team1Desc') },
    { title: t('about.team2Title'), desc: t('about.team2Desc') },
    { title: t('about.team3Title'), desc: t('about.team3Desc') },
  ];

  const values = [
    { title: t('about.value1Title'), desc: t('about.value1Desc') },
    { title: t('about.value2Title'), desc: t('about.value2Desc') },
    { title: t('about.value3Title'), desc: t('about.value3Desc') },
    { title: t('about.value4Title'), desc: t('about.value4Desc') },
  ];

  // Real people, named in the repo already. Initials rather than invented
  // headshots — a generated avatar would be worse than none.
  const founders = ['Josue Kenge', 'Gercia Pierre', 'Astrid Kenge', 'Moise Kenge'];

  return (
    <>
      {/* ── 1. Mission ─────────────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-24">
        <div className="container-custom">
          <motion.div {...reveal} transition={{ duration: 0.7, ease: EASE }}>
            <p className="ms-eyebrow mb-6">{t('about.missionBadge')}</p>
            <h1 className="ms-title max-w-[18ch] mb-7">{t('about.missionTitle')}</h1>
            <p className="ms-lede max-w-[62ch] text-[1.0625rem]">{t('about.missionLead')}</p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Facts rail ──────────────────────────────────────────────── */}
      <section
        className="relative border-y ms-rule"
        style={{ background: 'var(--color-ground-deep)' }}
      >
        <div className="container-custom">
          <div className="grid sm:grid-cols-3">
            {facts.map(({ value, label }, i) => (
              <motion.div
                key={label}
                {...reveal}
                transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
                className={`ms-rule-soft flex flex-col gap-3 py-8 sm:py-10 ${
                  i < facts.length - 1
                    ? 'border-b sm:border-b-0 sm:border-r sm:pr-8'
                    : ''
                } ${i > 0 ? 'sm:pl-8' : ''}`}
              >
                <span className="ms-stat">{value}</span>
                <span className="ms-body-sm text-ink-3 max-w-[30ch]">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. The problem ─────────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <motion.div
              {...reveal}
              transition={{ duration: 0.7, ease: EASE }}
              className="lg:col-span-7"
            >
              <p className="ms-eyebrow mb-4">{t('about.problemBadge')}</p>
              <h2 className="ms-title-sm max-w-[22ch] mb-7">{t('about.problemTitle')}</h2>
              <div className="flex flex-col gap-4">
                <p className="ms-body max-w-[62ch]">{t('about.problemText1')}</p>
                <p className="ms-body max-w-[62ch]">{t('about.problemText2')}</p>
                <p className="ms-body max-w-[62ch]">{t('about.problemText3')}</p>
              </div>
            </motion.div>

            <motion.figure
              {...reveal}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="lg:col-span-5 m-0 lg:sticky lg:top-32"
            >
              <div className="overflow-hidden rounded-sm">
                <img
                  src="/nurses/elder-03.jpeg"
                  alt="Infirmière MobiSoins auprès d'une personne âgée à domicile"
                  className="w-full h-[280px] lg:h-[420px] object-cover"
                />
              </div>
            </motion.figure>
          </div>
        </div>
      </section>

      {/* ── 4. The story ───────────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-24">
        <div className="container-custom">

          {/* The quote leads, because it is the reason the company exists.
              In the old layout it was a decorative aside two thirds down. */}
          <motion.blockquote
            {...reveal}
            transition={{ duration: 0.7, ease: EASE }}
            className="m-0 border-l-2 pl-6 sm:pl-8"
            style={{ borderColor: 'var(--color-sage)' }}
          >
            {/* The measure must live on the element that carries the display
                size: `ch` resolves against the element's OWN font-size, so a
                24ch cap on the blockquote (16px) was ~190px wide and broke the
                quote to one word per line. */}
            <p className="ms-title max-w-[22ch]">{t('about.storyQuote')}</p>
          </motion.blockquote>

          <motion.div
            {...reveal}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mt-12 sm:mt-16"
          >
            <p className="ms-eyebrow mb-4">{t('about.storyBadge')}</p>
            <h2 className="ms-title-sm max-w-[24ch] mb-8">{t('about.storyTitle')}</h2>

            {/* Two columns of running text — the story is long enough that a
                single 62ch column would run to most of a screen height. */}
            <div className="grid md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-4">
              <p className="ms-body">{t('about.storyText1')}</p>
              <p className="ms-body">{t('about.storyText2')}</p>
              <p className="ms-body">{t('about.storyText3')}</p>
              <p className="ms-body">{t('about.storyText4')}</p>
            </div>
          </motion.div>

          {/* Founders — hairline row, initials only. */}
          <div className="mt-14 sm:mt-20">
            <p className="ms-label mb-5">{t('about.foundersLabel')}</p>
            {/* Full hairline grid — outer top+left on the wrapper, bottom+right
                on every cell. No per-cell breakpoint conditionals, so no
                conflicting border utilities whose winner depends on Tailwind's
                output order rather than the class string. */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l ms-rule">
              {founders.map((name, i) => (
                <motion.div
                  key={name}
                  {...reveal}
                  transition={{ delay: i * 0.07, duration: 0.55, ease: EASE }}
                  className="ms-rule border-b border-r flex items-center gap-3.5 px-4 sm:px-5 py-5"
                >
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-[0.8125rem] font-semibold text-ink-1"
                    style={{ background: 'var(--color-ground-lift)', border: '1px solid var(--color-hairline)' }}
                    aria-hidden="true"
                  >
                    {name.split(' ').map((n) => n[0]).join('')}
                  </span>
                  <div className="min-w-0">
                    <p className="ms-item-title text-[0.9375rem] leading-tight">{name}</p>
                    <p className="ms-meta text-sage mt-0.5">{t('about.founderRole')}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Team + values ───────────────────────────────────────────── */}
      <section
        className="relative border-t ms-rule py-16 sm:py-24"
        style={{ background: 'var(--color-ground-deep)' }}
      >
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            <motion.div
              {...reveal}
              transition={{ duration: 0.7, ease: EASE }}
              className="lg:col-span-6"
            >
              <p className="ms-eyebrow mb-4">{t('about.teamBadge')}</p>
              <h2 className="ms-title-sm mb-5">{t('about.teamTitle')}</h2>
              <p className="ms-body mb-8 max-w-[52ch]">{t('about.teamLead')}</p>

              <div className="border-t ms-rule">
                {team.map(({ title, desc }) => (
                  <div key={title} className="ms-rule-soft border-b py-5">
                    <p className="ms-item-title mb-1.5">{title}</p>
                    <p className="ms-body-sm text-ink-3 max-w-[52ch]">{desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...reveal}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="lg:col-span-6"
            >
              <p className="ms-eyebrow mb-4">{t('about.valuesBadge')}</p>
              <h2 className="ms-title-sm mb-8">{t('about.valuesTitle')}</h2>

              <div className="border-t ms-rule">
                {values.map(({ title, desc }) => (
                  <div key={title} className="ms-rule-soft border-b py-5">
                    <p className="ms-item-title mb-1.5">{title}</p>
                    <p className="ms-body-sm text-ink-3 max-w-[52ch]">{desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
};
