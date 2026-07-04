'use client';

import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Services } from '../../components/sections/Services';
import { ServicesCatalog } from '../../components/sections/ServicesCatalog';

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a1f38' }}>
      <Header />
      <main className="flex-grow pt-28">
        <Services showViewAll={false} />
        <ServicesCatalog />
      </main>
      <Footer />
    </div>
  );
}
