'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { BrandLogo } from '../ui/BrandLogo';

export const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [articlesOpen, setArticlesOpen] = useState(false);
  const lastScrollY = useRef(0);
  const articlesRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  const articles = [
    {
      img: '/images/articles/telesante.jpg',
      tag: t('blog.article1Tag1'),
      title: t('blog.article1Title'),
      href: '/articles/telesante',
      fallback: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=200&q=70',
    },
    {
      img: '/images/articles/premiere-visite.jpg',
      tag: t('blog.article2Tag1'),
      title: t('blog.article2Title'),
      href: '/articles/premiere-visite',
      fallback: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=200&q=70',
    },
    {
      img: '/images/articles/soins-aines.jpg',
      tag: t('blog.article3Tag1'),
      title: t('blog.article3Title'),
      href: '/articles/soins-aines',
      fallback: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=200&q=70',
    },
  ];

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      // Stay transparent for the whole hero; only become the frosted bar once
      // we've scrolled past it (prevents the bar flashing during hero scroll).
      setScrolled(current > window.innerHeight - 120);
      if (current > lastScrollY.current && current > 80) {
        setHidden(true);
        setIsMobileOpen(false);
        setArticlesOpen(false);
      } else if (current < 60) {
        setHidden(false);
      }
      lastScrollY.current = current;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (articlesRef.current && !articlesRef.current.contains(e.target as Node)) {
        setArticlesOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navLinks = [
    { name: t('header.home'), href: '/' },
    { name: t('header.about'), href: '/apropos' },
    { name: t('header.services'), href: '/services' },
    { name: t('header.faq'), href: '/faq' },
    { name: t('header.contact'), href: '/contact' },
    {
      name: t('header.recruitment'),
      href: 'https://docs.google.com/forms/d/e/1FAIpQLSfFqlaoCKqzrrPMvfQ8E50Jims2JdRN3fpEuq-5q35Ngd-Qsw/viewform',
      external: true,
    },
  ];

  // Over the hero (top of page) the header is transparent with light text;
  // once scrolled into content it becomes a frosted dark navy bar (matching the
  // dark page theme) with light text.
  const overHero = !scrolled;
  const navColor = overHero ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.72)';
  const navHoverColor = '#ffffff';
  const navHoverBg = overHero ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.1)';

  return (
    <motion.header
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      className="fixed top-0 left-0 w-full z-50"
      style={{
        background: overHero
          ? 'linear-gradient(to bottom, rgba(3,18,38,0.55) 0%, rgba(3,18,38,0.28) 55%, rgba(3,18,38,0) 100%)'
          : 'linear-gradient(to bottom, rgba(6,20,40,0.92) 64%, rgba(6,20,40,0.7) 82%, rgba(6,20,40,0))',
        backdropFilter: overHero ? 'none' : 'blur(16px)',
        WebkitBackdropFilter: overHero ? 'none' : 'blur(16px)',
        transition: 'background 0.3s ease',
      }}
    >
      <div className="container-custom">
        <div className="flex h-24 items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <BrandLogo className="h-16 hover:opacity-90 transition-opacity duration-200" glow={overHero} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="px-3.5 py-2 text-[13px] font-medium rounded-lg transition-colors whitespace-nowrap"
                style={{ color: navColor }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = navHoverColor;
                  (e.currentTarget as HTMLElement).style.background = navHoverBg;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = navColor;
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                {link.name}
              </a>
            ))}

            {/* Articles dropdown trigger */}
            <div ref={articlesRef} className="relative">
              <button
                onClick={() => setArticlesOpen((v) => !v)}
                className="flex items-center gap-1 px-3.5 py-2 text-[13px] font-medium rounded-lg transition-colors whitespace-nowrap"
                style={{ color: articlesOpen ? navHoverColor : navColor, background: articlesOpen ? navHoverBg : 'transparent' }}
              >
                Articles
                <svg
                  width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                  className="transition-transform duration-200"
                  style={{ transform: articlesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <AnimatePresence>
                {articlesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[380px] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border backdrop-blur-xl"
                    style={{ background: 'rgba(10,25,48,0.97)', borderColor: 'rgba(255,255,255,0.1)' }}
                  >
                    <div className="p-2">
                      <p className="text-[10px] font-semibold uppercase tracking-widest px-3 py-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
                        {t('blog.title')}
                      </p>
                      {articles.map((a, i) => (
                        <Link
                          key={i}
                          href={a.href}
                          onClick={() => setArticlesOpen(false)}
                          className="group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-white/5"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                            <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = a.fallback; }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#98B690' }}>{a.tag}</span>
                            <p className="text-xs font-medium leading-snug line-clamp-2 mt-0.5" style={{ color: '#ffffff' }}>{a.title}</p>
                          </div>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 opacity-0 group-hover:opacity-60 transition-opacity" style={{ color: '#ffffff' }}>
                            <path d="M7 17L17 7M17 7H7M17 7v10" />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Lang switcher */}
            <div
              className="hidden md:flex items-center gap-0.5 rounded-lg p-0.5"
              style={{ background: overHero ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.12)' }}
            >
              {(['FR', 'EN'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className="px-3 py-1.5 rounded-md text-xs font-medium transition-all"
                  style={
                    language === lang
                      ? { background: '#fff', color: '#1a1a24', boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }
                      : { color: navColor }
                  }
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="hidden md:inline-flex items-center justify-center px-5 py-2 text-[13px] font-semibold rounded-lg transition-all"
              style={{ background: '#ffffff', color: '#0a1f38' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.88')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
            >
              {t('header.downloadApp')}
            </button>

            {/* Mobile toggle */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors"
              style={{ color: '#ffffff' }}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Menu"
            >
              {isMobileOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(6,20,40,0.98)', borderTop: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
          >
            <div className="container-custom py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="px-4 py-3 text-sm font-medium rounded-xl transition-colors"
                  style={{ color: '#ffffff' }}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.name}
                </a>
              ))}

              {/* Articles in mobile menu */}
              <div className="px-4 pt-2 pb-1">
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>Articles</p>
                <div className="flex flex-col gap-1">
                  {articles.map((a, i) => (
                    <Link
                      key={i}
                      href={a.href}
                      className="flex items-center gap-2.5 py-2"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0">
                        <img src={a.img} alt={a.title} className="w-full h-full object-cover" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = a.fallback; }} />
                      </div>
                      <p className="text-xs font-medium line-clamp-1" style={{ color: '#ffffff' }}>{a.title}</p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="h-px mx-2 my-2" style={{ background: 'rgba(255,255,255,0.08)' }} />
              <div className="flex items-center gap-2 px-4">
                {(['FR', 'EN'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); setIsMobileOpen(false); }}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    style={language === lang ? { background: '#ffffff', color: '#0a1f38' } : { color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.08)' }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <button
                onClick={() => { setIsMobileOpen(false); document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="mt-2 mx-2 py-3 text-sm font-semibold rounded-xl"
                style={{ background: '#ffffff', color: '#0a1f38' }}
              >
                {t('header.downloadApp')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
