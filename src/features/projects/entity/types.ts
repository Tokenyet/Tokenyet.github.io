import { z } from "zod";

export const ProjectSchema = z.object({
  slug: z.string(),
  name: z.string(),
  kind: z.string(),
  tagline: z.string(),
  summary: z.string(),
  status: z.string(),
  updatedAt: z.string(),
  year: z.string(),
  role: z.string(),
  impact: z.string(),
  featured: z.boolean().optional(),
  verificationPath: z.string().optional(),
  privacyPath: z.string().optional(),
  image: z
    .object({
      src: z.string(),
      alt: z.string(),
    })
    .optional(),
  links: z
    .array(
      z.object({
        label: z.string(),
        href: z.string(),
      }),
    )
    .optional(),
  stack: z.array(z.string()),
  highlights: z.array(z.string()),
  caseStudy: z.array(
    z.object({
      title: z.string(),
      body: z.string(),
    }),
  ),
  dataUse: z
    .array(
      z.object({
        title: z.string(),
        body: z.string(),
      }),
    )
    .optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
