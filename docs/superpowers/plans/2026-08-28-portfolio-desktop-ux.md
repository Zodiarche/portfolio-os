# Remplir le bureau et les dossiers, plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer le bureau et les dossiers vides par du contenu utile, une fenêtre d'accueil non modale, un menu démarrer épinglé et un menu contextuel fonctionnel.

**Architecture:** Aucun nouveau système. La fenêtre d'accueil réutilise le gestionnaire de fenêtres existant, les deux menus partagent un hook de navigation clavier conforme au patron APG, et les nouvelles données de liste sont des champs optionnels sur le type `FileData` déjà en place. Une seule abstraction nouvelle, un contexte d'actions du bureau, parce que `FileData.component` ne prend pas de props et que la page d'accueil doit pouvoir ouvrir d'autres fenêtres.

**Tech Stack:** TypeScript 5 strict, React 18, Vite 6, MUI 5 + Emotion, framer-motion, Biome, bun.

**Spec:** `docs/superpowers/specs/2026-08-28-portfolio-desktop-ux-design.md`

## Global Constraints

- **Aucun runner de test dans ce repo, et il est interdit d'en ajouter.** Le cycle TDD habituel de cette skill ne s'applique pas. Chaque tâche se ferme sur : `bunx tsc --noEmit` à 0 erreur, `bun run build` vert, `bun run lint` propre, puis vérification dans un vrai navigateur.
- Gestionnaire de paquets : `bun` uniquement, jamais `npm` ni `yarn`.
- Biome est le seul formateur et linter. Ne pas formater à la main, lancer `bun run lint:fix`. Config : 2 espaces, guillemets doubles, largeur 100, fins de ligne CRLF.
- TypeScript strict, jamais `any`. Tous les types et interfaces vivent dans `src/types/`, jamais inline dans un composant ou un hook.
- Noms complets, sans abréviation. Variable d'itération au singulier de la collection.
- Commentaires de code en anglais, minimaux, expliquant le pourquoi et jamais le quoi.
- Contenu rédigé en français avec accents corrects, sans emoji dans les textes ni tiret cadratin.
- Ne jamais modifier `src/data/pages/ProjectPage.tsx` ni `src/types/data.ts`.
- Aucun trailer `Co-Authored-By` et aucune mention d'IA dans les messages de commit.
- Textes à utiliser verbatim, tirés de la section 6 de la spec :
  - Accroche d'accueil : `Je construis des applications web et mobiles, du serveur à l'interface.`
  - Identité : `Benjamin Guillemin`, `Développeur Fullstack Web & Mobile`, `Bordeaux, France`
  - Actions d'accueil : `Voir les projets`, `Ouvrir le CV`
  - Bloc de disponibilité : `En poste, ouvert au freelance`
- Zéro badge dans la vue détails (décision §8 de la spec).

---

## Structure des fichiers

| Fichier | Responsabilité |
| --- | --- |
| `src/types/desktop.ts` | Modifié. `FileData` gagne `subtitle` et `stack` optionnels ; types des deux menus et du contexte d'actions. |
| `src/types/hooks.ts` | Modifié. Retours de `useIconGrid`, `useMenuKeyboard`, `useRecentItems`. |
| `src/data/icons.tsx` | Modifié. Contenus des lignes, entrée `Bienvenue`, liste des épinglés, helpers de recherche et d'aplatissement. |
| `src/data/pages/WelcomePage.tsx` | Créé. Contenu de la fenêtre d'accueil. |
| `src/contexts/DesktopActionsContext.tsx` | Créé. Fournit `openItemById` aux pages rendues dans une fenêtre. |
| `src/components/FolderExplorer.tsx` | Modifié. Grille d'icônes remplacée par la liste à colonnes. |
| `src/components/StartMenu.tsx` | Créé. Sections Épinglé et Récent. |
| `src/components/DesktopContextMenu.tsx` | Créé. Trois actions du clic droit. |
| `src/components/Taskbar.tsx` | Modifié. Bouton démarrer, bloc de disponibilité. |
| `src/components/Desktop.tsx` | Modifié. Ouverture de l'accueil, état des deux menus, câblage. |
| `src/hooks/useMenuKeyboard.ts` | Créé. Patron clavier APG partagé par les deux menus. |
| `src/hooks/useRecentItems.ts` | Créé. Liste des éléments récemment ouverts. |
| `src/hooks/useIconGrid.ts` | Modifié. Expose `resetPositions`. |
| `src/hooks/useWindowManager.tsx` | Modifié. Notifie l'ouverture d'une fenêtre. |
| `src/components/mobile/MobileHomeScreen.tsx` | Modifié. En-tête d'accueil, réutilise le helper d'aplatissement. |

---

## Task 1: Données de liste et helpers de contenu

**Files:**
- Modify: `src/types/desktop.ts:4-9`
- Modify: `src/data/icons.tsx:30-93`
- Modify: `src/components/mobile/MobileHomeScreen.tsx:1-19`

**Interfaces:**
- Consumes: rien.
- Produces: `FileData.subtitle?: string`, `FileData.stack?: string[]`, `flattenFiles(): FileData[]`, `findItemById(itemId: string): DesktopItem | undefined`, `WELCOME_ID`, `PINNED_IDS`.

- [ ] **Step 1: Ajouter les deux champs optionnels au type `FileData`**

Dans `src/types/desktop.ts`, remplacer l'interface `FileData` :

```ts
export interface FileData {
  id: string;
  title: string;
  icon: string;
  component: React.ComponentType;
  /** One-line pitch shown in the folder details view. Absent for entries that have none. */
  subtitle?: string;
  /** Main technologies, shown as the last column of the folder details view. */
  stack?: string[];
}
```

- [ ] **Step 2: Renseigner les contenus dans `src/data/icons.tsx`**

Ajouter `subtitle` et `stack` sur les entrées existantes, sans toucher aux `id`, `title`, `icon` ni `component` :

```tsx
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
```

```tsx
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
  subtitle: "Ce bureau : un portfolio conçu comme un système d'exploitation, sans librairie de navigation",
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
```

Les deux entrées de premier niveau `skills` et `contact` ne sont pas dans un dossier, elles n'ont donc pas besoin de `subtitle` ni de `stack`.

- [ ] **Step 3: Ajouter les helpers en bas de `src/data/icons.tsx`**

```tsx
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
```

Ajouter `FileData` à l'import de types en tête de fichier :

```tsx
import type { DesktopItem, FileData, FolderData } from "../types/desktop";
```

- [ ] **Step 4: Faire consommer le helper par l'écran d'accueil mobile**

Dans `src/components/mobile/MobileHomeScreen.tsx`, supprimer la fonction locale `flattenItems` (lignes 7-17) ainsi que la ligne 3 `import type { FileData } from "../../types/desktop";`, devenue inutile. Remplacer la ligne 2 :

```tsx
import { desktopItems, isFolder } from "../../data/icons";
```

par, `desktopItems` et `isFolder` n'étant plus utilisés dans ce fichier :

```tsx
import { flattenFiles } from "../../data/icons";
```

et la ligne 19 par :

```tsx
const allFiles = flattenFiles();
```

- [ ] **Step 5: Vérifier**

```bash
bunx tsc --noEmit && bun run lint && bun run build
```

Attendu : 0 erreur, lint propre, build vert. Puis, dans le navigateur sur `http://localhost:5174/`, l'écran mobile (émulation 390x844) affiche toujours les 6 icônes, dans le même ordre qu'avant.

