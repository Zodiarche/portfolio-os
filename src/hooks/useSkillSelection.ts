import { useState } from "react";
import { categories } from "../data/skills";
import type { UseSkillSelectionReturn } from "../types/hooks";

/** Owns the selected (category, skill) indices and derives the active category and skill. */
export function useSkillSelection(): UseSkillSelectionReturn {
  const [selected, setSelected] = useState({ categoryIndex: 0, skillIndex: 0 });
  const selectedCategory = categories[selected.categoryIndex];
  const selectedSkill = selectedCategory.skills[selected.skillIndex];

  return { selected, setSelected, selectedCategory, selectedSkill };
}
