import { Code2, Database, Server, Cloud } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Skill, SKILL_CATEGORY_LABELS, SkillCategory } from '@/lib/types';

interface CategoryMeta {
  icon: LucideIcon;
  key: SkillCategory;
}

const categories: CategoryMeta[] = [
  { icon: Code2, key: 'FRONTEND' },
  { icon: Server, key: 'BACKEND' },
  { icon: Database, key: 'DATABASE' },
  { icon: Cloud, key: 'DEVOPS' },
];

export function SkillsMatrix({ skills }: { skills: Skill[] }) {
  const grouped = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<SkillCategory, Skill[]>,
  );

  return (
    <section id="skills" className="relative py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <p className="font-mono text-sm text-neon-green mb-2">
            <span className="text-muted-foreground">$</span> ls -la skills/
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Compétences techniques
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Voici l&apos;arsenal technique que j&apos;utilise au quotidien pour
            transformer des idées en produits fonctionnels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className="rounded-xl border border-border bg-card/50 p-6 transition-all duration-300 hover:border-neon-green/40 hover:bg-card"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neon-green/10">
                  <cat.icon className="h-5 w-5 text-neon-green" />
                </div>
                <h3 className="font-mono text-lg font-semibold text-foreground">
                  {SKILL_CATEGORY_LABELS[cat.key]}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {(grouped[cat.key] ?? []).map((skill) => (
                  <span
                    key={skill.id}
                    className="inline-flex items-center rounded-lg border border-border bg-secondary/50 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-all duration-200 hover:border-neon-green/40 hover:text-neon-green hover:bg-neon-green/5"
                  >
                    {skill.name}
                  </span>
                ))}
                {!(grouped[cat.key]?.length) && (
                  <span className="font-mono text-sm text-muted-foreground/50">
                    —
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
