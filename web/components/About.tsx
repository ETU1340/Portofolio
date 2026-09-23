import Image from 'next/image';
import { Coffee, Heart, Zap, MapPin } from 'lucide-react';
import type { Profile } from '@/lib/types';
import { SITE_OWNER } from '@/lib/site';

interface AboutProps {
  profile: Profile | null;
}

interface CodeLine {
  text: string;
  indent: number;
  highlight?: 'key' | 'str' | 'num' | 'bool';
}

function buildCodeLines(profile: Profile | null): CodeLine[] {
  const name = profile?.fullName ?? SITE_OWNER.fullName;
  const role = profile?.title ?? SITE_OWNER.title;
  const loc = profile?.location ?? SITE_OWNER.location;
  const exp = profile?.yearsOfExperience ?? SITE_OWNER.yearsOfExperience;

  return [
    { text: 'const developer = {', indent: 0 },
    { text: `  name: '${name}',`, indent: 1, highlight: 'key' },
    { text: `  alias: "${SITE_OWNER.pseudo}",`, indent: 1, highlight: 'key' },
    { text: `  role: '${role}',`, indent: 1, highlight: 'key' },
    { text: `  location: '${loc}',`, indent: 1, highlight: 'key' },
    { text: `  experience: ${exp},`, indent: 1, highlight: 'num' },
    { text: '  stack: [', indent: 1 },
    {
      text: `    ${SITE_OWNER.stack.primary.map((item) => `'${item}'`).join(', ')},`,
      indent: 2,
      highlight: 'str',
    },
    {
      text: `    ${SITE_OWNER.stack.secondary.map((item) => `'${item}'`).join(', ')},`,
      indent: 2,
      highlight: 'str',
    },
    { text: '  ],', indent: 1 },
    { text: '  passionate: true,', indent: 1, highlight: 'bool' },
    { text: `  available: ${profile?.availableForHire ?? true},`, indent: 1, highlight: 'bool' },
    { text: '};', indent: 0 },
  ];
}

const highlightClass: Record<NonNullable<CodeLine['highlight']>, string> = {
  key: 'text-neon-cyan',
  str: 'text-neon-green',
  num: 'text-orange-400',
  bool: 'text-purple-400',
};

export function About({ profile }: AboutProps) {
  const codeLines = buildCodeLines(profile);
  const bio = profile?.bio ?? '';
  const bioLines = bio.split('\n').filter(Boolean);
  const avatarUrl = profile?.avatarUrl;
  const fullName = profile?.fullName ?? SITE_OWNER.fullName;

  const stats = [
    {
      icon: Zap,
      label: "Années d'expérience",
      value: `${profile?.yearsOfExperience ?? SITE_OWNER.yearsOfExperience}+`,
    },
    {
      icon: Coffee,
      label: 'Projets livrés',
      value: `${profile?.projectsDelivered ?? SITE_OWNER.projectsDelivered}+`,
    },
    { icon: Heart, label: 'Clients satisfaits', value: '100%' },
    {
      icon: MapPin,
      label: 'Basé à',
      value: profile?.location?.split(',')[0] ?? SITE_OWNER.location,
    },
  ];

  return (
    <section id="about" className="relative py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <p className="font-mono text-sm text-neon-green mb-2">
            <span className="text-muted-foreground">$</span> cat about.md
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">À propos de moi</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Colonne gauche : photo + bio */}
          <div className="space-y-6">
            {avatarUrl && (
              <div className="flex md:justify-start justify-center">
                <div className="relative h-40 w-40 rounded-full border-2 border-neon-green/50 glow-green overflow-hidden">
                  <Image
                    src={avatarUrl}
                    alt={fullName}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {bioLines.length > 0 ? (
                bioLines.map((paragraph, i) => <p key={i}>{paragraph}</p>)
              ) : (
                <>
                  <p>
                    Je suis un développeur web full-stack basé à {SITE_OWNER.location},
                    passionné par la création d&apos;interfaces utilisateur soignées
                    et d&apos;architectures robustes.
                  </p>
                  <p>
                    J&apos;aime résoudre des problèmes complexes avec des solutions
                    élégantes. Mon objectif : livrer des produits qui procurent une
                    véritable satisfaction d&apos;utilisation.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Colonne droite : bloc code */}
          <div className="relative">
            <div className="rounded-xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden">
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
                        line.highlight
                          ? highlightClass[line.highlight]
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
