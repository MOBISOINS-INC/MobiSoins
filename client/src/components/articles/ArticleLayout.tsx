'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { useLanguage } from '../../contexts/LanguageContext';

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

export const ArticleLayout: React.FC<ArticleLayoutProps> = ({ article }) => {
  const { language, t } = useLanguage();
  const data = article[language];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a1f38' }}>
      <Header />
      <main className="flex-grow pt-20">
        {/* Hero image */}
        <div className="relative w-full" style={{ height: 'clamp(280px, 45vw, 520px)' }}>
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover"
            onError={(e) => { if (data.fallbackImage) (e.target as HTMLImageElement).src = data.fallbackImage; }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                style={{ background: 'rgba(78,102,69,0.9)', color: '#fff' }}
              >
                {data.tag}
              </span>
              <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {data.date}
              </span>
              <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
                &middot; {data.readTime}
              </span>
            </div>
            <h1
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              {data.title}
            </h1>
          </div>
        </div>

        {/* Article body */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto px-6 md:px-8 py-12 md:py-16"
        >
          {/* Subtitle / lede */}
          <p
            className="text-lg md:text-xl font-medium leading-relaxed mb-10"
            style={{ color: '#ffffff', letterSpacing: '-0.01em' }}
          >
            {data.subtitle}
          </p>

          {/* Sections */}
          {data.sections.map((section, i) => (
            <section key={i} className="mb-10">
              <h2
                className="text-xl md:text-2xl font-semibold mb-4 tracking-tight"
                style={{ color: '#ffffff', letterSpacing: '-0.02em' }}
              >
                {section.title}
              </h2>
              {section.content.map((paragraph, j) => (
                <p
                  key={j}
                  className="text-base leading-relaxed mb-4"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  {paragraph}
                </p>
              ))}
              {section.list && (
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  {section.list.map((item, k) => (
                    <li key={k} className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Sources */}
          {data.sources && data.sources.length > 0 && (
            <section className="mb-10">
              <h2
                className="text-lg font-semibold mb-4 tracking-tight"
                style={{ color: '#ffffff', letterSpacing: '-0.02em' }}
              >
                {language === 'FR' ? 'Sources' : 'Sources'}
              </h2>
              <ul className="space-y-2">
                {data.sources.map((source, i) => (
                  <li key={i}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline underline-offset-2 break-all transition-colors duration-200"
                      style={{ color: '#98B690' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#ffffff'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#98B690'; }}
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Conclusion */}
          <section className="mb-10 p-6 md:p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h2
              className="text-xl md:text-2xl font-semibold mb-4 tracking-tight"
              style={{ color: '#ffffff', letterSpacing: '-0.02em' }}
            >
              {data.conclusion.title}
            </h2>
            {data.conclusion.content.map((paragraph, j) => (
              <p
                key={j}
                className="text-base leading-relaxed mb-3 last:mb-0"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                {paragraph}
              </p>
            ))}
          </section>

          {/* Footer / copyright */}
          <div className="border-t pt-8 mt-12" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
              &copy; 2026 MobiSoins &mdash; {language === 'FR' ? 'Tous droits r\u00e9serv\u00e9s.' : 'All rights reserved.'}
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {language === 'FR'
                ? 'Ce contenu est prot\u00e9g\u00e9. Toute reproduction, distribution ou utilisation sans autorisation est interdite.'
                : 'This content is protected. Any reproduction, distribution, or use without permission is prohibited.'}
            </p>
          </div>

          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-8 text-sm font-medium transition-colors duration-200"
            style={{ color: '#98B690' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {language === 'FR' ? 'Retour \u00e0 l\u2019accueil' : 'Back to home'}
          </Link>
        </motion.article>
      </main>
      <Footer />
    </div>
  );
};
