# Portfolio & Developer Showcase Platform

Plateforme vitrine publique + dashboard d'administration + API REST.

## En ligne

| Surface | URL |
|---------|-----|
| Vitrine | https://portofolio-mu-seven-39.vercel.app/ |
| Admin | https://portofolio-mu-seven-39.vercel.app/admin/login |
| Console API | https://portofolio-mu-seven-39.vercel.app/console |
| API | https://portofolio-t374.vercel.app |
| Swagger | https://portofolio-t374.vercel.app/api/docs |

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
```

## Démarrage local

Les fichiers d'environnement restent sur la machine et ne sont pas versionnés.

### 1. PostgreSQL

```bash
docker compose up -d
```

### 2. API

```bash
cd api
npm install
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

API : http://localhost:3000
Swagger : http://localhost:3000/api/docs

### 3. Web

```bash
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

## Domaines

Variables utilisées pour les URL publiques, sans valeur secrète :

| Variable | Rôle | Valeur publique |
|----------|------|-----------------|
| `NEXT_PUBLIC_SITE_URL` | URL de la vitrine | `https://portofolio-mu-seven-39.vercel.app` |
| `API_INTERNAL_URL` | URL de l'API appelée par le front | `https://portofolio-t374.vercel.app` |
| `CORS_ORIGIN` | Origine autorisée côté API | `https://portofolio-mu-seven-39.vercel.app` |
