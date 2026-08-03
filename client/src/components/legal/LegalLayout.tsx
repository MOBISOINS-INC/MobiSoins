'use client';

import React from 'react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { motion } from 'framer-motion';

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export const LegalLayout: React.FC<LegalLayoutProps> = ({ title, lastUpdated, children }) => {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a1f38' }}>
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
            <p className="text-white/45 mb-12">Dernière mise à jour : {lastUpdated}</p>

            <div className="prose prose-lg prose-invert max-w-none text-white/70 marker:text-white/40">
              {children}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

