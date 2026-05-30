'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Activity, Filter, Layout, MapPin } from 'lucide-react';
import { Area, AreaChart, CartesianGrid } from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';
import { FlatNAMap } from '@/components/ui/globe';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

/* ─── Mini area chart for card 3 ────────────────────────────── */

const healthData = [
  { day: '1', tension: 130, freq: 72 },
  { day: '4', tension: 125, freq: 68 },
  { day: '7', tension: 128, freq: 75 },
  { day: '10', tension: 122, freq: 70 },
  { day: '13', tension: 118, freq: 65 },
  { day: '16', tension: 115, freq: 67 },
  { day: '19', tension: 120, freq: 71 },
  { day: '22', tension: 112, freq: 63 },
  { day: '25', tension: 108, freq: 60 },
  { day: '28', tension: 105, freq: 62 },
];

const healthConfig = {
  tension: { label: 'Tension', color: '#4e6645' },
  freq: { label: 'Fréq. card.', color: '#98B690' },
} satisfies ChartConfig;

function HealthChart() {
  return (
    <ChartContainer config={healthConfig} className="h-full w-full">
      <AreaChart data={healthData} margin={{ top: 6, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="fillTension" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4e6645" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#4e6645" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="fillFreq" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#98B690" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#98B690" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#f0f0f0" />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
        <Area dataKey="freq" type="natural" fill="url(#fillFreq)" stroke="#98B690" strokeWidth={1.5} stackId="a" />
        <Area dataKey="tension" type="natural" fill="url(#fillTension)" stroke="#4e6645" strokeWidth={2} stackId="a" />
      </AreaChart>
    </ChartContainer>
  );
}

/* ─── Word-by-word pop-up helper ─────────────────────────────── */

function AnimatedWords({
  text,
  className,
  highlightWords = [],
  delay = 0,
}: {
  text: string;
  className?: string;
  highlightWords?: string[];
  delay?: number;
}) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => {
        const isHighlight = highlightWords.includes(word.replace(/[.,]/g, ''));
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: delay + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className={`inline-block mr-[0.25em] ${isHighlight ? 'text-[#4e6645] font-semibold' : ''}`}
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
}

/* ─── Service cards ───────────────────────────────────────────── */

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: 'easeOut' as const },
  }),
};

/* ─── Main section ───────────────────────────────────────────── */

