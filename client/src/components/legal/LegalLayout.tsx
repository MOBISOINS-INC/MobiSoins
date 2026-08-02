'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { useLanguage } from '../../contexts/LanguageContext';

/* ─── Legal layout ─────────────────────────────────────────────────────────
   Was a single `max-w-4xl` column with `prose prose-lg prose-invert` — classes
   that do nothing here, because @tailwindcss/typography is not installed. Each
   heading therefore carried its own inline utilities, and a reader had no way
   to jump to the clause they came for.

   Now: a sticky table of contents beside a proper reading measure, with the
   type handled by the `.legal-prose` block in globals.css.

   The contents list is derived from the rendered <h2>s after mount rather than
   passed in as a prop. That keeps the three legal documents as plain markup —
   add or reorder a section and the TOC follows automatically, with no second
   list to keep in sync.
   ---------------------------------------------------------------------- */

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

interface Heading {
  id: string;
  text: string;
}

/** Accent-insensitive slug, so "Collecte des Données" → "collecte-des-donnees". */
function slugify(text: string, index: number): string {
  const base = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')   // strip combining accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  // Numeric prefix guarantees uniqueness even if two sections share a title.
  return base ? `${index + 1}-${base}` : `section-${index + 1}`;
}

export const LegalLayout: React.FC<LegalLayoutProps> = ({ title, lastUpdated, children }) => {
  const { language } = useLanguage();
  const contentRef = useRef<HTMLDivElement>(null);
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    const found = Array.from(root.querySelectorAll('h2')).map((el, i) => {
      const text = el.textContent?.trim() ?? '';
      const id = slugify(text, i);
      el.id = id;
      return { id, text };
    });
    setHeadings(found);
  }, [children, language]);

  const c =
    language === 'FR'
      ? { updated: 'Dernière mise à jour', contents: 'Sommaire' }
      : { updated: 'Last updated', contents: 'Contents' };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-ground)' }}>
      <Header />
      <main className="flex-grow pt-28 pb-20">
        <div className="container-custom">

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 sm:mb-14"
          >
            <h1 className="ms-title mb-3">{title}</h1>
            <p className="ms-meta">
              {c.updated} : {lastUpdated}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            {/* Contents. Rendered only once headings are found, so it never
                flashes as an empty box on first paint. */}
            {headings.length > 0 && (
              <nav aria-label={c.contents} className="lg:col-span-4 lg:sticky lg:top-32">
                <p className="ms-label mb-3">{c.contents}</p>
                <div className="border-t ms-rule">
                  {headings.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className="ms-rule-soft border-b block py-2.5 text-sm text-ink-2 transition-colors hover:text-sage"
                    >
                      {h.text}
                    </a>
                  ))}
                </div>
              </nav>
            )}

            <div
              ref={contentRef}
              className={`legal-prose max-w-[68ch] ${
                headings.length > 0 ? 'lg:col-span-8' : 'lg:col-span-12'
              }`}
            >
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
