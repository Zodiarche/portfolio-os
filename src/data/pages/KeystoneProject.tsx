import ProjectPage, { type ProjectData } from "./ProjectPage";

const keystoneData: ProjectData = {
  title: "Keystone",
  subtitle:
    "Le companion desktop qui réunit en une seule app légère ce que les joueurs League of Legends empilent aujourd'hui entre Overwolf, Outplayed, Porofessor et DPM (~5 Mo de RAM contre des centaines)",
  icon: "🗝️",
  tech: [
    { label: "Desktop", items: ["Tauri 2", "Rust", "React 19", "TypeScript", "Tailwind CSS"] },
    { label: "Backend", items: ["Rust", "axum", "PostgreSQL"] },
    { label: "Infra", items: ["Docker", "Traefik", "VPS", "Mise à jour signée"] },
    { label: "Données", items: ["Riot API", "TanStack Query", "Zustand"] },
  ],
  description: [
    "Quand on joue à League of Legends et qu'on veut s'améliorer, on accumule les outils : un pour les clips automatiques, un autre pour préparer la prochaine partie, un troisième pour les statistiques. Outplayed et Porofessor tournent tous les deux dans Overwolf (environ 200 Mo en arrière-plan rien que pour exister), DPM est une app à part qui peut atteindre 500 Mo. Chacun fait sa chose dans son coin, on change de fenêtre selon ce qu'on veut regarder, et on ne croise jamais les données d'un outil à l'autre.",
    "Keystone réunit tout dans une seule app autour de 5 Mo. Pas une fonctionnalité de plus que ce qui existe déjà ailleurs, mais un assemblage cohérent et continu : depuis la fiche d'une partie on saute au profil d'un coéquipier, depuis la liste des coéquipiers récurrents on ouvre les parties qu'on a faites ensemble, depuis un clip du Studio on revient au match qui l'a généré. Les filtres saison, rôle ou champion suivent la navigation, tout reste accessible au clavier, et l'app garde un thème sombre lisible pensé pour rester confortable en session du soir.",
    "Le projet a été conçu, développé, déployé et maintenu seul en deux semaines. Une fenêtre principale et une fenêtre overlay minuscule qui reste discrète pendant la partie, des données qui se rafraîchissent toutes seules en arrière-plan, des écrans de chargement soignés à la place des flashs blancs, des messages d'erreur lisibles avec un bouton « réessayer » plutôt que des codes techniques. La version 1.0 tourne en bêta fermée avec une quinzaine de testeurs, mise à jour automatique signée. La suite dépend principalement de l'obtention d'une clé Production chez Riot.",
  ],
  features: [
    "Historique des parties classées : KDA, CS/min, vision, runes complètes et build d'objets",
    "Carte d'activité par jour avec sessions, winrate et ouverture du détail d'une journée",
    "Agrégats par champion, par rôle et synergies entre coéquipiers récurrents",
    "Vue co-joueurs : parties communes et winrate avec et contre chaque coéquipier",
    "Studio : capture vidéo locale et clips automatiques sur les temps forts de la partie (kill, baron, drake…) avec durée ajustée au type d'event",
    "Bibliothèque de ses propres replays et bandeau d'avant-partie",
  ],
  highlights: [
    "Légèreté radicale grâce à Tauri (Rust) au lieu d'Electron : autour de 5 Mo en fonctionnement, contre environ 200 Mo pour le runtime Overwolf seul (sur lequel s'appuient Outplayed et Porofessor) et jusqu'à 500 Mo pour DPM. L'app reste invisible quand on est en train de jouer.",
    "Une seule app continue : tout est cliquable et relié : d'une partie au profil d'un coéquipier, d'un coéquipier récurrent aux parties communes, d'un clip Studio au match qui l'a généré. Les filtres (saison, rôle, champion) sont mémorisés dans l'URL et navigation entièrement au clavier. C'est ce croisement permanent des données qui est impossible à reproduire entre trois apps séparées.",
    "Sécurité côté serveur : la clé API Riot vit uniquement sur le serveur, chiffrée en base, jamais sur les machines des utilisateurs. Elle est rechargée à chaud sans interruption de service. Chaque partie n'est récupérée qu'une fois auprès de Riot puis partagée avec tous les utilisateurs, ce qui permet de tenir une bêta complète sous une seule clé de développement.",
    "Studio entièrement local : capture vidéo qui choisit toute seule le meilleur encodeur GPU disponible (avec repli CPU si rien d'autre n'est exploitable) et synchronise automatiquement les clips sur les temps forts remontés en direct par le jeu lui-même.",
  ],
  links: [
    { label: "Obtenir l'application", href: "https://keystone.guillemin.dev/" },
    { label: "GitHub", href: "https://github.com/Zodiarche/keystone" },
  ],
};

export const KeystoneProject = () => <ProjectPage {...keystoneData} />;
