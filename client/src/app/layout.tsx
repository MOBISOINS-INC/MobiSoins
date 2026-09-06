import type { Metadata } from 'next';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import { LanguageProvider } from '../contexts/LanguageContext';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MobiSoins - Soins infirmiers à domicile à Montréal',
  description:
    'MobiSoins jumelle des infirmières qualifiées et des patients pour des soins à domicile dans la grande région de Montréal. Réservez en ligne.',
  metadataBase: new URL('https://mobisoins.ca'),
  openGraph: {
    type: 'website',
    url: 'https://mobisoins.ca/',
    title: 'MobiSoins - Soins infirmiers à domicile à Montréal',
    description:
      'MobiSoins jumelle des infirmières qualifiées et des patients pour des soins à domicile dans la grande région de Montréal. Réservez en ligne.',
    images: ['/mobisoins-logo.jpeg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MobiSoins - Soins infirmiers à domicile',
    description:
      'Soins infirmiers à domicile dans la grande région de Montréal. Professionnel, sécuritaire et humain.',
    images: ['/mobisoins-logo.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  other: {
    'theme-color': '#003366',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/mobisoins-logo.jpeg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.web3forms.com" crossOrigin="" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://placehold.co" />
      </head>
      <body style={{ background: '#04142a' }}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
