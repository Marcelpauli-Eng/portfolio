import type { NavLink, SocialLink } from "@/types";

// ─── Site Metadata ────────────────────────────────────────────────────────────
export const SITE_NAME = "Marcel Laraña · Dev";
export const SITE_DESCRIPTION =
    "Full-stack developer crafting immersive digital experiences.";
export const SITE_URL = "https://yourportfolio.dev";

// ─── Navigation ──────────────────────────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
];

// ─── Social Links ─────────────────────────────────────────────────────────────
export const SOCIAL_LINKS: SocialLink[] = [
    { platform: "GitHub", href: "https://github.com/yourusername", icon: "github" },
    { platform: "LinkedIn", href: "https://linkedin.com/in/yourusername", icon: "linkedin" },
    { platform: "Twitter / X", href: "https://x.com/yourusername", icon: "twitter" },
];
