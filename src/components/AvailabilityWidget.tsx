import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { AVAILABILITY_LABEL, IDENTITY_LOCATION } from "../constants/identity";
import { GRID_PADDING } from "../constants/layout";
import type { AvailabilityWidgetProps } from "../types/desktop";

// Widened any further, the widget would slip under the welcome window, which
// opens centred at 70% of the viewport. 200px keeps it clear from 1440px up.
const WIDGET_WIDTH = 200;

// Amber, not green: the status is "employed but open to freelance", so the
// dot must not read as fully available the way an OS presence indicator does.
const STATUS_DOT_COLOR = "#fbbf24";

/** Desktop-resident availability card, the only always-on call to action. */
export default function AvailabilityWidget({ onContact }: AvailabilityWidgetProps) {
  return (
    <Box
      component={motion.aside}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      aria-label="Disponibilité"
      sx={{
        // Hidden on narrow viewports: the welcome window takes 70% of the
        // width and would cover the widget instead of sitting beside it.
        display: { xs: "none", md: "block" },
        position: "absolute",
        top: GRID_PADDING,
        right: GRID_PADDING,
        width: WIDGET_WIDTH,
        p: 2,
        borderRadius: 2,
        // Dark glass, like the start menu: the taskbar's white glass only works
        // over the wallpaper's dark lower half, and this corner is bright sky.
        background: "rgba(20, 24, 34, 0.72)",
        backdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.16)",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)",
        userSelect: "none",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <Box
          aria-hidden
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: STATUS_DOT_COLOR,
            boxShadow: `0 0 8px ${STATUS_DOT_COLOR}`,
            flexShrink: 0,
          }}
        />
        <Typography
          variant="caption"
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Disponibilité
        </Typography>
      </Box>

      <Typography variant="body2" color="white" fontWeight={600}>
        {AVAILABILITY_LABEL}
      </Typography>
      <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
        {IDENTITY_LOCATION}
      </Typography>

      <Button variant="contained" size="small" fullWidth sx={{ mt: 2 }} onClick={onContact}>
        Me contacter
      </Button>
    </Box>
  );
}
