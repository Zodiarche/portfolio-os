import { lazy } from "react";
import type { DesktopItem, FileData, FolderData } from "../types/desktop";

// Each page is code-split into its own chunk and only fetched when its window
// opens, keeping the initial bundle free of pages the visitor may never view.
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CVPage = lazy(() => import("./pages/CVPage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const MaisonBSGProject = lazy(() =>
  import("./pages/MaisonBSGProject").then((module) => ({ default: module.MaisonBSGProject })),
);
const MinitroopersProject = lazy(() =>
  import("./pages/MinitroopersProject").then((module) => ({ default: module.MinitroopersProject })),
);
const PokemonWorkshopProject = lazy(() =>
  import("./pages/PokemonWorkshopProject").then((module) => ({
    default: module.PokemonWorkshopProject,
  })),
);
const PortfolioProject = lazy(() =>
  import("./pages/ProjectPage").then((module) => ({ default: module.PortfolioProject })),
);

/** Type guard to distinguish folders (with nested files) from standalone files. */
export function isFolder(item: DesktopItem): item is FolderData {
  return "files" in item;
}

export const desktopItems: DesktopItem[] = [
  {
    id: "folder-about",
    title: "À propos",
    icon: "👤",
    files: [
      {
        id: "about",
        title: "À propos.txt",
        icon: "📄",
        component: AboutPage,
        subtitle: "Parcours, ce qui me motive, ce que je cherche",
      },
      {
        id: "cv",
        title: "CV.pdf",
        icon: "📑",
        component: CVPage,
        subtitle: "Mon CV en une page",
      },
    ],
  },
  {
    id: "folder-projects",
    title: "Mes Projets",
    icon: "💼",
    files: [
      {
        id: "project-minitroopers",
        title: "Minitroopers.exe",
        icon: "🪖",
        component: MinitroopersProject,
        subtitle:
          "Jeu de gestion d'armée Flash reconstruit sur une stack moderne, combat d'époque rejoué via Ruffle",
        stack: ["React", "Node.js", "PostgreSQL", "Ruffle"],
      },
      {
        id: "project-portfolio",
        title: "Portfolio OS.exe",
        icon: "🖥️",
        component: PortfolioProject,
        subtitle:
          "Ce bureau : un portfolio conçu comme un système d'exploitation, sans librairie de navigation",
        stack: ["React", "TypeScript", "Vite"],
      },
      {
        id: "project-maison-bsg",
        title: "La Maison BSG.exe",
        icon: "🏠",
        component: MaisonBSGProject,
        subtitle:
          "Boutique artisanale en ligne : une API, un site web et une application mobile dans un même monorepo",
        stack: ["Next.js", "Fastify", "Expo"],
      },
      {
        id: "project-pokemon-workshop",
        title: "Pokémon Workshop.exe",
        icon: "⚙️",
        component: PokemonWorkshopProject,
        subtitle: "Écosystème open-source de création de jeux, Core Contributor & Community Lead",
        stack: ["Ruby", "TypeScript", "Electron"],
      },
    ],
  },
  {
    id: "skills",
    title: "Compétences.exe",
    icon: "⚡",
    component: SkillsPage,
  },
  {
    id: "contact",
    title: "Contact.exe",
    icon: "✉️",
    component: ContactPage,
  },
];

/** Every file of the desktop, folders flattened away. Order follows the desktop. */
export function flattenFiles(): FileData[] {
  const files: FileData[] = [];
  for (const item of desktopItems) {
    if (isFolder(item)) {
      files.push(...item.files);
      continue;
    }
    files.push(item);
  }
  return files;
}

/** Looks an item up by id, searching folders and their files alike. */
export function findItemById(itemId: string): DesktopItem | undefined {
  for (const item of desktopItems) {
    if (item.id === itemId) return item;
    if (isFolder(item)) {
      const file = item.files.find((candidate) => candidate.id === itemId);
      if (file) return file;
    }
  }
  return undefined;
}
