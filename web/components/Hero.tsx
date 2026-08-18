import Link from 'next/link';

export function Hero() {
  const cvUrl = process.env.NEXT_PUBLIC_CV_URL;
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL;

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.15)_0%,_transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <p className="mb-4 font-mono text-sm text-cyan-400">
          // Developer Showcase Platform
        </p>
        <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-tight text-zinc-50 md:text-6xl">
          Mettre en valeur mes réalisations{' '}
          <span className="text-cyan-400">techniques</span> et{' '}
          <span className="text-cyan-400">métier</span>
        </h1>
        <p className="mb-10 max-w-2xl text-lg text-zinc-400">
          Projets personnels, open source et professionnels — architecture,
          code source et démos live en un seul endroit.
        </p>

        <div className="flex flex-wrap gap-4">
          {cvUrl && (
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-400"
            >
              Télécharger CV
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-600 px-6 py-3 text-zinc-200 transition hover:border-cyan-500/50 hover:text-cyan-400"
            >
              GitHub
            </a>
          )}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-600 px-6 py-3 text-zinc-200 transition hover:border-cyan-500/50 hover:text-cyan-400"
            >
              LinkedIn
            </a>
          )}
          <Link
            href="/console"
            className="rounded-lg border border-cyan-500/30 px-6 py-3 font-mono text-sm text-cyan-400 transition hover:bg-cyan-500/10"
          >
            Console API →
          </Link>
        </div>
      </div>
    </section>
  );
}
