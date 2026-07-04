'use client';

import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { BrandLogo } from '../ui/BrandLogo';
/* ─── Inline SVG social icons ────────────────────────────────── */

const SvgFacebook = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const SvgInstagram = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const SvgTiktok = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.3 1.6 1.2 2.9 2.6 3.7.7.4 1.5.7 2.4.8v3.1a8.6 8.6 0 0 1-4.5-1.4v6.1a6.1 6.1 0 1 1-6.1-6.1c.3 0 .7 0 1 .1v3.2a2.9 2.9 0 1 0 2 2.8V3h2.6z"/></svg>
);

/* ─── Link data ───────────────────────────────────────────────── */

const footerSections = [
  {
    label: 'Produit',
    links: [
      { title: 'Services', href: '/services' },
      { title: 'Tarification', href: '#pricing' },
      { title: 'Comment ça marche', href: '#how-it-works' },
    ],
  },
  {
    label: 'Entreprise',
    links: [
      { title: 'À propos', href: '/apropos' },
      { title: 'Articles', href: '/articles' },
      { title: 'FAQ', href: '/faq' },
    ],
  },
  {
    label: 'Légal',
    links: [
      { title: 'Confidentialité', href: '/confidentialite' },
      { title: 'Conditions', href: '/conditions' },
      { title: 'Cookies', href: '/cookies' },
      { title: 'Sécurité', href: '#' },
    ],
  },
  {
    label: 'Réseaux sociaux',
    links: [
      { title: 'Instagram', href: 'https://www.instagram.com/mobisoins/', icon: SvgInstagram },
      { title: 'Facebook', href: 'https://www.facebook.com/p/MobiSoins-Inc-61562813077289/', icon: SvgFacebook },
      { title: 'TikTok', href: 'https://www.tiktok.com/@mobisoins', icon: SvgTiktok },
    ],
  },
];

/* ─── Animated container ─────────────────────────────────────── */

type AnimatedContainerProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return <>{children}</>;

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */

export const Footer = () => {
  return (
    <footer
      className="relative w-full"
      style={{ background: '#04142a', borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >

      <div className="container-custom py-16 lg:py-20">
        <div className="grid w-full gap-10 xl:grid-cols-3 xl:gap-12">

          {/* Brand column */}
          <AnimatedContainer className="flex flex-col gap-5">
            <Link href="/">
              <BrandLogo className="h-14 opacity-95" />
            </Link>
            <p className="text-sm font-light leading-relaxed max-w-xs text-white/55">
              Une plateforme IA de soins infirmiers à domicile au Québec. Connecte des infirmières OIIQ certifiées avec des patients en quelques minutes.
            </p>
            <p className="text-xs font-light text-white/40">
              © {new Date().getFullYear()} MobiSoins Inc. Tous droits réservés.
            </p>
          </AnimatedContainer>

          {/* Link columns */}
          <div className="xl:col-span-2 grid grid-cols-2 gap-8 md:grid-cols-4">
            {footerSections.map((section, i) => (
              <AnimatedContainer key={section.label} delay={0.1 + i * 0.08}>
                <div>
                  <h3
                    className="text-xs font-semibold uppercase tracking-widest mb-4 text-white"
                  >
                    {section.label}
                  </h3>
                  <ul className="space-y-2.5">
                    {section.links.map((link) => (
                      <li key={link.title}>
                        <a
                          href={link.href}
                          target={link.href.startsWith('http') ? '_blank' : undefined}
                          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="inline-flex items-center gap-1.5 text-sm font-light transition-colors duration-200"
                          style={{ color: 'rgba(255,255,255,0.55)' }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                        >
                          {'icon' in link && link.icon && (
                            <link.icon className="w-3.5 h-3.5 shrink-0" />
                          )}
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContainer>
            ))}
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <p className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Fait avec soin au Québec 🍁
          </p>
          <div className="flex items-center gap-1">
            {[
              { label: 'Confidentialité', href: '/confidentialite' },
              { label: 'Conditions', href: '/conditions' },
              { label: 'Cookies', href: '/cookies' },
            ].map((item, i) => (
              <span key={item.label} className="flex items-center">
                {i > 0 && <span className="mx-2 text-white/20">·</span>}
                <Link
                  href={item.href}
                  className="text-xs font-light transition-colors"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
