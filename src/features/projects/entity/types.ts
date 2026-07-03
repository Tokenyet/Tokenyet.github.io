import { z } from "zod";

export const ProjectSchema = z.object({
  slug: z.string(),
  name: z.string(),
  tagline: z.string(),
  summary: z.string(),
  status: z.string(),
  updatedAt: z.string(),
  verificationPath: z.string(),
  privacyPath: z.string(),
  highlights: z.array(z.string()),
  dataUse: z.array(
    z.object({
      title: z.string(),
      body: z.string(),
    }),
  ),
});

export type Project = z.infer<typeof ProjectSchema>;
