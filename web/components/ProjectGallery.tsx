'use client';

import { useMemo, useState } from 'react';
import {
  Project,
  ProjectStatus,
  ProjectType,
  PROJECT_STATUS_LABELS,
  PROJECT_TYPE_LABELS,
} from '@/lib/types';
import { ProjectCard } from './ProjectCard';
import { cn } from '@/lib/utils';

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

  const selectClass = cn(
    'rounded-lg border border-border bg-card/50 px-3 py-2 font-mono text-xs text-foreground',
    'focus:border-neon-green/50 focus:outline-none focus:ring-1 focus:ring-neon-green/30',
  );

  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="font-mono text-sm text-neon-green mb-2">
              <span className="text-muted-foreground">$</span> ls -la projects/
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Projets sélectionnés
            </h2>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as ProjectType | '')}
            className={selectClass}
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
            className={selectClass}
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
            className={selectClass}
          >
            <option value="">Toutes les technologies</option>
            {allTechs.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center font-mono text-sm text-muted-foreground">
            Aucun projet ne correspond aux filtres.
          </p>
        )}
      </div>
    </section>
  );
}
