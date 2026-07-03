import { z } from "zod";

export const PostSourceKindSchema = z.enum(["markdown", "legacy-html"]);

export const PostSchema = z.object({
  title: z.string(),
  date: z.date(),
  slug: z.string(),
  routePath: z.string(),
  categories: z.array(z.string()),
  tags: z.array(z.string()),
  excerptHtml: z.string(),
  contentHtml: z.string(),
  description: z.string(),
  coverImage: z.string().optional(),
  sourceKind: PostSourceKindSchema,
  sourcePath: z.string(),
});

export type PostSourceKind = z.infer<typeof PostSourceKindSchema>;
export type Post = z.infer<typeof PostSchema>;

export interface TaxonomyItem {
  name: string;
  slug: string;
  count: number;
}

export interface ContentAuditIssue {
  filePath: string;
  line: number;
  tag: string;
  raw: string;
}
