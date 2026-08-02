'use client';

import { useId } from 'react';

const GREEN = '#98B690';
const GREEN_FAINT = 'rgba(152,182,144,0.5)';

type Variant = 'pulse' | 'route' | 'stars' | 'plane' | 'phone' | 'envelope';

/**
 * Mobile-only section transition. Several on-brand variants so consecutive
 * dividers never repeat the same motif:
 *  - "pulse": a faint ECG line with a green dot travelling it.
 *  - "route": a nurse's car driving along a road up to a house.
 *  - "stars": a row of gently twinkling stars (for testimonials).
 *  - "plane": a paper plane flying along a trail (for the sign-up).
 * Hidden on ≥ sm where the sections already have room to breathe.
 */
export function MobileSectionDivider({ variant = 'pulse' }: { variant?: Variant }) {
  const rawId = useId().replace(/:/g, '');

  // Genuinely mobile-only, as documented. This previously rendered at every
  // breakpoint (py-3 sm:py-10 lg:py-14, w-60 sm:w-[30rem] lg:w-[38rem]),
  // so desktop got an animated car, paper plane and ECG trace between every
  // section. On mobile they usefully mark the seam between stacked sections;
  // on desktop the sections have their own spacing and hairline rhythm, and
  // the moving illustrations read as novelty rather than craft.
  return (
    <div className="relative sm:hidden flex items-center justify-center py-3" aria-hidden>
      {/* soft green glow */}
      <div
        className="absolute w-48 h-14 rounded-full blur-2xl pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(152,182,144,0.16), transparent)' }}
      />

      <svg viewBox="0 0 240 40" className="relative w-60 h-10 overflow-visible" fill="none">
        {variant === 'route' && (
          <>
            <path id={`road-${rawId}`} d="M6 25 H198" stroke={GREEN_FAINT} strokeWidth="1.6" strokeLinecap="round" strokeDasharray="1 5" />
            <g transform="translate(214 25)">
              <path d="M-8 0 v-8 l8 -7 l8 7 v8 z" fill="none" stroke="rgba(152,182,144,0.6)" strokeWidth="1.6" strokeLinejoin="round" />
              <rect x="-2.4" y="-5.5" width="4.8" height="5.5" fill="rgba(152,182,144,0.35)" />
            </g>
            <g>
              <path d="M-6 -2 h12 v-3 l-2.5 -3 h-6 l-2.5 3 z" fill={GREEN} />
              <circle cx="-3.4" cy="0" r="1.5" fill="#0a1f38" stroke={GREEN} strokeWidth="1" />
              <circle cx="3.4" cy="0" r="1.5" fill="#0a1f38" stroke={GREEN} strokeWidth="1" />
              <animateMotion dur="4.2s" repeatCount="indefinite" keyPoints="0;0.9;0.9" keyTimes="0;0.82;1" calcMode="linear">
                <mpath href={`#road-${rawId}`} />
              </animateMotion>
            </g>
          </>
        )}

        {variant === 'stars' && (
          <g transform="translate(120 20)">
            {[-48, -24, 0, 24, 48].map((x, i) => (
              <path
                key={x}
                transform={`translate(${x} 0)`}
                d="M0 -6 L1.7 -1.9 L6 -1.9 L2.5 1.1 L3.7 6 L0 3 L-3.7 6 L-2.5 1.1 L-6 -1.9 L-1.7 -1.9 Z"
                fill={GREEN}
              >
                <animate attributeName="opacity" values="0.35;1;0.35" dur="2.6s" begin={`${i * 0.28}s`} repeatCount="indefinite" />
              </path>
            ))}
          </g>
        )}

        {variant === 'plane' && (
          <>
            <defs>
              <linearGradient id={`trailGrad-${rawId}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="rgba(152,182,144,0)" />
                <stop offset="0.5" stopColor="rgba(152,182,144,0.6)" />
                <stop offset="1" stopColor="rgba(152,182,144,0)" />
              </linearGradient>
            </defs>
            {/* graceful trail that fades in and out at the ends */}
            <path
              id={`trail-${rawId}`}
              d="M20 25 Q120 13 220 21"
              stroke={`url(#trailGrad-${rawId})`}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="0.5 6"
            />
            {/* clean two-tone paper plane, nose pointing along the path */}
            <g>
              <path d="M10 0 L-9 -6 L-2.5 0 Z" fill={GREEN} />
              <path d="M10 0 L-9 6 L-2.5 0 Z" fill="rgba(152,182,144,0.45)" />
              <animateMotion dur="4.6s" repeatCount="indefinite" rotate="auto" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath href={`#trail-${rawId}`} />
              </animateMotion>
            </g>
          </>
        )}

        {variant === 'phone' && (
          <g transform="translate(120 20)">
            {/* vibration waves — left */}
            <path d="M-23 -7 Q-28 0 -23 7" stroke={GREEN_FAINT} strokeWidth="1.4" strokeLinecap="round" fill="none">
              <animate attributeName="opacity" values="0.15;0.7;0.15" dur="0.9s" repeatCount="indefinite" />
            </path>
            <path d="M-17 -4.5 Q-20 0 -17 4.5" stroke={GREEN} strokeWidth="1.4" strokeLinecap="round" fill="none">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="0.9s" begin="0.12s" repeatCount="indefinite" />
            </path>
            {/* vibration waves — right */}
            <path d="M23 -7 Q28 0 23 7" stroke={GREEN_FAINT} strokeWidth="1.4" strokeLinecap="round" fill="none">
              <animate attributeName="opacity" values="0.15;0.7;0.15" dur="0.9s" repeatCount="indefinite" />
            </path>
            <path d="M17 -4.5 Q20 0 17 4.5" stroke={GREEN} strokeWidth="1.4" strokeLinecap="round" fill="none">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="0.9s" begin="0.12s" repeatCount="indefinite" />
            </path>
            {/* buzzing phone */}
            <g style={{ filter: 'drop-shadow(0 0 3px rgba(152,182,144,0.5))' }}>
              <rect x="-6" y="-11" width="12" height="22" rx="3" fill="none" stroke={GREEN} strokeWidth="1.6" />
              <line x1="-2.4" y1="7.4" x2="2.4" y2="7.4" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" />
              <animateTransform attributeName="transform" type="rotate" values="-6;6;-6;6;-6" dur="0.42s" repeatCount="indefinite" />
            </g>
          </g>
        )}

        {variant === 'envelope' && (
          <>
            <defs>
              <linearGradient id={`env-${rawId}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="rgba(152,182,144,0)" />
                <stop offset="0.5" stopColor="rgba(152,182,144,0.4)" />
                <stop offset="1" stopColor="rgba(152,182,144,0)" />
              </linearGradient>
            </defs>
            {/* faint line through, fading at both ends */}
            <path d="M4 20 H236" stroke={`url(#env-${rawId})`} strokeWidth="1.2" strokeLinecap="round" />
            {/* small envelope resting on the line, gently breathing */}
            <g transform="translate(120 20)" fill="none" stroke={GREEN} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <rect x="-11" y="-7.5" width="22" height="15" rx="2.5" fill="#0a1f38" />
              <path d="M-11 -5 L0 3 L11 -5" />
              <animate attributeName="opacity" values="0.65;1;0.65" dur="3.6s" repeatCount="indefinite" />
            </g>
          </>
        )}

        {variant === 'pulse' && (
          <>
            <path
              id={`ecg-${rawId}`}
              d="M0 20 H86 l6 -13 l7 27 l6 -22 l5 8 H240"
              stroke={GREEN_FAINT}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle r="2.8" fill={GREEN} style={{ filter: 'drop-shadow(0 0 4px rgba(152,182,144,0.9))' }}>
              <animateMotion dur="3.4s" repeatCount="indefinite" rotate="auto" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath href={`#ecg-${rawId}`} />
              </animateMotion>
            </circle>
          </>
        )}
      </svg>
    </div>
  );
}
