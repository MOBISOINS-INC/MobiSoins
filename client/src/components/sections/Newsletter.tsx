'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

export const Newsletter = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20" style={{ background: 'rgba(255,255,255,0.82)' }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2
            className="text-5xl md:text-6xl font-semibold tracking-tight mb-6"
            style={{ color: '#1a1a24', letterSpacing: '-0.04em' }}
          >
            {t('newsletter.title')}
          </h2>
          <p className="text-lg max-w-xl mx-auto font-light mb-12" style={{ color: '#5a5a6a' }}>
            {t('newsletter.subtitle')}
          </p>
          <a
            href="https://docs.google.com/forms/d/1TaBNJ9M7Ks6LW5_Vfyqx5DodEPQZbo06bxX8PvJFLiw/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-waitlist relative overflow-hidden inline-flex items-center gap-2 px-10 py-5 rounded-full font-semibold cursor-pointer group text-lg"
          >
            <span className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-500" />
            {t('newsletter.cta')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};
