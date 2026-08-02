'use client';

import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Contact } from '../../components/sections/Contact';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-ground)' }}>
      <Header />
      <main className="flex-grow pt-20 md:pt-28">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
