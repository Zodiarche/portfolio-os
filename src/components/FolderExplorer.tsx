import { alpha, Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import type { FolderExplorerProps } from "../types/desktop";

export default function FolderExplorer({ folder, onOpenFile }: FolderExplorerProps) {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 0.75,
          bgcolor: "#f0f0f0",
          borderBottom: "1px solid #d0d0d0",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontFamily: "monospace",
            color: "#333",
            bgcolor: "white",
            border: "1px solid #ccc",
            borderRadius: 0.5,
            px: 1.5,
            py: 0.5,
            flex: 1,
            fontSize: "0.8rem",
          }}
        >
          C:\{folder.title}\
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          p: 2,
          alignContent: "flex-start",
        }}
      >
        {folder.files.map((file) => (
          <motion.div key={file.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Box
              role="button"
              tabIndex={0}
              aria-label={file.title}
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
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: 2,
                },
                width: 110,
                padding: 1,
                borderRadius: 1.5,
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <Box sx={{ fontSize: 44 }}>{file.icon}</Box>
              <Typography
                variant="caption"
                sx={{
                  textAlign: "center",
                  color: "#333",
                  fontSize: "0.75rem",
                  lineHeight: 1.2,
                  wordBreak: "break-word",
                }}
              >
                {file.title}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
