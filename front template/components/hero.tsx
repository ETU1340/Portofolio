'use client';

import { useEffect, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

const roles = [
  'Développeur Web Full-Stack',
  'Expert Next.js & React',
  'Passionné de TypeScript',
  "Créateur d'expériences web",
];

export default function Hero() {
  const [text, setText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    const speed = deleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) {
          setDeleting(false);
          setRoleIdx((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, deleting, roleIdx]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-16"
    >
      <div className="mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-neon-green/30 bg-neon-green/5 px-4 py-1.5 mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-green opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
          </span>
          <span className="font-mono text-xs text-neon-green">
            disponible pour de nouveaux projets
          </span>
        </div>

        <p className="font-mono text-sm text-muted-foreground mb-4 animate-fade-in-up">
          <span className="text-neon-green">$</span> whoami
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 animate-fade-in-up">
          Alex{' '}
          <span className="gradient-text">Carter</span>
        </h1>

        <div className="h-10 mb-8 flex items-center justify-center animate-fade-in-up">
          <span className="font-mono text-lg sm:text-xl text-neon-cyan glow-text-cyan">
            {text}
            <span className="ml-0.5 inline-block w-0.5 h-5 bg-neon-cyan animate-blink" />
          </span>
        </div>

        <p className="max-w-2xl mx-auto text-muted-foreground text-base sm:text-lg leading-relaxed mb-10 animate-fade-in-up">
          Je conçois et construis des applications web modernes, performantes
          et accessibles. Spécialisé dans l'écosystème React/Next.js avec une
          attention particulière portée aux détails et à l'expérience
          utilisateur.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up">
          <a
            href="#projects"
            className="group relative inline-flex items-center justify-center gap-2 rounded-lg bg-neon-green px-6 py-3 font-mono text-sm font-semibold text-background transition-all duration-300 hover:glow-green"
          >
            <span>Voir mes projets</span>
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary/50 px-6 py-3 font-mono text-sm font-semibold text-foreground transition-all duration-300 hover:border-neon-cyan hover:text-neon-cyan"
          >
            <Mail className="h-4 w-4" />
            <span>Me contacter</span>
          </a>
        </div>

        <div className="flex items-center justify-center gap-6 animate-fade-in">
          {[
            { Icon: Github, href: 'https://github.com', label: 'GitHub' },
            { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
            { Icon: Mail, href: '#contact', label: 'Email' },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith('#') ? undefined : '_blank'}
              rel={href.startsWith('#') ? undefined : 'noopener noreferrer'}
              className="text-muted-foreground transition-colors hover:text-neon-green"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/50 hover:text-neon-green transition-colors"
      >
        <ArrowDown className="h-5 w-5 animate-float" />
      </a>
    </section>
  );
}
