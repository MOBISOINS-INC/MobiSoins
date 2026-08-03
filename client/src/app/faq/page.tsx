'use client';

import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { FAQ } from '../../components/sections/FAQ';

export default function FaqPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a1f38' }}>
      <Header />
      <main className="flex-grow pt-28">
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