- [ ] **Step 6: Commit**

```bash
git add src/types/desktop.ts src/data/icons.tsx src/components/mobile/MobileHomeScreen.tsx
git commit -m "feat(donnees): pitch et stack sur les fichiers, helpers de contenu partages"
```

---

## Task 2: Vue détails des dossiers

**Files:**
- Modify: `src/components/FolderExplorer.tsx` (réécriture complète du rendu)

**Interfaces:**
- Consumes: `FileData.subtitle`, `FileData.stack` (Task 1).
- Produces: rien de nouveau, `FolderExplorerProps` est inchangé.

- [ ] **Step 1: Remplacer le contenu de `src/components/FolderExplorer.tsx`**

```tsx
import { alpha, Box, Chip, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import type { FolderExplorerProps } from "../types/desktop";

export default function FolderExplorer({ folder, onOpenFile }: FolderExplorerProps) {
  const theme = useTheme();
  const fileCountLabel = `${folder.files.length} élément${folder.files.length > 1 ? "s" : ""}`;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          px: 2,
          py: 1,
          borderBottom: "1px solid #e0e0e0",
          color: "text.secondary",
          fontSize: "0.75rem",
        }}
      >
        {fileCountLabel}
      </Box>

      <Box sx={{ flex: 1, overflow: "auto", py: 0.5 }}>
        {folder.files.map((file) => (
          <motion.div key={file.id} whileHover={{ x: 2 }} whileTap={{ scale: 0.995 }}>
            <Box
              role="button"
              tabIndex={0}
              aria-label={file.title}
              onClick={() => onOpenFile(file)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onOpenFile(file);
                }
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 2,
                py: 1.25,
                cursor: "pointer",
                userSelect: "none",
                outline: "none",
                "&:focus-visible": {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: -2,
                },
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <Box sx={{ fontSize: 28, flexShrink: 0 }}>{file.icon}</Box>

              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography variant="body2" sx={{ color: "#222", fontWeight: 600 }}>
                  {file.title}
                </Typography>
                {file.subtitle && (
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", display: "block", lineHeight: 1.35 }}
                  >
                    {file.subtitle}
                  </Typography>
                )}
              </Box>

              {file.stack && (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-end",
                    gap: 0.5,
                    maxWidth: 220,
                    flexShrink: 0,
                  }}
                >
                  {file.stack.map((technology) => (
                    <Chip key={technology} label={technology} size="small" />
                  ))}
                </Box>
              )}
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
```

- [ ] **Step 2: Vérifier**

```bash
bunx tsc --noEmit && bun run lint && bun run build
```

