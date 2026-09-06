'use client';

import Image from 'next/image';
import { useLanguage } from '../../contexts/LanguageContext';

const POINTS = [1, 2, 3, 4] as const;

export function PatientsSection() {
  const { t } = useLanguage();

  return (
    <section id="patients" className="relative py-16 font-sans text-white md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-[12.5px] font-semibold uppercase tracking-[.16em] text-sage">{t('patients.badge')}</p>
          <h2 className="mt-4 font-sans text-4xl font-semibold tracking-[-0.03em] text-white md:text-[52px] md:leading-[1.02]">
            {t('patients.titleStart')}{' '}
            <em className="font-serif font-normal italic text-glow">{t('patients.titleItalic')}</em>
          </h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-mist">{t('patients.subtitle')}</p>
        </div>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:items-start lg:gap-10">
          {/* Points */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <ol className="border-y border-white/10">
              {POINTS.map((n) => (
                <li
                  key={n}
                  className="grid grid-cols-[48px_1fr] gap-4 border-t border-white/10 py-5 first:border-t-0"
                >
                  <span className="pt-0.5 font-mono text-[14px] text-glow">{String(n).padStart(2, '0')}</span>
                  <div>
                    <p className="font-semibold">{t(`patients.point${n}Title`)}</p>
                    <p className="mt-1 text-[15px] text-mist">{t(`patients.point${n}Desc`)}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-[15px] leading-relaxed text-mist">{t('patients.description')}</p>
          </div>

          {/* Photos: an editorial staggered pair */}
          <div className="relative order-1 sm:pb-[26%] lg:order-2 lg:col-span-7">
            <figure className="sm:w-[74%]">
              <div className="overflow-hidden rounded-3xl border border-white/10">
                <Image
                  src="/nurses/care-1.png"
                  alt={t('patients.imageAlt1')}
                  width={1672}
                  height={941}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="aspect-[3/2] w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 font-mono text-[12px] text-mist-dim">{t('patients.caption1')}</figcaption>
            </figure>

            <figure className="hidden sm:absolute sm:right-0 sm:bottom-0 sm:block sm:w-[38%]">
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src="/nurses/nurse-blonde-kid.jpeg"
                  alt={t('patients.imageAlt2')}
                  width={506}
                  height={458}
                  sizes="(min-width: 1024px) 22vw, 40vw"
                  className="aspect-square w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 font-mono text-[12px] text-mist-dim">{t('patients.caption2')}</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
