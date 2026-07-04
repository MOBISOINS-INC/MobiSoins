'use client';

/**
 * MobiSoins wordmark: white "MobiSoins" text with the brand-green pulse line.
 *
 * mobisoins-logo-clean.png is a pre-processed version of the source art where the
 * blue wordmark was recolored to white while the green pulse line (spike included)
 * was preserved pixel-for-pixel — so it renders cleanly on the dark theme with no
 * clipping artefacts.
 */
type BrandLogoProps = {
  className?: string;
  /** Adds a soft dark drop-shadow for legibility over busy photos (e.g. the hero). */
  glow?: boolean;
};

export function BrandLogo({ className = '', glow = false }: BrandLogoProps) {
  return (
    <img
      src="/mobisoins-logo-clean.png"
      alt="MobiSoins"
      className={`w-auto object-contain select-none ${className}`}
      draggable={false}
      style={glow ? { filter: 'drop-shadow(0 2px 12px rgba(3,18,38,0.7))' } : undefined}
    />
  );
}
