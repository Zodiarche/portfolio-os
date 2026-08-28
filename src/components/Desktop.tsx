import { Box } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CELL_HEIGHT, GRID_PADDING } from "../constants/layout";
import { DesktopActionsProvider } from "../contexts/DesktopActionsContext";
import { desktopItems, findItemById, WELCOME_ID } from "../data/icons";
import { useIconGrid } from "../hooks/useIconGrid";
import { useRecentItems } from "../hooks/useRecentItems";
import { useWindowManager } from "../hooks/useWindowManager";
import type { DesktopActions, FileData, FolderData } from "../types/desktop";
import type { Position } from "../types/window";
import DesktopContextMenu from "./DesktopContextMenu";
import DesktopIcon from "./DesktopIcon";
import FolderExplorer from "./FolderExplorer";
import OSWindow from "./OSWindow";
import StartMenu from "./StartMenu";
import Taskbar from "./Taskbar";

const itemIds = desktopItems.map((item) => item.id);

export default function Desktop() {
  const { iconPixelPositions, handleIconDragEnd, resetPositions } = useIconGrid(itemIds);
  const [contextMenuPosition, setContextMenuPosition] = useState<Position | null>(null);

  const renderFolderContent = useCallback(
    (folder: FolderData, openFile: (file: FileData) => void) => (
      <FolderExplorer folder={folder} onOpenFile={openFile} />
    ),
    [],
  );

  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const startButtonRef = useRef<HTMLButtonElement>(null);
  const { recentIds, recordOpen } = useRecentItems();

  // APG: closing a menu returns focus to the button that opened it.
  const closeStartMenu = useCallback(() => {
    setIsStartMenuOpen(false);
    startButtonRef.current?.focus();
  }, []);

  const {
    windows,
    activeWindow,
    setActiveWindow,
    setIconPositions,
    handleItemClick,
    handleCloseWindow,
    handleMinimizeWindow,
    handleMaximizeWindow,
    handleTaskbarWindowClick,
    handleAnimationComplete,
    getMinimizeTargetPosition,
  } = useWindowManager(renderFolderContent, recordOpen);

  const desktopActions = useMemo<DesktopActions>(
    () => ({
      openItemById: (itemId: string) => {
        const item = findItemById(itemId);
        if (!item) return;
        handleItemClick(item);
      },
    }),
    [handleItemClick],
  );

  // The welcome window is the landing content, reopened on every visit.
  // StrictMode runs this twice in dev; the window manager ignores duplicate ids.
  useEffect(() => {
    const welcome = findItemById(WELCOME_ID);
    if (welcome) handleItemClick(welcome);
  }, [handleItemClick]);

  return (
    <Box
      onClick={() => {
        setIsStartMenuOpen(false);
        setContextMenuPosition(null);
      }}
      onContextMenu={(event) => {
        // Contextmenu bubbles from icons and windows too; only the bare
        // background (event fired directly on this Box) opens our menu,
        // so a window still gets the browser's native menu.
        if (event.target !== event.currentTarget) return;
        event.preventDefault();
        setIsStartMenuOpen(false);
        setContextMenuPosition({ x: event.clientX, y: event.clientY });
      }}
      sx={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
        backgroundImage: "url('/wallpaper.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {desktopItems.map((item, index) => {
        const pos = iconPixelPositions.get(item.id) ?? {
          x: GRID_PADDING,
          y: GRID_PADDING + index * CELL_HEIGHT,
        };
        return (
          <DesktopIcon
            key={item.id}
            icon={item.icon}
            title={item.title}
            position={pos}
            animationDelay={index * 0.1}
            onClick={() => handleItemClick(item)}
            onDragEnd={(event, info) => handleIconDragEnd(item.id, event, info)}
          />
        );
      })}

      <DesktopActionsProvider value={desktopActions}>
        {windows
          .filter((windowItem) => !windowItem.isMinimized)
          .map((windowItem) => (
            <OSWindow
              key={windowItem.id}
              id={windowItem.id}
              title={windowItem.title}
              icon={windowItem.icon}
              initialPosition={windowItem.position}
              initialSize={windowItem.size}
              isActive={activeWindow === windowItem.id}
              isMaximized={windowItem.isMaximized || false}
              animationState={windowItem.animationState || "idle"}
              minimizeTargetPosition={getMinimizeTargetPosition(windowItem.id)}
              onClose={() => handleCloseWindow(windowItem.id)}
              onMinimize={() => handleMinimizeWindow(windowItem.id)}
              onMaximize={() => handleMaximizeWindow(windowItem.id)}
              onFocus={() => setActiveWindow(windowItem.id)}
              onAnimationComplete={() => handleAnimationComplete(windowItem.id)}
            >
              {windowItem.component}
            </OSWindow>
          ))}
      </DesktopActionsProvider>

      <StartMenu
        isOpen={isStartMenuOpen}
        recentIds={recentIds}
        onOpenItem={desktopActions.openItemById}
        onClose={closeStartMenu}
      />

      <DesktopContextMenu
        position={contextMenuPosition}
        onClose={() => setContextMenuPosition(null)}
        onSortIcons={resetPositions}
        onOpenStartMenu={() => setIsStartMenuOpen(true)}
      />

      <Taskbar
        windows={windows}
        activeWindow={activeWindow}
        isStartMenuOpen={isStartMenuOpen}
        startButtonRef={startButtonRef}
        onStartMenuToggle={() => setIsStartMenuOpen((previous) => !previous)}
        onWindowClick={handleTaskbarWindowClick}
        onIconPositionsUpdate={setIconPositions}
      />
    </Box>
  );
}