Puis dans le navigateur : ouvrir `Mes Projets`, vérifier l'en-tête « 4 éléments », les quatre lignes avec pitch et puces de stack, le survol, le focus au clavier via Tab, l'ouverture par Entrée. Ouvrir `À propos` : en-tête « 2 éléments », pitchs présents, aucune colonne de stack vide. Console sans erreur ni avertissement.

- [ ] **Step 3: Commit**

```bash
git add src/components/FolderExplorer.tsx
git commit -m "feat(explorateur): vue details avec pitch, stack et compteur d'elements"
```

---

## Task 3: Fenêtre d'accueil

**Files:**
- Create: `src/data/pages/WelcomePage.tsx`
- Create: `src/contexts/DesktopActionsContext.tsx`
- Modify: `src/types/desktop.ts`
- Modify: `src/data/icons.tsx`
- Modify: `src/components/Desktop.tsx`

**Interfaces:**
- Consumes: `findItemById` (Task 1).
- Produces: `WELCOME_ID = "welcome"`, `DesktopActionsProvider`, `useDesktopActions(): DesktopActions`.

- [ ] **Step 1: Déclarer le type du contexte dans `src/types/desktop.ts`**

Ajouter en fin de fichier :

```ts
export interface DesktopActions {
  /** Opens any desktop item by id, from a page rendered inside a window. */
  openItemById: (itemId: string) => void;
}
```

- [ ] **Step 2: Créer `src/contexts/DesktopActionsContext.tsx`**

```tsx
import { createContext, useContext } from "react";
import type { DesktopActions } from "../types/desktop";

// FileData.component takes no props, so pages rendered inside a window reach
// the shell through this context rather than through a prop chain.
const DesktopActionsContext = createContext<DesktopActions | null>(null);

export const DesktopActionsProvider = DesktopActionsContext.Provider;

export function useDesktopActions(): DesktopActions {
  const actions = useContext(DesktopActionsContext);
  if (!actions) throw new Error("useDesktopActions must be used inside a DesktopActionsProvider");
  return actions;
}
```

- [ ] **Step 3: Créer `src/data/pages/WelcomePage.tsx`**

```tsx
import { Box, Button, Divider, Typography } from "@mui/material";
import { useDesktopActions } from "../../contexts/DesktopActionsContext";

export default function WelcomePage() {
  const { openItemById } = useDesktopActions();

  return (
    <Box sx={{ maxWidth: 560, mx: "auto" }}>
      <Typography variant="h4" fontWeight={700}>
        Benjamin Guillemin
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        Développeur Fullstack Web &amp; Mobile
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Bordeaux, France
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body1" sx={{ fontSize: "1.05rem" }}>
        Je construis des applications web et mobiles, du serveur à l'interface.
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button variant="contained" onClick={() => openItemById("folder-projects")}>
          Voir les projets
        </Button>
        <Button variant="outlined" onClick={() => openItemById("cv")}>
          Ouvrir le CV
        </Button>
      </Box>
    </Box>
  );
}
```

- [ ] **Step 4: Déclarer l'entrée `Bienvenue` dans `src/data/icons.tsx`**

Ajouter le lazy import auprès des autres :

```tsx
const WelcomePage = lazy(() => import("./pages/WelcomePage"));
```

Exporter l'identifiant, au-dessus de `desktopItems` :

```tsx
export const WELCOME_ID = "welcome";
```

Puis placer l'entrée en tête de `desktopItems` :

```tsx
{
  id: WELCOME_ID,
  title: "Bienvenue",
  icon: "👋",
  component: WelcomePage,
},
```

- [ ] **Step 5: Exclure l'accueil de l'écran mobile**

Dans `src/components/mobile/MobileHomeScreen.tsx`, la page d'accueil devient un en-tête à la tâche 6 et ne doit pas apparaître aussi comme icône :

```tsx
import { flattenFiles, WELCOME_ID } from "../../data/icons";

// The welcome content is rendered as a header on mobile, not as an app icon.
const allFiles = flattenFiles().filter((file) => file.id !== WELCOME_ID);
```

- [ ] **Step 6: Ouvrir la fenêtre au montage et fournir le contexte, dans `src/components/Desktop.tsx`**

Ajouter les imports :

```tsx
import { useCallback, useEffect, useMemo } from "react";
import { desktopItems, findItemById, WELCOME_ID } from "../data/icons";
import { DesktopActionsProvider } from "../contexts/DesktopActionsContext";
import type { DesktopActions, FileData, FolderData } from "../types/desktop";
```

Après l'appel à `useWindowManager`, ajouter :

```tsx
const desktopActions = useMemo<DesktopActions>(
  () => ({
    openItemById: (itemId: string) => {
      const item = findItemById(itemId);
      if (!item) return;
      handleItemClick(item);
    },
  }),
  [handleItemClick],
);

// The welcome window is the landing content, reopened on every visit.
// StrictMode runs this twice in dev; the window manager ignores duplicate ids.
useEffect(() => {
  const welcome = findItemById(WELCOME_ID);
  if (welcome) handleItemClick(welcome);
}, [handleItemClick]);
```

Envelopper le rendu des fenêtres dans le provider, en remplaçant le bloc `{windows.filter(...).map(...)}` par :

