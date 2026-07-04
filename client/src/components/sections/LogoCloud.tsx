'use client';

const partners = [
  {
    name: 'OIIQ',
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 12l10 10 10-10L12 2zm0 4.8l5.2 5.2-5.2 5.2L6.8 12 12 6.8z" />
      </svg>
    ),
  },
  {
    name: 'Desjardins',
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L1 21h22L12 2zm0 4.5l6.5 11.5H5.5L12 6.5z" />
      </svg>
    ),
  },
  {
    name: 'Sun Life',
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  {
    name: 'Croix Bleue',
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
      </svg>
    ),
  },
  {
    name: 'RAMQ',
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5z" />
      </svg>
    ),
  },
  {
    name: 'Pharmaprix',
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-15H9v10h2V7zm4 0h-2v10h2V7z" />
      </svg>
    ),
  },
  {
    name: 'SSQ Assurance',
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l10 6-10 6-10-6 10-6zm0 15.5l-10-6v4.5l10 6 10-6v-4.5l-10 6z" />
      </svg>
    ),
  },
];

// Duplicate for seamless loop
const allPartners = [...partners, ...partners];

export const LogoCloud = () => {
  return (
    <section className="relative w-full max-w-[1400px] mx-auto pt-20 pb-16 overflow-hidden">
      <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-12 text-center px-6 text-white/45">
        Partenaires de confiance au Québec
      </p>
      <div
        className="w-full relative flex items-center overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        }}
      >
        <div className="flex w-max" style={{ animation: 'marquee 40s linear infinite' }}>
          {allPartners.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-white/40 hover:text-white transition-colors duration-300 cursor-pointer mx-12"
            >
              {p.icon}
              <span className="text-xl font-semibold tracking-tight whitespace-nowrap">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
};
