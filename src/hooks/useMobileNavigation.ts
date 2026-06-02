import { useCallback, useState } from "react";
import type { FileData } from "../types/desktop";
import type { MobileScreen, UseMobileNavigationReturn } from "../types/mobile";

/** Manages mobile navigation between home screen and full-screen app views. */
export function useMobileNavigation(): UseMobileNavigationReturn {
  const [currentScreen, setCurrentScreen] = useState<MobileScreen>({ type: "home" });

  const openFile = useCallback((file: FileData) => {
    setCurrentScreen({ type: "app", file });
  }, []);

  const goBack = useCallback(() => {
    setCurrentScreen({ type: "home" });
  }, []);

  const canGoBack = currentScreen.type !== "home";

  return { currentScreen, openFile, goBack, canGoBack };
}
