'use client';

import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Services } from '../../components/sections/Services';
import { ServicesCatalog } from '../../components/sections/ServicesCatalog';
import { MobileSectionDivider } from '../../components/ui/MobileSectionDivider';

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a1f38' }}>
      <Header />
      <main className="flex-grow pt-20 md:pt-28">
        <Services showViewAll={false} />
        <MobileSectionDivider variant="phone" />
        <ServicesCatalog />
      </main>
      <Footer />
    </div>
  );
}
