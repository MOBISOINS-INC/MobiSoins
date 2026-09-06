'use client';

import { ArrowRight } from 'lucide-react';
import { LocationMap, useIsLarge } from '@/components/ui/expanded-map';
import { useLanguage } from '../../contexts/LanguageContext';

// Launch city. Coordinates are Montréal city centre; zoom 13 shows the downtown street grid.
const MONTREAL = { latitude: 45.5019, longitude: -73.5674, zoom: 13 };

export default function LocationSpot() {
  const { t } = useLanguage();
  // Open on desktop where it is the section's visual; collapsed on phones so tiles only load on tap.
  const isLarge = useIsLarge();

  const rows = [
    { label: t('location.row1Label'), value: t('location.row1Value') },
    { label: t('location.row2Label'), value: t('location.row2Value') },
  ];

  return (
    <section id="location" className="relative py-16 font-sans text-white md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-12 lg:gap-10">
        {/* Left: coverage copy */}
        <div className="lg:col-span-6">
          <p className="text-[12.5px] font-semibold uppercase tracking-[.16em] text-sage">{t('location.eyebrow')}</p>
          <h2 className="mt-4 font-sans text-4xl font-semibold tracking-[-0.03em] text-white md:text-[52px] md:leading-[1.02]">
            {t('location.titleStart')}{' '}
            <em className="font-serif font-normal italic text-glow">{t('location.titleItalic')}</em>
          </h2>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-mist">{t('location.lede')}</p>

          <dl className="mt-9 max-w-lg border-b border-white/10">
            {rows.map((row) => (
              <div key={row.label} className="grid gap-1.5 border-t border-white/10 py-4 sm:grid-cols-[132px_1fr] sm:gap-6">
                <dt className="pt-0.5 font-mono text-[11px] uppercase tracking-[.14em] text-mist-dim">{row.label}</dt>
                <dd className="font-medium">{row.value}</dd>
              </div>
            ))}
          </dl>

          <a
            href="#waitlist"
            className="mt-6 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-sage transition-colors hover:text-sage-300"
          >
            {t('location.cta')}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>

        {/* Right: the interactive map card (tap or click to collapse or expand) */}
        <div className="flex flex-col items-center gap-3 lg:col-span-6">
          <LocationMap
            location={t('location.name')}
            latitude={MONTREAL.latitude}
            longitude={MONTREAL.longitude}
            zoom={MONTREAL.zoom}
            tileProvider="esri-dark"
            defaultExpanded={isLarge}
            className="w-full max-w-[320px] lg:w-auto lg:max-w-none"
          />
          <p className="text-center font-mono text-[12px] text-mist-dim">{t('location.caption')}</p>
        </div>
      </div>
    </section>
  );
}
