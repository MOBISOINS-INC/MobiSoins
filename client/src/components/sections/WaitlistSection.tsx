'use client';

import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const cities = ['Montréal', 'Québec', 'Laval', 'Gatineau', 'Longueuil', 'Sherbrooke'];
const roles = [
  { value: 'Patient', key: 'rolePatient' },
  { value: 'Nurse', key: 'roleNurse' },
  { value: 'Employer', key: 'roleEmployer' },
];

const field =
  'h-12 w-full rounded-xl border border-white/10 bg-navy-900 px-4 text-[15px] font-normal normal-case tracking-normal text-white placeholder:text-mist-dim/70 outline-none focus:border-royal-400';
const label = 'grid gap-1.5 text-[12px] font-semibold uppercase tracking-wider text-mist-dim';

type Status = 'idle' | 'submitting' | 'done' | 'error';

export default function WaitlistSection() {
  const { t, language } = useLanguage();
  const [status, setStatus] = useState<Status>('idle');
  const done = status === 'done';

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting' || done) return;

    const data = new FormData(e.currentTarget);
    setStatus('submitting');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: String(data.get('firstName') ?? '').trim(),
          email: String(data.get('email') ?? '').trim(),
          city: String(data.get('city') ?? ''),
          role: String(data.get('role') ?? ''),
          language: language === 'FR' ? 'Français' : 'English',
          consent: true,
        }),
      });
      // 409 means this email is already on the list, which is the same outcome for the visitor.
      setStatus(res.ok || res.status === 409 ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="waitlist" className="px-6 pb-16 font-sans text-white md:pb-32">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-navy-900">
        {/* Aurora background */}
        <div className="aurora left-[-10%] top-[-30%] h-[420px] w-[520px] bg-royal/50" />
        <div className="aurora right-[-5%] bottom-[-40%] h-[380px] w-[480px] bg-sage/30 [animation-delay:-8s]" />
        <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_50%,#000,transparent)]" />

        <div className="relative grid gap-12 p-8 md:p-14 lg:grid-cols-12 lg:items-center">
          {/* Left: copy */}
          <div className="lg:col-span-6">
            <p className="text-[12.5px] font-semibold uppercase tracking-[.16em] text-sage">{t('waitlist.eyebrow')}</p>
            <h2 className="mt-4 font-sans text-4xl font-semibold tracking-[-0.03em] text-white md:text-[52px] md:leading-[1.02]">
              {t('waitlist.titleStart')}{' '}
              <em className="font-serif font-normal italic text-glow">{t('waitlist.titleItalic')}</em>
            </h2>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-mist">{t('waitlist.lede')}</p>
            <div className="mt-8 flex -space-x-2">
              {[
                ['JB', 'bg-royal-600'],
                ['AK', 'bg-navy-700'],
                ['MT', 'bg-sage-600'],
                ['+', 'bg-royal-400'],
              ].map(([initials, bg]) => (
                <span
                  key={initials}
                  className={`grid h-9 w-9 place-items-center rounded-full border-2 border-navy-900 text-[12px] font-semibold ${bg}`}
                >
                  {initials}
                </span>
              ))}
              <span className="self-center pl-4 text-[14px] text-mist">{t('waitlist.social')}</span>
            </div>
          </div>

          {/* Right: form with border beam */}
          <form
            onSubmit={onSubmit}
            className="beam rounded-3xl border border-white/10 bg-navy-950/70 p-6 backdrop-blur-xl lg:col-span-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={label}>
                {t('waitlist.firstName')}
                <input
                  type="text"
                  name="firstName"
                  required
                  placeholder={t('waitlist.firstNamePlaceholder')}
                  autoComplete="given-name"
                  className={field}
                />
              </label>
              <label className={label}>
                {t('waitlist.city')}
                <select name="city" className={field}>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c === 'Québec' && language === 'EN' ? 'Quebec City' : c}
                    </option>
                  ))}
                  <option value="Other">{t('waitlist.otherCity')}</option>
                </select>
              </label>
            </div>
            <label className={`mt-4 ${label}`}>
              {t('waitlist.email')}
              <input
                type="email"
                name="email"
                required
                placeholder={t('waitlist.emailPlaceholder')}
                autoComplete="email"
                className={field}
              />
            </label>
            <label className={`mt-4 ${label}`}>
              {t('waitlist.role')}
              <select name="role" className={field}>
                {roles.map((r) => (
                  <option key={r.value} value={r.value}>
                    {t(`waitlist.${r.key}`)}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              disabled={done || status === 'submitting'}
              className={`mt-5 h-12 w-full cursor-pointer rounded-xl text-[15px] font-semibold disabled:cursor-default ${
                done ? 'bg-sage-600' : 'shimmer'
              }`}
            >
              {done ? t('waitlist.done') : t('waitlist.submit')}
            </button>
            <p
              aria-live="polite"
              className={`mt-3 text-center text-[12.5px] ${status === 'error' ? 'text-red-400' : 'text-mist-dim'}`}
            >
              {status === 'error' ? t('waitlist.error') : t('waitlist.note')}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
