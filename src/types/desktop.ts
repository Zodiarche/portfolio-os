import type { PanInfo } from "framer-motion";
import type { Position, WindowData } from "./window";

export interface FileData {
  id: string;
  title: string;
  icon: string;
  component: React.ComponentType;
  /** One-line pitch shown in the folder details view. Absent for entries that have none. */
  subtitle?: string;
  /** Main technologies, shown as the last column of the folder details view. */
  stack?: string[];
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
  isStartMenuOpen: boolean;
  /** Owned by Desktop, which restores focus here when the start menu closes (APG). */
  startButtonRef: React.RefObject<HTMLButtonElement>;
  onStartMenuToggle: () => void;
  onWindowClick: (windowId: string) => void;
  onIconPositionsUpdate?: (positions: Map<string, DOMRect>) => void;
}

export interface DesktopActions {
  /** Opens any desktop item by id, from a page rendered inside a window. */
  openItemById: (itemId: string) => void;
}

export interface StartMenuProps {
  isOpen: boolean;
  recentIds: string[];
  onOpenItem: (itemId: string) => void;
  onClose: () => void;
}

export interface DesktopContextMenuProps {
  position: Position | null;
  onClose: () => void;
  onSortIcons: () => void;
  onOpenStartMenu: () => void;
}
