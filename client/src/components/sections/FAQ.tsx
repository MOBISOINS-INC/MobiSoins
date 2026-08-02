'use client';

import { useId, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { Disclosure } from '../ui/Disclosure';

/* ─── FAQ (landing page) ───────────────────────────────────────────────────
   Existed in the repo but was never rendered on the landing page. Both
   reference sites treat it as a core section — DispatchHealth runs 7 Q&As
   immediately before the footer to pre-empt cost, coverage and staffing
   questions. All eight answers were already written in FR and EN.

   Restyled from glass cards onto the page's hairline system. Two further
   changes with the restructure:

   • The search field is gone. A search box over eight rows promises hundreds
     of answers and then disappoints; the list is short enough to scan.
   • Six questions, not eight — the shortlist below.

   The full eight, grouped by theme, live on /faq via FAQFull.tsx. Both share
   ui/Disclosure so the two can never drift in behaviour or accessibility.
   ---------------------------------------------------------------------- */

/* Indices into faq.question{n} / faq.answer{n}, ordered by what actually
   stops someone from booking: what it is, who is coming, what it costs,
   where you serve, is payment safe, and what this is NOT for.

   Q5 (becoming a nurse) is the closing band's second action and Q7 (choosing
   your nurse) is a post-booking concern, so neither blocks a first booking.
   Both still appear on /faq. */
const LANDING_SHORTLIST = [1, 2, 3, 4, 6, 8] as const;

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();
  const uid = useId().replace(/:/g, '');

  const faqs = LANDING_SHORTLIST.map((n) => ({
    question: t(`faq.question${n}`),
    answer: t(`faq.answer${n}`),
  }));

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Sticky header column — keeps the section title in view while the
              list is read, instead of scrolling away above it. */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 lg:sticky lg:top-32"
          >
            <h2 className="ms-title mb-5">{t('faq.title')}</h2>
            <p className="ms-lede mb-7">{t('faq.subtitle')}</p>
            <a
              href="/faq"
              className="text-sm font-semibold text-sage transition-colors hover:text-ink-1"
            >
              {t('faq.seeAll')} →
            </a>
          </motion.div>

          {/* Disclosure list — hairline rows, no cards. */}
          <div className="lg:col-span-8">
            <div className="border-t ms-rule">
              {faqs.map((faq, i) => (
                <Disclosure
                  key={faq.question}
                  id={`${uid}-${i}`}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
