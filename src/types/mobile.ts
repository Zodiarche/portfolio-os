import type { FileData } from "./desktop";

export type MobileScreen = { type: "home" } | { type: "app"; file: FileData };

export interface UseMobileNavigationReturn {
  currentScreen: MobileScreen;
  openFile: (file: FileData) => void;
  goBack: () => void;
  canGoBack: boolean;
}

export interface MobileAppViewProps {
  file: FileData;
  onBack: () => void;
}

export interface MobileHomeScreenProps {
  onOpenFile: (file: FileData) => void;
}
