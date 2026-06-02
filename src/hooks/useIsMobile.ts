import { useMediaQuery } from "@mui/material";
import { MOBILE_BREAKPOINT } from "../constants/layout";

/** True when the viewport width is at or below the mobile breakpoint. */
export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width:${MOBILE_BREAKPOINT - 0.05}px)`);
}
