export interface Skill {
  name: string;
  capabilities: string[];
}

export interface SkillCategory {
  label: string;
  color: string;
  skills: Skill[];
}

export interface SkillSelection {
  categoryIndex: number;
  skillIndex: number;
}

export interface SkillsLayoutProps {
  selected: SkillSelection;
  setSelected: (value: SkillSelection) => void;
  selectedCategory: SkillCategory;
  selectedSkill: Skill;
}

export interface TechCategory {
  label: string;
  items: string[];
}

export interface ProjectData {
  title: string;
  subtitle: string;
  icon: string;
  tech: TechCategory[];
  description: string[];
  features: string[];
  highlights: string[];
  links: { label: string; href: string }[];
}
