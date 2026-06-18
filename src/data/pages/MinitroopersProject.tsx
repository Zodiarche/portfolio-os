import ProjectPage, { type ProjectData } from "./ProjectPage";

const minitroopersData: ProjectData = {
  title: "Minitroopers",
  subtitle:
    "La renaissance d'un jeu de gestion d'armée Flash de Motion-Twin, reconstruit sur une stack TypeScript moderne tout en rejouant le combat d'époque (.swf) dans le navigateur via Ruffle",
  icon: "🪖",
  tech: [
    {
      label: "Client",
      items: ["React 19", "Vite 6", "TypeScript", "TanStack Query", "Zustand", "Tailwind CSS"],
    },
    { label: "Serveur", items: ["Node.js", "Express", "Prisma", "PostgreSQL", "Zod", "JWT"] },
    { label: "Monorepo & Tests", items: ["Bun", "Turbo", "Docker", "Vitest", "Playwright"] },
    { label: "Combat legacy", items: ["Ruffle", "Flash (.swf)"] },
  ],
  description: [
    "Minitroopers est à l'origine un jeu de gestion d'armée signé Motion-Twin : on recrute des petits soldats que l'on améliore, puis on les envoie au combat, les batailles se jouant toutes seules selon les choix de préparation. Comme tout le catalogue Flash du studio, il s'est éteint avec la fin de Flash. En faire renaître une version jouable bute alors sur une contrainte de taille : le combat est une animation Flash que l'on ne peut pas simplement réécrire.",
    "Ce projet reconstruit le jeu complet sur une stack moderne tout en conservant le moteur de combat d'origine. On y retrouve le recrutement et l'amélioration des troopers, les activités PvE (missions, raids, exterminations, infiltrations), les affrontements PvP contre les armées des autres joueurs, le classement global et un système d'énergie qui rythme les actions. Le combat reste le client Flash (.swf) d'époque, rejoué dans le navigateur via Ruffle. Le serveur n'injecte pas le déroulé : il construit l'entrée du combat (armées, seed, préparation, compétences) que le SWF simule pour produire le résultat. La logique autour du combat vit en TypeScript ; la résolution de la bataille et son animation, elles, restent celles du binaire d'époque.",
    "Un projet mené seul, du serveur au client. Je suis parti du code Flash d'origine récupéré ailleurs et j'ai tout rebâti autour : un monorepo Bun/Turbo qui partage ses types entre le client React et le serveur Express, une base modélisée sous Prisma, une authentification maison par e-mail et mot de passe (JWT, mots de passe hachés avec bcrypt) et une suite de tests qui descend jusqu'aux combats (Vitest, bun test, Playwright). La version 1 arrive prochainement, le jeu n'a pas encore d'adresse publique.",
  ],
  features: [
    "Recrutement et amélioration des troopers, chaque unité gagnant armes et capacités au fil des montées en niveau",
    "Activités PvE produisant des récompenses : missions, raids, exterminations et infiltrations, présentées en cartes sur le QG",
    "Affrontements PvP contre les armées d'autres joueurs et classement global",
    "Combats simulés par le client Flash d'époque (via Ruffle) à partir d'une spec construite côté serveur, puis rejoués dans le navigateur pour l'animation",
    "Système d'énergie qui limite et rythme les actions disponibles",
    "Comptes joueurs avec authentification par e-mail et mot de passe (jeton JWT, mots de passe hachés via bcrypt)",
  ],
  highlights: [
    "Conserver le combat d'origine plutôt que le réécrire. L'animation de bataille est un .swf Flash que Ruffle rejoue dans le navigateur, et la reconstruire de zéro aurait fait perdre tout le rendu existant. J'ai donc rétro-conçu le format du payload attendu par le SWF pour lui injecter une spec de combat construite côté serveur (armées, seed, préparation). Le binaire calcule le déroulé et le résultat à partir de cette entrée ; le serveur persiste la chaîne flashvars comme jeton de replay. Le méta-jeu et le calibrage vivent en TypeScript, le binaire d'époque reste intact.",
    "Calibrer la difficulté sans toucher au binaire. Le niveau affiché dans le SWF ne pilote pas réellement les points de vie, donc équilibrer un combat passe par les compétences injectées dans le payload côté serveur, jamais par une retouche du .swf. Tout l'équilibrage vit ainsi à un seul endroit, sans fragiliser un asset que l'on ne reconstruit pas.",
    "Une seule source de vérité pour les types partagés. Le client React et le serveur Express vivent dans un monorepo Bun/Turbo et importent les mêmes définitions depuis un package commun, de sorte qu'un changement de contrat (combat, carte, récompense) ne peut pas diverger silencieusement entre les deux bouts.",
    "Des tests d'intégration sur une vraie base. Le serveur ne mocke pas la base de données : les tests tournent contre un PostgreSQL réel monté via Docker, ce qui couvre les requêtes Prisma et la logique de combat dans des conditions proches de la production.",
  ],
  links: [],
};

export const MinitroopersProject = () => <ProjectPage {...minitroopersData} />;
