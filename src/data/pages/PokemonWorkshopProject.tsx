import ProjectPage, { type ProjectData } from "./ProjectPage";

const pokemonWorkshopData: ProjectData = {
  title: "Pokémon Workshop",
  subtitle: "Écosystème open-source de création de jeux, Core Contributor & Community Lead",
  icon: "⚙️",
  tech: [
    { label: "Engine", items: ["Ruby", "LiteRGSS2", "SFML", "GLSL"] },
    { label: "Editor", items: ["TypeScript", "React", "Electron", "Vite"] },
    { label: "Server", items: ["Node.js", "WebSocket", "MongoDB", "Docker"] },
    { label: "Docs", items: ["Docusaurus"] },
  ],
  description: [
    "Pokémon Workshop est un écosystème open-source qui permet à n'importe qui de créer son propre jeu Pokémon. Il regroupe un moteur de jeu, un éditeur visuel pour construire son jeu sans coder, un serveur multijoueur (en développement), et une documentation complète.",
    "Je suis le premier contributeur du projet en dehors du staff. Je contribue sur l'ensemble de l'écosystème : le moteur, l'éditeur, le serveur, la démo technique et la documentation dont je suis maintainer. Je prépare actuellement l'intégration du système de liste d'amis et d'échanges pour le futur mode multijoueur.",
    "Au-delà du code, je suis modérateur de la communauté : je review la majorité des contributions, j'accompagne les utilisateurs et les nouveaux contributeurs, et je veille au respect des règles du projet.",
  ],
  features: [
    "Un moteur de jeu complet : combats, exploration, menus, rendu 2D/3D, animations, système de talents et d'attaques. Tout ce qu'il faut pour créer un jeu de A à Z",
    "Un éditeur visuel pour créer son jeu sans coder : édition des Pokémon, objets, attaques, maps, le tout depuis une interface desktop accessible à tous",
    "Un mode multijoueur en développement : combats, échanges et liste d'amis entre joueurs via un serveur temps réel",
    "Une documentation et des tutoriels pour accompagner les créateurs, incluant une démo jouable de 3-4h",
  ],
  highlights: [
    "Contributions transversales : je travaille sur l'ensemble du projet (moteur de combat, rendu visuel, interfaces, éditeur, serveur multijoueur et documentation), pas juste un module isolé",
    "Refactoring structurant : restructuration de parties entières du code pour améliorer la maintenabilité et faciliter le travail des autres contributeurs",
    "Gardien de la qualité : review de la majorité des contributions pour garantir le respect des conventions et le niveau de qualité du projet",
    "Accompagnement de la communauté : modération, aide technique aux utilisateurs, et onboarding des nouveaux contributeurs",
  ],
  links: [
    {
      label: "GitLab (Engine)",
      href: "https://gitlab.com/pokemonsdk/pokemonsdk",
    },
    {
      label: "GitHub (Écosystème)",
      href: "https://github.com/PokemonWorkshop",
    },
  ],
};

export const PokemonWorkshopProject = () => <ProjectPage {...pokemonWorkshopData} />;
