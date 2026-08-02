'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { useLanguage } from '../../contexts/LanguageContext';

/* ─── Article ──────────────────────────────────────────────────────────────
   Shared by all three article routes, so restyling here covers every one.

   Was: body text at `max-w-3xl` (~90 characters per line at desktop) in Inter,
   a hero image with the title burned over the bottom of it, and the
   conclusion boxed in a translucent panel.

   Now: a real reading column. The measure is capped in `ch` rather than `rem`
   so it tracks the font rather than the viewport, the title and section heads
   move to the display serif, and body copy steps up to 17px/1.75 — this is
   the only page on the site whose job is to be read for five minutes.

   The conclusion keeps its emphasis but as a sage rule rather than a box, and
   the back link now points at /articles rather than the home page, which is
   where someone finishing an article actually wants to go next.
   ---------------------------------------------------------------------- */

export interface ArticleSection {
  title: string;
  content: string[];
  list?: string[];
}

export interface ArticleSource {
  label: string;
  url: string;
}

export interface ArticleData {
  slug: string;
  tag: string;
  date: string;
  title: string;
  subtitle: string;
  readTime: string;
  image: string;
  fallbackImage?: string;
  sections: ArticleSection[];
  sources?: ArticleSource[];
  conclusion: {
    title: string;
    content: string[];
  };
}

interface ArticleLayoutProps {
  article: {
    FR: ArticleData;
    EN: ArticleData;
  };
}

const EASE = [0.16, 1, 0.3, 1] as const;

export const ArticleLayout: React.FC<ArticleLayoutProps> = ({ article }) => {
  const { language } = useLanguage();
  const data = article[language];

  const c =
    language === 'FR'
      ? {
          sources: 'Sources',
          back: 'Tous les articles',
          rights: 'Tous droits réservés.',
          protected:
            'Ce contenu est protégé. Toute reproduction, distribution ou utilisation sans autorisation est interdite.',
        }
      : {
          sources: 'Sources',
          back: 'All articles',
          rights: 'All rights reserved.',
          protected:
            'This content is protected. Any reproduction, distribution, or use without permission is prohibited.',
        };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-ground)' }}>
      <Header />
      <main className="flex-grow pt-28">

        {/* Title block — set on the ground rather than over the photograph.
            Burning a headline into an image costs contrast and forces a heavy
            scrim; here the type is crisp and the image gets to be an image. */}
        <div className="container-custom">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="max-w-[62ch] mx-auto"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-6">
              <span
                className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-sage rounded-full px-2.5 py-0.5 border"
                style={{ borderColor: 'rgba(152,182,144,0.28)' }}
              >
                {data.tag}
              </span>
              <span className="ms-meta">{data.date}</span>
              <span className="ms-meta">·</span>
              <span className="ms-meta">{data.readTime}</span>
            </div>

            <h1 className="ms-title mb-6">{data.title}</h1>
            <p className="text-[1.15rem] leading-[1.6] text-ink-1 font-light">
              {data.subtitle}
            </p>
          </motion.header>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="container-custom mt-10 sm:mt-14"
        >
          <div className="max-w-[76ch] mx-auto overflow-hidden rounded-sm">
            <img
              src={data.image}
              alt=""
              className="w-full object-cover"
              style={{ height: 'clamp(220px, 34vw, 420px)' }}
              onError={(e) => {
                if (data.fallbackImage) (e.target as HTMLImageElement).src = data.fallbackImage;
              }}
            />
          </div>
        </motion.div>

        <article className="container-custom py-12 sm:py-16">
          <div className="max-w-[62ch] mx-auto">

            {data.sections.map((section) => (
              <section key={section.title} className="mt-10 first:mt-0">
                <h2 className="ms-title-sm text-[1.45rem] mb-4">{section.title}</h2>
                {section.content.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[1.0625rem] leading-[1.75] text-ink-2 font-light mt-4 first:mt-0"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {section.list.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-[0.7em] w-1 h-1 rounded-full bg-sage shrink-0" />
                        <span className="text-[1.0625rem] leading-[1.75] text-ink-2 font-light">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* Conclusion — emphasised with a sage rule rather than a panel. */}
            <section
              className="mt-12 border-l-2 pl-6 sm:pl-7"
              style={{ borderColor: 'var(--color-sage)' }}
            >
              <h2 className="ms-title-sm text-[1.3rem] mb-3">{data.conclusion.title}</h2>
              {data.conclusion.content.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[1.0625rem] leading-[1.7] text-ink-2 font-light mt-3 first:mt-0"
                >
                  {paragraph}
                </p>
              ))}
            </section>

            {data.sources && data.sources.length > 0 && (
              <section className="mt-12">
                <h2 className="ms-label mb-4">{c.sources}</h2>
                <ul className="border-t ms-rule">
                  {data.sources.map((source) => (
                    <li key={source.url} className="ms-rule-soft border-b py-3">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ms-body-sm text-sage hover:text-ink-1 transition-colors underline underline-offset-4 decoration-[rgba(152,182,144,0.4)]"
                      >
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="border-t ms-rule pt-7 mt-12 flex flex-col gap-2">
              <p className="ms-meta">© 2026 MobiSoins — {c.rights}</p>
              <p className="ms-meta max-w-[62ch]">{c.protected}</p>
            </div>

            <Link
              href="/articles"
              className="group inline-flex items-center gap-2 mt-8 text-sm font-semibold text-sage transition-colors hover:text-ink-1"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              {c.back}
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};
