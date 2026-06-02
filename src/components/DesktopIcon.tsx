import { Box, Typography, useTheme } from "@mui/material";
import { motion, type PanInfo, useMotionValue } from "framer-motion";
import { useRef } from "react";
import type { DesktopIconProps } from "../types/desktop";

const DRAG_THRESHOLD = 5;

export default function DesktopIcon({
  icon,
  title,
  position,
  animationDelay = 0,
  onClick,
  onDragEnd,
}: DesktopIconProps) {
  const theme = useTheme();
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const isDraggingRef = useRef(false);

  const handleDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const distance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);
    if (distance > DRAG_THRESHOLD) {
      onDragEnd(event, info);
    } else {
      // Tiny movement - allow onClick to fire
      isDraggingRef.current = false;
    }
    // Reset drag transform immediately (no animation)
    dragX.set(0);
    dragY.set(0);
    // Clear flag after click event has had a chance to fire
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 0);
  };

  const handleClick = () => {
    if (isDraggingRef.current) return;
    onClick();
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        x: dragX,
        y: dragY,
        cursor: "grab",
        zIndex: 1,
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: "grabbing", zIndex: 10 }}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: animationDelay, duration: 0.3 }}
    >
      <Box
        role="button"
        tabIndex={0}
        aria-label={title}
        onClick={handleClick}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleClick();
          }
        }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.5,
          userSelect: "none",
          width: 96,
          padding: 1,
          borderRadius: 1.5,
          outline: "none",
          "&:hover": {
            bgcolor: "rgba(255, 255, 255, 0.12)",
          },
          "&:focus-visible": {
            outline: `2px solid ${theme.palette.secondary.main}`,
            outlineOffset: 2,
          },
        }}
      >
        <Box
          sx={{
            fontSize: 52,
            filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="caption"
          sx={{
            color: "white",
            textAlign: "center",
            textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
            fontWeight: 600,
            fontSize: "0.75rem",
            lineHeight: 1.2,
            maxWidth: 90,
            wordBreak: "break-word",
          }}
        >
          {title}
        </Typography>
      </Box>
    </motion.div>
  );
}
