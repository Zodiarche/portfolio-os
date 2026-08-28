import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { TASKBAR_HEIGHT } from "../constants/layout";
import { findItemById, PINNED_IDS } from "../data/icons";
import { useMenuKeyboard } from "../hooks/useMenuKeyboard";
import type { DesktopItem, StartMenuProps } from "../types/desktop";
import { stripExtension } from "../utils/stripExtension";

function resolveItems(itemIds: string[]): DesktopItem[] {
  const items: DesktopItem[] = [];
  for (const itemId of itemIds) {
    const item = findItemById(itemId);
    if (item) items.push(item);
  }
  return items;
}

export default function StartMenu({ isOpen, recentIds, onOpenItem, onClose }: StartMenuProps) {
  const pinnedItems = resolveItems(PINNED_IDS);
  const recentItems = resolveItems(recentIds);
  const allItems = [...pinnedItems, ...recentItems];
  const { registerItem, handleKeyDown } = useMenuKeyboard({
    itemCount: allItems.length,
    isOpen,
    onClose,
  });

  if (!isOpen) return null;

  const renderItem = (item: DesktopItem, index: number) => (
    <Box
      key={`${item.id}-${index}`}
      ref={(element) => registerItem(index, element as HTMLElement | null)}
      role="menuitem"
      tabIndex={-1}
      onClick={() => {
        onOpenItem(item.id);
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpenItem(item.id);
          onClose();
        }
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: 1.5,
        py: 1,
        borderRadius: 1,
        cursor: "pointer",
        color: "white",
        outline: "none",
        "&:hover, &:focus-visible": { bgcolor: "rgba(255, 255, 255, 0.14)" },
      }}
    >
      <Box sx={{ fontSize: 20 }}>{item.icon}</Box>
      <Typography variant="body2" noWrap>
        {stripExtension(item.title)}
      </Typography>
    </Box>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      style={{ position: "absolute", left: 12, bottom: TASKBAR_HEIGHT + 8, zIndex: 1300 }}
    >
      <Box
        role="menu"
        aria-label="Menu démarrer"
        onKeyDown={handleKeyDown}
        // The desktop background closes both menus on click; a click inside
        // the menu must not reach it.
        onClick={(event) => event.stopPropagation()}
        sx={{
          width: 300,
          p: 1.5,
          borderRadius: 2,
          background: "rgba(20, 24, 34, 0.92)",
          backdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.16)",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.45)",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "rgba(255, 255, 255, 0.55)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            px: 1.5,
          }}
        >
          Épinglé
        </Typography>
        {pinnedItems.map((item, index) => renderItem(item, index))}

        {recentItems.length > 0 && (
          <>
            <Typography
              variant="caption"
              sx={{
                color: "rgba(255, 255, 255, 0.55)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                px: 1.5,
                mt: 1,
                display: "block",
              }}
            >
              Récent
            </Typography>
            {recentItems.map((item, index) => renderItem(item, pinnedItems.length + index))}
          </>
        )}
      </Box>
    </motion.div>
  );
}
