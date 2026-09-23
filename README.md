# Portfolio & Developer Showcase Platform

Plateforme vitrine publique + dashboard d'administration + API REST.

## Stack

| Composant | Technologie |
|-----------|-------------|
| Vitrine & Admin | Next.js 15, Tailwind CSS, TypeScript |
| API | Nest.js, JWT, Swagger |
| Base de données | PostgreSQL + Prisma ORM |

## Structure

```
Portofolio/
  api/                 # Nest.js + Prisma
  web/                 # Next.js (vitrine + /admin)
  docker-compose.yml   # PostgreSQL 16
  .env.example
```

## Démarrage rapide

### 1. PostgreSQL

```bash
cp .env.example .env
docker compose up -d
```

### 2. API

```bash
cp .env.example api/.env   # ou éditer api/.env
cd api
npm install
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

API : http://localhost:4000  
Swagger : http://localhost:4000/api/docs

**Compte admin (seed)** : `admin@portfolio.local` / `Admin123!`

### 3. Web

```bash
cp .env.example web/.env.local   # ou éditer web/.env.local
cd web
npm install
npm run dev
```

Vitrine : http://localhost:3000  
Admin : http://localhost:3000/admin/login  
Console API : http://localhost:3000/console

## Fonctionnalités

### Vitrine
- Hero avec liens CV / GitHub / LinkedIn
- Galerie projets filtrable (type, statut, techno)
- Fiches détaillées `/projets/[slug]` avec Markdown assaini
- Matrice de compétences par pilier technique
- Formulaire de contact
- Console API interactive

### Admin
- Authentification JWT (cookies HTTP-only)
- CRUD projets complet
- Gestion compétences + réordonnancement
- Inbox messages (lu/non lu, archivage)

### API
- `GET /api/projects` — filtres `type`, `status`, `tech`
- `GET /api/projects/:slug`
- `POST/PUT/DELETE /api/projects/:id` (admin)
- `GET/POST/PUT/DELETE /api/skills` + `PATCH /api/skills/reorder/all`
- `POST /api/contact` + gestion messages admin
- `POST /api/auth/login|refresh|logout`, `GET /api/auth/me`

## Variables d'environnement

Voir [`.env.example`](.env.example) pour la liste complète.
