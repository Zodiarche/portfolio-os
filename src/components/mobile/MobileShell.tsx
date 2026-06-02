import { Box } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { MOBILE_HOME_INDICATOR_HEIGHT, MOBILE_STATUS_BAR_HEIGHT } from "../../constants/layout";
import { useClock } from "../../hooks/useClock";
import { useMobileNavigation } from "../../hooks/useMobileNavigation";
import MobileAppView from "./MobileAppView";
import MobileHomeScreen from "./MobileHomeScreen";

export default function MobileShell() {
  const { time } = useClock();
  const { currentScreen, openFile, goBack } = useMobileNavigation();

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        bgcolor: "#000",
      }}
    >
      <Box
        sx={{
          height: MOBILE_STATUS_BAR_HEIGHT,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2.5,
          color: "white",
          fontSize: "0.85rem",
          fontWeight: 600,
          userSelect: "none",
          flexShrink: 0,
          zIndex: 20,
        }}
      >
        <span>{time}</span>
        <Box sx={{ display: "flex", gap: 0.5, fontSize: "0.75rem" }}>
          <span>📶</span>
          <span>🔋</span>
        </Box>
      </Box>

      <Box sx={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <AnimatePresence mode="wait">
          {currentScreen.type === "home" && <MobileHomeScreen key="home" onOpenFile={openFile} />}
          {currentScreen.type === "app" && (
            <MobileAppView
              key={`app-${currentScreen.file.id}`}
              file={currentScreen.file}
              onBack={goBack}
            />
          )}
        </AnimatePresence>
      </Box>

      <Box
        sx={{
          height: MOBILE_HOME_INDICATOR_HEIGHT,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
          bgcolor: currentScreen.type === "app" ? "white" : "transparent",
        }}
      >
        <Box
          sx={{
            width: 134,
            height: 5,
            borderRadius: 3,
            bgcolor:
              currentScreen.type === "app" ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.3)",
          }}
        />
      </Box>
    </Box>
  );
}
