# Remplir le bureau : conception UX du portfolio-OS

Date : 2026-08-28
Statut : spec validée en conversation, en attente de relecture
Périmètre : surface Portfolio uniquement. Le CV (`cv/cv.html`, `public/cv.pdf`) n'est pas touché.

## 1. Problème

Le portfolio ressemble à un OS mais paraît inachevé : le bureau porte quatre
icônes sur un fond d'écran, et les dossiers ouvrent une grille de deux à quatre
icônes dans un cadre vide. Le diagnostic n'est pas une question de goût, il se
formule sur des règles documentées :

- Le premier écran ne porte aucune proposition de valeur, alors que l'audience
  visée (recruteurs) décide en 10 à 20 secondes.
- Le bureau et les dossiers sont des conteneurs sans contenu : ils échouent aux
  trois règles NN/g sur les états vides (statut du système, découverte des
  fonctionnalités, chemins directs vers les tâches clés).
- Atteindre un projet coûte deux niveaux de divulgation (bureau, dossier,
  fenêtre), soit exactement la limite haute admise.
- Une ligne de dossier ne porte que le nom du fichier : rien ne dit ce que
  contient un projet avant de l'ouvrir, ce qui provoque du pogo-sticking.

## 2. Objectifs

- Occuper l'écran d'arrivée avec du contenu utile, pas du décor.
- Faire tomber la proposition de valeur sous les 10 secondes.
- Réduire le coût d'accès aux projets sans supprimer la métaphore des dossiers.
- Ne rien ajouter qui ne fonctionne pas réellement.

### Non-objectifs

- Aucun terminal, aucune corbeille, aucun changement de fond d'écran.
- Aucun aplatissement des projets sur le bureau (levier C écarté, voir 4.3).
- Aucune refonte du gestionnaire de fenêtres, du thème, ou des pages projets.
- Aucun test unitaire ni runner de test (ce repo n'en a pas, et n'en veut pas).

## 3. Sources

| Décision | Source |
| --- | --- |
| Fenêtre d'accueil non modale | NN/g, *Modal & Nonmodal Dialogs*, règle « Do not use modal dialogs for nonessential information that is not related to the current user flow » |
| Contenu de l'accueil et chemins directs | NN/g, *Empty States*, règle 3 ; NN/g, *How Long Do Users Stay on Web Pages* (10 à 20 s) |
| Section vide repliée, jamais d'espace blanc | NN/g, *Empty States*, règles 1 et 2 |
| Liste plutôt que cartes dans les dossiers | NN/g, *Card View vs. List View* (liste : économe en espace, triable) |
| Choix des colonnes, risque de pogo-sticking, un seul badge | NN/g, *The Anatomy of a List Entry* |
| Épingler les projets au menu démarrer | NN/g, *Progressive Disclosure* : « you have to disclose everything that users frequently need up front », deux niveaux comme limite |
| Structure Épinglé / Récent | Microsoft Support, *Customize the Start menu* (Épinglé accepte applications, fichiers, dossiers, sites) |
| Le visiteur connaît déjà ces conventions | Loi de Jakob (lawsofux.com) : 95 à 99 % du temps passé sur d'autres interfaces |
| Clavier et rôles du menu démarrer | W3C ARIA APG, patrons *Menu Button* et *Menu* |

## 4. Décisions

### 4.1 État d'arrivée : une seule fenêtre, non modale

Une fenêtre `Bienvenue` s'ouvre au chargement du bureau, et une seule. Deux
fenêtres se recouvrent, se disputent le focus et masquent le bureau qu'on vient
de remplir.

Elle est non modale et passe par le gestionnaire de fenêtres existant : elle est
déplaçable, réductible, maximisable, fermable, et listée dans la taskbar comme
les autres. Aucun composant de fenêtre nouveau.

Contenu : nom, rôle, ville, une phrase de positionnement, puis deux actions
directes (ouvrir `Mes Projets`, ouvrir `CV.pdf`).

