'use client';

import Image from 'next/image';
import { useLanguage } from '../../contexts/LanguageContext';

const steps = [
  { time: '14:02', key: 'step1' },
  { time: '14:03', key: 'step2' },
  { time: '14:41', key: 'step3' },
  { time: '15:05', key: 'step4', last: true },
];

export default function VisitTimeline() {
  const { t } = useLanguage();

  return (
    <section id="visit" className="relative py-16 font-sans text-white md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-14">
        {/* Left: copy + timeline */}
        <div>
          <p className="text-[12.5px] font-semibold uppercase tracking-[.16em] text-royal-400">
            {t('visit.eyebrow')}
          </p>
          <h2 className="mt-4 font-sans text-4xl font-semibold tracking-[-0.03em] text-white md:text-[52px] md:leading-[1.02]">
            {t('visit.titleStart')}{' '}
            <em className="font-serif font-normal italic text-glow">{t('visit.titleItalic')}</em>
          </h2>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-mist">{t('visit.lede')}</p>

          <ol className="mt-9 border-l border-white/10">
            {steps.map((s) => (
              <li
                key={s.time}
                className={`relative grid grid-cols-[64px_1fr] gap-4 pl-7 ${s.last ? '' : 'pb-7'}`}
              >
                <i
                  className={`absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full border-2 bg-[#0a1f38] ${
                    s.last ? 'border-sage' : 'border-royal-400'
                  }`}
                />
                <time className="font-mono text-[14px] text-glow">{s.time}</time>
                <div>
                  <div className="font-semibold">{t(`visit.${s.key}Title`)}</div>
                  <div className="text-[15px] text-mist">{t(`visit.${s.key}Text`)}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Right: photo with border beam */}
        <div className="relative">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-royal/20 blur-3xl" />
          <div className="beam relative overflow-hidden rounded-3xl border border-white/10">
            <Image
              src="/nurses/nurse-08.jpeg"
              alt={t('visit.imageAlt')}
              width={1402}
              height={1122}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[5/4] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 to-transparent p-5">
              <div className="flex items-center justify-between text-[13px]">
                <span className="inline-flex items-center gap-2 font-medium">
                  <i className="h-1.5 w-1.5 rounded-full bg-sage" />
                  {t('visit.caption')}
                </span>
                <span className="font-mono text-mist">14:47 · Rosemont</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
