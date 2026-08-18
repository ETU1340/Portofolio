'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Skill, SkillCategory, SKILL_CATEGORY_LABELS } from '@/lib/types';

export function SkillsAdmin() {
  const router = useRouter();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<SkillCategory>('BACKEND');
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = async () => {
    const res = await fetch('/api/skills', { credentials: 'include' });
    if (res.status === 401) {
      router.push('/admin/login');
      return;
    }
    setSkills(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/skills/${editingId}` : '/api/skills';
    const method = editingId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, category }),
    });

    setName('');
    setEditingId(null);
    load();
  };

  const remove = async (id: string) => {
    await fetch(`/api/skills/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    load();
  };

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= skills.length) return;

    const reordered = [...skills];
    [reordered[index], reordered[target]] = [
      reordered[target],
      reordered[index],
    ];

    const payload = reordered.map((s, i) => ({ id: s.id, order: i }));

    await fetch('/api/skills/reorder/all', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    load();
  };

  return (
    <div className="p-8">
      <h1 className="mb-8 text-2xl font-bold">Gestion des Compétences</h1>

      <form onSubmit={submit} className="mb-8 flex flex-wrap gap-3">
        <input
          placeholder="Nom"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as SkillCategory)}
          className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm"
        >
          {(Object.keys(SKILL_CATEGORY_LABELS) as SkillCategory[]).map((c) => (
            <option key={c} value={c}>
              {SKILL_CATEGORY_LABELS[c]}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-zinc-950"
        >
          {editingId ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </form>

      <div className="space-y-2">
        {skills.map((skill, index) => (
          <div
            key={skill.id}
            className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3"
          >
            <div>
              <span className="font-medium">{skill.name}</span>
              <span className="ml-3 text-xs text-zinc-500">
                {SKILL_CATEGORY_LABELS[skill.category]}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => move(index, -1)}
                className="text-sm text-zinc-400"
              >
                ↑
              </button>
              <button
                onClick={() => move(index, 1)}
                className="text-sm text-zinc-400"
              >
                ↓
              </button>
              <button
                onClick={() => {
                  setEditingId(skill.id);
                  setName(skill.name);
                  setCategory(skill.category);
                }}
                className="text-sm text-zinc-400"
              >
                Éditer
              </button>
              <button
                onClick={() => remove(skill.id)}
                className="text-sm text-red-400"
              >
                Suppr.
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
