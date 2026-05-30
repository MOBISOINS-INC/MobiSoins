'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useLanguage } from '../../contexts/LanguageContext';
import { PlayStoreButton } from '../ui/play-store-button';
import { AppStoreButton } from '../ui/app-store-button';

const emailSchema = z.string().email();

export const Hero = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'invalid'>('idle');
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (!emailSchema.safeParse(email).success) {
      setStatus('invalid');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_FORM_ACCESS_KEY,
          email,
          subject: 'Nouvelle inscription (Hero)',
          from_name: 'MobiSoins Hero',
        }),
      });
      const data = await res.json();
      setStatus(data.success ? 'success' : 'error');
      if (data.success) setEmail('');
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.82)' }}
    >
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 right-[30%] -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-[20%] w-[300px] h-[300px] bg-purple-300/8 rounded-full blur-[90px]" />
      </div>

      <div className="container-custom w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-24">

          {/* Left: Text */}
          <div className="flex flex-col items-start">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-[1.05] tracking-[-0.04em] mb-6"
              style={{ color: '#1a1a24' }}
            >
              {t('hero.title')}<br />
              <span style={{ color: '#1a1a24' }}>{t('hero.titleHighlight')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(1.1rem,1.5vw,1.25rem)] max-w-[520px] leading-relaxed mb-10 font-light"
              style={{ color: '#5a5a6a' }}
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <a
                href="https://docs.google.com/forms/d/1TaBNJ9M7Ks6LW5_Vfyqx5DodEPQZbo06bxX8PvJFLiw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-waitlist relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold cursor-pointer group"
              >
                <span className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-500" />
                {t('hero.bookNow')}
              </a>
            </motion.div>

            {/* Store Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 mt-6"
            >
              <AppStoreButton />
              <PlayStoreButton />
            </motion.div>
          </div>

          {/* Right: Clay Phone Mockup */}
          <div className="flex items-center justify-center relative" style={{ perspective: '1400px' }}>
            {/* Ambient glow behind phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125%] h-[125%] bg-blue-400/10 rounded-full blur-[90px] -z-10 pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[300px] h-[620px] mx-auto"
              style={{ animation: 'float 6s ease-in-out infinite' }}
            >
              {/* Side buttons - left volume */}
              <div
                className="absolute w-[9px] bg-[#e2e8f0] z-0 rounded-l-lg"
                style={{
                  left: '-9px',
                  top: '122px',
                  height: '28px',
                  boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.9), inset -2px -2px 4px rgba(15,23,42,0.15)',
                  border: '1px solid rgba(255,255,255,0.6)',
                  borderRight: 'none',
                }}
              />
              <div
                className="absolute w-[9px] bg-[#e2e8f0] z-0 rounded-l-lg"
                style={{
                  left: '-9px',
                  top: '176px',
                  height: '56px',
                  boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.9), inset -2px -2px 4px rgba(15,23,42,0.15)',
                  border: '1px solid rgba(255,255,255,0.6)',
                  borderRight: 'none',
                }}
              />
              <div
                className="absolute w-[9px] bg-[#e2e8f0] z-0 rounded-l-lg"
                style={{
                  left: '-9px',
                  top: '244px',
                  height: '56px',
                  boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.9), inset -2px -2px 4px rgba(15,23,42,0.15)',
                  border: '1px solid rgba(255,255,255,0.6)',
                  borderRight: 'none',
                }}
              />
              {/* Right power button */}
              <div
                className="absolute w-[9px] bg-[#e2e8f0] z-0 rounded-r-lg"
                style={{
                  right: '-9px',
                  top: '190px',
                  height: '78px',
                  boxShadow: 'inset -2px 2px 4px rgba(255,255,255,0.9), inset 2px -2px 4px rgba(15,23,42,0.15)',
                  border: '1px solid rgba(255,255,255,0.6)',
                  borderLeft: 'none',
                }}
              />

              {/* Clay body */}
              <div
                className="absolute inset-0 bg-[#e2e8f0] rounded-[3.9rem] z-0 border-[5px] border-[#f1f5f9]"
                style={{
                  boxShadow:
                    '25px 35px 65px rgba(15,23,42,0.15), inset -6px -6px 16px rgba(15,23,42,0.08), inset 6px 6px 16px rgba(255,255,255,0.95)',
                }}
              />

              {/* Screen */}
              <div
                className="absolute inset-x-[10px] top-[10px] bottom-[10px] bg-[#f8f9fb] rounded-[3.25rem] overflow-hidden flex flex-col z-10 border border-black/12"
                style={{ boxShadow: 'inset 0 0 20px rgba(15,23,42,0.06)' }}
              >
                {/* Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[116px] h-[30px] bg-[#0f172a] rounded-full z-50 flex items-center justify-between px-2.5">
                  <div className="w-3 h-3 bg-[#1e293b] rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-blue-500/50 rounded-full blur-[1px]" />
                  </div>
                  <div
                    className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"
                    style={{ boxShadow: '0 0 4px rgba(16,185,129,0.6)' }}
                  />
                </div>

                {/* Status bar */}
                <div className="h-14 w-full pt-3 px-6 flex justify-between items-center text-[11px] font-semibold text-slate-800 z-40">
                  <span className="ml-1 tracking-tight">9:41</span>
                  <div className="flex gap-1.5 items-center opacity-80 mr-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M2 20h.01" /><path d="M7 20v-4" /><path d="M12 20v-8" /><path d="M17 20V4" />
                    </svg>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 20h.01" /><path d="M2 8.82a15 15 0 0 1 20 0" /><path d="M5 12.859a10 10 0 0 1 14 0" /><path d="M8.5 16.429a5 5 0 0 1 7 0" />
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <rect width="16" height="10" x="2" y="7" rx="2" ry="2" fill="currentColor" /><line x1="22" x2="22" y1="11" y2="13" />
                    </svg>
                  </div>
                </div>

                {/* App content */}
                <div className="flex-1 px-3.5 pt-1 pb-[72px] flex flex-col gap-2 overflow-hidden bg-gradient-to-b from-[#f8f9fb] via-[#f3f6fa] to-[#edf1f7]">
                  <div className="flex items-center justify-between ml-0.5">
                    <div>
                      <h2 className="text-[18px] font-bold text-slate-800 tracking-tight leading-none">MobiSoins</h2>
                      <p className="text-[9px] text-slate-400 font-medium mt-0.5 flex items-center gap-1">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 4px rgba(52,211,153,0.5)' }} />
                        En ligne
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #003366, #004d99)' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                    </div>
                  </div>

                  {/* Status + next appointment row */}
                  <div className="flex gap-2">
                    {/* Availability ring */}
                    <div
                      className="flex-1 rounded-xl p-2.5 flex items-center gap-2.5 border"
                      style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)', borderColor: 'rgba(0,0,0,0.06)', boxShadow: '0 2px 8px rgba(15,23,42,0.03)' }}
                    >
                      <div className="relative w-[38px] h-[38px] flex-shrink-0">
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="7" />
                          <circle cx="50" cy="50" r="40" fill="none" strokeWidth="7" strokeDasharray="251" strokeDashoffset="12" strokeLinecap="round" style={{ stroke: 'url(#ringGrad)' }} />
                          <defs><linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#003366" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient></defs>
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-slate-700">95%</span>
                      </div>
                      <div>
                        <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">Dispo</p>
                        <p className="text-base font-bold text-slate-800 leading-none mt-0.5 tracking-tight">24/7</p>
                      </div>
                    </div>

                    {/* Next appointment mini */}
                    <div
                      className="w-[100px] rounded-xl p-2.5 flex flex-col justify-between border"
                      style={{ background: 'linear-gradient(135deg, #003366, #004d99)', borderColor: 'transparent' }}
                    >
                      <p className="text-[8px] font-semibold text-white/60 uppercase tracking-wider">Prochain</p>
                      <div>
                        <p className="text-[11px] font-bold text-white leading-tight">14:00</p>
                        <p className="text-[9px] text-blue-200 font-medium mt-0.5">Inf. Sarah B.</p>
                      </div>
                    </div>
                  </div>

                  {/* Activity sparkline */}
                  <div
                    className="rounded-xl p-3 border relative overflow-hidden"
                    style={{ background: '#ffffff', borderColor: 'rgba(0,0,0,0.06)', boxShadow: '0 2px 8px rgba(15,23,42,0.03)' }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" style={{ boxShadow: '0 0 6px rgba(52,211,153,0.5)' }} />
                        <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">Soins cette semaine</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">+18%</span>
                    </div>
                    {/* Smooth area chart */}
                    <svg viewBox="0 0 260 70" className="w-full" style={{ height: '58px' }}>
                      <defs>
                        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#003366" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#003366" stopOpacity="0.01" />
                        </linearGradient>
                        <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#003366" />
                          <stop offset="50%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#003366" />
                        </linearGradient>
                      </defs>
                      <path d="M0 55 Q15 50 30 48 T60 42 T90 38 T120 30 T150 22 T180 18 T210 24 T240 20 T260 16" fill="none" stroke="url(#lineStroke)" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M0 55 Q15 50 30 48 T60 42 T90 38 T120 30 T150 22 T180 18 T210 24 T240 20 T260 16 L260 70 L0 70 Z" fill="url(#areaFill)" />
                      {/* Data point */}
                      <circle cx="210" cy="24" r="4" fill="#003366" />
                      <circle cx="210" cy="24" r="7" fill="none" stroke="#003366" strokeWidth="1.5" opacity="0.3" />
                    </svg>
                    {/* Bottom labels */}
                    <div className="flex justify-between mt-1 px-1">
                      {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((d) => (
                        <span key={d} className="text-[8px] text-slate-300 font-medium">{d}</span>
                      ))}
                    </div>
                  </div>

                  {/* Nurse matching row */}
                  <div
                    className="rounded-xl p-2.5 border flex items-center justify-between"
                    style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #f0f4ff 100%)', borderColor: 'rgba(0,0,0,0.06)', boxShadow: '0 2px 8px rgba(15,23,42,0.03)' }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                      </div>
                      <div>
                        <h4 className="text-[11px] font-bold text-slate-700 tracking-tight">Matching IA</h4>
                        <p className="text-[9px] text-purple-500 font-medium mt-0.5">3 infirmières trouvées</p>
                      </div>
                    </div>
                    {/* Nurse avatars stack */}
                    <div className="flex -space-x-1.5">
                      {['#f472b6', '#60a5fa', '#34d399'].map((color, i) => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white" style={{ background: color, zIndex: 3 - i }}>
                          {['SB', 'ML', 'JR'][i]}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent activity feed */}
                  <div
                    className="rounded-xl p-3 border flex-1 flex flex-col gap-0"
                    style={{ background: '#ffffff', borderColor: 'rgba(0,0,0,0.06)', boxShadow: '0 2px 8px rgba(15,23,42,0.03)' }}
                  >
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-2">Activité récente</p>
                    {[
                      { icon: '✅', text: 'Soin complété', detail: 'Prise de sang — 12h30', color: '#10b981' },
                      { icon: '💬', text: 'Nouveau message', detail: 'Inf. Sarah B.', color: '#3b82f6' },
                      { icon: '📅', text: 'RDV confirmé', detail: 'Demain, 14:00', color: '#8b5cf6' },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 py-1.5"
                        style={{ borderTop: i > 0 ? '1px solid rgba(0,0,0,0.04)' : 'none' }}
                      >
                        <span className="text-[10px]">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-semibold text-slate-700 leading-tight">{item.text}</p>
                          <p className="text-[8px] text-slate-400 font-medium">{item.detail}</p>
                        </div>
                        <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: item.color }} />
                      </div>
                    ))}
                  </div>

                  {/* Popular services pills */}
                  <div className="flex flex-col gap-1">
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider ml-0.5">Services populaires</p>
                    <div className="flex gap-1 overflow-hidden">
                      {[
                        { icon: '💉', label: 'Vaccination' },
                        { icon: '🩹', label: 'Pansement' },
                        { icon: '🩺', label: 'Bilan' },
                        { icon: '💊', label: 'Suivi' },
                      ].map((s, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-0.5 px-1.5 py-1 rounded-full border flex-shrink-0"
                          style={{ background: i === 0 ? 'linear-gradient(135deg, #003366, #004d99)' : '#fff', borderColor: i === 0 ? 'transparent' : 'rgba(0,0,0,0.06)' }}
                        >
                          <span className="text-[9px]">{s.icon}</span>
                          <span className={`text-[8px] font-semibold ${i === 0 ? 'text-white' : 'text-slate-500'}`}>{s.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Tab Bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-40 flex items-end justify-around px-4 pb-6 pt-3"
                  style={{ background: 'linear-gradient(to top, rgba(237,241,247,1) 60%, rgba(237,241,247,0.95) 80%, rgba(243,246,250,0))' }}
                >
                  {[
                    { icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" /></svg>
                    ), label: 'Accueil', active: true },
                    { icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    ), label: 'Recherche', active: false },
                    { icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                    ), label: 'Réserver', active: false },
                    { icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    ), label: 'Messages', active: false },
                    { icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    ), label: 'Profil', active: false },
                  ].map((tab, i) => (
                    <div key={i} className="flex flex-col items-center gap-0.5" style={{ color: tab.active ? '#003366' : '#94a3b8' }}>
                      {tab.icon}
                      <span className={`text-[8px] ${tab.active ? 'font-bold' : 'font-medium'}`}>{tab.label}</span>
                    </div>
                  ))}
                </div>

                {/* Home indicator */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[100px] h-[3px] bg-slate-900/15 rounded-full z-50" />
              </div>
            </motion.div>

            {/* Floating mini cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="hidden xl:flex absolute right-0 top-[14%] flex-col gap-3 w-52"
              style={{ animation: 'float 7s ease-in-out infinite 0.8s' }}
            >
              {/* Live stats card */}
              <div
                className="backdrop-blur-xl rounded-2xl p-4 border"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,244,255,0.9))', borderColor: 'rgba(0,0,0,0.06)', boxShadow: '0 8px 32px rgba(0,51,102,0.08), 0 1px 2px rgba(0,0,0,0.04)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #003366, #004d99)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-slate-800 leading-none tracking-tight">500+</div>
                    <div className="text-[10px] text-slate-400 font-medium mt-1">Infirmières OIIQ</div>
                  </div>
                </div>
                {/* Mini sparkline */}
                <svg viewBox="0 0 160 24" className="w-full mt-3" style={{ height: '20px' }}>
                  <path d="M0 18 Q20 14 40 16 T80 10 T120 8 T160 4" fill="none" stroke="#003366" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                  <circle cx="160" cy="4" r="2.5" fill="#003366" opacity="0.5" />
                </svg>
              </div>

              {/* Next appointment card */}
              <div
                className="backdrop-blur-xl rounded-2xl p-4 border"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(250,245,255,0.9))', borderColor: 'rgba(0,0,0,0.06)', boxShadow: '0 8px 32px rgba(0,51,102,0.08), 0 1px 2px rgba(0,0,0,0.04)' }}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Prochain soin</span>
                  <span className="text-[8px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                    En route
                  </span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl" style={{ background: 'rgba(0,0,0,0.03)' }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #f472b6, #ec4899)' }}>
                    SB
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-700 truncate">Inf. Sarah B.</div>
                    <div className="text-[10px] font-medium mt-0.5" style={{ color: '#003366' }}>14:00 — Pansement</div>
                  </div>
                </div>
              </div>

              {/* Satisfaction pill */}
              <div
                className="backdrop-blur-xl rounded-full py-2.5 px-4 border flex items-center justify-between"
                style={{ background: 'rgba(255,255,255,0.92)', borderColor: 'rgba(0,0,0,0.06)', boxShadow: '0 4px 16px rgba(0,51,102,0.06)' }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">⭐</span>
                  <span className="text-xs font-bold text-slate-700">4.9/5</span>
                </div>
                <span className="text-[9px] text-slate-400 font-medium">Satisfaction</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
};
