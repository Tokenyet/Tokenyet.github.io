/**
 * Intent: Load all blog content from imported Hexo Markdown and legacy HTML snapshots.
 * Constraints: Build-time filesystem access only; preserve legacy URLs.
 * Acceptance: 34 posts load with rendered HTML, metadata, taxonomy, and route paths.
 */

import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";
import matter from "gray-matter";
import { renderMarkdown } from "@/features/blog/adapter/markdown";
import {
  parseHexoDate,
  routePathForPost,
  stripMarkdownExtension,
  taxonomySlug,
} from "@/features/blog/adapter/slug";
import type { Post, TaxonomyItem } from "@/features/blog/entity/types";
import { siteConfig } from "@/site/config";

interface ParsedFrontMatter {
  title?: string;
  date?: unknown;
  categories?: unknown;
  tags?: unknown;
}

let postCache: Post[] | undefined;

export function getAllPosts(): Post[] {
  if (!postCache) {
    postCache = [...loadMarkdownPosts(), ...loadLegacyHtmlPosts()]
      .map((post) => normalizePostHtml(post))
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  return postCache;
}

export function getPostByRoute(params: {
  year: string;
  month: string;
  day: string;
  slug: string;
}): Post | undefined {
  const routePath = `/${params.year}/${params.month}/${params.day}/${params.slug}/`;
  return getAllPosts().find((post) => post.routePath === routePath);
}

export function getPostsByYear(): Array<{ year: string; posts: Post[] }> {
  const groups = new Map<string, Post[]>();

  for (const post of getAllPosts()) {
    const year = String(post.date.getFullYear());
    groups.set(year, [...(groups.get(year) ?? []), post]);
  }

  return [...groups.entries()]
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, posts]) => ({ year, posts }));
}

export function getCategories(): TaxonomyItem[] {
  return buildTaxonomy((post) => post.categories);
}

export function getTags(): TaxonomyItem[] {
  return buildTaxonomy((post) => post.tags);
}

export function getPostsByCategory(slug: string): Post[] {
  return getAllPosts().filter((post) =>
    post.categories.some((category) => taxonomySlug(category) === slug),
  );
}

export function getPostsByTag(slug: string): Post[] {
  return getAllPosts().filter((post) =>
    post.tags.some((tag) => taxonomySlug(tag) === slug),
  );
}

export function getTaxonomyLabel(
  kind: "category" | "tag",
  slug: string,
): string | undefined {
  const source = kind === "category" ? getCategories() : getTags();
  return source.find((item) => item.slug === slug)?.name;
}

function loadMarkdownPosts(): Post[] {
  const postsDir = path.join(process.cwd(), "content", "posts");
  if (!fs.existsSync(postsDir)) {
    return [];
  }

  return fs
    .readdirSync(postsDir)
    .filter((fileName) => /\.(md|markdown)$/i.test(fileName))
    .map((fileName) => {
      const filePath = path.join(postsDir, fileName);
      const raw = fs.readFileSync(filePath, "utf8");
      const { frontMatter, content } = parseHexoFrontMatter(raw, filePath);
      const date = parseHexoDate(frontMatter.date);
      const slug = stripMarkdownExtension(fileName);
      const contentWithoutMarker = content.replace(/<!--\s*more\s*-->/i, "\n\n");
      const excerptSource = content.split(/<!--\s*more\s*-->/i)[0] ?? content;
      const contentHtml = renderMarkdown(contentWithoutMarker);
      const excerptHtml = renderMarkdown(excerptSource);
      const description = htmlToPlainText(excerptHtml).slice(0, 220);

      return {
        title: String(frontMatter.title ?? slug),
        date,
        slug,
        routePath: routePathForPost(date, slug),
        categories: toStringArray(frontMatter.categories),
        tags: toStringArray(frontMatter.tags),
        excerptHtml,
        contentHtml,
        description,
        coverImage: firstImageSrc(contentHtml),
        sourceKind: "markdown" as const,
        sourcePath: path.relative(process.cwd(), filePath),
      };
    });
}

