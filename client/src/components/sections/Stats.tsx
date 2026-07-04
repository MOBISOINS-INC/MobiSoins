'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const stats = [
  { value: '10K+', labelKey: 'stats.patients' },
  { value: '500+', labelKey: 'stats.nurses' },
  { value: '4.9★', labelKey: 'stats.satisfaction' },
  { value: '24/7', labelKey: 'stats.availability' },
  { value: '12', labelKey: 'stats.cities' },
];

export const Stats = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-8">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center text-center gap-2 md:[&:not(:first-child)]:before:content-[''] md:[&:not(:first-child)]:before:absolute md:[&:not(:first-child)]:before:left-0 md:[&:not(:first-child)]:before:top-1/2 md:[&:not(:first-child)]:before:-translate-y-1/2 md:[&:not(:first-child)]:before:h-10 md:[&:not(:first-child)]:before:w-px md:[&:not(:first-child)]:before:bg-white/10"
            >
              <span
                className="text-4xl md:text-5xl font-medium text-white"
                style={{ letterSpacing: '-0.045em' }}
              >
                {stat.value}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/40">
                {t(stat.labelKey)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
