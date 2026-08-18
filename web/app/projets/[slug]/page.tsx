import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MarkdownContent } from '@/components/MarkdownContent';
import { getProject, getProjects } from '@/lib/api';
import {
  PROJECT_TYPE_LABELS,
  PROJECT_STATUS_LABELS,
} from '@/lib/types';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects().catch(() => []);
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await getProject(slug);
    return {
      title: `${project.title} | Portfolio`,
      description: project.summary,
    };
  } catch {
    return { title: 'Projet | Portfolio' };
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  let project;
  try {
    project = await getProject(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl flex-1 px-6 py-12">
        <Link
          href="/#projects"
          className="mb-6 inline-block text-sm text-cyan-400 hover:underline"
        >
          ← Retour aux projets
        </Link>

        <div className="mb-6 flex flex-wrap gap-2">
          <span className="rounded-full border border-violet-500/50 px-3 py-1 text-xs text-violet-300">
            {PROJECT_TYPE_LABELS[project.projectType]}
          </span>
          <span className="rounded-full border border-zinc-600 px-3 py-1 text-xs text-zinc-400">
            {PROJECT_STATUS_LABELS[project.status]}
          </span>
        </div>

        <h1 className="mb-4 text-4xl font-bold text-zinc-100">
          {project.title}
        </h1>
        <p className="mb-8 text-lg text-zinc-400">{project.summary}</p>

        <div className="mb-8 flex flex-wrap gap-3">
          {project.domainName && (
            <a
              href={project.domainName}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-cyan-500/10 px-4 py-2 text-cyan-400 hover:bg-cyan-500/20"
            >
              Site Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-700 px-4 py-2 text-zinc-300 hover:border-cyan-500/50"
            >
              GitHub ({project.isGithubPublic ? 'Public' : 'Privé'})
            </a>
          )}
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded bg-zinc-800 px-2 py-1 font-mono text-xs text-cyan-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.highlights.length > 0 && (
          <div className="mb-10 rounded-xl border border-cyan-500/20 bg-zinc-900/40 p-6">
            <h2 className="mb-3 font-mono text-sm uppercase text-cyan-400">
              Highlights Architecture
            </h2>
            <ul className="space-y-1 text-zinc-300">
              {project.highlights.map((h) => (
                <li key={h}>▸ {h}</li>
              ))}
            </ul>
          </div>
        )}

        <MarkdownContent content={project.description} />
      </main>
      <Footer />
    </>
  );
}