```tsx
<DesktopActionsProvider value={desktopActions}>
  {windows
    .filter((windowItem) => !windowItem.isMinimized)
    .map((windowItem) => (
      <OSWindow
        key={windowItem.id}
        id={windowItem.id}
        title={windowItem.title}
        icon={windowItem.icon}
        initialPosition={windowItem.position}
        initialSize={windowItem.size}
        isActive={activeWindow === windowItem.id}
        isMaximized={windowItem.isMaximized || false}
        animationState={windowItem.animationState || "idle"}
        minimizeTargetPosition={getMinimizeTargetPosition(windowItem.id)}
        onClose={() => handleCloseWindow(windowItem.id)}
        onMinimize={() => handleMinimizeWindow(windowItem.id)}
        onMaximize={() => handleMaximizeWindow(windowItem.id)}
        onFocus={() => setActiveWindow(windowItem.id)}
        onAnimationComplete={() => handleAnimationComplete(windowItem.id)}
      >
        {windowItem.component}
      </OSWindow>
    ))}
</DesktopActionsProvider>
```

- [ ] **Step 7: Vérifier**

```bash
bunx tsc --noEmit && bun run lint && bun run build
```

Puis dans le navigateur, à froid sur `http://localhost:5174/` :
1. Une seule fenêtre `Bienvenue` s'ouvre, et elle ne recouvre pas la colonne d'icônes de gauche.
2. « Voir les projets » ouvre `Mes Projets`, « Ouvrir le CV » ouvre `CV.pdf`.
3. La fenêtre se déplace, se réduit, se restaure depuis la barre des tâches, et se ferme.
4. Après fermeture, l'icône `Bienvenue` du bureau la rouvre.
5. Recharger la page la rouvre.
6. Console sans erreur ni avertissement.
7. En émulation mobile 390x844, aucune icône `Bienvenue` sur l'écran d'accueil.

- [ ] **Step 8: Commit**

```bash
git add src/contexts src/data/pages/WelcomePage.tsx src/data/icons.tsx src/types/desktop.ts src/components/Desktop.tsx src/components/mobile/MobileHomeScreen.tsx
git commit -m "feat(accueil): fenetre de bienvenue non modale ouverte au chargement"
```

---

## Task 4: Menu démarrer

**Files:**
- Create: `src/hooks/useMenuKeyboard.ts`
- Create: `src/hooks/useRecentItems.ts`
- Create: `src/components/StartMenu.tsx`
- Modify: `src/types/desktop.ts`
- Modify: `src/types/hooks.ts`
- Modify: `src/hooks/useWindowManager.tsx:36-70`
- Modify: `src/components/Taskbar.tsx`
- Modify: `src/components/Desktop.tsx`
- Modify: `src/data/icons.tsx`

**Interfaces:**
- Consumes: `findItemById`, `WELCOME_ID` (Tasks 1 et 3).
- Produces: `useMenuKeyboard(options: UseMenuKeyboardOptions): UseMenuKeyboardReturn`, `useRecentItems(): UseRecentItemsReturn`, `PINNED_IDS: string[]`, `StartMenu` (props `StartMenuProps`).

- [ ] **Step 1: Déclarer les types**

Dans `src/types/desktop.ts`, ajouter :

```ts
export interface StartMenuProps {
  isOpen: boolean;
  recentIds: string[];
  onOpenItem: (itemId: string) => void;
  onClose: () => void;
}
```

Dans `src/types/hooks.ts`, ajouter :

```ts
export interface UseMenuKeyboardOptions {
  itemCount: number;
  isOpen: boolean;
  onClose: () => void;
}

export interface UseMenuKeyboardReturn {
  registerItem: (index: number, element: HTMLElement | null) => void;
  handleKeyDown: (event: React.KeyboardEvent) => void;
}

export interface UseRecentItemsReturn {
  recentIds: string[];
  recordOpen: (itemId: string) => void;
}
```

- [ ] **Step 2: Créer `src/hooks/useMenuKeyboard.ts`**

Le comportement suit le patron APG « Menu » : Bas et Haut déplacent le focus avec bouclage, Début et Fin vont aux extrémités, Échap ferme, Tab ferme.

```ts
import { useCallback, useEffect, useRef, useState } from "react";
import type { UseMenuKeyboardOptions, UseMenuKeyboardReturn } from "../types/hooks";

/** APG menu keyboard behaviour, shared by the start menu and the context menu. */
export function useMenuKeyboard({
  itemCount,
  isOpen,
  onClose,
}: UseMenuKeyboardOptions): UseMenuKeyboardReturn {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);

  const registerItem = useCallback((index: number, element: HTMLElement | null) => {
    itemsRef.current[index] = element;
  }, []);

  // APG: opening a menu moves focus to its first item.
  useEffect(() => {
    if (!isOpen) return;
    setActiveIndex(0);
    itemsRef.current[0]?.focus();
  }, [isOpen]);

  const focusIndex = useCallback((index: number) => {
    setActiveIndex(index);
    itemsRef.current[index]?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Tab") {
        onClose();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        focusIndex((activeIndex + 1) % itemCount);
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        focusIndex((activeIndex - 1 + itemCount) % itemCount);
        return;
      }
      if (event.key === "Home") {
        event.preventDefault();
        focusIndex(0);
        return;
      }
      if (event.key === "End") {
        event.preventDefault();
        focusIndex(itemCount - 1);
      }
    },
    [activeIndex, focusIndex, itemCount, onClose],
  );

  return { registerItem, handleKeyDown };
}
```

