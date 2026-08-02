'use client';

import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { FAQFull } from '../../components/sections/FAQFull';

export default function FaqPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-ground)' }}>
      <Header />
      <main className="flex-grow pt-20 md:pt-28">
        <FAQFull />
      </main>
      <Footer />
    </div>
  );
}
