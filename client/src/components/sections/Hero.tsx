'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { PlayStoreButton } from '../ui/play-store-button';
import { AppStoreButton } from '../ui/app-store-button';

// Hero carousel slides — each image carries its own framing (size + position).
const HERO_SLIDES = [
  { src: '/nurses/hero-wide.png', size: 'cover', position: '15% 50%' },
  { src: '/nurses/care-2.png', size: 'cover', position: '58% 40%' },
  { src: '/nurses/hero-wide-2.png', size: 'cover', position: '48% 50%' },
  // Team shot: zoom + pan right so the group clears the text (left figure fades into the panel).
  { src: '/nurses/hero-wide-3.png', size: '126% auto', position: '4% 35%' },
  { src: '/nurses/hero-option-2.png', size: 'cover', position: '50% 8%' },
  { src: '/nurses/hero-option-1.png', size: 'cover', position: '50% 14%' },
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
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: '#031226' }}
    >
      {/* Crossfading photo slides */}
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          aria-hidden={i !== active}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-out"
          style={{
            backgroundImage: `url(${slide.src})`,
            backgroundSize: slide.size,
            backgroundPosition: slide.position,
            backgroundRepeat: 'no-repeat',
            opacity: i === active ? 1 : 0,
          }}
        />
      ))}

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

      <div className="container-custom w-full relative z-10 pt-28 pb-16">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-[1.03] tracking-[-0.04em] mb-6"
            style={{
              /* Soft off-white — takes the harsh glare off pure #fff while staying
                 fully opaque for legibility over the photo. */
              color: '#eef2f7',
              textShadow: '0 1px 2px rgba(3,18,38,0.4), 0 3px 22px rgba(3,18,38,0.35)',
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
            className="text-[clamp(1.1rem,1.5vw,1.3rem)] max-w-[540px] leading-relaxed font-light mb-10"
            style={{
              color: 'rgba(255,255,255,0.92)',
              textShadow: '0 1px 3px rgba(3,18,38,0.5), 0 2px 14px rgba(3,18,38,0.4)',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            }}
          >
            {t('hero.subtitle')}
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

          {/* Carousel indicators */}
          <div className="flex items-center gap-2.5 mt-12">
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
