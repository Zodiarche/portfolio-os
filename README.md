# Portfolio OS

Portfolio interactif conçu comme un système d'exploitation. Chaque section s'ouvre dans une fenêtre que l'on peut déplacer, redimensionner, minimiser et maximiser — le tout avec une version mobile dédiée qui reprend les codes d'un écran d'accueil smartphone.

**[guillemin.dev](https://guillemin.dev)**

## Stack

- React 18 + TypeScript
- Material UI + Emotion
- Framer Motion (animations de fenêtres et transitions mobile)
- react-rnd (drag & resize)
- Vite
- Docker + Nginx (production)

## Fonctionnalités

### Bureau (desktop)

- Fenêtres déplaçables et redimensionnables avec minimisation animée vers la barre des tâches
- Icônes du bureau repositionnables avec placement automatique sans chevauchement
- Explorateur de dossiers pour naviguer entre les sections
- Barre des tâches avec horloge temps réel
- Gestion de la pile de fenêtres (focus, z-index, état minimisé)

### Mobile

- Écran d'accueil façon smartphone avec grille d'applications
- Ouverture plein écran de chaque section avec transitions animées
- Navigation par gestes adaptée au tactile

### Contenu

- Page « À propos » et CV intégré en PDF
- Vitrine de projets (Keystone, Portfolio OS, La Maison BSG, Pokémon Workshop)
- Page de compétences
- Formulaire de contact

## Démarrage

```bash
bun install
bun run dev
```

L'application est servie sur `http://localhost:5173`.

## Build

```bash
bun run build     # compile TypeScript puis génère le bundle Vite
bun run preview   # prévisualise le build de production
bun run lint      # Biome check (lint + format)
```

## Docker (production)

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

L'image est servie par Nginx (voir `nginx.conf` et `Dockerfile`).

## Structure

```
src/
  components/
    Desktop.tsx           Orchestration du bureau
    OSWindow.tsx          Fenêtre draggable/resizable
    Taskbar.tsx           Barre des tâches + horloge
    DesktopIcon.tsx       Icône repositionnable
    FolderExplorer.tsx    Explorateur de dossiers
    mobile/               Shell mobile (home screen, app view)
  hooks/
    useWindowManager.tsx  Gestion de la pile de fenêtres
    useWindowAnimation.ts Animations d'ouverture/minimisation
    useIconGrid.ts        Placement automatique des icônes
    useClock.ts           Horloge temps réel
    useContactForm.ts     État du formulaire de contact
    useMobileNavigation.ts Navigation mobile
  data/
    icons.tsx             Configuration des icônes et dossiers
    skills.ts             Liste des compétences
    pages/                Contenu : About, CV, Skills, Contact, projets
  types/                  Définitions TypeScript partagées
  constants/              Constantes globales
  theme/                  Thème Material UI
public/
  cv.pdf                  CV au format PDF
  wallpaper.jpg           Fond d'écran du bureau
  favicon.svg
  og-image.png            Image Open Graph (LinkedIn, Slack, Discord…)
```

## Auteur

**Benjamin Guillemin** — Développeur fullstack web & mobile, basé à Bordeaux.
TypeScript / React / Next.js / Node.js / React Native, et Rust / Tauri sur [Keystone](https://keystone.guillemin.dev).

Portfolio : [guillemin.dev](https://guillemin.dev) · CV : [guillemin.dev/cv.pdf](https://guillemin.dev/cv.pdf) · [LinkedIn](https://www.linkedin.com/in/benjamin-guillemin)
