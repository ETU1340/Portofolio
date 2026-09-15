'use client';

import {
  Code2,
  Database,
  Server,
  Cloud,
  GitBranch,
  Layers,
} from 'lucide-react';

const categories = [
  {
    icon: Code2,
    title: 'Frontend',
    color: 'neon-green',
    skills: [
      { name: 'Next.js', level: 95 },
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Framer Motion', level: 80 },
    ],
  },
  {
    icon: Server,
    title: 'Backend',
    color: 'neon-cyan',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Express', level: 85 },
      { name: 'tRPC', level: 78 },
      { name: 'GraphQL', level: 75 },
      { name: 'REST API', level: 90 },
    ],
  },
  {
    icon: Database,
    title: 'Base de données',
    color: 'neon-blue',
    skills: [
      { name: 'PostgreSQL', level: 87 },
      { name: 'Supabase', level: 90 },
      { name: 'Prisma', level: 85 },
      { name: 'Redis', level: 75 },
      { name: 'MongoDB', level: 70 },
    ],
  },
  {
    icon: Cloud,
    title: 'DevOps & Outils',
    color: 'neon-green',
    skills: [
      { name: 'Docker', level: 80 },
      { name: 'CI/CD', level: 82 },
      { name: 'Vercel', level: 90 },
      { name: 'AWS', level: 70 },
      { name: 'Git', level: 95 },
    ],
  },
];

const tools = [
  'VS Code',
  'Git',
  'GitHub',
  'Figma',
  'Postman',
  'Vercel',
  'Supabase',
  'Docker',
  'ESLint',
  'Prettier',
  'Jest',
  'Vitest',
  'Playwright',
  'Storybook',
  'Notion',
  'Linear',
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <p className="font-mono text-sm text-neon-green mb-2">
            <span className="text-muted-foreground">$</span> ls -la skills/
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">Compétences techniques</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Voici l'arsenal technique que j'utilise au quotidien pour transformer
            des idées en produits fonctionnels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="rounded-xl border border-border bg-card/50 p-6 transition-all duration-300 hover:border-neon-green/40 hover:bg-card"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neon-green/10">
                  <cat.icon className="h-5 w-5 text-neon-green" />
                </div>
                <h3 className="font-mono text-lg font-semibold text-foreground">
                  {cat.title}
                </h3>
              </div>

              <div className="space-y-4">
                {cat.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="font-mono text-sm text-foreground">
                        {skill.name}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-neon-green to-neon-cyan transition-all duration-700"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <GitBranch className="h-5 w-5 text-neon-cyan" />
            <h3 className="font-mono text-lg font-semibold">Outils & Workflow</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span
                key={tool}
                className="inline-flex items-center rounded-lg border border-border bg-card/50 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-all duration-200 hover:border-neon-green/40 hover:text-neon-green hover:bg-neon-green/5"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
