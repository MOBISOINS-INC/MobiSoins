'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { PlayStoreButton } from '../ui/play-store-button';
import { AppStoreButton } from '../ui/app-store-button';

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section
      aria-label="Infirmière MobiSoins arrivant à domicile"
      className="relative w-full min-h-screen flex items-end sm:items-center overflow-hidden"
      style={{ backgroundColor: '#031226' }}
    >
      {/* Main hero visual — full-bleed still. `priority` because this is the LCP element.
          object-position is set in the <style> block below so a mobile media query can
          override it (inline styles can't), pushing the nurse clear of the copy. */}
      <Image
        src="/nurses/hero-main.jpg"
        alt=""
        fill
        priority
        quality={90}
        sizes="100vw"
        className="hero-photo object-cover"
      />
      <style>{
        `.hero-photo{object-position:28% 50%;}` +
        `@media (max-width:640px){.hero-photo{object-position:50% 26%;}}`
      }</style>

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
            /* Resolves to solid earlier (82% instead of 90%) so the photo is fully
               dissolved before the proof band begins — no visible cut at the seam. */
            'linear-gradient(180deg, rgba(3,18,38,0) 0%, rgba(3,18,38,0.45) 42%, rgba(3,18,38,0.88) 68%, #031226 82%, #031226 100%)',
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
        <div className="max-w-[27rem]">
          {/* Eyebrow — carries the two facts that qualify the offer (city, licensing)
              without competing with the headline. */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 mb-4 md:mb-5 text-[0.7rem] sm:text-[0.75rem] font-accent font-bold uppercase tracking-[0.16em]"
            style={{ color: '#b9d8ac', textShadow: '0 1px 3px rgba(3,18,38,0.6)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            {t('hero.eyebrow')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            // Sized to fit the copy column — at 6vw the second line overflowed and ran
            // across the photo's subject. Cap keeps it contained on wide screens too.
            className="text-[2.25rem] sm:text-[clamp(2.25rem,3.35vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em] mb-3 md:mb-5"
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
            className="text-[0.95rem] sm:text-[clamp(0.95rem,1.15vw,1.05rem)] max-w-[23rem] leading-relaxed font-light mb-7 md:mb-8"
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
        </div>
      </div>
    </section>
  );
};
