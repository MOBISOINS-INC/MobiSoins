'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

/* ─── Articles ─────────────────────────────────────────────────────────────
   Was a bento grid: one dark featured card plus two cards hardcoded to
   `background:'#fff'` / `color:'#1a1a24'` — leftover light theme. On the navy
   page those two read as a rendering fault, not a design choice.

   The bento also asserted a hierarchy that does not exist. There are three
   articles and none is more important than the others; a 3-column feature
   split is a layout for an editorial front page with dozens of stories.

   Now: a hairline index. Thumbnail, serif title, tags, read time. Three rows
   scan in one glance, and the same layout still works at thirty without a
   redesign.
   ---------------------------------------------------------------------- */

const EASE = [0.16, 1, 0.3, 1] as const;

export const Blog = () => {
  const { t } = useLanguage();

  const articles = [
    {
      image: '/nurses/nurse-09.jpeg',
      tags: [t('blog.article1Tag1'), t('blog.article1Tag2')],
      title: t('blog.article1Title'),
      description: t('blog.article1Description'),
      readTime: '5 min',
      link: '/articles/telesante',
    },
    {
      image: '/nurses/care-1.png',
      tags: [t('blog.article2Tag1'), t('blog.article2Tag2')],
      title: t('blog.article2Title'),
      description: t('blog.article2Description'),
      readTime: '4 min',
      link: '/articles/premiere-visite',
    },
    {
      image: '/nurses/elder-03.jpeg',
      tags: [t('blog.article3Tag1'), t('blog.article3Tag2')],
      title: t('blog.article3Title'),
      description: t('blog.article3Description'),
      readTime: '6 min',
      link: '/articles/soins-aines',
    },
  ];

  return (
    <section className="relative py-16 sm:py-24">
      <div className="container-custom">

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-[44ch] mb-10 sm:mb-14"
        >
          <p className="ms-eyebrow mb-4">{t('blog.badge')}</p>
          <h1 className="ms-title mb-5">{t('blog.title')}</h1>
          <p className="ms-lede">{t('blog.subtitle')}</p>
        </motion.div>

        <div className="border-t ms-rule">
          {articles.map((article, i) => (
            <motion.article
              key={article.link}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
              className="ms-rule border-b"
            >
              <Link
                href={article.link}
                className="group grid sm:grid-cols-[170px_1fr_auto] gap-4 sm:gap-7 items-center py-6 sm:py-7"
              >
                <div className="overflow-hidden rounded-sm">
                  <img
                    src={article.image}
                    alt=""
                    className="w-full h-[150px] sm:h-[104px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="min-w-0">
                  <h2 className="ms-title-sm text-[1.25rem] sm:text-[1.35rem] transition-colors group-hover:text-sage">
                    {article.title}
                  </h2>
                  <p className="ms-body-sm text-ink-3 mt-2 max-w-[62ch]">
                    {article.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3.5">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-sage rounded-full px-2.5 py-0.5 border"
                        style={{ borderColor: 'rgba(152,182,144,0.28)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-3">
                  <span className="ms-meta whitespace-nowrap">
                    {article.readTime} {t('blog.readTime')}
                  </span>
                  <ArrowUpRight
                    className="w-4 h-4 text-ink-3 transition-all duration-300 group-hover:text-sage group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
