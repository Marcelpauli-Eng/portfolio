// ─── Global Shared Types ─────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  coverImage?: string;
  modelPath?: string; // path inside /public/models/
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "3d" | "tools";
  icon?: string;
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}
