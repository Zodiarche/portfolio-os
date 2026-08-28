import type { PanInfo } from "framer-motion";
import type { Skill, SkillCategory, SkillSelection } from "./data";
import type { DesktopItem, FileData, FolderData } from "./desktop";
import type { Position, WindowData } from "./window";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Honeypot: rendered hidden, must stay empty for a human submission. */
  gotcha: string;
}

export interface UseContactFormReturn {
  formData: ContactFormData;
  sent: boolean;
  sending: boolean;
  error: string;
  updateField: (field: keyof ContactFormData, value: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
  reset: () => void;
}

export interface UseSkillSelectionReturn {
  selected: SkillSelection;
  setSelected: React.Dispatch<React.SetStateAction<SkillSelection>>;
  selectedCategory: SkillCategory;
  selectedSkill: Skill;
}

export interface UseClockReturn {
  time: string;
  date: string;
}

export interface UseIconGridReturn {
  iconPixelPositions: Map<string, Position>;
  handleIconDragEnd: (
    folderId: string,
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => void;
  resetPositions: () => void;
}

export interface UseWindowManagerReturn {
  windows: WindowData[];
  activeWindow: string | null;
  setActiveWindow: (windowId: string | null) => void;
  setIconPositions: React.Dispatch<React.SetStateAction<Map<string, DOMRect>>>;
  handleItemClick: (item: DesktopItem) => void;
  handleOpenFile: (file: FileData) => void;
  handleCloseWindow: (windowId: string) => void;
  handleMinimizeWindow: (windowId: string) => void;
  handleMaximizeWindow: (windowId: string) => void;
  handleTaskbarWindowClick: (windowId: string) => void;
  handleAnimationComplete: (windowId: string) => void;
  getMinimizeTargetPosition: (windowId: string) => Position | null;
}

export type RenderFolderContent = (
  folder: FolderData,
  openFile: (file: FileData) => void,
) => React.ReactNode;

export interface UseMenuKeyboardOptions {
  itemCount: number;
  isOpen: boolean;
  onClose: () => void;
}

export interface UseMenuKeyboardReturn {
  registerItem: (index: number, element: HTMLElement | null) => void;
  handleKeyDown: (event: React.KeyboardEvent) => void;
}

export interface UseRecentItemsReturn {
  recentIds: string[];
  recordOpen: (itemId: string) => void;
}

export interface UseDesktopMenusReturn {
  isStartMenuOpen: boolean;
  contextMenuPosition: Position | null;
  startButtonRef: React.RefObject<HTMLButtonElement>;
  toggleStartMenu: () => void;
  closeStartMenu: () => void;
  openStartMenu: () => void;
  closeContextMenu: () => void;
  handleBackgroundClick: () => void;
  handleBackgroundContextMenu: (event: React.MouseEvent) => void;
}
