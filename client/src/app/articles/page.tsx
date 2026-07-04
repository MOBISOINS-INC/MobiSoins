'use client';

import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Blog } from '../../components/sections/Blog';

export default function ArticlesPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a1f38' }}>
      <Header />
      <main className="flex-grow pt-28">
        <Blog />
      </main>
      <Footer />
    </div>
  );
}
