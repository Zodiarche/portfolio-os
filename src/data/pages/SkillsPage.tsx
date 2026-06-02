import { Box, Typography, useTheme } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { categories } from "../../data/skills";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useSkillSelection } from "../../hooks/useSkillSelection";
import type { SkillsLayoutProps } from "../../types/data";

export default function SkillsPage() {
  const isMobile = useIsMobile();
  const { selected, setSelected, selectedCategory, selectedSkill } = useSkillSelection();

  if (isMobile) {
    return (
      <MobileSkillsLayout
        selected={selected}
        setSelected={setSelected}
        selectedCategory={selectedCategory}
        selectedSkill={selectedSkill}
      />
    );
  }

  return (
    <DesktopSkillsLayout
      selected={selected}
      setSelected={setSelected}
      selectedCategory={selectedCategory}
      selectedSkill={selectedSkill}
    />
  );
}

function SkillDetail({
  selectedCategory,
  selectedSkill,
}: Pick<SkillsLayoutProps, "selectedCategory" | "selectedSkill">) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${selectedCategory.label}-${selectedSkill.name}`}
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -8 }}
        transition={{ duration: 0.15 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
          <Box
            sx={{
              width: 4,
              height: 22,
              borderRadius: "2px",
              bgcolor: selectedCategory.color,
              flexShrink: 0,
            }}
          />
          <Typography variant="h5" fontWeight={700}>
            {selectedSkill.name}
          </Typography>
        </Box>

        <Typography
          variant="caption"
          sx={{
            color: selectedCategory.color,
            fontWeight: 700,
            textTransform: "uppercase",
            fontSize: "0.65rem",
            letterSpacing: "0.08em",
            mb: 2.5,
            display: "block",
          }}
        >
          {selectedCategory.label}
        </Typography>

        <Box
          component="ul"
          sx={{
            pl: 2,
            m: 0,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {selectedSkill.capabilities.map((capability) => (
            <Typography
              key={capability}
              component="li"
              variant="body2"
              sx={{ color: "text.secondary", lineHeight: 1.7 }}
            >
              {capability}
            </Typography>
          ))}
        </Box>
      </motion.div>
    </AnimatePresence>
  );
}

function DesktopSkillsLayout({
  selected,
  setSelected,
  selectedCategory,
  selectedSkill,
}: SkillsLayoutProps) {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", gap: 0, height: "100%", overflow: "hidden" }}>
      <Box
        sx={{
          width: 180,
          flexShrink: 0,
          borderRight: "1px solid",
          borderColor: "divider",
          pr: 0,
          userSelect: "none",
          overflowY: "auto",
        }}
      >
        {categories.map((category, categoryIndex) => (
          <Box key={category.label} sx={{ mb: 1.5 }}>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                px: 1.5,
                pt: categoryIndex === 0 ? 0 : 0.5,
                pb: 0.5,
                color: category.color,
                fontWeight: 700,
                textTransform: "uppercase",
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
              }}
            >
              {category.label}
            </Typography>

            {category.skills.map((skill, skillIndex) => {
              const isActive =
                selected.categoryIndex === categoryIndex && selected.skillIndex === skillIndex;
              return (
                <Box
                  key={skill.name}
                  role="button"
                  tabIndex={0}
                  aria-label={skill.name}
                  aria-selected={isActive}
                  onClick={() => setSelected({ categoryIndex, skillIndex })}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelected({ categoryIndex, skillIndex });
                    }
                  }}
                  sx={{
                    px: 1.5,
                    py: 0.75,
                    cursor: "pointer",
                    outline: "none",
                    "&:focus-visible": {
                      outline: `2px solid ${theme.palette.primary.main}`,
                      outlineOffset: -2,
                    },
                    borderLeft: `3px solid ${isActive ? category.color : "transparent"}`,
                    bgcolor: isActive ? `${category.color}14` : "transparent",
                    transition: "all 0.15s ease",
                    "&:hover": {
                      bgcolor: isActive ? `${category.color}14` : "action.hover",
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={isActive ? 600 : 400}
                    sx={{ color: isActive ? category.color : "text.primary" }}
                  >
                    {skill.name}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>

      <Box sx={{ flex: 1, px: 3, py: 0.5, overflow: "auto" }}>
        <SkillDetail selectedCategory={selectedCategory} selectedSkill={selectedSkill} />
      </Box>
    </Box>
  );
}

function MobileSkillsLayout({
  selected,
  setSelected,
  selectedCategory,
  selectedSkill,
}: SkillsLayoutProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          gap: 0,
          borderBottom: "1px solid",
          borderColor: "divider",
          userSelect: "none",
          flexShrink: 0,
        }}
      >
        {categories.map((category, categoryIndex) => {
          const isActiveCategory = selected.categoryIndex === categoryIndex;
          return (
            <Box
              key={category.label}
              role="button"
              tabIndex={0}
              onClick={() => setSelected({ categoryIndex, skillIndex: 0 })}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelected({ categoryIndex, skillIndex: 0 });
                }
              }}
              sx={{
                flex: 1,
                py: 1,
                textAlign: "center",
                cursor: "pointer",
                borderBottom: `2px solid ${isActiveCategory ? category.color : "transparent"}`,
                transition: "all 0.15s ease",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: "0.65rem",
                  letterSpacing: "0.06em",
                  color: isActiveCategory ? category.color : "text.secondary",
                }}
              >
                {category.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 0.5,
          px: 1.5,
          py: 1,
          overflowX: "auto",
          flexShrink: 0,
          userSelect: "none",
          borderBottom: "1px solid",
          borderColor: "divider",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {selectedCategory.skills.map((skill, skillIndex) => {
          const isActive = selected.skillIndex === skillIndex;
          return (
            <Box
              key={skill.name}
              role="button"
              tabIndex={0}
              onClick={() => setSelected({ ...selected, skillIndex })}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelected({ ...selected, skillIndex });
                }
              }}
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontSize: "0.8rem",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "white" : "text.primary",
                bgcolor: isActive ? selectedCategory.color : "action.hover",
                transition: "all 0.15s ease",
              }}
            >
              {skill.name}
            </Box>
          );
        })}
      </Box>

      <Box sx={{ flex: 1, overflow: "auto", px: 2, py: 1.5 }}>
        <SkillDetail selectedCategory={selectedCategory} selectedSkill={selectedSkill} />
      </Box>
    </Box>
  );
}
