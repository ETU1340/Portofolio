import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/BrandIcons';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GridBackground } from '@/components/GridBackground';
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
      title: project.title,
      description: project.summary,
    };
  } catch {
    return { title: 'Projet' };
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
      <GridBackground />
      <Navbar />
      <main className="relative mx-auto max-w-4xl flex-1 px-6 pt-28 pb-16">
        <Link
          href="/#projects"
          className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-neon-green hover:glow-text-green"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux projets
        </Link>

        <p className="font-mono text-sm text-neon-green mb-2">
          <span className="text-muted-foreground">$</span> cat projects/{project.slug}.md
        </p>

        <div className="mb-6 flex flex-wrap gap-2">
          <span className="rounded-md border border-neon-green/40 bg-neon-green/10 px-3 py-1 font-mono text-xs text-neon-green">
            {PROJECT_TYPE_LABELS[project.projectType]}
          </span>
          <span className="rounded-md border border-border px-3 py-1 font-mono text-xs text-muted-foreground">
            {PROJECT_STATUS_LABELS[project.status]}
          </span>
        </div>

        <h1 className="mb-4 text-4xl font-bold text-foreground">
          {project.title}
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">{project.summary}</p>

        <div className="mb-8 flex flex-wrap gap-3">
          {project.domainName && (
            <a
              href={project.domainName}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-neon-green px-4 py-2 font-mono text-sm font-semibold text-background transition-all hover:glow-green"
            >
              <ExternalLink className="h-4 w-4" />
              Site Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-2 font-mono text-sm text-foreground transition-all hover:border-neon-cyan hover:text-neon-cyan"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub ({project.isGithubPublic ? 'Public' : 'Privé'})
            </a>
          )}
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.highlights.length > 0 && (
          <div className="mb-10 rounded-xl border border-border bg-card/50 p-6">
            <h2 className="mb-3 font-mono text-sm text-neon-cyan">
              // Highlights Architecture
            </h2>
            <ul className="space-y-1 text-muted-foreground">
              {project.highlights.map((h) => (
                <li key={h} className="font-mono text-sm">
                  ▸ {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="rounded-xl border border-border bg-card/50 p-6">
          <MarkdownContent content={project.description} />
        </div>
      </main>
      <Footer />
    </>
  );
}