- [ ] **Step 3: Créer `src/hooks/useRecentItems.ts`**

```ts
import { useCallback, useState } from "react";
import type { UseRecentItemsReturn } from "../types/hooks";

const RECENT_LIMIT = 4;

/** Session-only history of opened items, most recent first, without duplicates. */
export function useRecentItems(): UseRecentItemsReturn {
  const [recentIds, setRecentIds] = useState<string[]>([]);

  const recordOpen = useCallback((itemId: string) => {
    setRecentIds((previous) =>
      [itemId, ...previous.filter((candidate) => candidate !== itemId)].slice(0, RECENT_LIMIT),
    );
  }, []);

  return { recentIds, recordOpen };
}
```

- [ ] **Step 4: Notifier l'ouverture depuis `useWindowManager`**

Dans `src/hooks/useWindowManager.tsx`, ajouter un second paramètre optionnel et l'appeler dans les deux chemins d'ouverture :

```tsx
export function useWindowManager(
  renderFolderContent: RenderFolderContent,
  onWindowOpened?: (itemId: string) => void,
): UseWindowManagerReturn {
```

Dans `handleOpenFile`, après `setActiveWindow(file.id);` :

```tsx
    onWindowOpened?.(file.id);
  }, [onWindowOpened]);
```

Dans la branche dossier de `handleItemClick`, après `setActiveWindow(item.id);` :

```tsx
        onWindowOpened?.(item.id);
```

et compléter le tableau de dépendances de `handleItemClick` :

```tsx
    [handleOpenFile, onWindowOpened, renderFolderContent],
```

- [ ] **Step 5: Déclarer les éléments épinglés dans `src/data/icons.tsx`**

Sous `WELCOME_ID` :

```tsx
/** Start menu pinned section: the four projects first, then the standalone entries. */
export const PINNED_IDS = [
  "project-minitroopers",
  "project-portfolio",
  "project-maison-bsg",
  "project-pokemon-workshop",
  "skills",
  "contact",
  "cv",
  WELCOME_ID,
];
```

- [ ] **Step 6: Créer `src/components/StartMenu.tsx`**

```tsx
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { TASKBAR_HEIGHT } from "../constants/layout";
import { findItemById, PINNED_IDS } from "../data/icons";
import { useMenuKeyboard } from "../hooks/useMenuKeyboard";
import type { DesktopItem, StartMenuProps } from "../types/desktop";
import { stripExtension } from "../utils/stripExtension";

function resolveItems(itemIds: string[]): DesktopItem[] {
  const items: DesktopItem[] = [];
  for (const itemId of itemIds) {
    const item = findItemById(itemId);
    if (item) items.push(item);
  }
  return items;
}

export default function StartMenu({ isOpen, recentIds, onOpenItem, onClose }: StartMenuProps) {
  const pinnedItems = resolveItems(PINNED_IDS);
  const recentItems = resolveItems(recentIds);
  const allItems = [...pinnedItems, ...recentItems];
  const { registerItem, handleKeyDown } = useMenuKeyboard({
    itemCount: allItems.length,
    isOpen,
    onClose,
  });

  if (!isOpen) return null;

  const renderItem = (item: DesktopItem, index: number) => (
    <Box
      key={`${item.id}-${index}`}
      ref={(element) => registerItem(index, element as HTMLElement | null)}
      role="menuitem"
      tabIndex={-1}
      onClick={() => {
        onOpenItem(item.id);
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpenItem(item.id);
          onClose();
        }
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: 1.5,
        py: 1,
        borderRadius: 1,
        cursor: "pointer",
        color: "white",
        outline: "none",
        "&:hover, &:focus-visible": { bgcolor: "rgba(255, 255, 255, 0.14)" },
      }}
    >
      <Box sx={{ fontSize: 20 }}>{item.icon}</Box>
      <Typography variant="body2" noWrap>
        {stripExtension(item.title)}
      </Typography>
    </Box>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      style={{ position: "absolute", left: 12, bottom: TASKBAR_HEIGHT + 8, zIndex: 1300 }}
    >
      <Box
        role="menu"
        aria-label="Menu démarrer"
        onKeyDown={handleKeyDown}
        // The desktop background closes both menus on click; a click inside
        // the menu must not reach it.
        onClick={(event) => event.stopPropagation()}
        sx={{
          width: 300,
          p: 1.5,
          borderRadius: 2,
          background: "rgba(20, 24, 34, 0.92)",
          backdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.16)",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.45)",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "rgba(255, 255, 255, 0.55)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            px: 1.5,
          }}
        >
          Épinglé
        </Typography>
        {pinnedItems.map((item, index) => renderItem(item, index))}

        {recentItems.length > 0 && (
          <>
            <Typography
              variant="caption"
              sx={{
                color: "rgba(255, 255, 255, 0.55)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                px: 1.5,
                mt: 1,
                display: "block",
              }}
            >
              Récent
            </Typography>
            {recentItems.map((item, index) => renderItem(item, pinnedItems.length + index))}
          </>
        )}
      </Box>
    </motion.div>
  );
}
```

