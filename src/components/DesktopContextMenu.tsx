import { Box, Typography } from "@mui/material";
import { useLayoutEffect, useRef, useState } from "react";
import { TASKBAR_HEIGHT } from "../constants/layout";
import { useMenuKeyboard } from "../hooks/useMenuKeyboard";
import type { DesktopContextMenuProps } from "../types/desktop";
import type { Position, Size } from "../types/window";

const VIEWPORT_MARGIN = 8;

// Desktop is overflow:hidden with no scrollbar, so a menu opened near an edge
// must be pulled back into the viewport rather than clipped and unreachable.
// The taskbar has no z-index of its own, so bottom clamping also has to stay
// clear of it (matches the convention in useIconGrid's getMaxRows).
function clampToViewport(position: Position, menuSize: Size): Position {
  const maxX = window.innerWidth - menuSize.width - VIEWPORT_MARGIN;
  const maxY = window.innerHeight - TASKBAR_HEIGHT - menuSize.height - VIEWPORT_MARGIN;
  return {
    x: Math.max(VIEWPORT_MARGIN, Math.min(position.x, maxX)),
    y: Math.max(VIEWPORT_MARGIN, Math.min(position.y, maxY)),
  };
}

export default function DesktopContextMenu({
  position,
  onClose,
  onSortIcons,
  onOpenStartMenu,
}: DesktopContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [clampedPosition, setClampedPosition] = useState<Position | null>(null);

  const actions = [
    { label: "Actualiser", run: () => window.location.reload() },
    { label: "Trier les icônes", run: onSortIcons },
    { label: "Ouvrir le menu démarrer", run: onOpenStartMenu },
  ];
  const { registerItem, handleKeyDown } = useMenuKeyboard({
    itemCount: actions.length,
    isOpen: position !== null,
    onClose,
  });

  // Measured after mount so clamping accounts for the menu's real size, not a guess.
  useLayoutEffect(() => {
    if (!position || !menuRef.current) {
      setClampedPosition(null);
      return;
    }
    const { width, height } = menuRef.current.getBoundingClientRect();
    setClampedPosition(clampToViewport(position, { width, height }));
  }, [position]);

  if (!position) return null;

  const renderedPosition = clampedPosition ?? position;

  return (
    <Box
      ref={menuRef}
      role="menu"
      aria-label="Actions du bureau"
      onKeyDown={handleKeyDown}
      // The desktop background closes this menu on click; a click inside it must not reach it.
      onClick={(event) => event.stopPropagation()}
      sx={{
        position: "absolute",
        left: renderedPosition.x,
        top: renderedPosition.y,
        // Opacity, not visibility: the APG effect in useMenuKeyboard focuses the
        // first item on mount, and a visibility:hidden element cannot take focus.
        opacity: clampedPosition ? 1 : 0,
        zIndex: 1300,
        minWidth: 210,
        p: 0.75,
        borderRadius: 1.5,
        background: "rgba(245, 246, 250, 0.98)",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.28)",
      }}
    >
      {actions.map((action, index) => (
        <Box
          key={action.label}
          ref={(element) => registerItem(index, element as HTMLElement | null)}
          role="menuitem"
          tabIndex={-1}
          onClick={() => {
            onClose();
            action.run();
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onClose();
              action.run();
            }
          }}
          sx={{
            px: 1.5,
            py: 0.9,
            borderRadius: 1,
            cursor: "pointer",
            outline: "none",
            "&:hover, &:focus-visible": { bgcolor: "rgba(0, 0, 0, 0.07)" },
          }}
        >
          <Typography variant="body2" sx={{ color: "#222" }}>
            {action.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
