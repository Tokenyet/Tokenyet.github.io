/**
 * Intent: Render imported non-post Markdown pages from the legacy Hexo source.
 * Constraints: Keep script-heavy legacy gallery snippets out of the modern about page.
 * Acceptance: About page preserves profile text without executing old third-party scripts.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { renderMarkdown } from "@/features/blog/adapter/markdown";

export function getAboutPage(): { title: string; html: string } {
  const filePath = path.join(process.cwd(), "content", "about.md");
  const raw = fs.readFileSync(filePath, "utf8");
  const separator = raw.match(/\r?\n---\r?\n/);

  if (!separator || separator.index === undefined) {
    return {
      title: "About",
      html: renderMarkdown(raw),
    };
  }

  const yaml = raw.slice(0, separator.index);
  const body = raw.slice(separator.index + separator[0].length);
  const parsed = matter(`---\n${yaml}\n---\n`);
  const safeBody = body.split("## 作品 ##")[0]?.trim() ?? body;

  return {
    title: String(parsed.data.title || "關於 Dowen"),
    html: renderMarkdown(safeBody),
  };
}