- [ ] **Step 7: Ajouter le bouton démarrer à la barre des tâches**

Dans `src/types/desktop.ts`, étendre `TaskbarProps` :

```ts
export interface TaskbarProps {
  windows: WindowData[];
  activeWindow: string | null;
  isStartMenuOpen: boolean;
  /** Owned by Desktop, which restores focus here when the start menu closes (APG). */
  startButtonRef: React.RefObject<HTMLButtonElement>;
  onStartMenuToggle: () => void;
  onWindowClick: (windowId: string) => void;
  onIconPositionsUpdate?: (positions: Map<string, DOMRect>) => void;
}
```

Dans `src/components/Taskbar.tsx`, ajouter les trois props à la déstructuration, puis insérer ce bloc juste avant le `<Box sx={{ flex: 1, display: "flex", gap: 0.5, justifyContent: "center" }}>` des fenêtres, à la ligne 66 :

```tsx
<Box
  component="button"
  type="button"
  ref={startButtonRef}
  aria-haspopup="menu"
  aria-expanded={isStartMenuOpen}
  aria-label="Menu démarrer"
  onClick={(event: React.MouseEvent) => {
    // The desktop background closes both menus on click; without this the
    // toggle would immediately reopen-then-close.
    event.stopPropagation();
    onStartMenuToggle();
  }}
  sx={{
    width: 44,
    height: 44,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    cursor: "pointer",
    border: "none",
    borderRadius: 1,
    background: isStartMenuOpen ? "rgba(255, 255, 255, 0.22)" : "transparent",
    transition: "background 0.2s ease",
    "&:hover": { background: "rgba(255, 255, 255, 0.14)" },
    "&:focus-visible": {
      outline: `2px solid ${theme.palette.secondary.main}`,
      outlineOffset: 2,
    },
  }}
>
  🪟
</Box>
```

Le patron APG « Menu Button » veut qu'Entrée et Espace ouvrent le menu : un `<button>` natif déclenche déjà `onClick` sur ces deux touches, aucun `onKeyDown` n'est à ajouter.

- [ ] **Step 8: Câbler dans `src/components/Desktop.tsx`**

Compléter les imports :

```tsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRecentItems } from "../hooks/useRecentItems";
import StartMenu from "./StartMenu";
```

Puis, dans le composant :

```tsx
const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
const startButtonRef = useRef<HTMLButtonElement>(null);
const { recentIds, recordOpen } = useRecentItems();

// APG: closing a menu returns focus to the button that opened it.
const closeStartMenu = useCallback(() => {
  setIsStartMenuOpen(false);
  startButtonRef.current?.focus();
}, []);
```

Passer `recordOpen` au gestionnaire :

```tsx
} = useWindowManager(renderFolderContent, recordOpen);
```

Fermer le menu au clic sur le fond du bureau, en ajoutant sur le `<Box>` racine :

```tsx
onClick={() => setIsStartMenuOpen(false)}
```

Rendre le menu juste avant `<Taskbar ... />` :

```tsx
<StartMenu
  isOpen={isStartMenuOpen}
  recentIds={recentIds}
  onOpenItem={desktopActions.openItemById}
  onClose={closeStartMenu}
/>
```

et compléter la barre des tâches :

```tsx
<Taskbar
  windows={windows}
  activeWindow={activeWindow}
  isStartMenuOpen={isStartMenuOpen}
  startButtonRef={startButtonRef}
  onStartMenuToggle={() => setIsStartMenuOpen((previous) => !previous)}
  onWindowClick={handleTaskbarWindowClick}
  onIconPositionsUpdate={setIconPositions}
/>
```

Le `stopPropagation` du bouton démarrer et celui du `<Box role="menu">` (étape 6) sont tous deux nécessaires : sans eux, le clic remonte au fond du bureau qui referme le menu.

- [ ] **Step 9: Vérifier**

```bash
bunx tsc --noEmit && bun run lint && bun run build
```

Puis dans le navigateur :
1. Le bouton démarrer ouvre et referme le menu.
2. La section `Récent` est absente au chargement, puis apparaît après ouverture d'une fenêtre, limitée à 4 entrées, sans doublon.
3. Au clavier : Tab jusqu'au bouton, Entrée ouvre le menu et le focus est sur le premier élément, Bas et Haut circulent, Début et Fin vont aux extrémités, Échap ferme.
4. Après Échap, vérifier dans la console que le focus est revenu sur le bouton : `document.activeElement.getAttribute("aria-label")` doit valoir `Menu démarrer`.
5. Un clic sur un élément épinglé ouvre la bonne fenêtre et ferme le menu.
6. Un clic sur le fond du bureau ferme le menu.
7. Console sans erreur ni avertissement.

- [ ] **Step 10: Commit**

