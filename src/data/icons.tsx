import { lazy } from "react";
import type { DesktopItem, FolderData } from "../types/desktop";

// Each page is code-split into its own chunk and only fetched when its window
// opens, keeping the initial bundle free of pages the visitor may never view.
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CVPage = lazy(() => import("./pages/CVPage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const KeystoneProject = lazy(() =>
  import("./pages/KeystoneProject").then((module) => ({ default: module.KeystoneProject })),
);
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
      },
      {
        id: "cv",
        title: "CV.pdf",
        icon: "📑",
        component: CVPage,
      },
    ],
  },
  {
    id: "folder-projects",
    title: "Mes Projets",
    icon: "💼",
    files: [
      {
        id: "project-keystone",
        title: "Keystone.exe",
        icon: "🗝️",
        component: KeystoneProject,
      },
      {
        id: "project-minitroopers",
        title: "Minitroopers.exe",
        icon: "🪖",
        component: MinitroopersProject,
      },
      {
        id: "project-portfolio",
        title: "Portfolio OS.exe",
        icon: "🖥️",
        component: PortfolioProject,
      },
      {
        id: "project-maison-bsg",
        title: "La Maison BSG.exe",
        icon: "🏠",
        component: MaisonBSGProject,
      },
      {
        id: "project-pokemon-workshop",
        title: "Pokémon Workshop.exe",
        icon: "⚙️",
        component: PokemonWorkshopProject,
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
