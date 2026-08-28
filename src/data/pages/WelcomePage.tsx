import { Box, Button, Divider, Typography } from "@mui/material";
import {
  IDENTITY_LOCATION,
  IDENTITY_NAME,
  IDENTITY_PITCH,
  IDENTITY_ROLE,
} from "../../constants/identity";
import { useDesktopActions } from "../../contexts/DesktopActionsContext";

export default function WelcomePage() {
  const { openItemById } = useDesktopActions();

  return (
    <Box sx={{ maxWidth: 560, mx: "auto" }}>
      <Typography variant="h4" fontWeight={700}>
        {IDENTITY_NAME}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {IDENTITY_ROLE}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {IDENTITY_LOCATION}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body1" sx={{ fontSize: "1.05rem" }}>
        {IDENTITY_PITCH}
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
