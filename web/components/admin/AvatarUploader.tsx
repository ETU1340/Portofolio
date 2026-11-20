'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Camera, Loader2, Trash2, User } from 'lucide-react';

const MAX_SIZE_BYTES = 2 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

interface AvatarUploaderProps {
  value: string;
  onChange: (url: string) => void;
}

interface UploadAvatarResponse {
  url: string;
}

interface ApiErrorResponse {
  message?: string | string[];
}

export function AvatarUploader({ value, onChange }: AvatarUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const openPicker = () => {
    setError('');
    setInfo('');
    inputRef.current?.click();
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Format non supporté. Utilisez JPEG, PNG ou WebP.');
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError('L’image ne doit pas dépasser 2 Mo.');
      return;
    }

    setUploading(true);
    setError('');
    setInfo('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/uploads/avatar', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as ApiErrorResponse;
        const message = Array.isArray(data.message)
          ? data.message.join(', ')
          : data.message;
        throw new Error(message ?? 'Échec de l’envoi de l’image');
      }

      const data = (await res.json()) as UploadAvatarResponse;
      onChange(data.url);
      setInfo('Image envoyée. Cliquez sur « Sauvegarder le profil » pour valider.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur réseau');
    } finally {
      setUploading(false);
    }
  };

  const remove = () => {
    setError('');
    setInfo('Photo retirée. Cliquez sur « Sauvegarder le profil » pour valider.');
    onChange('');
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm text-zinc-400">Photo de profil</label>

      <div className="flex items-center gap-5">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-cyan-500/50 bg-zinc-800">
          {value ? (
            <Image
              src={value}
              alt="Photo de profil"
              fill
              sizes="96px"
              className="object-cover"
            />
          ) : (
            <User className="absolute inset-0 m-auto h-10 w-10 text-zinc-600" />
          )}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/70">
              <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={openPicker}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-cyan-400 disabled:opacity-50"
          >
            <Camera className="h-4 w-4" />
            {value ? 'Changer l’image' : 'Choisir une image'}
          </button>
          {value && (
            <button
              type="button"
              onClick={remove}
              disabled={uploading}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-600 px-4 py-2 text-sm text-zinc-300 hover:border-red-500/60 hover:text-red-400 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              Supprimer
            </button>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(',')}
          onChange={handleFile}
          className="hidden"
        />
      </div>

      <p className="text-xs text-zinc-500">JPEG, PNG ou WebP · 2 Mo maximum</p>
      {info && <p className="text-sm text-emerald-400">{info}</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
