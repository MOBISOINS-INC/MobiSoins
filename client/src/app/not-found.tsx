'use client';

import Link from 'next/link';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { useLanguage } from '../contexts/LanguageContext';

/* ─── 404 ──────────────────────────────────────────────────────────────────
   Was rendered on `bg-background-white` with `text-navy-900` — a light-theme
   page on a site that is navy throughout, and with no header or footer, so a
   visitor who hit it lost the navigation entirely. Its only exit was the home
   page.

   Now on the dark ground with the normal chrome, and offering the three
   destinations someone actually mistypes their way toward.
   ---------------------------------------------------------------------- */

export default function NotFound() {
  const { language } = useLanguage();

  const c =
    language === 'FR'
      ? {
          title: 'Cette page n’existe pas',
          lede: 'Le lien est peut-être périmé ou l’adresse mal saisie. Voici où aller.',
          services: 'Voir nos services',
          contact: 'Nous joindre',
          home: 'Accueil',
        }
      : {
          title: 'This page doesn’t exist',
          lede: 'The link may be out of date, or the address mistyped. Here’s where to go.',
          services: 'View our services',
          contact: 'Contact us',
          home: 'Home',
        };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-ground)' }}>
      <Header />
      <main className="flex-grow pt-28 pb-24 flex items-center">
        <div className="container-custom">
          <div className="max-w-[46ch] mx-auto text-center flex flex-col items-center gap-5">
            <p className="ms-stat" style={{ fontSize: 'clamp(3.5rem, 10vw, 6rem)' }}>
              404
            </p>
            <h1 className="ms-title-sm">{c.title}</h1>
            <p className="ms-lede mx-auto">{c.lede}</p>

            <div className="flex flex-wrap gap-3 justify-center mt-3">
              <Link
                href="/services"
                className="inline-flex items-center rounded-full px-7 py-4 text-[0.9375rem] font-semibold transition-transform duration-300 ease-out hover:-translate-y-0.5"
                style={{
                  background: 'var(--color-ink-1)',
                  color: '#0a1f38',
                  boxShadow: '0 16px 38px rgba(0,0,0,0.34)',
                }}
              >
                {c.services}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full px-7 py-4 text-[0.9375rem] font-semibold text-ink-1 border ms-rule transition-colors duration-300 hover:border-[rgba(235,243,251,0.3)]"
              >
                {c.contact}
              </Link>
              <Link
                href="/"
                className="inline-flex items-center rounded-full px-7 py-4 text-[0.9375rem] font-semibold text-ink-1 border ms-rule transition-colors duration-300 hover:border-[rgba(235,243,251,0.3)]"
              >
                {c.home}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
