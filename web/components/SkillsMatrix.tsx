import { Skill, SKILL_CATEGORY_LABELS, SkillCategory } from '@/lib/types';

export function SkillsMatrix({ skills }: { skills: Skill[] }) {
  const grouped = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<SkillCategory, Skill[]>,
  );

  const categories: SkillCategory[] = [
    'BACKEND',
    'FRONTEND',
    'DATABASE',
    'DEVOPS',
  ];

  return (
    <section id="skills" className="border-t border-cyan-500/10 bg-zinc-950/50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-2 font-mono text-sm uppercase tracking-widest text-cyan-400">
          Compétences
        </h2>
        <p className="mb-10 text-3xl font-bold text-zinc-100">
          Matrice Technique
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((cat) => (
            <div
              key={cat}
              className="rounded-xl border border-cyan-500/20 bg-zinc-900/40 p-6"
            >
              <h3 className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider text-cyan-400">
                {SKILL_CATEGORY_LABELS[cat]}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(grouped[cat] ?? []).map((skill) => (
                  <span
                    key={skill.id}
                    className="rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-1.5 font-mono text-sm text-zinc-200"
                  >
                    {skill.name}
                  </span>
                ))}
                {!(grouped[cat]?.length) && (
                  <span className="text-sm text-zinc-600">—</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