Elle est rouverte à chaque visite, sans mémorisation en `localStorage`. Ce n'est
pas un tour d'onboarding mais le contenu principal de l'écran ; le coût pour un
visiteur qui revient est d'un clic.

Elle est réouvrable : entrée épinglée dans le menu démarrer, et fichier
`Bienvenue` présent sur le bureau.

Elle s'ouvre décalée vers la droite, jamais par-dessus la colonne d'icônes.

### 4.2 Dossiers en vue détails

`FolderExplorer` passe de la grille d'icônes à une liste à colonnes, précédée
d'un en-tête « N éléments ».

Colonnes : icône, nom, pitch d'une ligne, stack. L'attribut prioritaire est à
gauche, la mise en page est identique d'une ligne à l'autre.

Zéro ou un badge maximum, jamais plus : une mise en avant généralisée ne signale
plus rien.

Le comportement d'ouverture ne change pas (clic ou Entrée ou Espace ouvre une
fenêtre), pas plus que l'accessibilité déjà en place (`role="button"`,
`tabIndex`, focus visible).

Pas de bascule liste/icônes : une seule vue, celle qui informe.

### 4.3 Mobilier d'OS

**Menu démarrer.** Bouton à gauche de la taskbar. Deux sections :

- Épinglé : les 4 projets, `Compétences`, `Contact`, `CV.pdf`, `Bienvenue`.
- Récent : les fenêtres ouvertes pendant la session, les plus récentes d'abord,
  limité à 4 entrées et sans doublon. Vide au premier chargement, donc la
  section est repliée tant qu'elle est vide.

Épingler les projets est ce qui rend le levier « aplatir » inutile : l'accès
direct est obtenu en un niveau, et le dossier `Mes Projets` reste en place avec
sa vue détails.

Clavier et ARIA, conformes aux deux patrons APG :

- Bouton : `aria-haspopup="menu"`, `aria-expanded`, Entrée ou Espace ouvre le
  menu et place le focus sur le premier élément.
- Menu : rôle `menu` avec `aria-label`, éléments `menuitem`, Bas et Haut
  déplacent le focus, Début et Fin vont aux extrémités, Échap ferme et rend le
  focus au bouton, Tab ferme le menu.
- Clic en dehors ferme le menu.

**Menu contextuel du bureau.** Clic droit sur le fond. Trois entrées, toutes
fonctionnelles :

- `Actualiser` : recharge la page.
- `Trier les icônes` : réinitialise les positions de la grille d'icônes.
- `Ouvrir le menu démarrer` : ouvre le menu et lui donne le focus.

