'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

export const Newsletter = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2
            className="text-3xl md:text-4xl font-semibold tracking-tight mb-3 text-white"
            style={{ letterSpacing: '-0.03em' }}
          >
            {t('newsletter.title')}
          </h2>
          <p className="text-base max-w-lg mx-auto font-light mb-8 text-white/60">
            {t('newsletter.subtitle')}
          </p>
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
            <span className="relative">{t('newsletter.cta')}</span>
            <svg
              className="relative transition-transform duration-300 group-hover:translate-x-1"
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M5 12h14" /><path d="M13 6l6 6-6 6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
