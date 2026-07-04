/**
 * Intent: Catch same-origin links that would become GitHub Pages 404s.
 * Constraints: Run after Next static export; ignore off-site URLs.
 * Acceptance: Every internal href/src in exported HTML/XML resolves under out/.
 */

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");

if (!fs.existsSync(outDir)) {
  console.error("Missing out/. Run pnpm build before pnpm audit:links.");
  process.exit(1);
}

const files = walk(outDir).filter((filePath) =>
  /\.(html|xml)$/i.test(filePath),
);
const brokenRefs: BrokenRef[] = [];

for (const filePath of files) {
  const source = fs.readFileSync(filePath, "utf8");
  const refs = source.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi);

  for (const match of refs) {
    const rawUrl = match[1];
    if (!rawUrl) {
      continue;
    }

    const internalPath = resolveInternalPath(rawUrl, filePath);
    if (!internalPath) {
      continue;
    }

    if (!internalTargetExists(internalPath)) {
      brokenRefs.push({
        filePath: path.relative(root, filePath),
        rawUrl,
        internalPath,
      });
    }
  }
}

if (brokenRefs.length > 0) {
  for (const ref of brokenRefs) {
    console.error(`${ref.filePath} -> ${ref.rawUrl} (${ref.internalPath})`);
  }

  console.error(`Static link audit failed: ${brokenRefs.length} broken internal refs.`);
  process.exit(1);
}

console.log(`Static link audit passed: ${files.length} exported files checked.`);

interface BrokenRef {
  filePath: string;
  rawUrl: string;
  internalPath: string;
}

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(filePath) : [filePath];
  });
}

function resolveInternalPath(rawUrl: string, filePath: string): string | undefined {
  if (
    rawUrl.startsWith("#") ||
    rawUrl.startsWith("//") ||
    /^(?:mailto|tel|data|javascript|blob):/i.test(rawUrl)
  ) {
    return undefined;
  }

  if (/^https?:\/\//i.test(rawUrl)) {
    const parsed = new URL(rawUrl);
    if (parsed.hostname !== "www.dowen.idv.tw") {
      return undefined;
    }

    return normalizePathname(parsed.pathname);
  }

  if (rawUrl.startsWith("/")) {
    return normalizePathname(rawUrl);
  }

  if (/^[a-z][a-z0-9+.-]*:/i.test(rawUrl)) {
    return undefined;
  }

  const pagePath = path.relative(outDir, path.dirname(filePath)).replaceAll(path.sep, "/");
  const basePath = `/${pagePath === "" ? "" : `${pagePath}/`}`;
  return normalizePathname(new URL(rawUrl, `https://www.dowen.idv.tw${basePath}`).pathname);
}

function normalizePathname(value: string): string {
  const [pathname] = value.split(/[?#]/);
  if (!pathname || pathname === "/") {
    return "/";
  }

  try {
    return decodeURIComponent(pathname);
  } catch {
    return pathname;
  }
}

function internalTargetExists(internalPath: string): boolean {
  if (internalPath === "/") {
    return fs.existsSync(path.join(outDir, "index.html"));
  }

  const relativePath = internalPath.replace(/^\//, "");
  const directPath = path.join(outDir, relativePath);

  return (
    fs.existsSync(directPath) ||
    fs.existsSync(`${directPath}.html`) ||
    fs.existsSync(path.join(directPath, "index.html"))
  );
}
