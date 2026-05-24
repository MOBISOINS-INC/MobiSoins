'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useLanguage } from '../../contexts/LanguageContext';

const RawInput = ({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`flex h-10 w-full rounded-xl border border-black/12/80 bg-white/60 backdrop-blur-sm px-4 py-2 text-sm text-slate-800 placeholder:text-slate-400 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:border-slate-300 focus-visible:bg-white/80 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

export const Contact = () => {
  const { t } = useLanguage();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_FORM_ACCESS_KEY,
          first_name: data.get('firstname'),
          last_name: data.get('lastname'),
          email: data.get('email'),
          subject: data.get('subject'),
          message: data.get('message'),
          from_name: 'MobiSoins Contact Form',
        }),
      });
      const result = await res.json();
      if (result.success) {
        setSent(true);
        form.reset();
      }
    } catch {
      // silent fail
    } finally {
      setSending(false);
    }
  };

  const contactDetails = [
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
    <section id="contact" className="py-32" style={{ background: 'rgba(255,255,255,0.82)' }}>
      <div className="container-custom">
        <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-12 lg:flex-row lg:gap-20">

          {/* Left: Title + Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto flex max-w-sm flex-col justify-between gap-10"
          >
            <div className="text-center lg:text-left">
              <h2
                className="mb-3 text-5xl font-semibold tracking-tight lg:text-6xl"
                style={{ color: '#1a1a24', letterSpacing: '-0.04em' }}
              >
                {t('contact.title')}
              </h2>
              <p className="font-light leading-relaxed" style={{ color: '#5a5a6a' }}>
                {t('contact.description')}
              </p>
            </div>

            <div className="mx-auto w-fit lg:mx-0">
              <h3
                className="mb-6 text-center text-2xl font-semibold lg:text-left"
                style={{ color: '#1a1a24', letterSpacing: '-0.02em' }}
              >
                {t('contact.detailsTitle')}
              </h3>
              <ul className="space-y-3">
                {contactDetails.map((item) => (
                  <li key={item.labelKey} className="flex items-start gap-2 text-sm" style={{ color: '#5a5a6a' }}>
                    <span className="font-semibold text-slate-800 shrink-0">{t(item.labelKey)}:</span>
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="underline underline-offset-2 hover:text-slate-800 transition-colors"
                    >
                      {item.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: Glass Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mx-auto w-full max-w-screen-md"
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 rounded-[2rem] border border-black/12 bg-white/40 backdrop-blur-xl p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
            >
              {/* Name row */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="firstname">{t('contact.firstName')}</Label>
                  <RawInput type="text" id="firstname" name="firstname" placeholder={t('contact.firstNamePlaceholder')} required />
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="lastname">{t('contact.lastName')}</Label>
                  <RawInput type="text" id="lastname" name="lastname" placeholder={t('contact.lastNamePlaceholder')} required />
                </div>
              </div>

              {/* Email */}
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="email">{t('contact.emailLabel')}</Label>
                <RawInput type="email" id="email" name="email" placeholder={t('contact.emailPlaceholder')} required />
              </div>

              {/* Subject */}
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="subject">{t('contact.subject')}</Label>
                <RawInput type="text" id="subject" name="subject" placeholder={t('contact.subjectPlaceholder')} required />
              </div>

              {/* Message */}
              <div className="grid w-full gap-2">
                <Label htmlFor="message">{t('contact.message')}</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t('contact.messagePlaceholder')}
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={sending || sent}
                className="w-full h-12 rounded-full text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 transition-all duration-300 shadow-lg shadow-slate-900/10 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {sent ? t('contact.sent') : sending ? t('contact.sending') : t('contact.send')}
              </button>

              {sent && (
                <p className="text-center text-sm text-emerald-600 font-medium">
                  {t('contact.sentConfirm')}
                </p>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
