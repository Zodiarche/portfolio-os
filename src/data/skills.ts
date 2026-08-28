import type { SkillCategory } from "../types/data";

export const categories: SkillCategory[] = [
  {
    label: "Frontend",
    color: "#6366f1",
    skills: [
      {
        name: "React",
        capabilities: [
          "Hooks avancés (useCallback, useMemo, useRef)",
          "Gestion d'état avec Context API et Zustand",
          "Data fetching et cache avec TanStack Query",
          "Routing avec TanStack Router / TanStack Start (SSR)",
          "Formulaires avec React Hook Form + Zod",
          "Animations avec Framer Motion",
          "Internationalisation avec i18next",
        ],
      },
      {
        name: "Next.js",
        capabilities: [
          "App Router et Server Components",
          "Middleware Edge pour l'authentification",
          "SSR, SSG et génération de pages dynamiques",
          "SEO : metadata, sitemap dynamique, robots.ts",
          "Turbopack pour le développement",
        ],
      },
      {
        name: "React Native / Expo",
        capabilities: [
          "Expo Router (navigation file-based)",
          "Authentification biométrique (empreinte, Face ID)",
          "Stockage sécurisé des tokens",
          "Data fetching avec TanStack Query",
          "Mises à jour OTA (expo-updates)",
        ],
      },
      {
        name: "TypeScript",
        capabilities: [
          "Typage strict : interfaces, types union, génériques",
          "Utility types (Partial, Pick, Omit, Record...)",
          "Type guards et narrowing",
          "Typage de composants React (props, events, refs)",
        ],
      },
      {
        name: "JavaScript",
        capabilities: [
          "ES2020+ : destructuring, optional chaining, nullish coalescing",
          "Modules ES et import dynamique",
          "Async/await, Promises (all, race, allSettled)",
          "Manipulation du DOM et observers (Mutation, Intersection, Resize)",
          "Web Workers, requestAnimationFrame",
          "Design patterns : module, factory, observer, singleton",
        ],
      },
      {
        name: "Tailwind CSS",
        capabilities: [
          "Utility-first CSS et composition de classes",
          "Configuration et thème custom",
          "Responsive design et animations",
        ],
      },
      {
        name: "HTML / SCSS",
        capabilities: [
          "HTML5 sémantique et accessibilité (ARIA)",
          "Flexbox, CSS Grid, responsive design",
          "SCSS : variables, nesting, mixins, partials",
          "Architecture BEM, animations CSS",
          "Mixins de breakpoints custom et fonctions clamp() responsive",
        ],
      },
    ],
  },
  {
    label: "Backend",
    color: "#0ea5e9",
    skills: [
      {
        name: "Node.js",
        capabilities: [
          "Serveurs HTTP et API REST",
          "ES Modules et architecture modulaire",
          "WebSocket pour la communication temps réel",
        ],
      },
      {
        name: "Fastify",
        capabilities: [
          "Architecture modulaire par plugins",
          "Validation des requêtes avec Zod",
          "Intégration Stripe : checkout et webhooks",
          "Emails transactionnels (Resend) et upload de médias (Cloudinary)",
          "Sécurité : Helmet, Rate Limiting, CORS",
        ],
      },
      {
        name: "Express",
        capabilities: [
          "Architecture en couches (Routes → Controllers → Services → Repositories)",
          "Authentification JWT avec cookies sécurisés et bcrypt",
          "Validation Zod par middleware",
          "Gestion d'erreurs centralisée",
          "Sécurité : Helmet, CORS, requêtes paramétrées",
        ],
      },
      {
        name: "Prisma",
        capabilities: [
          "Modélisation de schémas avec relations et index",
          "Migrations et versionning",
          "Client auto-généré avec requêtes typées",
        ],
      },
      {
        name: "SQL / PostgreSQL / MySQL",
        capabilities: [
          "Jointures, sous-requêtes, agrégations",
          "Conception de schémas et normalisation",
          "Indexation et optimisation des performances",
          "Transactions et intégrité des données",
        ],
      },
      {
        name: "MongoDB",
        capabilities: [
          "Modélisation de documents et collections",
          "Requêtes et agrégations",
          "Utilisation avec des serveurs temps réel",
        ],
      },
      {
        name: "Ruby",
        capabilities: [
          "OOP avancée : héritage, mixins, modules",
          "Développement sur un moteur de jeu 2D open-source (PokémonSDK)",
          "Contributions transversales : combat, rendu visuel, UI, effets",
          "Refactoring de code sur un projet à 65+ contributeurs",
        ],
      },
    ],
  },
  {
    label: "Outils & DevOps",
    color: "#10b981",
    skills: [
      {
        name: "Git",
        capabilities: [
          "Workflow multi-branches (master, staging, development, feat/, bugfix/)",
          "Rebase interactif, cherry-pick, résolution de conflits",
          "Stash et conventions de commits (Conventional Commits)",
        ],
      },
      {
        name: "GitHub / GitLab",
        capabilities: [
          "Code review : Pull/Merge Requests, discussions, approbations",
          "CI/CD : GitHub Actions et GitLab CI (pipelines lint/build/test)",
          "Protection de branches et versioning sémantique",
          "Gestion de projet : Issues, Milestones, Kanban",
          "Contribution open source : fork, upstream, PR/MR",
          "Dependabot et alertes de sécurité",
        ],
      },
      {
        name: "Docker",
        capabilities: [
          "Dockerfiles multi-stage pour des images optimisées",
          "Docker Compose multi-services (app, BDD, reverse proxy)",
          "Healthchecks, volumes, réseaux internes",
          "Sécurité : utilisateur non-root, .dockerignore",
          "Traefik comme reverse proxy avec SSL/TLS",
          "Monitoring d'erreurs auto-hébergé (GlitchTip, protocole Sentry) derrière Traefik",
        ],
      },
      {
        name: "Bun",
        capabilities: [
          "Runtime et package manager alternatif à Node.js/npm",
          "Gestion de monorepos avec les workspaces",
          "Orchestration de monorepo avec Turbo (pipelines build/test/lint mis en cache)",
          "Exécution de scripts et de tests",
        ],
      },
      {
        name: "Vite",
        capabilities: [
          "Configuration pour React, TypeScript et SCSS",
          "Hot Module Replacement (HMR)",
          "Alias de chemins et variables d'environnement typées",
          "Proxy dev server et plugins",
        ],
      },
      {
        name: "Biome",
        capabilities: [
          "Linter et formatter tout-en-un, remplaçant ESLint + Prettier",
          "Configuration monorepo avec overrides par package",
          "Intégration CI/CD",
        ],
      },
      {
        name: "Swagger / OpenAPI",
        capabilities: [
          "Documentation d'API REST interactive",
          "Génération automatique depuis le code (Fastify, Express)",
        ],
      },
      {
        name: "Docusaurus",
        capabilities: [
          "Sites de documentation statiques",
          "Maintenance et contribution de contenu technique",
        ],
      },
      {
        name: "Testing",
        capabilities: [
          "Vitest et Jest pour les tests unitaires et d'intégration",
          "Testing Library (React, DOM) pour les tests de composants",
          "Supertest pour les tests d'API HTTP",
          "Tests end-to-end avec Playwright",
          "Tests d'intégration API sur base PostgreSQL réelle",
          "Coverage avec V8",
        ],
      },
    ],
  },
];
