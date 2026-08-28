import type React from "react";
import { useCallback, useState } from "react";
import { TASKBAR_HEIGHT, WINDOW_CASCADE_OFFSET, WINDOW_SIZE_RATIO } from "../constants/layout";
import { isFolder } from "../data/icons";
import type { DesktopItem, FileData, FolderData } from "../types/desktop";
import type { RenderFolderContent, UseWindowManagerReturn } from "../types/hooks";
import type { Position, Size, WindowData } from "../types/window";

/** Creates a centered WindowData with cascading offset based on existing window count. */
function createWindowData(
  id: string,
  title: string,
  icon: string,
  component: React.ReactNode,
  existingCount: number,
  preferredSize?: Size,
): WindowData {
  const availableHeight = window.innerHeight - TASKBAR_HEIGHT;

  // A page can ask for the size its content actually needs; without one, the
  // window falls back to a share of the viewport. Never larger than the desktop.
  const width = Math.min(
    preferredSize?.width ?? Math.round(window.innerWidth * WINDOW_SIZE_RATIO),
    window.innerWidth,
  );
  const height = Math.min(
    preferredSize?.height ?? Math.round(availableHeight * WINDOW_SIZE_RATIO),
    availableHeight,
  );

  return {
    id,
    title,
    icon,
    component,
    position: {
      x: Math.round((window.innerWidth - width) / 2) + existingCount * WINDOW_CASCADE_OFFSET,
      y: Math.round((availableHeight - height) / 2) + existingCount * WINDOW_CASCADE_OFFSET,
    },
    size: { width, height },
  };
}

/** Manages window lifecycle: open, close, minimize, maximize, and taskbar interactions. */
export function useWindowManager(renderFolderContent: RenderFolderContent): UseWindowManagerReturn {
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [iconPositions, setIconPositions] = useState<Map<string, DOMRect>>(new Map());

  const handleOpenFile = useCallback((file: FileData) => {
    setWindows((previous) => {
      if (previous.find((windowItem) => windowItem.id === file.id)) return previous;
      const FileComponent = file.component;
      return [
        ...previous,
        createWindowData(
          file.id,
          file.title,
          file.icon,
          <FileComponent />,
          previous.length,
          file.windowSize,
        ),
      ];
    });
    setActiveWindow(file.id);
  }, []);

  const handleItemClick = useCallback(
    (item: DesktopItem) => {
      if (isFolder(item)) {
        setWindows((previous) => {
          if (previous.find((windowItem) => windowItem.id === item.id)) return previous;
          const component = renderFolderContent(item as FolderData, handleOpenFile);
          return [
            ...previous,
            createWindowData(item.id, item.title, item.icon, component, previous.length),
          ];
        });
        setActiveWindow(item.id);
      } else {
        handleOpenFile(item);
      }
    },
    [handleOpenFile, renderFolderContent],
  );

  const handleCloseWindow = useCallback((windowId: string) => {
    setWindows((previous) => previous.filter((windowItem) => windowItem.id !== windowId));
    setActiveWindow((previous) => (previous === windowId ? null : previous));
  }, []);

  const handleMinimizeWindow = useCallback((windowId: string) => {
    setWindows((previous) =>
      previous.map((windowItem) =>
        windowItem.id === windowId
          ? { ...windowItem, animationState: "minimizing" as const }
          : windowItem,
      ),
    );
    setActiveWindow(null);
  }, []);

  /** Finalizes a minimize/restore once its Framer Motion animation actually ends. */
  const handleAnimationComplete = useCallback((windowId: string) => {
    setWindows((previous) => {
      const target = previous.find((windowItem) => windowItem.id === windowId);
      const state = target?.animationState;

      // The open/idle settle also fires onAnimationComplete: nothing to do,
      // return the same reference to skip a needless re-render.
      if (state !== "minimizing" && state !== "restoring") return previous;

      return previous.map((windowItem) => {
        if (windowItem.id !== windowId) return windowItem;
        if (state === "minimizing") {
          return { ...windowItem, isMinimized: true, animationState: "idle" as const };
        }
        return { ...windowItem, animationState: "idle" as const };
      });
    });
  }, []);

  const handleMaximizeWindow = useCallback((windowId: string) => {
    setWindows((previous) =>
      previous.map((windowItem) =>
        windowItem.id === windowId
          ? { ...windowItem, isMaximized: !windowItem.isMaximized }
          : windowItem,
      ),
    );
  }, []);

  const handleTaskbarWindowClick = useCallback(
    (windowId: string) => {
      setWindows((previous) => {
        const targetWindow = previous.find((windowItem) => windowItem.id === windowId);
        if (!targetWindow) return previous;

        if (targetWindow.isMinimized) {
          setActiveWindow(windowId);
          return previous.map((windowItem) =>
            windowItem.id === windowId
              ? { ...windowItem, isMinimized: false, animationState: "restoring" as const }
              : windowItem,
          );
        }

        if (activeWindow === windowId) {
          handleMinimizeWindow(windowId);
          return previous;
        }

        setActiveWindow(windowId);
        return previous;
      });
    },
    [activeWindow, handleMinimizeWindow],
  );

  const getMinimizeTargetPosition = useCallback(
    (windowId: string): Position | null => {
      const rect = iconPositions.get(windowId);
      if (!rect) return null;
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    },
    [iconPositions],
  );

  return {
    windows,
    activeWindow,
    setActiveWindow,
    setIconPositions,
    handleItemClick,
    handleOpenFile,
    handleCloseWindow,
    handleMinimizeWindow,
    handleMaximizeWindow,
    handleTaskbarWindowClick,
    handleAnimationComplete,
    getMinimizeTargetPosition,
  };
}
