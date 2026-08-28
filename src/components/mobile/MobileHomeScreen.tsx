import { Box, Typography, useTheme } from "@mui/material";
import { flattenFiles } from "../../data/icons";
import type { MobileHomeScreenProps } from "../../types/mobile";
import { stripExtension } from "../../utils/stripExtension";

const allFiles = flattenFiles();

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
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
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
