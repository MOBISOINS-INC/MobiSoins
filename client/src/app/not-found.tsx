'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background-white">
      <h1 className="text-6xl font-bold text-navy-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page introuvable</p>
      <Link
        href="/"
        className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:shadow-xl hover:scale-105 transition-all"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
