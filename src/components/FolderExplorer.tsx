import { alpha, Box, Chip, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import type { FolderExplorerProps } from "../types/desktop";

export default function FolderExplorer({ folder, onOpenFile }: FolderExplorerProps) {
  const theme = useTheme();
  const fileCountLabel = `${folder.files.length} élément${folder.files.length > 1 ? "s" : ""}`;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          px: 2,
          py: 1,
          borderBottom: "1px solid #e0e0e0",
          color: "text.secondary",
          fontSize: "0.75rem",
        }}
      >
        {fileCountLabel}
      </Box>

      <Box sx={{ flex: 1, overflow: "auto", py: 0.5 }}>
        {folder.files.map((file) => (
          <motion.div key={file.id} whileHover={{ x: 2 }} whileTap={{ scale: 0.995 }}>
            <Box
              role="button"
              tabIndex={0}
              onClick={() => onOpenFile(file)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onOpenFile(file);
                }
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 2,
                py: 1.25,
                cursor: "pointer",
                userSelect: "none",
                outline: "none",
                "&:focus-visible": {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: -2,
                },
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <Box sx={{ fontSize: 28, flexShrink: 0 }}>{file.icon}</Box>

              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography variant="body2" sx={{ color: "#222", fontWeight: 600 }}>
                  {file.title}
                </Typography>
                {file.subtitle && (
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", display: "block", lineHeight: 1.35 }}
                  >
                    {file.subtitle}
                  </Typography>
                )}
              </Box>

              {file.stack && (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-end",
                    gap: 0.5,
                    maxWidth: 220,
                    flexShrink: 0,
                  }}
                >
                  {file.stack.map((technology) => (
                    <Chip key={technology} label={technology} size="small" />
                  ))}
                </Box>
              )}
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
