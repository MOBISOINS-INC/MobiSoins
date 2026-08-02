'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

/* ─── Contact ──────────────────────────────────────────────────────────────
   Was a two-column layout whose left side was pinned to `max-w-[15rem]` from
   640px up. At that width a `text-4xl` title broke to two words per line, the
   photo squeezed to a letterbox, and the contact details dropped to 12px —
   the one thing on the page someone actually came to read. The form sat
   beside it inside a `glass-dark` panel, a device used nowhere else on the
   site any more.

   Now: a real 5/7 split. The details become hairline rows at full size, each
   one a proper link (tel:, mailto:, maps), and the form drops its glass frame
   for fields sitting directly on the ground. Same submit logic, same
   web3forms wiring — only the shell changed.
   ---------------------------------------------------------------------- */

const EASE = [0.16, 1, 0.3, 1] as const;

/* Field styling lives here rather than in a shared Input because the ui/Input
   component is built for the light theme and is used by the waitlist form. */
const FIELD =
  'w-full rounded-xl px-4 py-3 text-[0.9375rem] text-ink-1 placeholder:text-ink-3 outline-none transition-colors focus:border-[rgba(235,243,251,0.3)]';
const FIELD_STYLE = {
  background: 'rgba(235,243,251,0.035)',
  border: '1px solid var(--color-hairline)',
} as const;

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="ms-label">
        {label}
      </label>
      {children}
    </div>
  );
}

export const Contact = () => {
  const { t } = useLanguage();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError('');
    const form = e.currentTarget;
    const data = new FormData(form);

    const accessKey = process.env.NEXT_PUBLIC_FORM_ACCESS_KEY;
    if (!accessKey) {
      setError(t('contact.errorConfig'));
      setSending(false);
      return;
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `MobiSoins — ${data.get('subject') || 'Nouveau message'}`,
          from_name:
            `${data.get('firstname') ?? ''} ${data.get('lastname') ?? ''}`.trim() ||
            'MobiSoins Contact Form',
          first_name: data.get('firstname'),
          last_name: data.get('lastname'),
          email: data.get('email'),
          message: data.get('message'),
        }),
      });
      const result = await res.json();
      if (result.success) {
        setSent(true);
        form.reset();
      } else {
        setError(result.message || t('contact.errorGeneric'));
      }
    } catch {
      setError(t('contact.errorGeneric'));
    } finally {
      setSending(false);
    }
  };

  const details = [
    {
      labelKey: 'contact.address',
      value: '8457 Blvd Newman Bur 118, Lasalle, QC H8N 0A2',
      href: 'https://maps.google.com/?q=8457+Blvd+Newman+Bur+118,+Lasalle,+QC+H8N+0A2',
      external: true,
    },
    { labelKey: 'contact.phone', value: '(263) 588-6196', href: 'tel:+12635886196' },
    { labelKey: 'contact.email', value: 'info@mobisoins.com', href: 'mailto:info@mobisoins.com' },
    { labelKey: 'contact.web', value: 'mobisoins.com', href: 'https://mobisoins.com', external: true },
  ];

  return (
    <section id="contact" className="relative py-16 sm:py-24">
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* ── Details ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:col-span-5"
          >
            <h1 className="ms-title mb-5">{t('contact.title')}</h1>
            <p className="ms-lede mb-10">{t('contact.description')}</p>

            <p className="ms-label mb-4">{t('contact.detailsTitle')}</p>
            <div className="border-t ms-rule">
              {details.map(({ labelKey, value, href, external }) => (
                <div key={labelKey} className="ms-rule-soft border-b py-4 flex flex-col gap-1">
                  <span className="ms-meta">{t(labelKey)}</span>
                  <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="text-[0.9375rem] font-semibold text-ink-1 transition-colors hover:text-sage"
                  >
                    {value}
                  </a>
                </div>
              ))}
            </div>

            {/* Reuses faq.answer8's own wording — MobiSoins is not an
                emergency service, and the contact page is exactly where
                someone in trouble might land. */}
            <p className="ms-meta mt-6 max-w-[42ch]">{t('contact.emergencyNote')}</p>
          </motion.div>

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field id="firstname" label={t('contact.firstName')}>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder={t('contact.firstNamePlaceholder')}
                    required
                    className={FIELD}
                    style={FIELD_STYLE}
                  />
                </Field>
                <Field id="lastname" label={t('contact.lastName')}>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder={t('contact.lastNamePlaceholder')}
                    required
                    className={FIELD}
                    style={FIELD_STYLE}
                  />
                </Field>
              </div>

              <Field id="email" label={t('contact.emailLabel')}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t('contact.emailPlaceholder')}
                  required
                  className={FIELD}
                  style={FIELD_STYLE}
                />
              </Field>

              <Field id="subject" label={t('contact.subject')}>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder={t('contact.subjectPlaceholder')}
                  required
                  className={FIELD}
                  style={FIELD_STYLE}
                />
              </Field>

              <Field id="message" label={t('contact.message')}>
                <textarea
                  id="message"
                  name="message"
                  placeholder={t('contact.messagePlaceholder')}
                  required
                  rows={6}
                  className={`${FIELD} resize-y min-h-[140px] leading-relaxed`}
                  style={FIELD_STYLE}
                />
              </Field>

              <button
                type="submit"
                disabled={sending || sent}
                className="mt-1 inline-flex items-center justify-center rounded-full px-7 py-4 text-[0.9375rem] font-semibold transition-transform duration-300 ease-out hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 self-start"
                style={{
                  background: 'var(--color-ink-1)',
                  color: '#0a1f38',
                  boxShadow: '0 16px 38px rgba(0,0,0,0.34)',
                }}
              >
                {sent ? t('contact.sent') : sending ? t('contact.sending') : t('contact.send')}
              </button>

              {/* aria-live so the outcome is announced, not just shown —
                  the old version rendered these silently. */}
              <div aria-live="polite">
                {sent && (
                  <p className="text-sm font-medium text-sage">{t('contact.sentConfirm')}</p>
                )}
                {error && (
                  <p className="text-sm font-medium" style={{ color: '#f0a6a6' }}>
                    {error}
                  </p>
                )}
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
