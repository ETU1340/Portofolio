import Link from 'next/link';
import { ExternalLink, Star } from 'lucide-react';
import { GithubIcon } from '@/components/BrandIcons';
import {
  Project,
  ProjectType,
  PROJECT_STATUS_LABELS,
  PROJECT_TYPE_LABELS,
} from '@/lib/types';
import { cn } from '@/lib/utils';

type Accent = 'green' | 'cyan' | 'blue';

const typeAccent: Record<ProjectType, Accent> = {
  PERSONAL: 'green',
  PROFESSIONAL: 'cyan',
  OPEN_SOURCE: 'blue',
};

const accentMap: Record<
  Accent,
  { border: string; glow: string; text: string; bg: string; dot: string }
> = {
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

export function ProjectCard({ project }: { project: Project }) {
  const accent = accentMap[typeAccent[project.projectType]];
  const featured = project.status === 'LIVE';

  return (
    <article
      className={cn(
        'group relative flex flex-col rounded-xl border border-border bg-card/50 p-6 transition-all duration-300 hover:bg-card',
        accent.border,
        accent.glow,
      )}
    >
      {featured && (
        <span
          className={cn(
            'absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full',
            accent.bg,
          )}
        >
          <Star className={cn('h-3 w-3', accent.text)} />
        </span>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2 min-w-0">
          <span className={cn('h-2 w-2 shrink-0 rounded-full', accent.dot)} />
          <h3 className="font-mono text-lg font-semibold text-foreground truncate">
            {project.title}
          </h3>
        </div>
        <div className="flex gap-2 shrink-0 ml-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              aria-label="Code source"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-neon-green"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          )}
          {project.domainName && (
            <a
              href={project.domainName}
              aria-label="Voir le site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-neon-green"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className={cn(
            'rounded-md border border-border px-2 py-0.5 font-mono text-xs',
            accent.text,
          )}
        >
          {PROJECT_TYPE_LABELS[project.projectType]}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          {PROJECT_STATUS_LABELS[project.status]}
        </span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
        {project.summary}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.technologies.slice(0, 5).map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-border bg-secondary/50 px-2 py-0.5 font-mono text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        href={`/projets/${project.slug}`}
        className={cn(
          'font-mono text-xs transition-colors hover:underline',
          accent.text,
        )}
      >
        Étude de cas →
      </Link>
    </article>
  );
}
