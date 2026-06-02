import type { PanInfo } from "framer-motion";
import type { Position, WindowData } from "./window";

export interface FileData {
  id: string;
  title: string;
  icon: string;
  component: React.ComponentType;
}

export interface FolderData {
  id: string;
  title: string;
  icon: string;
  files: FileData[];
}

export type DesktopItem = FolderData | FileData;

export interface DesktopIconProps {
  icon: string;
  title: string;
  position: Position;
  animationDelay?: number;
  onClick: () => void;
  onDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}

export interface FolderExplorerProps {
  folder: FolderData;
  onOpenFile: (file: FileData) => void;
}

export interface TaskbarProps {
  windows: WindowData[];
  activeWindow: string | null;
  onWindowClick: (windowId: string) => void;
  onIconPositionsUpdate?: (positions: Map<string, DOMRect>) => void;
}
