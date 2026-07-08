/**
 * Intent: Keep site metadata and public routing constants in one place.
 * Constraints: Static-export friendly; no runtime-only values required.
 * Acceptance: All canonical URLs, navigation links, and verification metadata share one source.
 */

export const siteConfig = {
  title: "Dowen",
  subtitle: "個人專案與偶爾整理的技術筆記。",
  description: "個人專案、工具實驗，以及偶爾整理的技術文章。",
  author: "Dowen",
  locale: "zh_TW",
  baseUrl: "https://www.dowen.idv.tw",
  legacyGitHubUrl: "https://tokenyet.github.io",
  googleSiteVerification:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || "",
  navItems: [
    { href: "/projects/", label: "專案" },
    { href: "/archives/", label: "文章" },
    { href: "/about/", label: "關於" },
  ],
};

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, siteConfig.baseUrl).toString();
}
