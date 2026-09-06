'use client';

import Image from 'next/image';
import { useLanguage } from '../../contexts/LanguageContext';

// Dispatch lifecycle shown in the photo caption: the nurse is currently "en route".
const ACTIVE_STEP = 2;

export function NursingMapSection() {
  const { t } = useLanguage();

  const specs = [
    { label: t('map.label1'), value: t('map.bullet1'), text: t('map.bullet1Sub') },
    { label: t('map.label2'), value: t('map.bullet2'), text: t('map.bullet2Sub') },
    { label: t('map.label3'), value: t('map.bullet3'), text: t('map.bullet3Sub') },
  ];
  const steps = [t('map.stepBooked'), t('map.stepMatched'), t('map.stepEnRoute'), t('map.stepArrived')];

  return (
    <section id="platform" className="relative py-16 font-sans text-white md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-12 lg:gap-10">
        {/* Left: copy + spec list */}
        <div className="lg:col-span-5">
          <p className="text-[12.5px] font-semibold uppercase tracking-[.16em] text-sage">{t('map.badge')}</p>
          <h2 className="mt-4 font-sans text-4xl font-semibold tracking-[-0.03em] text-white md:text-[52px] md:leading-[1.02]">
            {t('map.titleStart')}{' '}
            <em className="font-serif font-normal italic text-glow">{t('map.titleItalic')}</em>
          </h2>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-mist">{t('map.description')}</p>

          <dl className="mt-9 border-b border-white/10">
            {specs.map((s) => (
              <div
                key={s.label}
                className="grid gap-1.5 border-t border-white/10 py-5 sm:grid-cols-[112px_1fr] sm:gap-6"
              >
                <dt className="pt-1 font-mono text-[11px] uppercase tracking-[.14em] text-mist-dim">{s.label}</dt>
                <dd>
                  <p className="font-semibold">{s.value}</p>
                  <p className="mt-1 text-[15px] text-mist">{s.text}</p>
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 inline-flex items-center gap-2 text-[13px] text-mist">
            <i className="h-1.5 w-1.5 rounded-full bg-sage" />
            {t('map.footnote')}
          </p>
        </div>

        {/* Right: the nurse en route */}
        <div className="relative lg:col-span-6 lg:col-start-7">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-sage/15 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10">
            <Image
              src="/nurses/nurse-05.jpeg"
              alt={t('map.imageAlt')}
              width={1536}
              height={1024}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[16/10] w-full object-cover object-[60%_50%] lg:aspect-[4/5]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 to-transparent p-5">
              <div className="flex items-center justify-between text-[13px]">
                <span className="inline-flex items-center gap-2 font-medium">
                  <i className="h-1.5 w-1.5 rounded-full bg-sage" />
                  {t('map.stepEnRoute')}
                </span>
                <span className="font-mono text-mist">{t('map.eta')}</span>
              </div>
              <div className="mt-3 h-0.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-2/3 rounded-full bg-sage" />
              </div>
              <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[.12em]">
                {steps.map((label, i) => (
                  <span key={label} className={i === ACTIVE_STEP ? 'text-white' : 'text-mist-dim'}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
