import type { Transition } from "framer-motion";
import { ANIMATION_DURATION_S } from "../constants/layout";
import type {
  Position,
  Size,
  WindowAnimationState,
  WindowAnimationVariants,
} from "../types/window";

const SPRING_CONFIG = { stiffness: 300, damping: 25 };

/** Computes the pixel offset from the window position to the minimize target (taskbar icon center). */
function calculateMinimizeTargetOffset(
  minimizeTargetPosition: Position | null,
  initialPosition: Position,
  initialSize: Size,
): Position {
  if (!minimizeTargetPosition) {
    return { x: 0, y: window.innerHeight };
  }

  return {
    x: minimizeTargetPosition.x - initialPosition.x - initialSize.width / 2,
    y: minimizeTargetPosition.y - initialPosition.y - initialSize.height / 2,
  };
}

/** Builds Framer Motion variants for window open, visible, minimize and restore states. */
export function getAnimationVariants(
  minimizeTargetPosition: Position | null,
  initialPosition: Position,
  initialSize: Size,
): WindowAnimationVariants {
  const minimizeOffset = calculateMinimizeTargetOffset(
    minimizeTargetPosition,
    initialPosition,
    initialSize,
  );

  return {
    initial: { scale: 0.8, opacity: 0, x: 0, y: 0 },
    visible: { scale: 1, opacity: 1, x: 0, y: 0 },
    minimizing: { scale: 0, opacity: 0, x: minimizeOffset.x, y: minimizeOffset.y },
    restoringFromMinimized: { scale: 0, opacity: 0, x: minimizeOffset.x, y: minimizeOffset.y },
  };
}

/** Returns the initial animation variant based on whether the window is restoring from minimized. */
export function getInitialVariant(animationState: WindowAnimationState): string {
  if (animationState === "restoring") return "restoringFromMinimized";
  return "initial";
}

/** Returns the target animation variant based on the current animation state. */
export function getCurrentVariant(animationState: WindowAnimationState): string {
  if (animationState === "minimizing") return "minimizing";
  return "visible";
}

/** Returns the Framer Motion transition config: tween for minimize/restore, spring for open. */
export function getTransitionConfig(animationState: WindowAnimationState): Transition {
  const isMinimizeOrRestore = animationState === "minimizing" || animationState === "restoring";

  if (isMinimizeOrRestore) {
    return { type: "tween", duration: ANIMATION_DURATION_S, ease: "easeInOut" };
  }

  return { type: "spring", ...SPRING_CONFIG };
}
