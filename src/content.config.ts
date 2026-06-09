import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./content/blog" }),
  schema: z.object({
    title: z.string(),
    date_published: z.string(),
    date_updated: z.string().nullable().optional().transform((val) => val ?? undefined),
    excerpt: z.string().nullable().optional().transform((val) => val ?? undefined),
    ai_summary: z.string().nullable().optional().transform((val) => val ?? undefined),
    tags: z.array(z.string()).nullable().optional().transform((val) => val ?? undefined),
    status: z.string().nullable().optional().transform((val) => val ?? undefined),
    fav: z.boolean().nullable().optional().transform((val) => val ?? undefined),
    creation_duration_minutes: z.number().nullable().optional().transform((val) => val ?? undefined),
    cover: z.string().nullable().optional().transform((val) => val ?? undefined),
    backlinks: z
      .array(
        z.object({
          slug: z.string(),
          title: z.string(),
        })
      )
      .nullable()
      .optional()
      .transform((val) => val ?? undefined),
  }),
});

export const collections = { blog };
