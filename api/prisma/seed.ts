import { PrismaClient, ProjectStatus, ProjectType, SkillCategory } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@portfolio.local';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'Admin123!';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, passwordHash },
  });

  await prisma.skill.deleteMany();
  await prisma.project.deleteMany();

  const skills = [
    { name: 'Nest.js', category: SkillCategory.BACKEND, order: 0 },
    { name: 'Node.js', category: SkillCategory.BACKEND, order: 1 },
    { name: 'PHP', category: SkillCategory.BACKEND, order: 3 },
    { name: 'Next.js', category: SkillCategory.FRONTEND, order: 0 },
    { name: 'React', category: SkillCategory.FRONTEND, order: 1 },
    { name: 'Tailwind CSS', category: SkillCategory.FRONTEND, order: 2 },
    { name: 'PostgreSQL', category: SkillCategory.DATABASE, order: 0 },
    { name: 'Prisma', category: SkillCategory.DATABASE, order: 1 },
    { name: 'Docker', category: SkillCategory.DEVOPS, order: 0 },
    { name: 'GitHub Actions', category: SkillCategory.DEVOPS, order: 1 },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }

  const projects = [
    {
      title: 'Portfolio & Developer Showcase',
      slug: 'portfolio-showcase',
      summary:
        'Plateforme vitrine avec dashboard admin, API REST Nest.js et base PostgreSQL.',
      description: `## Contexte & Problème

Besoin d'une vitrine professionnelle centralisant projets personnels, open source et professionnels avec une étude de cas technique détaillée.

## Choix d'Architecture

- **Front-office** : Next.js App Router (SSR/SSG) pour le SEO
- **Back-office** : Dashboard admin sécurisé JWT
- **API** : Nest.js avec validation stricte et Swagger
- **Persistance** : PostgreSQL + Prisma ORM

## Métriques & Résultats

- Temps de chargement optimisé via SSG
- API documentée OpenAPI
- Authentification JWT HTTP-only`,
      projectType: ProjectType.PERSONAL,
      status: ProjectStatus.LIVE,
      domainName: 'http://localhost:3000',
      githubUrl: 'https://github.com/ETU1340/Portofolio',
      isGithubPublic: true,
      technologies: ['Nest.js', 'Next.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
      highlights: ['Auth JWT', 'CI/CD ready', 'Dockerized', 'Swagger OpenAPI'],
      isPublished: true,
    },
    {
      title: 'E-Commerce API',
      slug: 'ecommerce-api',
      summary: 'API REST modulaire pour une plateforme e-commerce avec authentification et paiements.',
      description: `## Contexte & Problème

Concevoir une API scalable pour gérer catalogue, commandes et utilisateurs.

## Architecture

Architecture hexagonale avec modules découplés, cache Redis et file d'attente pour les notifications.

## Résultats

- 99.9% uptime en staging
- Temps de réponse moyen < 120ms`,
      projectType: ProjectType.PROFESSIONAL,
      status: ProjectStatus.IN_PROGRESS,
      githubUrl: 'https://github.com/example/ecommerce-api',
      isGithubPublic: false,
      technologies: ['Nest.js', 'PostgreSQL', 'Redis', 'Docker'],
      highlights: ['Architecture Hexagonale', 'Rate Limiting', 'JWT Auth'],
      isPublished: true,
    },
    {
      title: 'Open Source CLI Tool',
      slug: 'oss-cli-tool',
      summary: 'Outil CLI pour automatiser les workflows de développement.',
      description: `## Contexte

Automatiser les tâches répétitives du workflow dev (lint, test, deploy).

## Stack

Node.js, TypeScript, Commander.js

## Impact

500+ téléchargements npm, contributions de la communauté.`,
      projectType: ProjectType.OPEN_SOURCE,
      status: ProjectStatus.LIVE,
      domainName: 'https://www.npmjs.com',
      githubUrl: 'https://github.com/example/oss-cli',
      isGithubPublic: true,
      technologies: ['Node.js', 'TypeScript'],
      highlights: ['Open Source', 'npm published', 'Plugin system'],
      isPublished: true,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  await prisma.profile.deleteMany();
  await prisma.profile.create({
    data: {
      fullName: 'VALIMBAVAKA Nomena Finoana',
      title: 'Expert Next.js & React & PHP',
      bio: "Je suis un développeur web full-stack basé à Madagascar, passionné par la création d'interfaces utilisateur soignées et d'architectures robustes. Mon parcours a commencé il y a 5 ans, et depuis, je n'ai jamais cessé d'apprendre.\n\nJ'aime résoudre des problèmes complexes avec des solutions élégantes. Je privilégie un code propre, maintenable et testé. Mon objectif : livrer des produits qui ne se contentent pas de fonctionner, mais qui procurent une véritable satisfaction d'utilisation.\n\nQuand je ne code pas, vous me trouverez probablement en train de contribuer à des projets open-source, explorer de nouveaux outils, ou déguster un bon café en lisant la doc d'un framework qui vient de sortir.",
      email: 'nousmfinoana@gmail.com',
      phone: '+261 0385053138',
      location: 'Madagascar',
      avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=Noums',
      cvUrl: null,
      githubUrl: 'https://github.com',
      linkedinUrl: 'https://linkedin.com',
      websiteUrl: null,
      yearsOfExperience: 5,
      projectsDelivered: 40,
      availableForHire: true,
    },
  });

  console.log(`Seed complete. Admin: ${adminEmail}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
