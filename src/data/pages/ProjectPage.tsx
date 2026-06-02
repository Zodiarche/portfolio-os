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
  subtitle:
    "Mon portfolio conçu comme un système d'exploitation : l'interface que vous manipulez en ce moment est elle-même la démonstration technique (fenêtres, bureau, explorateur de fichiers), sans aucune librairie de navigation",
  icon: "🖥️",
  tech: [
    { label: "Framework", items: ["React", "TypeScript"] },
    { label: "UI", items: ["Material UI", "Emotion"] },
    { label: "Animations", items: ["framer-motion", "react-rnd"] },
    { label: "Build", items: ["Vite", "Bun"] },
    { label: "Infra", items: ["Docker", "nginx", "Traefik"] },
  ],
  description: [
    "Un portfolio, d'habitude, ça se parcourt. Celui-ci se manipule : l'interface elle-même tient lieu de démonstration technique. Ce que vous utilisez en ce moment est le projet.",
    "Je l'ai construit comme un système d'exploitation : chaque section s'ouvre dans une fenêtre qu'on déplace, redimensionne, minimise ou maximise, le bureau porte des icônes repositionnables, un explorateur range les sections en arborescence et une barre des tâches suit les fenêtres ouvertes. Le tout sans aucune librairie de navigation : tout repose sur un système de fenêtres maison. Sur mobile, l'interface bascule automatiquement vers une métaphore d'écran d'accueil de téléphone.",
    "C'est un projet solo de bout en bout : conçu et développé en TypeScript strict sur React 18 et Vite, puis mis en ligne sur mon propre serveur (image Docker multi-stage servie par nginx derrière Traefik sur mon VPS). Il héberge aussi mon CV.",
  ],
  features: [
    "Fenêtres déplaçables et redimensionnables, avec minimisation, maximisation et gestion du focus",
    "Bureau à icônes repositionnables : alignement sur la grille et évitement automatique des collisions",
    "Explorateur de dossiers pour organiser les sections du portfolio en arborescence",
    "Barre des tâches avec horloge et bascule rapide entre les fenêtres ouvertes",
    "Version mobile dédiée : bascule automatique vers une métaphore d'écran d'accueil de téléphone (barre d'état, accueil, vue application)",
    "Formulaire de contact avec protection anti-spam (honeypot et anti-renvoi)",
  ],
  highlights: [
    "Aucune librairie de navigation : le système de fenêtres est écrit à la main (chaque fenêtre gère sa position, sa taille, son focus et son z-index), avec des animations distinctes selon l'état : ressort à l'ouverture, glissement à la minimisation et à la restauration. Cohérent avec le parti pris du projet : faire de l'interface elle-même la démonstration.",
    "Animation de minimisation calculée en temps réel : la fenêtre se réduit vers le centre exact de son icône dans la barre des tâches, l'offset étant recalculé à partir de la position réelle de l'icône à chaque minimisation plutôt qu'avec une valeur en dur. Elle reste donc juste même après un redimensionnement de la fenêtre ou de l'écran.",
    "Placement automatique des icônes : à la dépose, l'icône s'aligne sur la grille et, si la case est occupée, une recherche en spirale (distance de Manhattan) trouve la case libre la plus proche. Deux icônes ne se superposent jamais, sans pour autant imposer un rangement rigide.",
    "Pages chargées à la demande : chaque page vit dans son propre chunk et n'est téléchargée qu'à l'ouverture de sa fenêtre, ce qui garde le bundle initial léger : un visiteur qui n'ouvre pas une section n'en paie pas le poids.",
  ],
  links: [{ label: "GitHub", href: "https://github.com/Zodiarche/portfolio-os" }],
};

export const PortfolioProject = () => <ProjectPage {...portfolioData} />;
