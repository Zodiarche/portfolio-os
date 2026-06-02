import ProjectPage, { type ProjectData } from "./ProjectPage";

const maisonBSGData: ProjectData = {
  title: "La Maison BSG",
  subtitle: "E-commerce artisanal fullstack : API, site web et application mobile",
  icon: "🏠",
  tech: [
    { label: "Backend", items: ["Fastify", "Prisma", "PostgreSQL", "Stripe"] },
    { label: "Web", items: ["Next.js", "Tailwind", "Zustand", "TipTap"] },
    { label: "Mobile", items: ["Expo", "React Native", "TanStack Query"] },
    { label: "Infra", items: ["Docker", "GitHub Actions", "Cloudinary", "Resend"] },
  ],
  description: [
    "La Maison BSG est une boutique en ligne complète pour une marque artisanale. Les clients peuvent parcourir le catalogue, acheter en ligne, suivre leurs commandes, et laisser des avis. L'artisan gère tout depuis un dashboard admin dédié.",
    "J'ai construit le projet de zéro avec trois applications : une API, un site web et une application mobile, le tout dans un seul monorepo. Le site couvre l'intégralité de la chaîne e-commerce, du catalogue au paiement en passant par la gestion des commandes.",
    "Le projet est actuellement en staging, en attente de la finalisation des démarches de création d'entreprise de l'artisane.",
  ],
  features: [
    "Catalogue de produits avec catégories, tailles et gestion des stocks",
    "Paiement en ligne sécurisé, codes promo et suivi des commandes",
    "Dashboard admin : gestion des produits, modération des avis clients et journal d'activité",
    "Application mobile avec connexion biométrique (empreinte / Face ID)",
    "Espace utilisateur : inscription, favoris, adresses multiples et historique de commandes",
    "Newsletter et référencement optimisé",
  ],
  highlights: [
    "Projet construit de zéro : API, site web et application mobile dans un seul monorepo avec des types partagés entre les trois",
    "Authentification sécurisée jusque dans les couches les plus profondes du site, en contournant les limitations techniques de Next.js",
    "Architecture API modulaire : chaque domaine (auth, produits, commandes, paiement) est isolé et testable indépendamment",
    "Pipeline CI/CD complète : chaque modification est automatiquement vérifiée, compilée et testée avant d'être intégrée",
  ],
  links: [],
};

export const MaisonBSGProject = () => <ProjectPage {...maisonBSGData} />;
