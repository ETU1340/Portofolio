import Link from 'next/link';

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/#projects', label: 'Projets' },
  { href: '/#skills', label: 'Compétences' },
  { href: '/console', label: 'Console API' },
  { href: '/#contact', label: 'Contact' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-cyan-500/20 bg-[#0a0a0f]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-mono text-lg font-bold text-cyan-400">
          {'<Portfolio />'}
        </Link>
        <ul className="flex flex-wrap items-center gap-4 text-sm text-zinc-300">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition hover:text-cyan-400"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
