'use client';

import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Contact } from '../../components/sections/Contact';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a1f38' }}>
      <Header />
      <main className="flex-grow pt-16">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
