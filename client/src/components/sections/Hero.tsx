'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { PlayStoreButton } from '../ui/play-store-button';
import { AppStoreButton } from '../ui/app-store-button';

// Hero carousel slides — individual nurse shots only (no group photos).
// `position` frames the photo on desktop; `mobile` pushes the nurse toward the
// right on narrow screens so she clears the text on the left.
type HeroSlide = { src: string; position: string; mobile: string; mobileSrc?: string };
const HERO_SLIDES: HeroSlide[] = [
  // First slide uses a dedicated portrait shot on mobile (mobileSrc) — desktop keeps hero-wide.
  { src: '/nurses/hero-wide.png', position: '15% 50%', mobile: '34% 26%', mobileSrc: '/nurses/hero-mobile.png' },
  { src: '/nurses/care-2.png', position: '58% 40%', mobile: '72% 42%' },
  { src: '/nurses/hero-wide-2.png', position: '48% 50%', mobile: '42% 50%' },
  { src: '/nurses/hero-option-2.png', position: '50% 8%', mobile: '56% 14%' },
  { src: '/nurses/hero-option-1.png', position: '50% 14%', mobile: '52% 12%' },
];

const SLIDE_INTERVAL = 6000;

export const Hero = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % HERO_SLIDES.length),
      SLIDE_INTERVAL
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      aria-label="Infirmière MobiSoins arrivant à domicile"
      className="relative w-full min-h-screen flex items-end sm:items-center overflow-hidden"
      style={{ backgroundColor: '#031226' }}
    >
      {/* Crossfading photo slides. background-position lives in the <style> block
          below so a mobile media query can override it (inline styles cannot). */}
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          aria-hidden={i !== active}
          className={`hero-slide-${i} absolute inset-0 bg-cover bg-no-repeat transition-opacity duration-[1200ms] ease-out`}
          style={{
            backgroundImage: `url(${slide.src})`,
            opacity: i === active ? 1 : 0,
          }}
        />
      ))}
      <style>{HERO_SLIDES.map((s, i) =>
        `.hero-slide-${i}{background-position:${s.position};}` +
        `@media (max-width:640px){.hero-slide-${i}{background-position:${s.mobile};${s.mobileSrc ? `background-image:url(${s.mobileSrc}) !important;` : ''}}}`
      ).join('')}</style>

      {/* Neutral-dark panel on the left for the text — clears off the photo on the right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(11,14,20,0.74) 0%, rgba(11,14,20,0.62) 22%, rgba(11,14,20,0.38) 36%, rgba(11,14,20,0.12) 48%, rgba(11,14,20,0) 58%)',
        }}
      />
      {/* Bottom fade — dissolves the photo into the next section's navy (no hard line) */}
      <div
        className="absolute inset-x-0 bottom-0 h-[45%] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(3,18,38,0) 0%, rgba(3,18,38,0.45) 45%, rgba(3,18,38,0.85) 72%, #031226 90%, #031226 100%)',
        }}
      />
      {/* Mobile only: gentle bottom-up gradient so the bottom-anchored text sits on a
          calm base (transparent up top keeps the nurse's face clear). */}
      <div
        className="absolute inset-x-0 bottom-0 h-[62%] pointer-events-none sm:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(3,18,38,0) 0%, rgba(3,18,38,0.25) 45%, rgba(3,18,38,0.6) 78%, rgba(3,18,38,0.85) 100%)',
        }}
      />
      {/* Mobile only: small top scrim so the logo/menu seat cleanly on a bright sky */}
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none sm:hidden"
        style={{ background: 'linear-gradient(180deg, rgba(3,18,38,0.5) 0%, rgba(3,18,38,0) 100%)' }}
      />

      <div className="container-custom w-full relative z-10 pt-28 pb-16">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2.75rem] sm:text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-[1.03] tracking-[-0.04em] mb-3 md:mb-6"
            style={{
              color: '#ffffff',
              textShadow: '0 1px 2px rgba(3,18,38,0.45), 0 3px 22px rgba(3,18,38,0.4)',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            }}
          >
            {t('hero.title')}<br />
            {t('hero.titleHighlight')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[0.95rem] sm:text-[clamp(1.1rem,1.5vw,1.3rem)] max-w-[540px] leading-relaxed font-light mb-7 md:mb-10"
            style={{
              color: '#ffffff',
              textShadow: '0 1px 3px rgba(3,18,38,0.5), 0 2px 14px rgba(3,18,38,0.4)',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            }}
          >
            {/* Short line on mobile, full sentence on desktop */}
            <span className="sm:hidden">{t('hero.subtitleShort')}</span>
            <span className="hidden sm:inline">{t('hero.subtitle')}</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8"
          >
            <a
              href="https://docs.google.com/forms/d/1TaBNJ9M7Ks6LW5_Vfyqx5DodEPQZbo06bxX8PvJFLiw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-white overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(180deg, #0a4a85 0%, #003366 55%, #00264d 100%)',
                boxShadow: '0 10px 30px rgba(0,51,102,0.45), inset 0 1px 0 rgba(255,255,255,0.18)',
              }}
            >
              {/* shine sweep */}
              <span className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-700" />
              <span className="relative">{t('hero.bookNow')}</span>
              <svg
                className="relative transition-transform duration-300 group-hover:translate-x-1"
                width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M5 12h14" /><path d="M13 6l6 6-6 6" />
              </svg>
            </a>
          </motion.div>

          {/* Store buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <AppStoreButton />
            <PlayStoreButton />
          </motion.div>

          {/* Carousel indicators — hidden on mobile (auto-rotate only) */}
          <div className="hidden sm:flex items-center gap-2.5 mt-6 sm:mt-12">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Voir la photo ${i + 1}`}
                className="h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: i === active ? '2rem' : '0.375rem',
                  background: i === active ? '#ffffff' : 'rgba(255,255,255,0.4)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
