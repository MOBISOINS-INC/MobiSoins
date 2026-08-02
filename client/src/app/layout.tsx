import type { Metadata } from 'next';
import { Inter, Newsreader } from 'next/font/google';
import { LanguageProvider } from '../contexts/LanguageContext';
import './globals.css';

/* Both faces are self-hosted by next/font and exposed to globals.css as CSS
   variables. They were previously requested with an @import in globals.css,
   which Turbopack strips from the emitted stylesheet — so neither face was
   ever actually loading and everything rendered in the system fallback. */

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

// Display face — section titles and the large figures only. Everything
// operational stays on Inter.
const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal'],
  variable: '--font-newsreader',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MobiSoins - Soins Infirmiers à Domicile au Québec',
  description:
    'MobiSoins connecte des infirmières qualifiées avec des patients pour des soins à domicile au Québec. Réservez en ligne, service 24/7.',
  metadataBase: new URL('https://mobisoins.ca'),
  openGraph: {
    type: 'website',
    url: 'https://mobisoins.ca/',
    title: 'MobiSoins - Soins Infirmiers à Domicile au Québec',
    description:
      'MobiSoins connecte des infirmières qualifiées avec des patients pour des soins à domicile au Québec. Réservez en ligne, service 24/7.',
    images: ['/mobisoins-logo.jpeg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MobiSoins - Soins Infirmiers à Domicile',
    description:
      'Soins infirmiers à domicile au Québec. Rapide, sécurisé et professionnel.',
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
    <html lang="fr" className={`${inter.variable} ${newsreader.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.web3forms.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://i.pravatar.cc" />
        <link rel="dns-prefetch" href="https://placehold.co" />
      </head>
      <body style={{ background: '#04142a' }}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
