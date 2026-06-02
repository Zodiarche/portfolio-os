import { Box } from "@mui/material";
import { useCallback } from "react";
import { CELL_HEIGHT, GRID_PADDING } from "../constants/layout";
import { desktopItems } from "../data/icons";
import { useIconGrid } from "../hooks/useIconGrid";
import { useWindowManager } from "../hooks/useWindowManager";
import type { FileData, FolderData } from "../types/desktop";
import DesktopIcon from "./DesktopIcon";
import FolderExplorer from "./FolderExplorer";
import OSWindow from "./OSWindow";
import Taskbar from "./Taskbar";

const itemIds = desktopItems.map((item) => item.id);

export default function Desktop() {
  const { iconPixelPositions, handleIconDragEnd } = useIconGrid(itemIds);

  const renderFolderContent = useCallback(
    (folder: FolderData, openFile: (file: FileData) => void) => (
      <FolderExplorer folder={folder} onOpenFile={openFile} />
    ),
    [],
  );

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
  } = useWindowManager(renderFolderContent);

  return (
    <Box
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

      <Taskbar
        windows={windows}
        activeWindow={activeWindow}
        onWindowClick={handleTaskbarWindowClick}
        onIconPositionsUpdate={setIconPositions}
      />
    </Box>
  );
}
