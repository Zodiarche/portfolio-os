import { useEffect, useRef, useState } from "react";

/**
 * Tracks the live content width of a DOM element via ResizeObserver.
 * Returns a ref to attach and the current width in pixels (0 before measured).
 */
export function useElementWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { ref, width };
}
