'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Message } from '@/lib/types';

export function MessagesAdmin() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [showArchived, setShowArchived] = useState(false);

  const load = async () => {
    const res = await fetch(
      `/api/messages${showArchived ? '?archived=true' : ''}`,
      { credentials: 'include' },
    );
    if (res.status === 401) {
      router.push('/admin/login');
      return;
    }
    setMessages(await res.json());
  };

  useEffect(() => {
    load();
  }, [showArchived]);

  const toggleRead = async (id: string, isRead: boolean) => {
    await fetch(`/api/messages/${id}/read`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isRead }),
    });
    load();
  };

  const archive = async (id: string) => {
    await fetch(`/api/messages/${id}/archive`, {
      method: 'PATCH',
      credentials: 'include',
    });
    load();
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Messagerie</h1>
        <label className="flex items-center gap-2 text-sm text-zinc-400">
          <input
            type="checkbox"
            checked={showArchived}
            onChange={(e) => setShowArchived(e.target.checked)}
          />
          Afficher archivés
        </label>
      </div>

      <div className="space-y-4">
        {messages.length === 0 && (
          <p className="text-zinc-500">Aucun message.</p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`rounded-xl border p-4 ${
              msg.isRead
                ? 'border-zinc-800 bg-zinc-900/30'
                : 'border-cyan-500/30 bg-zinc-900/60'
            }`}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="font-medium">{msg.subject}</p>
                <p className="text-sm text-zinc-500">
                  {msg.senderName} &lt;{msg.senderEmail}&gt; ·{' '}
                  {new Date(msg.createdAt).toLocaleString('fr-FR')}
                </p>
              </div>
              {!msg.isRead && (
                <span className="rounded bg-cyan-500/20 px-2 py-0.5 text-xs text-cyan-400">
                  Non lu
                </span>
              )}
            </div>
            <p className="mb-4 whitespace-pre-wrap text-sm text-zinc-300">
              {msg.content}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => toggleRead(msg.id, !msg.isRead)}
                className="text-sm text-zinc-400 hover:text-zinc-200"
              >
                {msg.isRead ? 'Marquer non lu' : 'Marquer lu'}
              </button>
              {!msg.isArchived && (
                <button
                  onClick={() => archive(msg.id)}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Archiver
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
