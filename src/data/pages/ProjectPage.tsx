import { Box, Button, Chip, Divider, Typography } from "@mui/material";
import type { ProjectData } from "../../types/data";

export type { ProjectData };

export default function ProjectPage({
  title,
  subtitle,
  icon,
  tech,
  description,
  features,
  highlights,
  links,
}: ProjectData) {
  return (
    <Box sx={{ maxWidth: 640, mx: "auto" }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" fontWeight={700}>
          {icon} {title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
        {tech.map((category) => (
          <Box key={category.label} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography
              variant="caption"
              sx={{
                minWidth: 90,
                color: "text.disabled",
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: "0.65rem",
                letterSpacing: "0.06em",
              }}
            >
              {category.label}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {category.items.map((item) => (
                <Chip key={item} label={item} size="small" />
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
        À propos du projet
      </Typography>
      {description.map((paragraph) => (
        <Typography key={paragraph} variant="body1" paragraph>
          {paragraph}
        </Typography>
      ))}

      <Typography variant="h6" fontWeight={600} sx={{ mt: 3, mb: 1 }}>
        Fonctionnalités
      </Typography>
      <Box component="ul" sx={{ pl: 2 }}>
        {features.map((feature) => (
          <Typography key={feature} component="li" variant="body1" sx={{ mb: 0.5 }}>
            {feature}
          </Typography>
        ))}
      </Box>

      <Typography variant="h6" fontWeight={600} sx={{ mt: 3, mb: 1 }}>
        Défis techniques
      </Typography>
      <Box component="ul" sx={{ pl: 2 }}>
        {highlights.map((highlight) => (
          <Typography key={highlight} component="li" variant="body1" sx={{ mb: 0.5 }}>
            {highlight}
          </Typography>
        ))}
      </Box>

      {links.length > 0 && (
        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          {links.map((link) => (
            <Button
              key={link.href}
              variant="outlined"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
}

const portfolioData: ProjectData = {
  title: "Portfolio OS",
  subtitle: "Un portfolio web interactif inspiré de Windows",
  icon: "🖥️",
  tech: [
    { label: "Framework", items: ["React", "TypeScript"] },
    { label: "UI", items: ["Material UI", "Emotion"] },
    { label: "Animations", items: ["framer-motion", "react-rnd"] },
    { label: "Build", items: ["Vite"] },
  ],
  description: [
    "Un portfolio conçu comme un système d'exploitation. L'interface que vous utilisez en ce moment est elle-même la démonstration technique. Chaque section du portfolio s'ouvre dans une fenêtre, comme sur un vrai bureau.",
    "Pas de librairie de navigation : tout repose sur un système de fenêtres indépendantes que l'on peut déplacer, redimensionner, minimiser et maximiser, avec des animations fluides à chaque action.",
  ],
  features: [
    "Fenêtres déplaçables et redimensionnables avec minimisation, maximisation et gestion du focus",
    "Icônes du bureau repositionnables avec placement automatique sans chevauchement",
    "Explorateur de dossiers pour organiser les sections du portfolio en arborescence",
    "Barre des tâches avec horloge et accès rapide aux fenêtres ouvertes",
    "Formulaire de contact avec protection anti-spam",
  ],
  highlights: [
    "Système de fenêtres entièrement custom : chaque fenêtre gère sa propre position et taille, avec des animations distinctes à l'ouverture, la minimisation et la restauration",
    "Placement intelligent des icônes : un algorithme maison calcule la meilleure position libre sur le bureau, sans jamais superposer deux icônes",
    "Animation de minimisation vers la barre des tâches : la fenêtre se réduit précisément vers son icône dans la taskbar, calculé en temps réel",
    "Thème visuel centralisé : couleurs, arrondis et ombres définis une seule fois et appliqués uniformément à toute l'interface",
  ],
  links: [{ label: "GitHub", href: "https://github.com/Zodiarche/portfolio-os" }],
};

export const PortfolioProject = () => <ProjectPage {...portfolioData} />;
