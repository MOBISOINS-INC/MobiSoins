'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Blog = () => {
  const { t } = useLanguage();

  const articles = [
    {
      image: '/images/articles/telesante.jpg',
      fallback: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
      tags: [t('blog.article1Tag1'), t('blog.article1Tag2')],
      title: t('blog.article1Title'),
      description: t('blog.article1Description'),
      readTime: '5 min',
      link: '/articles/telesante',
      featured: true,
    },
    {
      image: '/images/articles/premiere-visite.jpg',
      fallback: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      tags: [t('blog.article2Tag1'), t('blog.article2Tag2')],
      title: t('blog.article2Title'),
      description: t('blog.article2Description'),
      readTime: '4 min',
      link: '/articles/premiere-visite',
      featured: false,
    },
    {
      image: '/images/articles/soins-aines.jpg',
      fallback: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=800&q=80',
      tags: [t('blog.article3Tag1'), t('blog.article3Tag2')],
      title: t('blog.article3Title'),
      description: t('blog.article3Description'),
      readTime: '6 min',
      link: '/articles/soins-aines',
      featured: false,
    },
  ];

  const [featured, ...rest] = articles;

  return (
    <section className="relative py-16">
      <div className="container-custom">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2 text-[#98B690]">
              {t('blog.badge') || 'Ressources'}
            </p>
            <h2
              className="text-3xl md:text-4xl font-semibold tracking-tight text-white"
              style={{ letterSpacing: '-0.03em' }}
            >
              {t('blog.title')}
            </h2>
          </div>
          <p className="text-sm font-light max-w-xs text-right hidden md:block text-white/45">
            {t('blog.subtitle')}
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid md:grid-cols-5 gap-4">

          {/* Featured — large card, left 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="md:col-span-3"
          >
            <Link
              href={featured.link}
              className="group relative rounded-2xl overflow-hidden block"
              style={{ minHeight: '380px' }}
            >
              {/* Full-bleed image */}
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                onError={(e) => { (e.target as HTMLImageElement).src = featured.fallback; }}
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(10,10,18,0.88) 0%, rgba(10,10,18,0.35) 55%, transparent 100%)',
                }}
              />
              {/* Content pinned to bottom */}
              <div className="absolute inset-0 flex flex-col justify-between p-7">
                {/* Top: tags + read time */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {featured.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold backdrop-blur-md"
                        style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {featured.readTime} {t('blog.readTime')}
                  </span>
                </div>

                {/* Bottom: title + arrow */}
                <div>
                  <h3
                    className="text-xl md:text-2xl font-semibold leading-snug mb-3 text-white tracking-tight"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {featured.title}
                  </h3>
                  <p className="text-sm font-light mb-4 line-clamp-2" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    {featured.description}
                  </p>
                  <div
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 group-hover:gap-3"
                    style={{ color: '#98B690' }}
                  >
                    {t('blog.readMore')}
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Two smaller cards — right 2 cols */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {rest.map((article, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: 'easeOut' }}
                className="flex-1"
              >
                <Link
                  href={article.link}
                  className="group flex flex-col rounded-2xl overflow-hidden border h-full"
                  style={{ borderColor: 'rgba(0,0,0,0.08)', background: '#fff' }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ height: '140px' }}>
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => { (e.target as HTMLImageElement).src = article.fallback; }}
                    />
                    {/* Subtle top-right arrow badge on hover */}
                    <div
                      className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
                      style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}
                    >
                      <ArrowUpRight className="w-4 h-4" style={{ color: '#1a1a24' }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-1.5">
                        {article.tags.map((tag, j) => (
                          <span
                            key={j}
                            className="px-2 py-0.5 rounded-full text-[11px] font-medium"
                            style={{ background: 'rgba(78,102,69,0.08)', color: '#4e6645' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-[11px]" style={{ color: '#94a3b8' }}>
                        {article.readTime}
                      </span>
                    </div>
                    <h3
                      className="text-sm font-semibold leading-snug mb-2 transition-colors duration-200 group-hover:opacity-60"
                      style={{ color: '#1a1a24' }}
                    >
                      {article.title}
                    </h3>
                    <p className="text-xs font-light leading-relaxed line-clamp-2 mt-auto" style={{ color: '#94a3b8' }}>
                      {article.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
