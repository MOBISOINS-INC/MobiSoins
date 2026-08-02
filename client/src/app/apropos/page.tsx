'use client';

import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { About } from '../../components/sections/About';

export default function AproposPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-ground)' }}>
      <Header />
      <main className="flex-grow pt-20 md:pt-28">
        <About />
      </main>
      <Footer />
    </div>
  );
}
