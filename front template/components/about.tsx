'use client';

import { Coffee, Heart, Zap, MapPin } from 'lucide-react';

const codeLines = [
  { text: 'const developer = {', indent: 0 },
  { text: "  name: 'Alex Carter',", indent: 1, highlight: 'key' },
  { text: "  role: 'Full-Stack Developer',", indent: 1, highlight: 'key' },
  { text: "  location: 'Paris, France',", indent: 1, highlight: 'key' },
  { text: '  experience: 5,', indent: 1, highlight: 'num' },
  { text: '  stack: [', indent: 1 },
  { text: "    'Next.js', 'React', 'TypeScript',", indent: 2, highlight: 'str' },
  { text: "    'Node.js', 'Tailwind', 'Supabase',", indent: 2, highlight: 'str' },
  { text: '  ],', indent: 1 },
  { text: '  passionate: true,', indent: 1, highlight: 'bool' },
  { text: '  available: true,', indent: 1, highlight: 'bool' },
  { text: '};', indent: 0 },
];

const stats = [
  { icon: Zap, label: "Années d'expérience", value: '5+' },
  { icon: Coffee, label: 'Projets livrés', value: '40+' },
  { icon: Heart, label: 'Clients satisfaits', value: '100%' },
  { icon: MapPin, label: 'Basé à', value: 'Paris' },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <p className="font-mono text-sm text-neon-green mb-2">
            <span className="text-muted-foreground">$</span> cat about.md
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">À propos de moi</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Je suis un développeur web full-stack basé à Paris, passionné par
              la création d'interfaces utilisateur soignées et d'architectures
              robustes. Mon parcours a commencé il y a 5 ans, et depuis, je n'ai
              jamais cessé d'apprendre.
            </p>
            <p>
              J'aime résoudre des problèmes complexes avec des solutions
              élégantes. Je privilégie un code propre, maintenable et testé.
              Mon objectif : livrer des produits qui ne se contentent pas de
              fonctionner, mais qui procurent une véritable satisfaction
              d'utilisation.
            </p>
            <p>
              Quand je ne code pas, vous me trouverez probablement en train de
              contribuer à des projets open-source, explorer de nouveaux
              outils, ou déguster un bon café en lisant la doc d'un framework
              qui vient de sortir.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden glow-green/30">
              <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <span className="h-3 w-3 rounded-full bg-neon-green/80" />
                </div>
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  developer.ts
                </span>
              </div>
              <div className="p-5 font-mono text-sm overflow-x-auto scrollbar-thin">
                {codeLines.map((line, i) => (
                  <div key={i} className="flex gap-4 py-0.5">
                    <span className="text-muted-foreground/40 select-none w-6 text-right">
                      {i + 1}
                    </span>
                    <span
                      className={
                        line.highlight === 'key'
                          ? 'text-neon-cyan'
                          : line.highlight === 'str'
                            ? 'text-neon-green'
                            : line.highlight === 'num'
                              ? 'text-orange-400'
                              : line.highlight === 'bool'
                                ? 'text-purple-400'
                                : 'text-foreground'
                      }
                    >
                      {' '.repeat(line.indent * 2)}
                      {line.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-card/50 p-5 text-center transition-all duration-300 hover:border-neon-green/40 hover:bg-card"
            >
              <Icon className="h-6 w-6 mx-auto mb-2 text-neon-green" />
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
