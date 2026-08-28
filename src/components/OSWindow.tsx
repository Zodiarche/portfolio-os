import CloseIcon from "@mui/icons-material/Close";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import MinimizeIcon from "@mui/icons-material/Minimize";
import {
  alpha,
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { Suspense, useState } from "react";
import { Rnd } from "react-rnd";
import { MIN_WINDOW_SIZE_RATIO, TASKBAR_HEIGHT } from "../constants/layout";
import {
  getAnimationVariants,
  getCurrentVariant,
  getInitialVariant,
  getTransitionConfig,
} from "../hooks/useWindowAnimation";
import type { OSWindowProps } from "../types/window";

export default function OSWindow({
  title,
  icon,
  children,
  initialPosition,
  initialSize,
  isActive,
  isMaximized,
  animationState,
  minimizeTargetPosition,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onAnimationComplete,
}: OSWindowProps) {
  const theme = useTheme();
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);

  return (
    <Rnd
      position={isMaximized ? { x: 0, y: 0 } : position}
      size={
        isMaximized
          ? { width: window.innerWidth, height: window.innerHeight - TASKBAR_HEIGHT }
          : size
      }
      onDragStop={(_event, data) => {
        setPosition({ x: data.x, y: data.y });
      }}
      onResizeStop={(_event, _direction, element, _delta, newPosition) => {
        setSize({ width: element.offsetWidth, height: element.offsetHeight });
        setPosition(newPosition);
      }}
      // re-resizable writes these into the wrapper's CSS, so a viewport-relative
      // minimum would inflate a window that asked for a smaller content size.
      minWidth={Math.min(Math.round(window.innerWidth * MIN_WINDOW_SIZE_RATIO), initialSize.width)}
      minHeight={Math.min(
        Math.round(window.innerHeight * MIN_WINDOW_SIZE_RATIO),
        initialSize.height,
      )}
      bounds="parent"
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      dragHandleClassName="window-header"
      style={{ zIndex: isActive ? 1000 : 999 }}
    >
      <motion.div
        key="window-content"
        variants={getAnimationVariants(minimizeTargetPosition, initialPosition, initialSize)}
        initial={getInitialVariant(animationState)}
        animate={getCurrentVariant(animationState)}
        transition={getTransitionConfig(animationState)}
        onAnimationComplete={onAnimationComplete}
        style={{ width: "100%", height: "100%" }}
      >
        <Paper
          elevation={isActive ? 8 : 4}
          onMouseDown={onFocus}
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            borderRadius: "8px",
            border: isActive
              ? `1px solid ${alpha(theme.palette.primary.main, 0.35)}`
              : "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            className="window-header"
            sx={{
              background: isActive
                ? `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.secondary.main})`
                : "linear-gradient(to right, #475569, #64748b)",
              color: "white",
              padding: "4px 8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "move",
              userSelect: "none",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ fontSize: 20 }}>{icon}</Box>
              <Typography variant="body2" fontWeight={600}>
                {title}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <IconButton
                size="small"
                onClick={onMinimize}
                aria-label="Minimiser la fenêtre"
                sx={{
                  color: "white",
                  width: 28,
                  height: 28,
                  "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                }}
              >
                <MinimizeIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={onMaximize}
                aria-label="Maximiser la fenêtre"
                sx={{
                  color: "white",
                  width: 28,
                  height: 28,
                  "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                }}
              >
                <CropSquareIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={onClose}
                aria-label="Fermer la fenêtre"
                sx={{
                  color: "white",
                  width: 28,
                  height: 28,
                  "&:hover": { bgcolor: "#e81123" },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              bgcolor: "white",
              padding: 2,
            }}
          >
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
              {children}
            </Suspense>
          </Box>
        </Paper>
      </motion.div>
    </Rnd>
  );
}
