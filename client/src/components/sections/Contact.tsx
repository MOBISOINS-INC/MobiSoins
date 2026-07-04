'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useLanguage } from '../../contexts/LanguageContext';

const RawInput = ({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`flex h-10 w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-2 text-sm text-white placeholder:text-white/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:border-white/25 focus-visible:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
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
    <section id="contact" className="relative py-24">
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
                className="mb-3 text-5xl font-semibold tracking-tight lg:text-6xl text-white"
                style={{ letterSpacing: '-0.04em' }}
              >
                {t('contact.title')}
              </h2>
              <p className="font-light leading-relaxed text-white/60">
                {t('contact.description')}
              </p>
            </div>

            {/* Warm care photo — bridges the intro and the details */}
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-xl">
              <img
                src="/nurses/contact-nurse.jpeg"
                alt="Infirmière MobiSoins prenant soin d'un enfant"
                className="w-full h-48 sm:h-52 object-cover"
              />
            </div>

            <div className="mx-auto w-fit lg:mx-0">
              <h3
                className="mb-6 text-center text-2xl font-semibold lg:text-left text-white"
                style={{ letterSpacing: '-0.02em' }}
              >
                {t('contact.detailsTitle')}
              </h3>
              <ul className="space-y-3">
                {contactDetails.map((item) => (
                  <li key={item.labelKey} className="flex items-start gap-3 text-sm text-white/60">
                    <span className="font-semibold text-white/85 shrink-0 w-20">{t(item.labelKey)}:</span>
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="underline underline-offset-2 hover:text-white transition-colors"
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
            className="mx-auto w-full max-w-lg"
          >
            <form
              onSubmit={handleSubmit}
              className="glass-dark flex flex-col gap-5 !rounded-3xl p-6 md:p-7"
            >
              {/* Name row */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="firstname" className="text-white/70">{t('contact.firstName')}</Label>
                  <RawInput type="text" id="firstname" name="firstname" placeholder={t('contact.firstNamePlaceholder')} required />
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="lastname" className="text-white/70">{t('contact.lastName')}</Label>
                  <RawInput type="text" id="lastname" name="lastname" placeholder={t('contact.lastNamePlaceholder')} required />
                </div>
              </div>

              {/* Email */}
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="email" className="text-white/70">{t('contact.emailLabel')}</Label>
                <RawInput type="email" id="email" name="email" placeholder={t('contact.emailPlaceholder')} required />
              </div>

              {/* Subject */}
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="subject" className="text-white/70">{t('contact.subject')}</Label>
                <RawInput type="text" id="subject" name="subject" placeholder={t('contact.subjectPlaceholder')} required />
              </div>

              {/* Message */}
              <div className="grid w-full gap-2">
                <Label htmlFor="message" className="text-white/70">{t('contact.message')}</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t('contact.messagePlaceholder')}
                  className="min-h-[96px] border-white/10 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-white/20 focus-visible:border-white/25 focus-visible:bg-white/[0.08]"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={sending || sent}
                className="w-full h-12 rounded-full text-sm font-semibold text-[#0a1f38] bg-white hover:bg-white/90 transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {sent ? t('contact.sent') : sending ? t('contact.sending') : t('contact.send')}
              </button>

              {sent && (
                <p className="text-center text-sm text-[#98B690] font-medium">
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
