import { useCallback, useEffect, useRef, useState } from "react";
import type { UseMenuKeyboardOptions, UseMenuKeyboardReturn } from "../types/hooks";

/** APG menu keyboard behaviour, shared by the start menu and the context menu. */
export function useMenuKeyboard({
  itemCount,
  isOpen,
  onClose,
}: UseMenuKeyboardOptions): UseMenuKeyboardReturn {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);

  const registerItem = useCallback((index: number, element: HTMLElement | null) => {
    itemsRef.current[index] = element;
  }, []);

  // APG: opening a menu moves focus to its first item.
  useEffect(() => {
    if (!isOpen) return;
    setActiveIndex(0);
    itemsRef.current[0]?.focus();
  }, [isOpen]);

  const focusIndex = useCallback((index: number) => {
    setActiveIndex(index);
    itemsRef.current[index]?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Tab") {
        onClose();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        focusIndex((activeIndex + 1) % itemCount);
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        focusIndex((activeIndex - 1 + itemCount) % itemCount);
        return;
      }
      if (event.key === "Home") {
        event.preventDefault();
        focusIndex(0);
        return;
      }
      if (event.key === "End") {
        event.preventDefault();
        focusIndex(itemCount - 1);
      }
    },
    [activeIndex, focusIndex, itemCount, onClose],
  );

  return { registerItem, handleKeyDown };
}