```bash
git add src/hooks/useMenuKeyboard.ts src/hooks/useRecentItems.ts src/components/StartMenu.tsx src/components/Taskbar.tsx src/components/Desktop.tsx src/hooks/useWindowManager.tsx src/types/desktop.ts src/types/hooks.ts src/data/icons.tsx
git commit -m "feat(menu-demarrer): sections epingle et recent, navigation clavier APG"
```

---

## Task 5: Menu contextuel du bureau

**Files:**
- Create: `src/components/DesktopContextMenu.tsx`
- Modify: `src/hooks/useIconGrid.ts`
- Modify: `src/types/hooks.ts`
- Modify: `src/types/desktop.ts`
- Modify: `src/components/Desktop.tsx`

**Interfaces:**
- Consumes: `useMenuKeyboard` (Task 4).
- Produces: `DesktopContextMenu` (props `DesktopContextMenuProps`), `UseIconGridReturn.resetPositions`.

- [ ] **Step 1: Exposer `resetPositions` depuis `src/hooks/useIconGrid.ts`**

Le type et l'implémentation changent dans la même tâche, sinon `tsc` échoue sur un retour incomplet. Dans `src/types/hooks.ts`, compléter `UseIconGridReturn` :

```ts
export interface UseIconGridReturn {
  iconPixelPositions: Map<string, Position>;
  handleIconDragEnd: (
    folderId: string,
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => void;
  resetPositions: () => void;
}
```

Puis, dans `src/hooks/useIconGrid.ts`, avant le `return` :

```ts
  const resetPositions = useCallback(() => {
    setGridPositions(calculateInitialPositions(itemIds));
  }, [itemIds]);

  return { iconPixelPositions, handleIconDragEnd, resetPositions };
```

`itemIds` est déjà le paramètre du hook, aucune autre modification n'est nécessaire.

- [ ] **Step 2: Déclarer les types dans `src/types/desktop.ts`**

```ts
export interface DesktopContextMenuProps {
  position: Position | null;
  onClose: () => void;
  onSortIcons: () => void;
  onOpenStartMenu: () => void;
}
```

`Position` est déjà importé en tête de ce fichier.

- [ ] **Step 3: Créer `src/components/DesktopContextMenu.tsx`**

```tsx
import { Box, Typography } from "@mui/material";
import { useMenuKeyboard } from "../hooks/useMenuKeyboard";
import type { DesktopContextMenuProps } from "../types/desktop";

export default function DesktopContextMenu({
  position,
  onClose,
  onSortIcons,
  onOpenStartMenu,
}: DesktopContextMenuProps) {
  const actions = [
    { label: "Actualiser", run: () => window.location.reload() },
    { label: "Trier les icônes", run: onSortIcons },
    { label: "Ouvrir le menu démarrer", run: onOpenStartMenu },
  ];
  const { registerItem, handleKeyDown } = useMenuKeyboard({
    itemCount: actions.length,
    isOpen: position !== null,
    onClose,
  });

  if (!position) return null;

  return (
    <Box
      role="menu"
      aria-label="Actions du bureau"
      onKeyDown={handleKeyDown}
      sx={{
        position: "absolute",
        left: position.x,
        top: position.y,
        zIndex: 1300,
        minWidth: 210,
        p: 0.75,
        borderRadius: 1.5,
        background: "rgba(245, 246, 250, 0.98)",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.28)",
      }}
    >
      {actions.map((action, index) => (
        <Box
          key={action.label}
          ref={(element) => registerItem(index, element as HTMLElement | null)}
          role="menuitem"
          tabIndex={-1}
          onClick={() => {
            onClose();
            action.run();
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onClose();
              action.run();
            }
          }}
          sx={{
            px: 1.5,
            py: 0.9,
            borderRadius: 1,
            cursor: "pointer",
            outline: "none",
            "&:hover, &:focus-visible": { bgcolor: "rgba(0, 0, 0, 0.07)" },
          }}
        >
          <Typography variant="body2" sx={{ color: "#222" }}>
            {action.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
```

- [ ] **Step 4: Câbler dans `src/components/Desktop.tsx`**

```tsx
const [contextMenuPosition, setContextMenuPosition] = useState<Position | null>(null);
const { iconPixelPositions, handleIconDragEnd, resetPositions } = useIconGrid(itemIds);
```

Sur le `<Box>` racine, ajouter :

```tsx
onContextMenu={(event) => {
  event.preventDefault();
  setIsStartMenuOpen(false);
  setContextMenuPosition({ x: event.clientX, y: event.clientY });
}}
```

et compléter le `onClick` du fond, qui ferme désormais les deux menus :

```tsx
onClick={() => {
  setIsStartMenuOpen(false);
  setContextMenuPosition(null);
}}
```

Rendre le menu à côté de `StartMenu` :

```tsx
<DesktopContextMenu
  position={contextMenuPosition}
  onClose={() => setContextMenuPosition(null)}
  onSortIcons={resetPositions}
  onOpenStartMenu={() => setIsStartMenuOpen(true)}
/>
```

Importer `Position` depuis `../types/window`.

- [ ] **Step 5: Vérifier**

```bash
bunx tsc --noEmit && bun run lint && bun run build
```

