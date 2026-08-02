'use client';

import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { ServicesCatalog } from '../../components/sections/ServicesCatalog';

/* The `Services` marketing section used to sit above the catalogue, so the
   page opened with two complete badge + title + lede headers before the first
   piece of data. That argument already runs on the landing page; someone who
   has navigated to /services is looking something up, not being persuaded.

   Services.tsx stays in the repo — it is simply no longer rendered here. */

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-ground)' }}>
      <Header />
      <main className="flex-grow pt-20 md:pt-28">
        <ServicesCatalog />
      </main>
      <Footer />
    </div>
  );
}
