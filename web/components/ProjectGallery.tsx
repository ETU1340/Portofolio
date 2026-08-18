'use client';

import { useMemo, useState } from 'react';
import { Project, ProjectStatus, ProjectType } from '@/lib/types';
import { ProjectCard } from './ProjectCard';
import {
  PROJECT_STATUS_LABELS,
  PROJECT_TYPE_LABELS,
} from '@/lib/types';

export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [typeFilter, setTypeFilter] = useState<ProjectType | ''>('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | ''>('');
  const [techFilter, setTechFilter] = useState('');

  const allTechs = useMemo(
    () => [...new Set(projects.flatMap((p) => p.technologies))].sort(),
    [projects],
  );

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (typeFilter && p.projectType !== typeFilter) return false;
      if (statusFilter && p.status !== statusFilter) return false;
      if (techFilter && !p.technologies.includes(techFilter)) return false;
      return true;
    });
  }, [projects, typeFilter, statusFilter, techFilter]);

  return (
    <section id="projects" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-2 font-mono text-sm uppercase tracking-widest text-cyan-400">
          Galerie
        </h2>
        <p className="mb-8 text-3xl font-bold text-zinc-100">
          Projets & Réalisations
        </p>

        <div className="mb-8 flex flex-wrap gap-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as ProjectType | '')}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-300"
          >
            <option value="">Tous les types</option>
            {(Object.keys(PROJECT_TYPE_LABELS) as ProjectType[]).map((t) => (
              <option key={t} value={t}>
                {PROJECT_TYPE_LABELS[t]}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as ProjectStatus | '')
            }
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-300"
          >
            <option value="">Tous les statuts</option>
            {(Object.keys(PROJECT_STATUS_LABELS) as ProjectStatus[]).map(
              (s) => (
                <option key={s} value={s}>
                  {PROJECT_STATUS_LABELS[s]}
                </option>
              ),
            )}
          </select>

          <select
            value={techFilter}
            onChange={(e) => setTechFilter(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-300"
          >
            <option value="">Toutes les technologies</option>
            {allTechs.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-zinc-500">
            Aucun projet ne correspond aux filtres.
          </p>
        )}
      </div>
    </section>
  );
}
