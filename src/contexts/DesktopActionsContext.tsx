import { createContext, useContext } from "react";
import type { DesktopActions } from "../types/desktop";

// FileData.component takes no props, so pages rendered inside a window reach
// the shell through this context rather than through a prop chain.
const DesktopActionsContext = createContext<DesktopActions | null>(null);

export const DesktopActionsProvider = DesktopActionsContext.Provider;

export function useDesktopActions(): DesktopActions {
  const actions = useContext(DesktopActionsContext);
  if (!actions) throw new Error("useDesktopActions must be used inside a DesktopActionsProvider");
  return actions;
}
