import { useCallback, useRef, useState } from "react";
import type { UseDesktopMenusReturn } from "../types/hooks";
import type { Position } from "../types/window";

/**
 * Owns the desktop's two menus. The "at most one menu open" invariant lives here
 * instead of being split between the background, the taskbar button and the
 * context menu actions, where a missing branch let both show at once.
 */
export function useDesktopMenus(): UseDesktopMenusReturn {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState<Position | null>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);

  const closeContextMenu = useCallback(() => {
    setContextMenuPosition(null);
  }, []);

  // APG: closing a menu returns focus to the button that opened it. Only the
  // start menu has such a button, so only it restores focus.
  const closeStartMenu = useCallback(() => {
    setIsStartMenuOpen(false);
    startButtonRef.current?.focus();
  }, []);

  const closeBoth = useCallback(() => {
    setIsStartMenuOpen(false);
    setContextMenuPosition(null);
  }, []);

  const openStartMenu = useCallback(() => {
    setContextMenuPosition(null);
    setIsStartMenuOpen(true);
  }, []);

  const toggleStartMenu = useCallback(() => {
    setContextMenuPosition(null);
    setIsStartMenuOpen((previous) => !previous);
  }, []);

  const handleBackgroundContextMenu = useCallback(
    (event: React.MouseEvent) => {
      // Contextmenu bubbles from icons and windows too, and both menus close
      // either way; only the bare background opens ours, so a window keeps the
      // browser's native menu.
      closeBoth();
      if (event.target !== event.currentTarget) return;
      event.preventDefault();
      setContextMenuPosition({ x: event.clientX, y: event.clientY });
    },
    [closeBoth],
  );

  return {
    isStartMenuOpen,
    contextMenuPosition,
    startButtonRef,
    toggleStartMenu,
    closeStartMenu,
    openStartMenu,
    closeContextMenu,
    handleBackgroundClick: closeBoth,
    handleBackgroundContextMenu,
  };
}
