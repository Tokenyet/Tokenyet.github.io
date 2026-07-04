/**
 * Intent: Keep site metadata and public routing constants in one place.
 * Constraints: Static-export friendly; no runtime-only values required.
 * Acceptance: All canonical URLs, navigation links, and verification metadata share one source.
 */

export const siteConfig = {
  title: "Dowen's World",
  subtitle: "Love Games, Knowledge Sharing.",
  description: "記錄著學習中的任何事物。",
  author: "Dowen",
  locale: "zh_TW",
  baseUrl: "https://www.dowen.idv.tw",
  legacyGitHubUrl: "https://tokenyet.github.io",
  googleSiteVerification:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || "",
  navItems: [
    { href: "/", label: "Home" },
    { href: "/archives/", label: "Archives" },
    { href: "/categories/", label: "Categories" },
    { href: "/projects/", label: "Projects" },
    { href: "/about/", label: "About" },
  ],
};

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, siteConfig.baseUrl).toString();
}
