import Link from 'next/link';
import {
  Project,
  PROJECT_TYPE_LABELS,
  PROJECT_STATUS_LABELS,
} from '@/lib/types';

const statusColors = {
  LIVE: 'bg-emerald-500',
  IN_PROGRESS: 'bg-amber-400',
  ARCHIVED: 'bg-zinc-500',
};

const typeColors = {
  PERSONAL: 'border-violet-500/50 text-violet-300',
  PROFESSIONAL: 'border-blue-500/50 text-blue-300',
  OPEN_SOURCE: 'border-emerald-500/50 text-emerald-300',
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col rounded-xl border border-cyan-500/20 bg-zinc-900/60 p-6 transition hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full border px-2 py-0.5 text-xs ${typeColors[project.projectType]}`}
        >
          {PROJECT_TYPE_LABELS[project.projectType]}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-zinc-400">
          <span
            className={`h-2 w-2 rounded-full ${statusColors[project.status]}`}
          />
          {PROJECT_STATUS_LABELS[project.status]}
        </span>
      </div>

      <h3 className="mb-2 text-xl font-semibold text-zinc-100 group-hover:text-cyan-400">
        {project.title}
      </h3>
      <p className="mb-4 flex-1 text-sm text-zinc-400">{project.summary}</p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-xs text-cyan-300/80"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.highlights.length > 0 && (
        <ul className="mb-4 space-y-1 text-xs text-zinc-500">
          {project.highlights.slice(0, 3).map((h) => (
            <li key={h}>▸ {h}</li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-2">
        <Link
          href={`/projets/${project.slug}`}
          className="rounded-lg bg-cyan-500/10 px-3 py-1.5 text-sm text-cyan-400 transition hover:bg-cyan-500/20"
        >
          Étude de cas
        </Link>
        {project.domainName && (
          <a
            href={project.domainName}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-cyan-500/50"
          >
            Live
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-cyan-500/50"
          >
            GitHub {project.isGithubPublic ? '(Public)' : '(Privé)'}
          </a>
        )}
      </div>
    </article>
  );
}
