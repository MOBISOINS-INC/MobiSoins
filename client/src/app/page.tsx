'use client';

import dynamic from 'next/dynamic';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { LogoCloud } from '../components/sections/LogoCloud';
import { MobileSectionDivider } from '../components/ui/MobileSectionDivider';

function SectionLoader() {
  return (
    <div className="w-full h-24 flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
    </div>
  );
}

const VisitTimeline = dynamic(() => import('../components/sections/VisitTimeline'), {
  loading: () => <SectionLoader />,
});
const PatientsSection = dynamic(
  () => import('../components/sections/PatientsSection').then((m) => ({ default: m.PatientsSection })),
  { loading: () => <SectionLoader /> }
);
const WaitlistSection = dynamic(() => import('../components/sections/WaitlistSection'), {
  loading: () => <SectionLoader />,
});
// Client-only: the card sizes itself from a media query, so it must not be server-rendered.
const LocationSpot = dynamic(() => import('../components/sections/LocationSpot'), {
  ssr: false,
  loading: () => <SectionLoader />,
});
const NursingMapSection = dynamic(
  () => import('../components/sections/NursingMapSection').then((m) => ({ default: m.NursingMapSection })),
  { loading: () => <SectionLoader /> }
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a1f38' }}>
      <Header />
      <main className="flex-grow">
        <Hero />

        {/* Dark body — a short gradient blends the hero seam into one flat navy,
            so the whole content area reads as a single clean shade */}
        <div
          className="relative"
          style={{ background: 'linear-gradient(180deg, #031226 0%, #0a1f38 22%, #0a1f38 100%)' }}
        >
          <LogoCloud />
          <VisitTimeline />
        </div>

        <LocationSpot />
        <NursingMapSection />
        <MobileSectionDivider variant="route" />
        <PatientsSection />
        <MobileSectionDivider variant="plane" />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  );
}
