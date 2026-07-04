'use client';

import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Navigation, MapPin, Check } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function NursingMapSection() {
  const { t } = useLanguage();

  const features = [
    { icon: Zap, title: t('map.bullet1'), sub: t('map.bullet1Sub') },
    { icon: ShieldCheck, title: t('map.bullet2'), sub: t('map.bullet2Sub') },
    { icon: Navigation, title: t('map.bullet3'), sub: t('map.bullet3Sub') },
  ];

  // Live dispatch lifecycle — the nurse is currently "en route" (index 2)
  const flow = [
    t('map.stepBooked'),
    t('map.stepMatched'),
    t('map.stepEnRoute'),
    t('map.stepArrived'),
  ];
  const activeStep = 2;

  return (
    <section id="platform" className="relative py-24 lg:py-28 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-[1fr_0.82fr] lg:grid-cols-2 gap-4 sm:gap-10 lg:gap-20 items-center">

          {/* ── Left: text content ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider mb-2 sm:mb-3 text-[#98B690]">
              {t('map.badge')}
            </p>

            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-2 sm:mb-5 text-white"
              style={{ letterSpacing: '-0.03em' }}
            >
              {t('map.title')}
            </h2>

            <p className="text-xs sm:text-lg font-light leading-relaxed mb-5 sm:mb-10 max-w-md text-white/60">
              {t('map.description')}
            </p>

            {/* Feature rows with icon + subtext */}
            <div className="flex flex-col gap-3 sm:gap-6">
              {features.map(({ icon: Icon, title, sub }) => (
                <div key={title} className="flex items-start gap-2.5 sm:gap-4">
                  <div
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 [&_svg]:w-4 [&_svg]:h-4 sm:[&_svg]:w-5 sm:[&_svg]:h-5"
                    style={{
                      background: 'rgba(78,102,69,0.2)',
                      border: '1px solid rgba(152,182,144,0.35)',
                    }}
                  >
                    <Icon style={{ color: '#98B690' }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-[15px] font-semibold text-white leading-snug">{title}</p>
                    <p className="text-[11px] sm:text-sm font-light text-white/50 leading-relaxed max-w-sm mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Coverage footnote */}
            <div className="mt-5 sm:mt-10 flex items-center gap-2 text-[11px] sm:text-sm font-light text-white/45">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" style={{ color: '#98B690' }} />
              {t('map.footnote')}
            </div>
          </motion.div>

          {/* ── Right: the nurse's journey — en route → arriving ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* soft green ambient glow */}
            <div className="absolute -inset-6 rounded-[2.5rem] bg-[#98B690]/10 blur-3xl pointer-events-none" />

            {/* Main photo — nurse en route */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/nurses/nurse-05.jpeg"
                alt="Infirmière MobiSoins en route vers un patient"
                className="w-full h-56 sm:h-80 md:h-[30rem] object-cover"
              />
              {/* gradient for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/15 pointer-events-none" />

              {/* Live "en route" status chip */}
              <div
                className="absolute top-2 left-2 sm:top-4 sm:left-4 flex items-center gap-1.5 sm:gap-2.5 rounded-full px-2.5 py-1 sm:px-4 sm:py-2"
                style={{
                  background: 'rgba(3,18,38,0.55)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.16)',
                }}
              >
                <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#98B690] opacity-70 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-[#98B690]" />
                </span>
                <span className="text-[11px] sm:text-sm font-medium text-white">{t('map.stepEnRoute')}</span>
                <span className="text-[11px] sm:text-sm font-semibold text-white/60">· 8 min</span>
              </div>

              {/* Live visit tracker card — hidden on the narrow mobile column */}
              <div className="glass-dark hidden sm:block absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5 px-5 py-4 !rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
                    {t('map.trackTitle')}
                  </span>
                  <span className="text-xs font-semibold text-[#98B690]">· 8 min</span>
                </div>

                {/* Horizontal stepper — dots + connectors row, labels row below */}
                <div>
                  <div className="flex items-center">
                    {flow.map((label, i) => {
                      const done = i < activeStep;
                      const active = i === activeStep;
                      return (
                        <div key={label} className="flex items-center" style={i < flow.length - 1 ? { flex: 1 } : undefined}>
                          <span
                            className="flex items-center justify-center rounded-full shrink-0"
                            style={{
                              width: 20,
                              height: 20,
                              background: done || active ? '#98B690' : 'rgba(255,255,255,0.12)',
                              boxShadow: active ? '0 0 0 4px rgba(152,182,144,0.25)' : 'none',
                            }}
                          >
                            {done ? (
                              <Check className="w-3 h-3" style={{ color: '#0a1f38' }} strokeWidth={3} />
                            ) : active ? (
                              <span className="w-2 h-2 rounded-full bg-[#0a1f38] animate-pulse" />
                            ) : null}
                          </span>
                          {i < flow.length - 1 && (
                            <div className="flex-1 h-0.5 mx-2 rounded-full overflow-hidden bg-white/12">
                              <div
                                className="h-full rounded-full"
                                style={{ width: i < activeStep ? '100%' : '0%', background: '#98B690' }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-2">
                    {flow.map((label, i) => (
                      <span
                        key={label}
                        className="text-[10px] font-medium whitespace-nowrap"
                        style={{ color: i <= activeStep ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)' }}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Overlapping secondary photo — the nurse arriving at the door */}
            <div className="absolute -top-8 -right-6 w-40 md:w-52 rounded-2xl overflow-hidden border-4 border-[#0a1f38] shadow-xl hidden sm:block">
              <img
                src="/nurses/nurse-06.jpeg"
                alt="Infirmière MobiSoins arrivant au domicile avec sa trousse"
                className="w-full h-28 md:h-36 object-cover"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
