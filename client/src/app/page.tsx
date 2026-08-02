'use client';

import dynamic from 'next/dynamic';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { LogoCloud } from '../components/sections/LogoCloud';

function SectionLoader() {
  return (
    <div className="w-full h-24 flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
    </div>
  );
}

const HowItWorks = dynamic(
  () => import('../components/sections/HowItWorks').then((m) => ({ default: m.HowItWorks })),
  { loading: () => <SectionLoader /> }
);
const PatientsSection = dynamic(
  () => import('../components/sections/PatientsSection').then((m) => ({ default: m.PatientsSection })),
  { loading: () => <SectionLoader /> }
);
const Newsletter = dynamic(
  () => import('../components/sections/Newsletter').then((m) => ({ default: m.Newsletter })),
  { loading: () => <SectionLoader /> }
);
const NursingMapSection = dynamic(
  () => import('../components/sections/NursingMapSection').then((m) => ({ default: m.NursingMapSection })),
  { loading: () => <SectionLoader /> }
);
const ServicesOverview = dynamic(
  () => import('../components/sections/ServicesOverview').then((m) => ({ default: m.ServicesOverview })),
  { loading: () => <SectionLoader /> }
);
const PricingCoverage = dynamic(
  () => import('../components/sections/PricingCoverage').then((m) => ({ default: m.PricingCoverage })),
  { loading: () => <SectionLoader /> }
);
const FAQ = dynamic(
  () => import('../components/sections/FAQ').then((m) => ({ default: m.FAQ })),
  { loading: () => <SectionLoader /> }
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-ground)' }}>
      <Header />
      <main className="flex-grow">
        <Hero />

        {/* The proof band ramps from the hero's closing colour down to the base
            ground, so it carries the transition itself — no hairline edges, no
            third flat tone. Everything after it sits on the base ground unless a
            section opts into a tier. */}
        <div className="relative" style={{ background: 'var(--color-ground)' }}>
          <LogoCloud />
          <HowItWorks />
        </div>

        {/* Section order alternates density deliberately. The old order ran
            six comfortable text+image sections back to back, all on the same
            ground with the same header formula, so the page read as one
            repeated block rather than eight distinct answers.

            Now: rail (proof) → split (process) → rail (service index) →
            cinema (dispatch) → split (patients) → rail (tariffs) → split
            (FAQ) → rail (closing). No two adjacent sections share a density,
            and the recessed ground tier marks every rail.

            Dividers are gone. They were compensating for the sameness — with
            alternating grounds and hairline band edges, each seam is already
            legible, and a decorative divider between two of them is noise. */}
        <ServicesOverview />
        <NursingMapSection />
        <PatientsSection />
        <PricingCoverage />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