Écartés parce qu'ils seraient morts : `Changer le fond` (un seul fond existe, et
l'outillage d'assets de cette machine ne permet pas d'en produire d'autres) et
`Ouvrir le terminal` (aucun terminal n'existe, en écrire un est un autre projet).
Un item mort détruit la crédibilité de la métaphore, qui est ici l'argument de
vente.

Même patron APG que le menu démarrer pour le clavier et les rôles.

**Corbeille.** Écartée. Elle ouvrirait sur un vide sans rien à y révéler, alors
que la règle 2 des états vides veut qu'un état vide serve à faire découvrir une
fonctionnalité.

**Zone de notification.** Un seul bloc, factuel : statut de disponibilité et
ville, à gauche de l'horloge existante. Rien d'auto-calculé, rien de décoratif.

### 4.4 Mobile

Correction apportée à la conception après lecture du code : `MobileHomeScreen`
aplatit déjà tous les fichiers et n'affiche aucun dossier
(`src/components/mobile/MobileHomeScreen.tsx:7-19`). La vue détails de 4.2 ne
traverse donc pas vers le mobile, contrairement à ce qui avait été annoncé en
conversation : il n'y a pas d'explorateur de dossier à convertir.

Ce qui traverse est le contenu d'accueil seulement, et pas sous forme de
fenêtre : un bloc d'en-tête au-dessus de la grille d'icônes (nom, rôle, ville,
deux actions). Sur un écran d'accueil de téléphone rien ne s'ouvre tout seul, et
la règle NN/g sur les modales interdit d'imposer du non-essentiel.

Menu démarrer, menu contextuel et zone de notification ne sont pas portés : ils
n'ont pas d'équivalent dans la métaphore du téléphone.

## 5. Impact par fichier

| Fichier | Changement |
| --- | --- |
| `src/types/desktop.ts` | Ajout à `FileData` de `subtitle?: string` et `stack?: string[]`, optionnels car `CV.pdf` et `À propos.txt` n'ont pas de stack. Nouveaux types pour le menu démarrer et le menu contextuel. |
| `src/data/icons.tsx` | Renseignement de `subtitle` et `stack` sur les entrées concernées ; ajout de l'entrée `Bienvenue` ; déclaration de la liste des éléments épinglés. |
| `src/components/FolderExplorer.tsx` | Grille d'icônes remplacée par la liste à colonnes et son en-tête de comptage. |
| `src/components/Desktop.tsx` | Ouverture de la fenêtre d'accueil au montage ; câblage du menu contextuel et du menu démarrer. |
| `src/components/Taskbar.tsx` | Bouton démarrer à gauche ; bloc de disponibilité à côté de l'horloge. |
| `src/components/StartMenu.tsx` | Nouveau. Sections Épinglé et Récent, clavier APG. |
| `src/components/DesktopContextMenu.tsx` | Nouveau. Trois actions, clavier APG. |
| `src/data/pages/WelcomePage.tsx` | Nouveau. Contenu de la fenêtre d'accueil. |
| `src/hooks/useIconGrid.ts` | Exposition d'une remise à zéro des positions pour `Trier les icônes`. |
| `src/hooks/useMenuKeyboard.ts` | Nouveau. Navigation clavier commune aux deux menus, pour ne pas dupliquer le patron APG. |
| `src/components/mobile/MobileHomeScreen.tsx` | Bloc d'en-tête d'accueil au-dessus de la grille. |

Non touchés : `src/data/pages/ProjectPage.tsx`, `src/types/data.ts`,
`src/components/OSWindow.tsx`, le thème, le CV.

## 6. Contraintes éditoriales

Règle d'`AGENTS.md` : une affirmation égale un fait fourni. Les contenus
suivants doivent venir de l'utilisateur ou être repris tels quels des pages
projets existantes sous `src/data/pages/`, jamais inventés ni reformulés en
avantage :

- Le pitch d'une ligne et la stack de chacun des 4 projets, plus des entrées
  `À propos.txt` et `CV.pdf`.
- Le texte de la fenêtre d'accueil (rôle, ville, phrase de positionnement).
- Le libellé du bloc de disponibilité.

Français avec accents corrects, sans tiret cadratin ni emoji dans les textes
rédigés. Les commentaires de code restent en anglais.

## 7. Definition of Done

- `bunx tsc --noEmit` : 0 erreur.
- `bun run build` : vert.
- `bun run lint` : propre.
- Vérification navigateur réelle (chrome-devtools MCP), console sans erreur ni
  avertissement, sur les points suivants : la fenêtre d'accueil s'ouvre seule au
  chargement, en un seul exemplaire, et se rouvre à chaque rechargement même
  après fermeture ; elle se ferme, se réduit et se rouvre depuis le menu
  démarrer ; le menu démarrer s'ouvre au clavier et Échap rend le focus au
  bouton ; le clic droit ouvre le menu contextuel et ses trois actions
  produisent un effet observable ; la vue détails affiche pitch et stack ; le
  rendu mobile montre le bloc d'en-tête sans fenêtre auto-ouverte.

## 8. Points ouverts

- Contenus de la section 6 : à fournir avant implémentation, sinon
  l'implémentation s'arrête là (règle anti-invention d'`AGENTS.md`).
- Le badge unique de 4.2 : utile seulement s'il existe une situation qui le
  mérite. À trancher quand les pitchs seront connus, faute de quoi zéro badge.
