import type { Metadata } from 'next';
import { Providers } from '@/components/Providers';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Portfolio & Developer Showcase',
    template: '%s | Portfolio',
  },
  description:
    'Vitrine professionnelle — projets, architecture technique, démos live et études de cas.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0a0a0f] font-sans text-zinc-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
