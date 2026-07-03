/**
 * Intent: Match legacy Hexo route and taxonomy slugs while staying deterministic.
 * Constraints: Preserve Chinese titles; normalize whitespace in tags to old hyphen style.
 * Acceptance: Old article paths and common tag/category paths remain stable.
 */

export function stripMarkdownExtension(fileName: string): string {
  return fileName.replace(/\.(md|markdown)$/i, "");
}

export function taxonomySlug(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[\\/?#%*:|"<>]+/g, "-")
    .replace(/-+/g, "-");
}

export function headingSlug(value: string): string {
  return taxonomySlug(value)
    .replace(/[!"$&'()*+,.:;<=>@[\\\]^`{|}~]+/g, "")
    .replace(/-+/g, "-");
}

export function routePartsFromDate(date: Date): {
  year: string;
  month: string;
  day: string;
} {
  const year = String(date.getUTCFullYear());
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return { year, month, day };
}

export function routePathForPost(date: Date, slug: string): string {
  const { year, month, day } = routePartsFromDate(date);
  return `/${year}/${month}/${day}/${slug}/`;
}

export function parseHexoDate(value: unknown): Date {
  if (value instanceof Date) {
    return value;
  }

  const text = String(value ?? "").trim();
  const match = text.match(
    /^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?/,
  );

  if (!match) {
    throw new Error(`Invalid Hexo date: ${text}`);
  }

  const [, year, month, day, hour = "00", minute = "00", second = "00"] = match;
  return new Date(
    Date.UTC(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second),
    ),
  );
}
