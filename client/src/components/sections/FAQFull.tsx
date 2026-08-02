'use client';

import { useId, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { Disclosure } from '../ui/Disclosure';

/* ─── FAQ complète (/faq) ──────────────────────────────────────────────────
   The /faq route used to render the landing-page FAQ component verbatim,
   which meant two things: it was a flat list of eight with no information
   architecture, and — once the landing list was cut to its booking-blocking
   six — this page silently lost two questions.

   Now it has its own component: all eight, grouped into four themes, with a
   sticky table of contents. Grouping is the point — "what does it cost" and
   "is payment secure" answer one worry, and a visitor scanning for it should
   find both together rather than at positions 3 and 6 of a flat list.

   Shares ui/Disclosure with the landing FAQ, so expansion behaviour and the
   accessibility wiring stay identical between the two.
   ---------------------------------------------------------------------- */

/* Each group's `q` values index faq.question{n} / faq.answer{n} in
   LanguageContext. All eight are used exactly once — the grouping is a
   reordering, never a filter, so nothing can silently disappear again. */
const GROUPS = [
  { key: 'service', q: [1, 7] },
  { key: 'nurses', q: [2, 5] },
  { key: 'pricing', q: [3, 6] },
  { key: 'coverage', q: [4, 8] },
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

export function FAQFull() {
  const { t } = useLanguage();
  const uid = useId().replace(/:/g, '');
  // Keyed by "groupKey:index" so opening one row never collapses another
  // group's row by accident.
  const [open, setOpen] = useState<string | null>('service:0');

  return (
    <section id="faq" className="relative py-16 sm:py-24">
      <div className="container-custom">

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-[46ch] mb-12 sm:mb-16"
        >
          <h1 className="ms-title mb-5">{t('faq.title')}</h1>
          <p className="ms-lede">{t('faq.subtitle')}</p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Sticky table of contents. Anchors, not JS scroll-spy — the
              browser already handles the hard part. */}
          <nav
            aria-label={t('faq.title')}
            className="lg:col-span-4 lg:sticky lg:top-32"
          >
            <p className="ms-label mb-4">{t('faq.tocLabel')}</p>
            <div className="border-t ms-rule">
              {GROUPS.map((g) => (
                <a
                  key={g.key}
                  href={`#faq-${g.key}`}
                  className="ms-rule-soft border-b py-3 flex items-center justify-between gap-4 text-sm text-ink-2 transition-colors hover:text-sage"
                >
                  {t(`faq.group${g.key.charAt(0).toUpperCase()}${g.key.slice(1)}`)}
                  <span className="ms-meta tabular-nums">{g.q.length}</span>
                </a>
              ))}
            </div>
          </nav>

          <div className="lg:col-span-8">
            {GROUPS.map((g, gi) => (
              <motion.section
                key={g.key}
                id={`faq-${g.key}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: gi * 0.06, duration: 0.6, ease: EASE }}
                // scroll-mt keeps the anchored heading clear of the fixed header
                className="scroll-mt-28 mb-10 sm:mb-14 last:mb-0"
              >
                <h2 className="ms-label text-sage border-b ms-rule pb-3 mb-0">
                  {t(`faq.group${g.key.charAt(0).toUpperCase()}${g.key.slice(1)}`)}
                </h2>

                {g.q.map((n, i) => {
                  const rowKey = `${g.key}:${i}`;
                  return (
                    <Disclosure
                      key={n}
                      id={`${uid}-${g.key}-${i}`}
                      question={t(`faq.question${n}`)}
                      answer={t(`faq.answer${n}`)}
                      isOpen={open === rowKey}
                      onToggle={() => setOpen(open === rowKey ? null : rowKey)}
                    />
                  );
                })}
              </motion.section>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
