'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Activity, Check, Filter, Layout, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

/* ─── Word-by-word pop-up helper ─────────────────────────────── */

function AnimatedWords({
  text,
  className,
  highlightWords = [],
  highlightColor = '#4e6645',
  delay = 0,
}: {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightColor?: string;
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
            className="inline-block mr-[0.25em]"
            style={isHighlight ? { color: highlightColor, fontWeight: 600 } : undefined}
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

export const Services = ({ showViewAll = true }: { showViewAll?: boolean } = {}) => {
  const { t } = useLanguage();

  const cards = [
    {
      icon: <Layout className="w-4 h-4" style={{ color: '#98B690' }} />,
      badge: t('services.card1Badge'),
      title: t('services.card1Title'),
      description: t('services.card1Description'),
      image: '/nurses/nurse-kid.jpeg',
      imageAlt: t('services.card1Title'),
      objectPosition: '50% 32%',
      points: [t('services.card1Point1'), t('services.card1Point2'), t('services.card1Point3')],
    },
    {
      icon: <Filter className="w-4 h-4" style={{ color: '#98B690' }} />,
      badge: t('services.card2Badge'),
      title: t('services.card2Title'),
      description: t('services.card2Description'),
      image: '/nurses/nurse-07.jpeg',
      imageAlt: t('services.card2Title'),
      objectPosition: '50% 20%',
      points: [t('services.card2Point1'), t('services.card2Point2'), t('services.card2Point3')],
    },
    {
      icon: <Activity className="w-4 h-4" style={{ color: '#98B690' }} />,
      badge: t('services.card3Badge'),
      title: t('services.card3Title'),
      description: t('services.card3Description'),
      image: '/nurses/elder-04.jpeg',
      imageAlt: t('services.card3Title'),
      objectPosition: '50% 28%',
      points: [t('services.card3Point1'), t('services.card3Point2'), t('services.card3Point3')],
    },
  ];

  return (
    <section id="services" className="relative py-14 sm:py-24 overflow-hidden">
      <div className="container-custom">

        {/* ── Heading with word pop-up ── */}
        <div className="mb-10 sm:mb-16 max-w-2xl">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-3 sm:mb-4 leading-tight text-white"
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
              highlightColor="#98B690"
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
            className="text-base font-light text-white/60"
          >
            {t('services.badge')}
          </motion.p>
        </div>

        {/* ── 3 service cards — triangle (2 + 1 centered) on mobile ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mb-10 sm:mb-16 [&>*:nth-child(3)]:col-span-2 [&>*:nth-child(3)]:w-1/2 [&>*:nth-child(3)]:mx-auto md:[&>*:nth-child(3)]:col-span-1 md:[&>*:nth-child(3)]:w-full">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass-dark !rounded-2xl p-3 sm:p-7 flex flex-col"
            >
              {/* Real photo */}
              <div className="relative mb-3 sm:mb-6 h-28 sm:h-52 rounded-xl overflow-hidden border border-white/10 bg-white/5">
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  style={{ objectPosition: card.objectPosition }}
                />
                {/* Subtle bottom gradient (kept light — the badge label lives below the image) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
              </div>

              {/* Text */}
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2.5 text-[11px] sm:text-sm font-medium [&_svg]:w-3.5 [&_svg]:h-3.5 sm:[&_svg]:w-auto sm:[&_svg]:h-auto" style={{ color: '#98B690' }}>
                  {card.icon}
                  <span className="leading-tight">{card.badge}</span>
                </div>
                <h3 className="text-sm sm:text-lg font-semibold tracking-tight mb-0 sm:mb-2 leading-snug text-white">
                  {card.title}
                </h3>
                <p className="hidden sm:block text-sm font-light leading-relaxed text-white/65">
                  {card.description}
                </p>

                {/* Feature bullets */}
                <ul className="hidden sm:block mt-5 pt-5 space-y-2.5 border-t border-white/10">
                  {card.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <span
                        className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                        style={{ background: 'rgba(152,182,144,0.15)' }}
                      >
                        <Check className="w-3 h-3" style={{ color: '#98B690' }} strokeWidth={2.5} />
                      </span>
                      <span className="text-[13px] font-light leading-snug text-white/70">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all services → dedicated page (hidden when already on that page) */}
        {showViewAll && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mt-12 flex justify-center"
          >
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.16)' }}
            >
              {t('services.seeAll')}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        )}

      </div>
    </section>
  );
};
