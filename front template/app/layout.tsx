import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Alex Carter — Développeur Web Full-Stack',
  description:
    "Portfolio d'Alex Carter, développeur web full-stack spécialisé en Next.js, React et TypeScript. Création d'applications web modernes, performantes et élégantes.",
  openGraph: {
    title: 'Alex Carter — Développeur Web Full-Stack',
    description:
      'Développeur web full-stack spécialisé en Next.js, React et TypeScript.',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
