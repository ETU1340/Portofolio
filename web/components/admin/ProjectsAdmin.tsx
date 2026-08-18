'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Project, ProjectStatus, ProjectType } from '@/lib/types';

const emptyProject = {
  title: '',
  slug: '',
  summary: '',
  description: '',
  projectType: 'PERSONAL' as ProjectType,
  status: 'LIVE' as ProjectStatus,
  domainName: '',
  githubUrl: '',
  isGithubPublic: true,
  technologies: [] as string[],
  highlights: [] as string[],
  isPublished: true,
};

export function ProjectsAdmin() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState(emptyProject);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [techInput, setTechInput] = useState('');
  const [highlightInput, setHighlightInput] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    const res = await fetch('/api/projects?admin=true', { credentials: 'include' });
    if (res.status === 401) {
      router.push('/admin/login');
      return;
    }
    setProjects(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm(emptyProject);
    setEditingId(null);
    setTechInput('');
    setHighlightInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const payload = {
      ...form,
      domainName: form.domainName || undefined,
      githubUrl: form.githubUrl || undefined,
    };

    const url = editingId ? `/api/projects/${editingId}` : '/api/projects';
    const method = editingId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.message?.join?.(', ') ?? data.message ?? 'Erreur');
      return;
    }

    resetForm();
    load();
  };

  const edit = (p: Project) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      slug: p.slug,
      summary: p.summary,
      description: p.description,
      projectType: p.projectType,
      status: p.status,
      domainName: p.domainName ?? '',
      githubUrl: p.githubUrl ?? '',
      isGithubPublic: p.isGithubPublic,
      technologies: p.technologies,
      highlights: p.highlights,
      isPublished: p.isPublished,
    });
  };

  const remove = async (id: string) => {
    if (!confirm('Supprimer ce projet ?')) return;
    await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    load();
  };

  const addTag = (field: 'technologies' | 'highlights', value: string) => {
    if (!value.trim()) return;
    setForm((f) => ({
      ...f,
      [field]: [...f[field], value.trim()],
    }));
    if (field === 'technologies') setTechInput('');
    else setHighlightInput('');
  };

  return (
    <div className="p-8">
      <h1 className="mb-8 text-2xl font-bold">Gestion des Projets</h1>

      <form onSubmit={handleSubmit} className="mb-10 space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h2 className="font-mono text-sm text-cyan-400">
          {editingId ? 'Modifier' : 'Nouveau projet'}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            placeholder="Titre"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm"
          />
          <input
            placeholder="Slug"
            required
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 font-mono text-sm"
          />
        </div>

        <input
          placeholder="Résumé court"
          required
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm"
        />

        <textarea
          placeholder="Description Markdown"
          required
          rows={8}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 font-mono text-sm"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <select
            value={form.projectType}
            onChange={(e) =>
              setForm({ ...form, projectType: e.target.value as ProjectType })
            }
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm"
          >
            <option value="PERSONAL">Personnel</option>
            <option value="PROFESSIONAL">Professionnel</option>
            <option value="OPEN_SOURCE">Open Source</option>
          </select>
          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value as ProjectStatus })
            }
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm"
          >
            <option value="LIVE">En Ligne</option>
            <option value="IN_PROGRESS">En développement</option>
            <option value="ARCHIVED">Archivé</option>
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            placeholder="URL Live (https://...)"
            value={form.domainName}
            onChange={(e) => setForm({ ...form, domainName: e.target.value })}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm"
          />
          <input
            placeholder="URL GitHub"
            value={form.githubUrl}
            onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm"
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isGithubPublic}
            onChange={(e) =>
              setForm({ ...form, isGithubPublic: e.target.checked })
            }
          />
          Dépôt GitHub public
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={(e) =>
              setForm({ ...form, isPublished: e.target.checked })
            }
          />
          Publié (visible sur la vitrine)
        </label>

        <div className="flex gap-2">
          <input
            placeholder="Technologie"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTag('technologies', techInput);
              }
            }}
            className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={() => addTag('technologies', techInput)}
            className="rounded-lg bg-zinc-700 px-3 py-2 text-sm"
          >
            + Tech
          </button>
        </div>
        <div className="flex flex-wrap gap-1">
          {form.technologies.map((t) => (
            <span key={t} className="rounded bg-zinc-800 px-2 py-1 text-xs">
              {t}{' '}
              <button
                type="button"
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    technologies: f.technologies.filter((x) => x !== t),
                  }))
                }
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            placeholder="Highlight architecture"
            value={highlightInput}
            onChange={(e) => setHighlightInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTag('highlights', highlightInput);
              }
            }}
            className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={() => addTag('highlights', highlightInput)}
            className="rounded-lg bg-zinc-700 px-3 py-2 text-sm"
          >
            + Highlight
          </button>
        </div>
        <div className="flex flex-wrap gap-1">
          {form.highlights.map((h) => (
            <span key={h} className="rounded bg-zinc-800 px-2 py-1 text-xs">
              {h}{' '}
              <button
                type="button"
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    highlights: f.highlights.filter((x) => x !== h),
                  }))
                }
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-zinc-950"
          >
            {editingId ? 'Mettre à jour' : 'Créer'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-zinc-600 px-4 py-2 text-sm"
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {projects.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3"
          >
            <div>
              <p className="font-medium">{p.title}</p>
              <p className="text-xs text-zinc-500">
                /{p.slug} · {p.isPublished ? 'Publié' : 'Brouillon'}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/projets/${p.slug}`}
                className="text-sm text-cyan-400 hover:underline"
              >
                Voir
              </Link>
              <button onClick={() => edit(p)} className="text-sm text-zinc-400">
                Éditer
              </button>
              <button onClick={() => remove(p.id)} className="text-sm text-red-400">
                Suppr.
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
