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
