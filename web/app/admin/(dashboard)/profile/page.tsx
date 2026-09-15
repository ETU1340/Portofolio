'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ProfileForm {
  fullName: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl: string;
  cvUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  websiteUrl: string;
  yearsOfExperience: number;
  projectsDelivered: number;
  availableForHire: boolean;
}

const emptyForm: ProfileForm = {
  fullName: '',
  title: '',
  bio: '',
  email: '',
  phone: '',
  location: '',
  avatarUrl: '',
  cvUrl: '',
  githubUrl: '',
  linkedinUrl: '',
  websiteUrl: '',
  yearsOfExperience: 0,
  projectsDelivered: 0,
  availableForHire: true,
};

export default function AdminProfilePage() {
  const [form, setForm] = useState<ProfileForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/profile', { credentials: 'include' })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setForm({
            fullName: data.fullName ?? '',
            title: data.title ?? '',
            bio: data.bio ?? '',
            email: data.email ?? '',
            phone: data.phone ?? '',
            location: data.location ?? '',
            avatarUrl: data.avatarUrl ?? '',
            cvUrl: data.cvUrl ?? '',
            githubUrl: data.githubUrl ?? '',
            linkedinUrl: data.linkedinUrl ?? '',
            websiteUrl: data.websiteUrl ?? '',
            yearsOfExperience: data.yearsOfExperience ?? 0,
            projectsDelivered: data.projectsDelivered ?? 0,
            availableForHire: data.availableForHire ?? true,
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    const body: Record<string, unknown> = {
      fullName: form.fullName,
      title: form.title,
      bio: form.bio,
      email: form.email,
      yearsOfExperience: form.yearsOfExperience,
      projectsDelivered: form.projectsDelivered,
      availableForHire: form.availableForHire,
    };
    if (form.phone) body.phone = form.phone;
    if (form.location) body.location = form.location;
    if (form.avatarUrl) body.avatarUrl = form.avatarUrl;
    if (form.cvUrl) body.cvUrl = form.cvUrl;
    if (form.githubUrl) body.githubUrl = form.githubUrl;
    if (form.linkedinUrl) body.linkedinUrl = form.linkedinUrl;
    if (form.websiteUrl) body.websiteUrl = form.websiteUrl;

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message ?? 'Erreur lors de la sauvegarde');
      }
      setMessage('Profil mis à jour avec succès !');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setSaving(false);
    }
  };

  const update =
    (field: keyof ProfileForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value =
        field === 'yearsOfExperience' || field === 'projectsDelivered'
          ? parseInt(e.target.value, 10) || 0
          : field === 'availableForHire'
            ? e.target.value === 'true'
            : e.target.value;
      setForm((f) => ({ ...f, [field]: value }));
    };

  const inputClass =
    'w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 focus:border-cyan-500 focus:outline-none';

  if (loading) {
    return (
      <div className="p-8 text-zinc-400">Chargement du profil...</div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-2 font-mono text-sm uppercase tracking-widest text-cyan-400">
        Profil
      </h1>
      <p className="mb-8 text-2xl font-bold text-zinc-100">
        Gestion du profil public
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {form.avatarUrl && (
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-cyan-500/50">
              <Image
                src={form.avatarUrl}
                alt="Avatar"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm text-zinc-400">Aperçu de la photo de profil</p>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Nom complet *</label>
            <input
              type="text"
              required
              value={form.fullName}
              onChange={update('fullName')}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Titre / Rôle *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={update('title')}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm text-zinc-400">Bio *</label>
          <textarea
            required
            rows={6}
            value={form.bio}
            onChange={update('bio')}
            className={`${inputClass} resize-y`}
            placeholder="Séparé par des retours à la ligne pour plusieurs paragraphes"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Email *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={update('email')}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Téléphone</label>
            <input
              type="text"
              value={form.phone}
              onChange={update('phone')}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm text-zinc-400">Localisation</label>
          <input
            type="text"
            value={form.location}
            onChange={update('location')}
            className={inputClass}
            placeholder="Paris, France"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-zinc-400">
            URL Photo de profil
          </label>
          <input
            type="url"
            value={form.avatarUrl}
            onChange={update('avatarUrl')}
            className={inputClass}
            placeholder="https://..."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-zinc-400">URL CV</label>
            <input
              type="url"
              value={form.cvUrl}
              onChange={update('cvUrl')}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-400">URL Site web</label>
            <input
              type="url"
              value={form.websiteUrl}
              onChange={update('websiteUrl')}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-zinc-400">GitHub</label>
            <input
              type="url"
              value={form.githubUrl}
              onChange={update('githubUrl')}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-400">LinkedIn</label>
            <input
              type="url"
              value={form.linkedinUrl}
              onChange={update('linkedinUrl')}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm text-zinc-400">
              Années d&apos;expérience
            </label>
            <input
              type="number"
              min={0}
              value={form.yearsOfExperience}
              onChange={update('yearsOfExperience')}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-400">
              Projets livrés
            </label>
            <input
              type="number"
              min={0}
              value={form.projectsDelivered}
              onChange={update('projectsDelivered')}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-400">
              Disponible
            </label>
            <select
              value={String(form.availableForHire)}
              onChange={update('availableForHire')}
              className={inputClass}
            >
              <option value="true">Oui</option>
              <option value="false">Non</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-cyan-500 px-6 py-2 font-semibold text-zinc-950 hover:bg-cyan-400 disabled:opacity-50"
        >
          {saving ? 'Sauvegarde...' : 'Sauvegarder le profil'}
        </button>

        {message && (
          <p className="text-sm text-emerald-400">{message}</p>
        )}
        {error && <p className="text-sm text-red-400">{error}</p>}
      </form>
    </div>
  );
}
