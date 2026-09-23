'use client';

import { useState } from 'react';

export function ApiConsole() {
  const [method, setMethod] = useState('GET');
  const [path, setPath] = useState('/api/projects');
  const [queryParams, setQueryParams] = useState('type=PERSONAL');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    setLoading(true);
    setResponse('');
    try {
      let url = path;
      if (method === 'GET' && queryParams.trim()) {
        url += (path.includes('?') ? '&' : '?') + queryParams.trim();
      }

      const res = await fetch(url, {
        method,
        credentials: 'include',
        headers: body ? { 'Content-Type': 'application/json' } : undefined,
        body: method !== 'GET' && body ? body : undefined,
      });

      const text = await res.text();
      try {
        setResponse(JSON.stringify(JSON.parse(text), null, 2));
      } catch {
        setResponse(text);
      }
    } catch (err) {
      setResponse(err instanceof Error ? err.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-2 font-mono text-sm uppercase tracking-widest text-cyan-400">
        Console API
      </h1>
      <p className="mb-8 text-3xl font-bold text-zinc-100">
        Module Démo Interactif
      </p>

      <div className="space-y-4 rounded-xl border border-cyan-500/20 bg-zinc-900/60 p-6">
        <div className="flex flex-wrap gap-3">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 font-mono text-sm text-zinc-200"
          >
            {['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            className="min-w-[200px] flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 font-mono text-sm text-zinc-200"
            placeholder="/api/projects"
          />
        </div>

        {method === 'GET' && (
          <input
            type="text"
            value={queryParams}
            onChange={(e) => setQueryParams(e.target.value)}
            placeholder="type=PERSONAL&tech=Nest.js"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 font-mono text-sm text-zinc-200"
          />
        )}

        {method !== 'GET' && (
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            placeholder='{"key": "value"}'
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 font-mono text-sm text-zinc-200"
          />
        )}

        <button
          onClick={sendRequest}
          disabled={loading}
          className="rounded-lg bg-cyan-500 px-6 py-2 font-semibold text-zinc-950 hover:bg-cyan-400 disabled:opacity-50"
        >
          {loading ? 'Envoi...' : 'Exécuter'}
        </button>

        {response && (
          <pre className="max-h-96 overflow-auto rounded-lg bg-zinc-950 p-4 font-mono text-sm text-emerald-400">
            {response}
          </pre>
        )}
      </div>
    </div>
  );
}