Puis dans le navigateur :
1. Le clic droit sur le fond ouvre le menu à la position du curseur, et le menu natif du navigateur n'apparaît pas.
2. Le clic droit sur une fenêtre ouverte laisse le menu natif du navigateur, le menu du bureau ne s'ouvre que sur le fond.
3. Déplacer deux icônes, puis `Trier les icônes` : elles reviennent à leur colonne de départ.
4. `Actualiser` recharge la page, donc la fenêtre d'accueil réapparaît.
5. `Ouvrir le menu démarrer` ouvre le menu démarrer avec le focus sur son premier élément.
6. Au clavier dans le menu contextuel : Bas et Haut circulent, Échap ferme.
7. Console sans erreur ni avertissement.

- [ ] **Step 6: Commit**

```bash
git add src/components/DesktopContextMenu.tsx src/hooks/useIconGrid.ts src/types/desktop.ts src/components/Desktop.tsx
git commit -m "feat(bureau): menu contextuel avec trois actions reelles"
```

---

## Task 6: Bloc de disponibilité et en-tête mobile

**Files:**
- Modify: `src/components/Taskbar.tsx:124-140`
- Modify: `src/components/mobile/MobileHomeScreen.tsx`

**Interfaces:**
- Consumes: `WELCOME_ID` (Task 3).
- Produces: rien.

- [ ] **Step 1: Ajouter le bloc de disponibilité à la barre des tâches**

Dans `src/components/Taskbar.tsx`, insérer juste avant le bloc de l'horloge :

```tsx
<Box
  sx={{
    display: { xs: "none", md: "flex" },
    alignItems: "center",
    height: 32,
    px: 1.5,
    mr: 1,
    borderRadius: 1,
    background: "rgba(255, 255, 255, 0.12)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
  }}
>
  <Typography variant="caption" color="white" noWrap>
    En poste, ouvert au freelance
  </Typography>
</Box>
```

- [ ] **Step 2: Ajouter l'en-tête d'accueil à l'écran mobile**

Dans `src/components/mobile/MobileHomeScreen.tsx`, remplacer `justifyContent: "center"` du conteneur racine par `justifyContent: "flex-start"` et insérer ce bloc au-dessus de la grille d'icônes :

```tsx
<Box
  sx={{
    width: "100%",
    px: 3,
    pt: 4,
    pb: 1,
    color: "white",
    textShadow: "0 1px 3px rgba(0,0,0,0.5)",
  }}
>
  <Typography variant="h6" fontWeight={700}>
    Benjamin Guillemin
  </Typography>
  <Typography variant="body2" sx={{ opacity: 0.85 }}>
    Développeur Fullstack Web &amp; Mobile
  </Typography>
  <Typography variant="body2" sx={{ opacity: 0.85 }}>
    Bordeaux, France
  </Typography>
  <Typography variant="body2" sx={{ mt: 1 }}>
    Je construis des applications web et mobiles, du serveur à l'interface.
  </Typography>
  <Typography variant="caption" sx={{ display: "block", mt: 1, opacity: 0.85 }}>
    En poste, ouvert au freelance
  </Typography>
</Box>
```

Aucun bouton d'action ici : l'écran mobile est déjà aplati, les icônes sont directement sous l'en-tête, et « Voir les projets » n'y aurait aucune cible honnête à ouvrir. Aucun import supplémentaire n'est nécessaire, `Box` et `Typography` sont déjà importés.

- [ ] **Step 3: Vérifier**

```bash
bunx tsc --noEmit && bun run lint && bun run build
```

Puis dans le navigateur :
1. Bureau large : le bloc `En poste, ouvert au freelance` est visible à gauche de l'horloge et ne chevauche pas les boutons de fenêtres.
2. Fenêtre étroite (moins de 900 px) : le bloc disparaît, la barre des tâches ne déborde pas.
3. Émulation 390x844 : l'en-tête est lisible et les 6 icônes restent toutes visibles sans être coupées par le bas de l'écran.
4. Console sans erreur ni avertissement.

- [ ] **Step 4: Commit**

```bash
git add src/components/Taskbar.tsx src/components/mobile/MobileHomeScreen.tsx
git commit -m "feat(statut): bloc de disponibilite et en-tete d'accueil mobile"
```

---

## Vérification finale

- [ ] **Step 1: Passe complète**

```bash
bunx tsc --noEmit && bun run lint && bun run build
```

- [ ] **Step 2: Parcours navigateur de bout en bout**

Reprendre la Definition of Done de la section 7 de la spec, point par point, sur `http://localhost:5174/` : accueil ouvert seul au chargement et rouvert après rechargement ; fermeture, réduction et réouverture depuis le menu démarrer ; ouverture clavier du menu démarrer et retour du focus au bouton sur Échap ; les trois actions du clic droit produisant un effet observable ; pitch et stack affichés dans la vue détails ; rendu mobile avec en-tête et sans fenêtre auto-ouverte. Console sans erreur ni avertissement à chaque étape.

- [ ] **Step 3: Revue adversariale**

Faire relire le diff complet par un reviewer à contexte vierge avant de déclarer la tâche terminée.
