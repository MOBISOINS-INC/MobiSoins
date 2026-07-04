'use client';

import { motion } from 'framer-motion';
import { Home, CalendarClock, ClipboardCheck, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function PatientsSection() {
  const { t } = useLanguage();

  const points = [
    { icon: Home, title: t('patients.point1Title'), desc: t('patients.point1Desc') },
    { icon: CalendarClock, title: t('patients.point2Title'), desc: t('patients.point2Desc') },
    { icon: ClipboardCheck, title: t('patients.point3Title'), desc: t('patients.point3Desc') },
    { icon: HeartHandshake, title: t('patients.point4Title'), desc: t('patients.point4Desc') },
  ];

  return (
    <section id="patients" className="relative py-24 lg:py-28 overflow-hidden">
      <div className="container-custom relative">
        {/* Header — text left, "how we help" points right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-14 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm font-semibold uppercase tracking-wider mb-3 text-[#98B690]">
              {t('patients.badge')}
            </p>
            <h2
              className="text-4xl lg:text-5xl font-semibold tracking-tight mb-5 text-white"
              style={{ letterSpacing: '-0.03em' }}
            >
              {t('patients.title')}
            </h2>
            <p className="text-lg font-light leading-relaxed text-white/70 mb-5">
              {t('patients.subtitle')}
            </p>
            <p className="text-base font-light leading-relaxed text-white/55">
              {t('patients.description')}
            </p>
          </motion.div>

          {/* How we help — points */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="grid sm:grid-cols-2 gap-6 lg:pt-4"
          >
            {points.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col gap-2.5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(78,102,69,0.2)',
                    border: '1px solid rgba(152,182,144,0.35)',
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#98B690' }} />
                </div>
                <p className="text-[15px] font-semibold text-white leading-snug">{title}</p>
                <p className="text-sm font-light text-white/55 leading-relaxed">{desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Gallery — one cinematic care moment + one patient portrait */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="grid md:grid-cols-3 gap-4"
        >
          {/* Feature — care moment */}
          <div className="md:col-span-2 relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group h-[360px] md:h-[520px]">
            <img
              src="/nurses/care-1.png"
              alt="Infirmière MobiSoins rendant visite à une famille à domicile"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
            {/* Caption chip */}
            <div
              className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-full px-4 py-2"
              style={{
                background: 'rgba(3,18,38,0.55)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.16)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#98B690]" />
              <span className="text-sm font-medium text-white">{t('patients.badge')}</span>
            </div>
          </div>

          {/* Single patient portrait */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-xl group h-[360px] md:h-[520px]">
            <img
              src="/nurses/nurse-blonde-kid.jpeg"
              alt="Infirmière MobiSoins vaccinant une enfant"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