function loadLegacyHtmlPosts(): Post[] {
  const legacyDir = path.join(process.cwd(), "content", "legacy-html");
  if (!fs.existsSync(legacyDir)) {
    return [];
  }

  return fs
    .readdirSync(legacyDir)
    .filter((fileName) => /\.html$/i.test(fileName))
    .map((fileName) => {
      const filePath = path.join(legacyDir, fileName);
      const raw = fs.readFileSync(filePath, "utf8");
      const $ = cheerio.load(raw);
      const parsed = parseLegacyFileName(fileName);
      const date = parseHexoDate(`${parsed.year}-${parsed.month}-${parsed.day}`);
      const title =
        $(".article-title").first().text().trim() ||
        $("meta[property='og:title']").attr("content")?.trim() ||
        parsed.slug;
      const contentHtml = $(".article-entry").first().html()?.trim() ?? "";
      const metaDescription =
        $("meta[property='og:description']").attr("content")?.trim() ||
        $("meta[name='description']").attr("content")?.trim() ||
        htmlToPlainText(contentHtml).slice(0, 220);
      const excerptHtml = `<p>${escapeHtml(metaDescription)}</p>`;

      return {
        title,
        date,
        slug: parsed.slug,
        routePath: `/${parsed.year}/${parsed.month}/${parsed.day}/${parsed.slug}/`,
        categories: $(".article-category-link")
          .toArray()
          .map((element) => $(element).text().trim())
          .filter(Boolean),
        tags: $(".article-tag-list-link")
          .toArray()
          .map((element) => $(element).text().trim())
          .filter(Boolean),
        excerptHtml,
        contentHtml,
        description: metaDescription,
        coverImage: firstImageSrc(contentHtml),
        sourceKind: "legacy-html" as const,
        sourcePath: path.relative(process.cwd(), filePath),
      };
    });
}

function parseHexoFrontMatter(
  raw: string,
  filePath: string,
): { frontMatter: ParsedFrontMatter; content: string } {
  const separator = raw.match(/\r?\n---\r?\n/);
  if (!separator || separator.index === undefined) {
    throw new Error(`Missing Hexo front matter separator: ${filePath}`);
  }

  const yaml = raw.slice(0, separator.index);
  const content = raw.slice(separator.index + separator[0].length);
  const parsed = matter(`---\n${yaml}\n---\n`);
  return {
    frontMatter: parsed.data as ParsedFrontMatter,
    content,
  };
}

function parseLegacyFileName(fileName: string): {
  year: string;
  month: string;
  day: string;
  slug: string;
} {
  const match = fileName.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.html$/);
  if (!match) {
    throw new Error(`Invalid legacy HTML filename: ${fileName}`);
  }

  const [, year, month, day, slug] = match;
  if (!year || !month || !day || !slug) {
    throw new Error(`Invalid legacy HTML filename: ${fileName}`);
  }

  return { year, month, day, slug };
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).map((item) => item.trim()).filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) {
    return [value.trim()];
  }

  return [];
}

function buildTaxonomy(selector: (post: Post) => string[]): TaxonomyItem[] {
  const counts = new Map<string, TaxonomyItem>();

  for (const post of getAllPosts()) {
    for (const name of selector(post)) {
      const slug = taxonomySlug(name);
      const current = counts.get(slug);
      counts.set(slug, {
        name: current?.name ?? name,
        slug,
        count: (current?.count ?? 0) + 1,
      });
    }
  }

  return [...counts.values()].sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count;
    }
    return a.name.localeCompare(b.name, "zh-Hant");
  });
}

function normalizePostHtml(post: Post): Post {
  return {
    ...post,
    contentHtml: normalizeLegacyUrls(post.contentHtml),
    excerptHtml: normalizeLegacyUrls(post.excerptHtml),
    coverImage: post.coverImage ? normalizeUrl(post.coverImage) : undefined,
  };
}

function normalizeLegacyUrls(html: string): string {
  return html
    .replaceAll("https://tokenyet.github.io", siteConfig.baseUrl)
    .replaceAll("http://tokenyet.github.io", siteConfig.baseUrl)
    .replaceAll(
      "/2016/07/13/A-Path-finding-With-Libgdx",
      "/2017/07/13/A-Path-finding-With-Libgdx/",
    )
    .replaceAll("//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML", "");
}

function normalizeUrl(url: string): string {
  return url
    .replace(/^https?:\/\/tokenyet\.github\.io/i, siteConfig.baseUrl)
    .replace(/^\/\//, "https://");
}

function firstImageSrc(html: string): string | undefined {
  const $ = cheerio.load(html);
  const src = $("img").first().attr("src")?.trim();
  return src ? normalizeUrl(src) : undefined;
}

function htmlToPlainText(html: string): string {
  const $ = cheerio.load(html);
  return $.text().replace(/\s+/g, " ").trim();
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
