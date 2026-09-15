'use client';

import { useState } from 'react';
import { ExternalLink, Github, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type Project = {
  title: string;
  description: string;
  tags: string[];
  stars: number;
  featured: boolean;
  accent: 'green' | 'cyan' | 'blue';
};

const projects: Project[] = [
  {
    title: 'Nebula Dashboard',
    description:
      "Tableau de bord d'analyse en temps réel avec visualisations de données interactives, notifications push et mode hors-ligne. Construit avec Next.js, Recharts et Supabase Realtime.",
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Recharts'],
    stars: 248,
    featured: true,
    accent: 'green',
  },
  {
    title: 'DevConnect',
    description:
      "Réseau social pour développeurs avec authentification OAuth, messagerie en temps réel, partage de snippets de code et profils personnalisables.",
    tags: ['React', 'Node.js', 'Socket.io', 'PostgreSQL'],
    stars: 187,
    featured: true,
    accent: 'cyan',
  },
  {
    title: 'ShopWave',
    description:
      "E-commerce headless avec panier persistant, paiement Stripe, gestion de stock en temps réel et tableau de bord administrateur complet.",
    tags: ['Next.js', 'Stripe', 'Prisma', 'Tailwind'],
    stars: 156,
    featured: true,
    accent: 'blue',
  },
  {
    title: 'TaskFlow API',
    description:
      "API REST de gestion de projets avec authentification JWT, système de permissions granulaire, webhooks et documentation OpenAPI auto-générée.",
    tags: ['Node.js', 'Express', 'JWT', 'Docker'],
    stars: 92,
    featured: false,
    accent: 'green',
  },
  {
    title: 'PixelPerfect',
    description:
      "Générateur de palettes de couleurs avec aperçu en direct, export en multiples formats, accessibilité WCAG et intégration Figma.",
    tags: ['React', 'Vite', 'TypeScript', 'CSS'],
    stars: 134,
    featured: false,
    accent: 'cyan',
  },
  {
    title: 'CloudSync',
    description:
      "Application de synchronisation de fichiers entre cloud providers avec chiffrement de bout en bout et interface drag-and-drop.",
    tags: ['Next.js', 'AWS S3', 'Web Crypto', 'PWA'],
    stars: 76,
    featured: false,
    accent: 'blue',
  },
];

const accentMap = {
  green: {
    border: 'hover:border-neon-green/50',
    glow: 'group-hover:glow-green',
    text: 'text-neon-green',
    bg: 'bg-neon-green/10',
    dot: 'bg-neon-green',
  },
  cyan: {
    border: 'hover:border-neon-cyan/50',
    glow: 'group-hover:glow-cyan',
    text: 'text-neon-cyan',
    bg: 'bg-neon-cyan/10',
    dot: 'bg-neon-cyan',
  },
  blue: {
    border: 'hover:border-neon-blue/50',
    glow: '',
    text: 'text-neon-blue',
    bg: 'bg-neon-blue/10',
    dot: 'bg-neon-blue',
  },
};

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  const filtered =
    filter === 'all' ? projects : projects.filter((p) => p.featured);

  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="font-mono text-sm text-neon-green mb-2">
              <span className="text-muted-foreground">$</span> ls -la projects/
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">Projets sélectionnés</h2>
          </div>
          <div className="flex gap-2 font-mono text-xs">
            <button
              onClick={() => setFilter('all')}
              className={cn(
                'rounded-lg border px-4 py-2 transition-all',
                filter === 'all'
                  ? 'border-neon-green/50 bg-neon-green/10 text-neon-green'
                  : 'border-border text-muted-foreground hover:text-foreground'
              )}
            >
              tous
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={cn(
                'rounded-lg border px-4 py-2 transition-all',
                filter === 'featured'
                  ? 'border-neon-green/50 bg-neon-green/10 text-neon-green'
                  : 'border-border text-muted-foreground hover:text-foreground'
              )}
            >
              <Star className="inline h-3 w-3 mr-1" />
              favoris
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((project) => {
            const a = accentMap[project.accent];
            return (
              <article
                key={project.title}
                className={cn(
                  'group relative rounded-xl border border-border bg-card/50 p-6 transition-all duration-300 hover:bg-card',
                  a.border,
                  a.glow
                )}
              >
                {project.featured && (
                  <span
                    className={cn(
                      'absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full',
                      a.bg
                    )}
                  >
                    <Star className={cn('h-3 w-3', a.text)} />
                  </span>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className={cn('h-2 w-2 rounded-full', a.dot)} />
                    <h3 className="font-mono text-lg font-semibold text-foreground">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href="#"
                      aria-label="Code source"
                      className="text-muted-foreground transition-colors hover:text-neon-green"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <a
                      href="#"
                      aria-label="Voir le site"
                      className="text-muted-foreground transition-colors hover:text-neon-green"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border bg-secondary/50 px-2 py-0.5 font-mono text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                  <Star className="h-3 w-3" />
                  <span>{project.stars}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
