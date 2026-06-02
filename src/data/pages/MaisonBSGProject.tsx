import ProjectPage, { type ProjectData } from "./ProjectPage";

const maisonBSGData: ProjectData = {
  title: "La Maison BSG",
  subtitle:
    "Boutique artisanale en ligne menée seule : une API, un site web et une application mobile dans un même monorepo",
  icon: "🏠",
  tech: [
    { label: "Backend", items: ["Fastify", "Prisma", "PostgreSQL", "Zod", "Stripe"] },
    { label: "Web", items: ["Next.js", "React 19", "Tailwind", "Zustand", "TanStack Query", "TipTap"] },
    { label: "Mobile", items: ["Expo", "React Native", "TanStack Query"] },
    {
      label: "Infra & qualité",
      items: ["Docker", "Traefik", "VPS", "GitHub Actions", "Biome", "GlitchTip", "Cloudinary", "Resend"],
    },
  ],
  description: [
    "Une artisane veut vendre ses créations en ligne et a besoin de toute la chaîne côté client : un catalogue public, un panier, un paiement sécurisé et un suivi des commandes. Côté gestion, il lui faut piloter sa boutique sans toucher au code, aussi bien depuis un poste fixe que depuis son téléphone, pour suivre les commandes et publier de nouveaux produits au quotidien.",
    "La plateforme couvre l'intégralité de la chaîne e-commerce à travers trois applications réunies dans un seul monorepo : une API REST Fastify/Prisma (catalogue, commandes, paiement Stripe, emails transactionnels), un site Next.js (navigation, panier, favoris, paiement, compte client et dashboard admin) et une application mobile Expo qui sert de back-office nomade à l'artisane (gestion des commandes et du catalogue), protégée par déverrouillage biométrique. Les types de domaine (produits, commandes, adresses) sont partagés entre le site et l'application via un package interne.",
    "Un projet mené seul, de la conception au déploiement. Il tourne aujourd'hui sur un VPS (Docker Compose derrière Traefik, déploiement scripté avec healthchecks), pas encore ouvert au public en attendant la finalisation de la création d'entreprise de l'artisane. La qualité est tenue à zéro défaut (Biome en CI bloquante, zéro warning) et les erreurs sont remontées par un monitoring auto-hébergé.",
  ],
  features: [
    "Catalogue produits : catégories, tailles, gestion des stocks, descriptions riches (TipTap) et images (Cloudinary)",
    "Tunnel d'achat complet : panier, favoris, codes promo, paiement Stripe et suivi des commandes",
    "Dashboard admin : gestion du catalogue, modération des avis clients et journal d'activité",
    "Back-office mobile pour l'artisane : gestion des commandes et du catalogue, déverrouillage biométrique (empreinte / Face ID)",
    "Espace client : inscription, adresses multiples, historique de commandes et emails transactionnels (Resend)",
    "Référencement optimisé et newsletter",
  ],
  highlights: [
    "Monorepo trois apps à contrat typé : les types de domaine sont partagés entre le site et l'application mobile via un package interne, pour qu'une évolution du modèle se répercute à la compilation au lieu de diverger en silence entre les clients.",
    "Protection des routes au plus tôt, dans le middleware Edge de Next.js : la vérification du JWT (signature HMAC-SHA256 via Web Crypto, expiration avec tolérance d'horloge, contrôle du rôle admin) se fait avant tout rendu de page, le runtime Edge n'ayant pas accès à la librairie JWT de Node. Les cookies invalides sont purgés pour éviter les boucles de redirection.",
    "API modulaire par domaine : auth, produits, commandes et paiement sont des plugins Fastify isolés, validés par Zod et testables séparément (tests unitaires sans base, tests d'intégration sur PostgreSQL réel).",
    "Mise en production maîtrisée : déploiement scripté sur VPS (Docker Compose derrière Traefik, healthchecks), monitoring d'erreurs auto-hébergé (GlitchTip), et qualité verrouillée (Biome en CI bloquante).",
  ],
  links: [],
};

export const MaisonBSGProject = () => <ProjectPage {...maisonBSGData} />;
