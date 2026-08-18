'use client';

import { useState } from 'react';
import { sendContact } from '@/lib/api';

export function ContactForm() {
  const [form, setForm] = useState({
    senderName: '',
    senderEmail: '',
    subject: '',
    content: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  );
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      await sendContact(form);
      setStatus('success');
      setForm({ senderName: '', senderEmail: '', subject: '', content: '' });
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    }
  };

  const update = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-xl px-6">
        <h2 className="mb-2 font-mono text-sm uppercase tracking-widest text-cyan-400">
          Contact
        </h2>
        <p className="mb-8 text-3xl font-bold text-zinc-100">
          Discutons de votre projet
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Votre nom"
            required
            value={form.senderName}
            onChange={update('senderName')}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-500 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Votre email"
            required
            value={form.senderEmail}
            onChange={update('senderEmail')}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Sujet"
            required
            value={form.subject}
            onChange={update('subject')}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-500 focus:outline-none"
          />
          <textarea
            placeholder="Votre message"
            required
            rows={5}
            value={form.content}
            onChange={update('content')}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full rounded-lg bg-cyan-500 px-4 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-400 disabled:opacity-50"
          >
            {status === 'loading' ? 'Envoi...' : 'Envoyer'}
          </button>
          {status === 'success' && (
            <p className="text-center text-sm text-emerald-400">
              Message envoyé avec succès !
            </p>
          )}
          {status === 'error' && (
            <p className="text-center text-sm text-red-400">{error}</p>
          )}
        </form>
      </div>
    </section>
  );
}
