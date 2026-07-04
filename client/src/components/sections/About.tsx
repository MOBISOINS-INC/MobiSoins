'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Users,
  MapPin,
  HeartHandshake,
  Sparkles,
  Stethoscope,
  Cpu,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export const About = () => {
  const { t } = useLanguage();

  const team = [
    { icon: Stethoscope, titleKey: 'about.team1Title', descKey: 'about.team1Desc' },
    { icon: Cpu, titleKey: 'about.team2Title', descKey: 'about.team2Desc' },
    { icon: Users, titleKey: 'about.team3Title', descKey: 'about.team3Desc' },
  ];

  const values = [
    { icon: MapPin, titleKey: 'about.value1Title', descKey: 'about.value1Desc' },
    { icon: HeartHandshake, titleKey: 'about.value2Title', descKey: 'about.value2Desc' },
    { icon: ShieldCheck, titleKey: 'about.value3Title', descKey: 'about.value3Desc' },
    { icon: Sparkles, titleKey: 'about.value4Title', descKey: 'about.value4Desc' },
  ];

  const iconTile = {
    background: 'rgba(78,102,69,0.2)',
    border: '1px solid rgba(152,182,144,0.35)',
  };

  return (
    <div className="relative overflow-hidden">
      {/* ========== Mission hero ========== */}
      <section className="relative py-24 lg:py-32">
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            {/* Left: mission text */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-5 text-[#98B690]">
                {t('about.missionBadge')}
              </p>
              <h1 className="text-[clamp(2.5rem,4.5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white/90 mb-8">
                {t('about.missionTitle')}
              </h1>
              <p className="text-xl font-light leading-relaxed text-white/65 max-w-xl">
                {t('about.missionLead')}
              </p>
            </motion.div>

            {/* Right: warm care photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-[2.5rem] bg-[#98B690]/10 blur-3xl pointer-events-none" />
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="/nurses/elder-03.jpeg"
                  alt="Aînée souriante accompagnée par MobiSoins"
                  className="w-full h-[24rem] lg:h-[30rem] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#031226]/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== Mission statement ========== */}
      <section className="relative py-12 lg:py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl p-8 lg:p-10 border-l-2"
              style={{
                borderColor: '#98B690',
                background: 'linear-gradient(120deg, rgba(78,102,69,0.12), rgba(78,102,69,0.02))',
              }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-5 text-[#98B690]">
                {t('about.statementBadge')}
              </p>
              <p className="text-xl lg:text-2xl font-light leading-relaxed text-white mb-6" style={{ letterSpacing: '-0.01em' }}>
                {t('about.statement1')}
              </p>
              <p className="text-base font-light leading-relaxed text-white/60 mb-4">
                {t('about.statement2')}
              </p>
              <p className="text-base font-light leading-relaxed text-white/60">
                {t('about.statement3')}
              </p>
            </motion.div>

            {/* Care for all ages photo */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative min-h-[280px]"
            >
              <div className="absolute -inset-5 rounded-[2.5rem] bg-[#98B690]/10 blur-3xl pointer-events-none" />
              <div className="relative h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="/nurses/commitment.png"
                  alt="Des patients de tous âges accompagnés par MobiSoins"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#031226]/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== The problem ========== */}
      <section className="relative py-16 lg:py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-3 text-[#98B690]">
                {t('about.problemBadge')}
              </p>
              <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-white" style={{ letterSpacing: '-0.03em' }}>
                {t('about.problemTitle')}
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5 lg:pt-2"
            >
              <p className="text-lg font-light leading-relaxed text-white/70">{t('about.problemText1')}</p>
              <p className="text-lg font-light leading-relaxed text-white/70">{t('about.problemText2')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== Story: the founding ========== */}
      <section className="relative py-16 lg:py-24">
        <div className="container-custom">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mb-14"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-3 text-[#98B690]">
              {t('about.storyBadge')}
            </p>
            <h2 className="text-[clamp(2rem,3.6vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white" style={{ letterSpacing: '-0.03em' }}>
              {t('about.storyTitle')}
            </h2>
          </motion.div>

          {/* Narrative + photo */}
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <p className="text-base font-light leading-relaxed text-white/70">{t('about.storyText1')}</p>

              {/* Pull quote */}
              <blockquote
                className="my-8 pl-5 border-l-2 text-xl lg:text-2xl font-medium leading-snug text-white"
                style={{ borderColor: '#98B690', letterSpacing: '-0.01em' }}
              >
                {t('about.storyQuote')}
              </blockquote>

              <p className="text-base font-light leading-relaxed text-white/60">{t('about.storyText2')}</p>
              <p className="text-base font-light leading-relaxed text-white/60">{t('about.storyText3')}</p>
              <p className="text-base font-light leading-relaxed text-white/60">{t('about.storyText4')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative lg:sticky lg:top-28"
            >
              <div className="absolute -inset-6 rounded-[2.5rem] bg-[#98B690]/10 blur-3xl pointer-events-none" />
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="/nurses/care-3.png"
                  alt="L'équipe MobiSoins"
                  className="w-full h-[24rem] lg:h-[30rem] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#031226]/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>

          {/* Facts strip */}
          <div className="grid sm:grid-cols-3 gap-4 mt-16">
            {[
              { v: t('about.fact1Value'), l: t('about.fact1Label') },
              { v: t('about.fact2Value'), l: t('about.fact2Label') },
              { v: t('about.fact3Value'), l: t('about.fact3Label') },
            ].map((f, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-dark !rounded-2xl p-6"
              >
                <div className="text-3xl lg:text-4xl font-semibold text-[#98B690] mb-1.5" style={{ letterSpacing: '-0.03em' }}>
                  {f.v}
                </div>
                <div className="text-sm font-light text-white/55 leading-relaxed">{f.l}</div>
              </motion.div>
            ))}
          </div>

          {/* Founders */}
          <div className="mt-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-6 text-[#98B690]">
              {t('about.foundersLabel')}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['Josue Kenge', 'Gercia Pierre', 'Astride Kenge', 'Moise Kenge'].map((name, i) => {
                const initials = name.split(' ').map((n) => n[0]).join('');
                return (
                  <motion.div
                    key={name}
                    custom={i}
                    variants={fade}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="glass-dark !rounded-2xl p-5 flex flex-col items-center text-center sm:items-start sm:text-left"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-3 text-sm font-semibold"
                      style={{ background: 'linear-gradient(135deg, #003366, #486581)', color: '#fff' }}
                    >
                      {initials}
                    </div>
                    <p className="text-[15px] font-semibold text-white leading-snug">{name}</p>
                    <p className="text-xs font-medium text-[#98B690] mt-0.5">{t('about.founderRole')}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========== Team: nurses + engineers ========== */}
      <section className="relative py-16 lg:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mb-14"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-3 text-[#98B690]">
              {t('about.teamBadge')}
            </p>
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-white mb-5" style={{ letterSpacing: '-0.03em' }}>
              {t('about.teamTitle')}
            </h2>
            <p className="text-lg font-light leading-relaxed text-white/60">
              {t('about.teamLead')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {team.map(({ icon: Icon, titleKey, descKey }, i) => (
              <motion.div
                key={titleKey}
                custom={i}
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-dark !rounded-2xl p-7"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={iconTile}>
                  <Icon className="w-5 h-5" style={{ color: '#98B690' }} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{t(titleKey)}</h3>
                <p className="text-sm font-light text-white/55 leading-relaxed">{t(descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Values ========== */}
      <section className="relative py-16 lg:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mb-14"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-3 text-[#98B690]">
              {t('about.valuesBadge')}
            </p>
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-white" style={{ letterSpacing: '-0.03em' }}>
              {t('about.valuesTitle')}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, titleKey, descKey }, i) => (
              <motion.div
                key={titleKey}
                custom={i}
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-dark !rounded-2xl p-6"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={iconTile}>
                  <Icon className="w-5 h-5" style={{ color: '#98B690' }} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{t(titleKey)}</h3>
                <p className="text-sm font-light text-white/55 leading-relaxed">{t(descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
