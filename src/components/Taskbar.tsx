import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useRef } from "react";
import { TASKBAR_HEIGHT } from "../constants/layout";
import { useClock } from "../hooks/useClock";
import type { TaskbarProps } from "../types/desktop";

export default function Taskbar({
  windows,
  activeWindow,
  onWindowClick,
  onIconPositionsUpdate,
}: TaskbarProps) {
  const theme = useTheme();
  const windowButtonsRef = useRef<Map<string, HTMLDivElement>>(new Map());

  // The taskbar button set only changes when a window is opened or closed.
  // Keying the effect on the id set (not the windows reference) avoids
  // redundant getBoundingClientRect reflows on every animationState /
  // maximize transition, which all produce a fresh windows array.
  const windowIdsKey = windows.map((windowItem) => windowItem.id).join("|");

  /** Syncs taskbar icon DOMRects for minimize/restore animation targeting. */
  // biome-ignore lint/correctness/useExhaustiveDependencies: windowIdsKey is an intentional trigger (recompute when the window set changes), not read inside the effect
  useEffect(() => {
    if (!onIconPositionsUpdate) return;

    const positions = new Map<string, DOMRect>();
    windowButtonsRef.current.forEach((element, windowId) => {
      if (element) {
        positions.set(windowId, element.getBoundingClientRect());
      }
    });

    onIconPositionsUpdate(positions);
  }, [windowIdsKey, onIconPositionsUpdate]);

  const setWindowButtonRef = (windowId: string, element: HTMLDivElement | null) => {
    if (element) {
      windowButtonsRef.current.set(windowId, element);
    } else {
      windowButtonsRef.current.delete(windowId);
    }
  };

  const { time, date } = useClock();

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: TASKBAR_HEIGHT,
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(20px) saturate(180%)",
        borderTop: "1px solid rgba(255, 255, 255, 0.3)",
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        gap: 1.5,
        boxShadow: "0 -4px 24px rgba(0, 0, 0, 0.15)",
        userSelect: "none",
      }}
    >
      <Box sx={{ flex: 1, display: "flex", gap: 0.5, justifyContent: "center" }}>
        {windows.map((window) => (
          <Box
            key={window.id}
            ref={(element) => setWindowButtonRef(window.id, element as HTMLDivElement | null)}
            role="button"
            tabIndex={0}
            aria-label={window.title}
            onClick={() => onWindowClick(window.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onWindowClick(window.id);
              }
            }}
            sx={{
              position: "relative",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              borderRadius: 1,
              outline: "none",
              background: activeWindow === window.id ? "rgba(255, 255, 255, 0.15)" : "transparent",
              transition: "all 0.2s ease",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.1)",
              },
              "&:focus-visible": {
                outline: `2px solid ${theme.palette.secondary.main}`,
                outlineOffset: 2,
              },
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: activeWindow === window.id ? "70%" : "0%",
                height: 3,
                background: "rgba(255, 255, 255, 0.9)",
                borderRadius: "2px 2px 0 0",
                transition: "width 0.3s ease",
              },
              "&:hover::after": {
                width: activeWindow === window.id ? "70%" : "40%",
              },
            }}
          >
            <Box component="span" sx={{ fontSize: 24 }}>
              {window.icon}
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          minWidth: 100,
          height: 48,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" color="white">
          {time}
        </Typography>
        <Typography variant="caption" color="white">
          {date}
        </Typography>
      </Box>
    </Box>
  );
}
