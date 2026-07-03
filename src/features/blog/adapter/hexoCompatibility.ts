import type { ContentAuditIssue } from "@/features/blog/entity/types";

const allowedHexoTags = new Set([
  "math",
  "endmath",
  "img",
  "raw",
  "endraw",
  "blockquote",
  "endblockquote",
]);

export function auditHexoTags(
  markdown: string,
  filePath: string,
): ContentAuditIssue[] {
  const issues: ContentAuditIssue[] = [];
  const tagPattern = /\{%\s*([^%\s]+)(?:\s+[^%]*)?%\}/g;
  let match: RegExpExecArray | null;

  while ((match = tagPattern.exec(markdown)) !== null) {
    const tag = match[1] ?? "";
    if (!allowedHexoTags.has(tag)) {
      issues.push({
        filePath,
        line: lineNumberForOffset(markdown, match.index),
        tag,
        raw: match[0],
      });
    }
  }

  return issues;
}

export function transformHexoMarkdown(markdown: string): string {
  return markdown
    .replace(
      /\{%\s*raw\s*%\}([\s\S]*?)\{%\s*endraw\s*%\}/g,
      (_match, body: string) => `\n\n${body.trim()}\n\n`,
    )
    .replace(
      /\{%\s*blockquote([^%]*)%\}([\s\S]*?)\{%\s*endblockquote\s*%\}/g,
      (_match, rawArgs: string, body: string) => {
        const quoted = body
          .trim()
          .split(/\r?\n/)
          .map((line) => `> ${line}`)
          .join("\n");
        const cite = blockquoteCitation(rawArgs);
        return `\n\n${quoted}${cite}\n\n`;
      },
    )
    .replace(
      /\{%\s*math\s*%\}([\s\S]*?)\{%\s*endmath\s*%\}/g,
      (_match, body: string) => {
        const math = body.trim();
        if (isDisplayMath(math)) {
          return `\n\n$$\n${math}\n$$\n\n`;
        }
        return `$${math}$`;
      },
    )
    .replace(/\{%\s*img\s+"([^"]*)"\s*([^%]*)%\}/g, (_match, src, args) => {
      const url = String(src).trim();
      if (!url) {
        return "";
      }

      const width = String(args ?? "").match(/\d+/)?.[0];
      const widthStyle = width ? ` style="max-width: min(100%, ${width}px)"` : "";
      return `\n\n<figure class="legacy-image"><img src="${escapeAttribute(url)}" alt="" loading="lazy"${widthStyle}></figure>\n\n`;
    });
}

function blockquoteCitation(rawArgs: string): string {
  const parts = rawArgs.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "";
  }

  const [label, url] = parts;
  if (!label || !url) {
    return "";
  }

  return `\n> \n> [${label}](${url})`;
}

function isDisplayMath(math: string): boolean {
  return (
    math.includes("\n") ||
    math.includes("\\begin") ||
    math.includes("\\\\") ||
    math.length > 72
  );
}

function lineNumberForOffset(text: string, offset: number): number {
  return text.slice(0, offset).split(/\r?\n/).length;
}

function escapeAttribute(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
