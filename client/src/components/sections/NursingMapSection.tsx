'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

/* ─── Dispatch ─────────────────────────────────────────────────────────────
   Was: the busiest block on the page — a text column, three hairline feature
   rows, a large photo, a tracker panel and a secondary thumbnail — sitting
   between two other busy blocks. Every claim in it also appeared somewhere
   else: the three bullets are now the proof band and step 02.

   Now: one full-bleed cinematic band. Title top-left, the photograph running
   edge to edge, and the visit lifecycle as a single line along the bottom.
   No container, no cards, almost no type. It is the page's only quiet
   section, which is precisely what makes it the one that registers.
   ---------------------------------------------------------------------- */

const EASE = [0.16, 1, 0.3, 1] as const;

export function NursingMapSection() {
  const { t } = useLanguage();

  // Dispatch lifecycle — the nurse is currently "en route" (index 2).
  const flow = [
    t('map.stepBooked'),
    t('map.stepMatched'),
    t('map.stepEnRoute'),
    t('map.stepArrived'),
  ];
  const activeStep = 2;

  return (
    <section id="platform" className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative h-[460px] sm:h-[560px] lg:h-[640px] overflow-hidden"
      >
        <img
          src="/nurses/nurse-05.jpeg"
          alt="Infirmière MobiSoins en route vers un patient"
          className="w-full h-full object-cover"
          style={{ objectPosition: '50% 35%' }}
        />

        {/* Feathered top and bottom so the band dissolves into the navy body rather
            than butting against it with a hard seam. The wash is kept deliberately
            thin — it only has to carry the seam, not tint the photograph. The title
            and tracker get their contrast from their own text shadows below, which
            costs nothing everywhere the type isn't. */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, #0a1f38 0%, rgba(10,31,56,0.38) 11%, rgba(10,31,56,0.04) 30%, rgba(10,31,56,0.04) 62%, rgba(10,31,56,0.34) 81%, rgba(10,31,56,0.86) 96%, #0a1f38 100%)',
          }}
        />

        {/* ── Title, top ── */}
        <div className="absolute inset-x-0 top-0 pt-12 sm:pt-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            >
              {/* Shadows replace the heavy overlay: contrast lands on the type
                  instead of across the whole photograph. */}
              <p
                className="ms-eyebrow mb-4"
                style={{ textShadow: '0 1px 3px rgba(4,16,32,0.75)' }}
              >
                {t('map.badge')}
              </p>
              <h2
                className="ms-title max-w-[15ch]"
                style={{ textShadow: '0 1px 2px rgba(4,16,32,0.6), 0 3px 20px rgba(4,16,32,0.55)' }}
              >
                {t('map.title')}
              </h2>
            </motion.div>
          </div>
        </div>

        {/* ── Lifecycle, bottom ── */}
        <div className="absolute inset-x-0 bottom-0 pb-8 sm:pb-12">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
              className="border-t ms-rule pt-5 grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10"
              /* Same trade as the title: the tracker carries its own contrast now
                 that the wash behind it is thin. */
              style={{ textShadow: '0 1px 3px rgba(4,16,32,0.8)' }}
            >
              {/* Live marker */}
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-sage opacity-70 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sage" />
                </span>
                <span className="text-sm font-medium text-ink-1">
                  {t('map.bullet3')}
                </span>
              </div>

              {/* Stepper — dots row, then labels row */}
              <div className="min-w-0">
                <div className="flex items-center">
                  {flow.map((label, i) => {
                    const done = i < activeStep;
                    const isActive = i === activeStep;
                    return (
                      <div
                        key={label}
                        className="flex items-center"
                        style={i < flow.length - 1 ? { flex: 1 } : undefined}
                      >
                        <span
                          className="flex items-center justify-center rounded-full shrink-0"
                          style={{
                            width: 16,
                            height: 16,
                            background: done || isActive ? '#98b690' : 'rgba(235,243,251,0.16)',
                            boxShadow: isActive ? '0 0 0 4px rgba(152,182,144,0.22)' : 'none',
                          }}
                        >
                          {done ? (
                            <Check
                              className="w-2.5 h-2.5"
                              style={{ color: '#0a1f38' }}
                              strokeWidth={3.5}
                            />
                          ) : isActive ? (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0a1f38]" />
                          ) : null}
                        </span>
                        {i < flow.length - 1 && (
                          <div className="flex-1 h-px mx-2 min-w-[14px] bg-[rgba(235,243,251,0.16)]">
                            <div
                              className="h-full"
                              style={{
                                width: i < activeStep ? '100%' : '0%',
                                background: '#98b690',
                              }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-2.5">
                  {flow.map((label, i) => (
                    <span
                      key={label}
                      className="text-[0.6875rem] font-medium whitespace-nowrap"
                      style={{
                        color:
                          i <= activeStep ? 'var(--color-ink-2)' : 'var(--color-ink-3)',
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <span className="text-sm font-semibold text-sage tabular-nums">8 min</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
