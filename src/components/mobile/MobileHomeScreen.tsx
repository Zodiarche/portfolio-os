import { Box, Typography, useTheme } from "@mui/material";
import { flattenFiles, WELCOME_ID } from "../../data/icons";
import type { MobileHomeScreenProps } from "../../types/mobile";
import { stripExtension } from "../../utils/stripExtension";

// The welcome content is rendered as a header on mobile, not as an app icon.
const allFiles = flattenFiles().filter((file) => file.id !== WELCOME_ID);

export default function MobileHomeScreen({ onOpenFile }: MobileHomeScreenProps) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundImage: "url('/wallpaper.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          px: 3,
          pt: 4,
          pb: 1,
          color: "white",
          textShadow: "0 1px 3px rgba(0,0,0,0.5)",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Benjamin Guillemin
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.85 }}>
          Développeur Fullstack Web &amp; Mobile
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.85 }}>
          Bordeaux, France
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Je construis des applications web et mobiles, du serveur à l'interface.
        </Typography>
        <Typography variant="caption" sx={{ display: "block", mt: 1, opacity: 0.85 }}>
          En poste, ouvert au freelance
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2.5,
          px: 3,
          py: 4,
        }}
      >
        {allFiles.map((file) => (
          <Box
            key={file.id}
            role="button"
            tabIndex={0}
            aria-label={stripExtension(file.title)}
            onClick={() => onOpenFile(file)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onOpenFile(file);
              }
            }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.5,
              cursor: "pointer",
              userSelect: "none",
              outline: "none",
              "&:focus-visible": {
                outline: `2px solid ${theme.palette.secondary.main}`,
                outlineOffset: 2,
              },
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "22%",
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                fontSize: 30,
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              {file.icon}
            </Box>
            <Typography
              variant="caption"
              sx={{
                color: "white",
                textAlign: "center",
                fontSize: "0.7rem",
                fontWeight: 500,
                textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                lineHeight: 1.2,
                maxWidth: 70,
              }}
            >
              {stripExtension(file.title)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
