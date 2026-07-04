/**
 * Intent: Generate static XML/TXT files that GitHub Pages can serve directly.
 * Constraints: No route handlers; output is written before `next build`.
 * Acceptance: Atom, sitemap, and robots include canonical domain and all static routes.
 */

import fs from "node:fs";
import path from "node:path";
import { formatISO } from "date-fns";
import { getCategories } from "@/features/blog/adapter/postRepository";
import type { Post } from "@/features/blog/entity/types";
import type { Project } from "@/features/projects/entity/types";
import { absoluteUrl, siteConfig } from "@/site/config";

const staticRoutes = [
  "/",
  "/about/",
  "/archives/",
  "/categories/",
  "/projects/",
];

export class GenerateStaticFilesUseCase {
  execute(input: { posts: Post[]; projects: Project[]; outputDir: string }) {
    fs.mkdirSync(input.outputDir, { recursive: true });
    fs.writeFileSync(
      path.join(input.outputDir, "atom.xml"),
      buildAtomXml(input.posts),
      "utf8",
    );
    fs.writeFileSync(
      path.join(input.outputDir, "sitemap.xml"),
      buildSitemapXml(input.posts, input.projects),
      "utf8",
    );
    fs.writeFileSync(
      path.join(input.outputDir, "robots.txt"),
      buildRobotsTxt(),
      "utf8",
    );
  }
}

function buildAtomXml(posts: Post[]): string {
  const latestDate = posts[0]?.date ?? new Date();
  const entries = posts
    .slice(0, 20)
    .map((post) => {
      const url = absoluteUrl(post.routePath);
      return [
        "  <entry>",
        `    <title>${escapeXml(post.title)}</title>`,
        `    <link href="${escapeXml(url)}"/>`,
        `    <id>${escapeXml(url)}</id>`,
        `    <updated>${formatISO(post.date)}</updated>`,
        `    <summary type="html">${escapeXml(post.description)}</summary>`,
        `    <content type="html"><![CDATA[${post.contentHtml}]]></content>`,
        "  </entry>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<feed xmlns="http://www.w3.org/2005/Atom">',
    `  <title>${escapeXml(siteConfig.title)}</title>`,
    `  <subtitle>${escapeXml(siteConfig.description)}</subtitle>`,
    `  <link href="${escapeXml(absoluteUrl("/atom.xml"))}" rel="self"/>`,
    `  <link href="${escapeXml(siteConfig.baseUrl)}"/>`,
    `  <id>${escapeXml(siteConfig.baseUrl)}</id>`,
    `  <updated>${formatISO(latestDate)}</updated>`,
    `  <author><name>${escapeXml(siteConfig.author)}</name></author>`,
    entries,
    "</feed>",
    "",
  ].join("\n");
}

function buildSitemapXml(posts: Post[], projects: Project[]): string {
  const urls = new Set<string>([
    ...staticRoutes,
    ...posts.map((post) => post.routePath),
    ...getCategories().map((category) => `/categories/${category.slug}/`),
    ...projects.flatMap((project) => [
      `/projects/${project.slug}/`,
      `/projects/${project.slug}/privacy/`,
    ]),
  ]);

  const entries = [...urls]
    .sort()
    .map((route) => {
      return [
        "  <url>",
        `    <loc>${escapeXml(absoluteUrl(route))}</loc>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    "</urlset>",
    "",
  ].join("\n");
}

function buildRobotsTxt(): string {
  return [
    "User-agent: *",
    "Allow: /",
    `Sitemap: ${absoluteUrl("/sitemap.xml")}`,
    "",
  ].join("\n");
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
