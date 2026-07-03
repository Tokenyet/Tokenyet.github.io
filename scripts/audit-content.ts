import fs from "node:fs";
import path from "node:path";
import { auditHexoTags } from "@/features/blog/adapter/hexoCompatibility";
import { getAllPosts } from "@/features/blog/adapter/postRepository";
import { siteConfig } from "@/site/config";

const root = process.cwd();
const posts = getAllPosts();
const issues = auditImportedMarkdown();
const routePaths = new Set(posts.map((post) => post.routePath));
const duplicateRoutes = posts
  .map((post) => post.routePath)
  .filter((route, index, allRoutes) => allRoutes.indexOf(route) !== index);
const missingLegacyRoutes = getLegacyArticleRoutes().filter(
  (route) => !routePaths.has(route),
);

if (issues.length > 0) {
  for (const issue of issues) {
    console.error(
      `${issue.filePath}:${issue.line} unsupported Hexo tag ${issue.raw}`,
    );
  }
  process.exitCode = 1;
}

if (posts.length !== 34) {
  console.error(`Expected 34 published posts, found ${posts.length}.`);
  process.exitCode = 1;
}

if (duplicateRoutes.length > 0) {
  console.error(`Duplicate post routes: ${[...new Set(duplicateRoutes)].join(", ")}`);
  process.exitCode = 1;
}

if (missingLegacyRoutes.length > 0) {
  console.error(
    `Missing routes from legacy sitemap: ${missingLegacyRoutes.join(", ")}`,
  );
  process.exitCode = 1;
}

if (process.exitCode) {
  process.exit();
}

console.log(
  `Content audit passed: ${posts.length} posts, ${routePaths.size} routes, ${issues.length} unsupported tags.`,
);

function auditImportedMarkdown() {
  const markdownFiles = [
    ...fs
      .readdirSync(path.join(root, "content", "posts"))
      .filter((fileName) => /\.(md|markdown)$/i.test(fileName))
      .map((fileName) => path.join(root, "content", "posts", fileName)),
    path.join(root, "content", "about.md"),
  ].filter((filePath) => fs.existsSync(filePath));

  return markdownFiles.flatMap((filePath) =>
    auditHexoTags(
      fs.readFileSync(filePath, "utf8"),
      path.relative(root, filePath),
    ),
  );
}

function getLegacyArticleRoutes(): string[] {
  const sitemapPath = path.join(root, "content", "legacy-sitemap.xml");
  if (!fs.existsSync(sitemapPath)) {
    return [];
  }

  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1] ?? "",
  );

  return locs
    .map((loc) =>
      loc
        .replace(siteConfig.legacyGitHubUrl, "")
        .replace(siteConfig.baseUrl, ""),
    )
    .filter((route) => /^\/\d{4}\/\d{2}\/\d{2}\//.test(route))
    .map((route) => {
      const decoded = decodeURI(route);
      return decoded.endsWith("/") ? decoded : `${decoded}/`;
    });
}
