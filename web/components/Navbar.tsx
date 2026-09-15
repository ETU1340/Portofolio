'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  { href: '/#home', id: 'home', label: '~ home' },
  { href: '/#about', id: 'about', label: '~ about' },
  { href: '/#skills', id: 'skills', label: '~ skills' },
  { href: '/#projects', id: 'projects', label: '~/projects' },
  { href: '/#contact', id: 'contact', label: '~/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = links.map((l) => l.id);
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActive('#' + s);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border/60 bg-background/80 backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link
          href="/#home"
          className="flex items-center gap-2 font-mono text-sm font-bold text-foreground"
        >
          <Terminal className="h-5 w-5 text-neon-green" />
          <span className="text-neon-green">alex</span>
          <span className="text-muted-foreground">.dev</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-3 py-2 font-mono text-sm rounded-md transition-all duration-200',
                active === `#${link.id}`
                  ? 'text-neon-green bg-neon-green/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50',
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/console"
            className="px-3 py-2 font-mono text-sm rounded-md text-muted-foreground hover:text-neon-cyan hover:bg-secondary/50 transition-all duration-200"
          >
            ~/console
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
          <div className="px-6 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'px-3 py-2.5 font-mono text-sm rounded-md transition-colors',
                  active === `#${link.id}`
                    ? 'text-neon-green bg-neon-green/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50',
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/console"
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 font-mono text-sm rounded-md text-muted-foreground hover:text-neon-cyan hover:bg-secondary/50"
            >
              ~/console
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