export const Services = () => {
  const { t } = useLanguage();

  const cards = [
    {
      icon: <Layout className="w-4 h-4" style={{ color: '#4e6645' }} />,
      badge: t('services.card1Badge'),
      title: t('services.card1Title'),
      description: t('services.card1Description'),
      visual: (
        <div className="w-full space-y-2.5 mt-4">
          {[
            { emoji: '📅', label: t('services.card1Item1'), sub: t('services.card1Item1Detail'), dot: '#4e6645' },
            { emoji: '💊', label: t('services.card1Item2'), sub: t('services.card1Item2Detail'), dot: '#98B690' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center text-xs border border-slate-100">
                  {item.emoji}
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-slate-700">{item.label}</div>
                  <div className="text-[9px] text-slate-400">{item.sub}</div>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full" style={{ background: item.dot }} />
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: <Filter className="w-4 h-4" style={{ color: '#4e6645' }} />,
      badge: t('services.card2Badge'),
      title: t('services.card2Title'),
      description: t('services.card2Description'),
      visual: (
        <div className="w-full max-w-[200px] mx-auto space-y-3 mt-4">
          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[10px] shadow-sm border border-slate-100">
              <MapPin className="w-3 h-3" style={{ color: '#4e6645' }} />
            </div>
            <div className="h-1.5 bg-slate-200 rounded-full flex-1" />
          </div>
          <div className="flex justify-center">
            <div className="h-5 w-px bg-slate-200" />
          </div>
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-green-200 shadow-sm">
            <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center text-xs border border-green-100">
              👩‍⚕️
            </div>
            <div className="flex-1">
              <div className="h-1.5 bg-slate-300 rounded-full w-24 mb-1" />
              <div className="h-1 bg-slate-200 rounded-full w-16" />
            </div>
            <div className="text-[10px] font-bold" style={{ color: '#4e6645' }}>✓</div>
          </div>
        </div>
      ),
    },
    {
      icon: <Activity className="w-4 h-4" style={{ color: '#4e6645' }} />,
      badge: t('services.card3Badge'),
      title: t('services.card3Title'),
      description: t('services.card3Description'),
      visual: (
        <div className="w-full h-32 mt-2">
          <HealthChart />
        </div>
      ),
    },
  ];

  return (
    <section id="services" className="py-24 overflow-hidden" style={{ background: 'rgba(255,255,255,0.82)' }}>
      <div className="container-custom">

        {/* ── Heading with word pop-up ── */}
        <div className="mb-16 max-w-2xl">
          <h2
            className="text-4xl lg:text-5xl font-semibold tracking-tight mb-4 leading-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            <AnimatedWords
              text={t('services.mainTitle')}
              delay={0}
              highlightWords={[]}
            />{' '}
            <AnimatedWords
              text={t('services.mainTitlePrefix')}
              delay={0.1}
            />{' '}
            <AnimatedWords
              text={t('services.mainTitleHighlight')}
              delay={0.15}
              highlightWords={[t('services.mainTitleHighlight')]}
            />{' '}
            <AnimatedWords
              text={t('services.mainTitleSuffix')}
              delay={0.2}
            />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base font-light"
            style={{ color: '#5a5a6a' }}
          >
            {t('services.badge')}
          </motion.p>
        </div>

        {/* ── 3 service cards ── */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-7 flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ border: '1px solid rgba(26,26,36,0.1)' }}
            >
              {/* Visual */}
              <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-5 mb-6 h-52 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-3.5 left-4 text-[9px] font-semibold text-slate-400 uppercase tracking-widest">
                  {card.badge}
                </div>
                {card.visual}
              </div>

              {/* Text */}
              <div>
                <div className="flex items-center gap-2 mb-2.5 text-sm font-medium" style={{ color: '#4e6645' }}>
                  {card.icon}
                  <span>{card.badge}</span>
                </div>
                <h3 className="text-lg font-semibold tracking-tight mb-2" style={{ color: '#1a1a24' }}>
                  {card.title}
                </h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: '#5a5a6a' }}>
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Globe CTA banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border bg-white shadow-sm px-8 py-14 md:px-16 md:py-20"
          style={{ borderColor: 'rgba(26,26,36,0.12)' }}
        >

          <div className="relative flex flex-col-reverse items-center justify-between gap-10 md:flex-row">
            {/* Left text */}
            <div className="z-10 max-w-lg">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-2 text-sm font-medium mb-6"
                style={{ color: '#4e6645' }}
              >
                <MapPin className="w-4 h-4" />
                {t('services.mapBadge')}
              </motion.p>

              <h2
                className="text-3xl md:text-4xl font-semibold tracking-tight mb-3"
                style={{ letterSpacing: '-0.03em' }}
              >
                <AnimatedWords
                  text={t('services.bannerTitle')}
                  delay={0.1}
                />{' '}
                <AnimatedWords
                  text={t('services.bannerTitleHighlight')}
                  delay={0.4}
                />
              </h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-base font-light mb-8 max-w-sm"
                style={{ color: '#5a5a6a' }}
              >
                {t('services.bannerDescription')}
              </motion.p>

              <motion.a
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.75 }}
                whileHover={{ y: -3 }}
                whileTap={{ y: 2 }}
                href="https://docs.google.com/forms/d/1TaBNJ9M7Ks6LW5_Vfyqx5DodEPQZbo06bxX8PvJFLiw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-waitlist inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
              >
                {t('services.bannerCta')}
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>

            {/* Flat NA map */}
            <div className="relative h-[220px] w-full max-w-[400px] shrink-0 opacity-90">
              <FlatNAMap className="w-full h-full" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
