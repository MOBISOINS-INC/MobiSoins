'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const WAITLIST_URL =
  'https://docs.google.com/forms/d/1TaBNJ9M7Ks6LW5_Vfyqx5DodEPQZbo06bxX8PvJFLiw/viewform';

/* ─── Closing CTA ──────────────────────────────────────────────────────────
   Was: a centred h2 + p + gradient pill with a sweeping white "shine"
   animation — the thinnest possible ending, and the shine is the same effect
   the header pill uses, so the page's final action had no more weight than a
   persistent nav button.

   Now: a terminal band. Hairline top edge, lifted background, copy left and
   the action right. The button is solid near-white so it outranks the navy
   header pill — the page-level conversion action should be the highest
   contrast element on the page, and it wasn't.

   Also picks up `newsletter.description`, which existed in both FR and EN but
   was never rendered anywhere.

   With the restructure it carries a second action. MobiSoins is a two-sided
   marketplace, and the landing page offered nurses no route in at all — the
   only mention of joining as a nurse was buried in FAQ question 5. The
   patient path stays the loudest thing on the page; the nurse path sits
   beneath it as an outline button.
   ---------------------------------------------------------------------- */

export const Newsletter = () => {
  const { t } = useLanguage();

  return (
    <section
      className="relative border-t ms-rule"
      style={{ background: 'rgba(235,243,251,0.028)' }}
    >
      <div className="container-custom py-20 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end"
        >
          <div className="lg:col-span-7">
            <p className="text-sm font-semibold text-sage mb-4">
              {t('newsletter.subtitle')}
            </p>
            <h2 className="ms-title mb-5">{t('newsletter.title')}</h2>
            <p className="ms-lede">{t('newsletter.description')}</p>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-3 items-start lg:items-end">
            <a
              href={WAITLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-[0.9375rem] font-semibold transition-transform duration-300 ease-out hover:-translate-y-0.5"
              style={{
                background: 'var(--color-ink-1)',
                color: '#0a1f38',
                boxShadow: '0 16px 38px rgba(0,0,0,0.34)',
              }}
            >
              {t('newsletter.cta')}
              <svg
                className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </a>

            {/* Same waitlist form for now — it is the only intake that exists.
                Point this at a dedicated nurse form once there is one. */}
            <a
              href={WAITLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full px-7 py-4 text-[0.9375rem] font-semibold text-ink-1 border ms-rule transition-colors duration-300 hover:border-[rgba(235,243,251,0.3)]"
            >
              {t('newsletter.nurseCta')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
