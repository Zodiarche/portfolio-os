import type { Variant } from "framer-motion";
import type { ReactNode } from "react";

export type WindowAnimationState = "idle" | "minimizing" | "restoring" | "opening";

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface WindowData {
  id: string;
  title: string;
  icon: string;
  component: ReactNode;
  position: Position;
  size: Size;
  isMinimized?: boolean;
  isMaximized?: boolean;
  animationState?: WindowAnimationState;
}

export interface GridPosition {
  col: number;
  row: number;
}

export interface WindowAnimationVariants {
  [key: string]: Variant;
}

export interface OSWindowProps {
  id: string;
  title: string;
  icon: string;
  children: ReactNode;
  initialPosition: Position;
  initialSize: Size;
  isActive: boolean;
  isMaximized: boolean;
  animationState: WindowAnimationState;
  minimizeTargetPosition: Position | null;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onAnimationComplete: () => void;
}
