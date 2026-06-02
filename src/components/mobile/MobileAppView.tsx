import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { MOBILE_NAV_HEADER_HEIGHT } from "../../constants/layout";
import type { MobileAppViewProps } from "../../types/mobile";
import { stripExtension } from "../../utils/stripExtension";

export default function MobileAppView({ file, onBack }: MobileAppViewProps) {
  const FileComponent = file.component;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
      style={{ width: "100%", height: "100%", position: "absolute" }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "white",
        }}
      >
        <Box
          sx={{
            height: MOBILE_NAV_HEADER_HEIGHT,
            display: "flex",
            alignItems: "center",
            px: 0.5,
            borderBottom: "1px solid #e0e0e0",
            flexShrink: 0,
          }}
        >
          <IconButton onClick={onBack} aria-label="Retour">
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ fontSize: 20, mx: 0.5 }}>{file.icon}</Box>
          <Typography variant="subtitle1" fontWeight={600} noWrap sx={{ flex: 1 }}>
            {stripExtension(file.title)}
          </Typography>
        </Box>

        <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
          <Suspense
            fallback={
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <CircularProgress size={28} />
              </Box>
            }
          >
            <FileComponent />
          </Suspense>
        </Box>
      </Box>
    </motion.div>
  );
}
