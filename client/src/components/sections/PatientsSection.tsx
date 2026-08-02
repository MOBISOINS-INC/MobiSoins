'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

/* ─── Patients ─────────────────────────────────────────────────────────────
   Was: centred header, a 2+1 gallery, then the four points on a four-column
   hairline grid — the same hairline grid used by the credential band above
   and the services index below. Three instances of one device in one scroll
   is what made the page read as a single repeating block.

   Then: a captioned editorial spread, but the two columns were bottom-aligned
   (`lg:items-end`). The photograph is ~480px and the prose beside it is much
   shorter, so the whole text column was pushed to the floor of the grid and the
   section opened on a large empty rectangle where its title should have been.

   Now: the header is lifted out of the narrow column and opens the section at
   full measure, so the section announces itself before the spread begins. The
   two claims sit top-aligned beside the photograph as separately ruled blocks —
   they read as two distinct claims rather than one grey slab, and a column that
   starts level with the image cannot strand a void above itself.

   Uses the base ground, between two recessed bands, so it reads as the
   page's reading section.
   ---------------------------------------------------------------------- */

const EASE = [0.16, 1, 0.3, 1] as const;

function Caption({ kicker, text }: { kicker: string; text: string }) {
  return (
    <figcaption className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 border-t ms-rule pt-3">
      <span className="text-[0.8125rem] font-semibold text-ink-2">{kicker}</span>
      <span className="ms-meta">{text}</span>
    </figcaption>
  );
}

export function PatientsSection() {
  const { t } = useLanguage();

  return (
    <section id="patients" className="relative py-24 sm:py-32">
      <div className="container-custom">

        {/* Section header — at full measure, above the spread. Previously this
            lived inside the 5-col column, which cramped the title and left the
            section without a proper opening. */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-[46rem] mb-12 sm:mb-16"
        >
          <p className="ms-eyebrow mb-4">{t('patients.badge')}</p>
          <h2 className="ms-title mb-5">{t('patients.title')}</h2>
          <p className="ms-lede">{t('patients.subtitle')}</p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 lg:items-start">

          {/* Lead frame */}
          <motion.figure
            initial={{ opacity: 0, scale: 0.985 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: EASE }}
            className="lg:col-span-7 m-0 flex flex-col gap-3 group"
          >
            <div className="overflow-hidden rounded-sm">
              <img
                src="/nurses/care-1.png"
                alt="Infirmière MobiSoins rendant visite à une famille à domicile"
                className="w-full h-[280px] sm:h-[400px] lg:h-[480px] object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
              />
            </div>
            <Caption kicker={t('patients.cap1Kicker')} text={t('patients.cap1Text')} />
          </motion.figure>

          {/* The argument. Still the same four ideas in the same order, but each
              claim gets its own ruled block and a real heading — as one run of
              dim body copy they were the lowest-contrast text on the page. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            {[
              {
                title: t('patients.point1Title'),
                body: `${t('patients.point1Desc')} ${t('patients.point2Desc')}`,
              },
              {
                title: t('patients.point3Title'),
                body: `${t('patients.point3Desc')} ${t('patients.point4Desc')}`,
              },
            ].map(({ title, body }) => (
              <div key={title} className="border-t ms-rule pt-5">
                <h3 className="ms-item-title mb-2.5">{title}</h3>
                <p className="ms-body-sm max-w-[46ch]">{body}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Supporting frames */}
        <div className="grid sm:grid-cols-2 gap-8 lg:gap-14 mt-10 sm:mt-14">
          {[
            {
              src: '/nurses/nurse-blonde-kid.jpeg',
              alt: 'Infirmière MobiSoins vaccinant une enfant',
              kicker: t('patients.cap2Kicker'),
              text: t('patients.cap2Text'),
            },
            {
              src: '/nurses/nurse-06.jpeg',
              alt: 'Infirmière MobiSoins arrivant au domicile avec sa trousse',
              kicker: t('patients.cap3Kicker'),
              text: t('patients.cap3Text'),
            },
          ].map(({ src, alt, kicker, text }, i) => (
            <motion.figure
              key={src}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: EASE }}
              className="m-0 flex flex-col gap-3 group"
            >
              <div className="overflow-hidden rounded-sm">
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-[220px] sm:h-[280px] object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <Caption kicker={kicker} text={text} />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
